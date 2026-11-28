import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  CheckIcon,
  CloseIcon,
  CloseSmallIcon,
  Volume20Icon,
} from '@/components/icons/WordmateIcons'
import { useSpeakEnglish } from '@/hooks/useSpeakEnglish'
import AnswerChoices from '@/pages/study/multiple-choice/AnswerChoices'
import {
  buildQuestions,
  promptTitle,
  type Question,
} from '@/pages/study/multiple-choice/multipleChoiceQuiz'
import PauseStudyDialog from '@/pages/study/PauseStudyDialog'
import StudyHeader from '@/pages/study/StudyHeader'
import StudyResult from '@/pages/study/StudyResult'
import {
  accuracyPercent,
  buildSessionWords,
  readStudySettings,
  type StudySettings,
} from '@/pages/study/studySession'
import { xpPerCorrect } from '@/pages/study/studySettingsData'
import { hasWordPackDetail, wordPackDetail, words } from '@/pages/word-packs/wordPackDetailData'
import { paths, wordPackDetailPath } from '@/routes/paths'

function buildRound(settings: StudySettings, only?: string[]) {
  const session = only
    ? words.filter((word) => only.includes(word.id))
    : buildSessionWords(words, { count: settings.count, shuffle: settings.shuffle })

  return buildQuestions(session, words, settings.direction)
}

export default function MultipleChoiceStudyPage() {
  const { packId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { speak, canSpeak, unavailableTitle } = useSpeakEnglish()

  const settings = useMemo(() => readStudySettings(searchParams, words.length), [searchParams])
  const [questions, setQuestions] = useState(() => buildRound(settings))

  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [results, setResults] = useState<{ question: Question; correct: boolean }[]>([])
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)

  const current = questions[index]

  const pick = useCallback(
    (choice: string) => {
      if (picked !== null || !current) return
      setPicked(choice)
      setResults((prev) => [...prev, { question: current, correct: choice === current.answer }])
    },
    [current, picked],
  )

  const goNext = useCallback(() => {
    if (picked === null) return
    setPicked(null)
    const next = index + 1
    setIndex(next)
    if (next >= questions.length) setFinished(true)
  }, [index, picked, questions.length])

  useEffect(() => {
    if (finished || paused) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPaused(true)
        return
      }
      if (event.key === 'Enter') {
        goNext()
        return
      }
      const choiceIndex = Number(event.key) - 1
      if (current && choiceIndex >= 0 && choiceIndex < current.choices.length) {
        pick(current.choices[choiceIndex])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [current, finished, goNext, paused, pick])

  const startRound = (only?: string[]) => {
    setQuestions(buildRound(settings, only))
    setIndex(0)
    setPicked(null)
    setResults([])
    setFinished(false)
  }

  if (!hasWordPackDetail(packId)) {
    return (
      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-3 py-20 text-center">
        <h1 className="text-content text-xl font-bold">단어팩을 찾을 수 없어요</h1>
        <Link to={paths.wordPacks} className="text-content font-semibold underline">
          단어팩 목록으로
        </Link>
      </section>
    )
  }

  if (questions.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-3 py-20 text-center">
        <h1 className="text-content text-xl font-bold">학습할 단어가 없어요</h1>
        <Link to={wordPackDetailPath(packId)} className="text-content font-semibold underline">
          단어팩으로 돌아가기
        </Link>
      </section>
    )
  }

  const caption = `${wordPackDetail.name} · 4지선다`
  const correctCount = results.filter((entry) => entry.correct).length
  const wrongIds = results.filter((entry) => !entry.correct).map((entry) => entry.question.word.id)

  if (finished) {
    return (
      <div className="bg-background min-h-dvh">
        <header className="flex h-18 items-center px-5 sm:px-8">
          <Link
            to={paths.home}
            aria-label="홈으로"
            className="hover:bg-background-subtle flex size-10 shrink-0 items-center justify-center rounded-md"
          >
            <CloseIcon />
          </Link>
        </header>
        <StudyResult
          caption={caption}
          percent={accuracyPercent(correctCount, results.length)}
          stats={[
            { label: '정답', value: String(correctCount) },
            { label: '오답', value: String(results.length - correctCount), tone: 'error' },
            { label: '획득 XP', value: `+${correctCount * xpPerCorrect('multiple-choice')}` },
          ]}
          items={results.map(({ question, correct }) => ({
            id: question.word.id,
            word: question.word.word,
            meaning: question.word.meaning,
            correct,
          }))}
          filterLabel="틀린 단어만"
          footnote={
            wrongIds.length > 0 ? `틀린 ${wrongIds.length}개는 오답노트에 담았어요` : undefined
          }
          primaryAction={
            wrongIds.length > 0
              ? { label: '틀린 단어만 풀기', onClick: () => startRound(wrongIds) }
              : undefined
          }
          onRetry={() => startRound()}
        />
      </div>
    )
  }

  return (
    <div className="bg-background min-h-dvh">
      <StudyHeader
        current={Math.min(index + 1, questions.length)}
        total={questions.length}
        onExit={() => setPaused(true)}
      />

      <div className="mx-auto flex w-full max-w-[560px] flex-col px-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 pb-6">
          <p className="text-content-muted text-[13px] leading-5 tracking-[-0.15px]">{caption}</p>
          <p className="text-content-muted text-[13px] leading-5 tracking-[-0.15px]">
            1~4 고르기 · Enter 다음
          </p>
        </div>

        {current && (
          <>
            <div className="bg-background-card flex flex-col items-center gap-2.5 rounded-lg px-6 pt-12 pb-10">
              <p className="text-content-muted text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
                {promptTitle(settings.direction)}
              </p>
              <p className="flex flex-wrap items-center justify-center gap-1 sm:pl-10">
                <span className="text-content text-center text-[36px] leading-[44px] font-extrabold tracking-[-1.68px] sm:text-[48px] sm:leading-[55.2px]">
                  {current.prompt}
                </span>
                <button
                  type="button"
                  onClick={() => speak(current.word.word)}
                  disabled={!canSpeak}
                  title={unavailableTitle}
                  aria-label={`${current.word.word} 발음 듣기`}
                  className="hover:bg-background-subtle flex size-10 shrink-0 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Volume20Icon />
                </button>
              </p>
            </div>

            <div className="pt-4">
              <AnswerChoices
                choices={current.choices}
                answer={current.answer}
                picked={picked}
                onPick={pick}
              />
            </div>

            {picked !== null && (
              <div className="flex flex-col pt-6">
                <div className="flex items-start gap-2.5 pb-3.5">
                  <span
                    className={`mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full ${
                      picked === current.answer ? 'bg-brand' : 'bg-error'
                    }`}
                  >
                    {picked === current.answer ? <CheckIcon /> : <CloseSmallIcon />}
                  </span>
                  <span>
                    <span
                      className={`block text-[15px] leading-[22px] font-bold tracking-[-0.15px] ${
                        picked === current.answer ? 'text-content' : 'text-error'
                      }`}
                    >
                      {picked === current.answer ? '정답이에요' : '아쉬워요, 오답노트에 담았어요'}
                    </span>
                    <span className="text-content-secondary block pt-0.5 text-sm leading-[21px] tracking-[-0.15px]">
                      {current.word.example}
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="bg-brand text-content-on-accent hover:bg-brand-strong h-14 w-full rounded-md px-5 text-base leading-6 font-bold"
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {paused && (
        <PauseStudyDialog
          solvedCount={results.length}
          onResume={() => setPaused(false)}
          onStop={() => {
            if (results.length > 0) {
              setPaused(false)
              setFinished(true)
              return
            }
            navigate(wordPackDetailPath(packId))
          }}
        />
      )}
    </div>
  )
}
