import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSpeakEnglish } from '@/hooks/useSpeakEnglish'
import PauseStudyDialog from '@/pages/study/PauseStudyDialog'
import StudyExitHeader from '@/pages/study/StudyExitHeader'
import StudyFeedback from '@/pages/study/StudyFeedback'
import StudyHeader from '@/pages/study/StudyHeader'
import StudyPromptCard from '@/pages/study/StudyPromptCard'
import StudyResult from '@/pages/study/StudyResult'
import { accuracyPercent, buildSessionWords, readStudySettings } from '@/pages/study/studySession'
import { xpPerCorrect } from '@/pages/study/studySettingsData'
import {
  isTypedAnswerCorrect,
  typingAnswer,
  typingPlaceholder,
  typingPrompt,
  typingTitle,
} from '@/pages/study/typing/typingAnswer'
import { hasWordPackDetail, wordPackDetail, words } from '@/pages/word-packs/wordPackDetailData'
import { paths, wordPackDetailPath } from '@/routes/paths'

export default function TypingStudyPage() {
  const { packId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { speak, canSpeak, unavailableTitle } = useSpeakEnglish()

  const settings = useMemo(() => readStudySettings(searchParams, words.length), [searchParams])
  const [sessionWords, setSessionWords] = useState(() => buildSessionWords(words, settings))

  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [graded, setGraded] = useState<boolean | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const current = sessionWords[index]
  const answer = current ? typingAnswer(current, settings.direction) : ''

  const submit = useCallback(() => {
    if (graded !== null || !current || typed.trim().length === 0) return
    const correct = isTypedAnswerCorrect(typed, answer)
    setGraded(correct)
    setResults((prev) => [...prev, correct])
  }, [answer, current, graded, typed])

  const goNext = useCallback(() => {
    if (graded === null) return
    setGraded(null)
    setTyped('')
    const next = index + 1
    setIndex(next)
    if (next >= sessionWords.length) setFinished(true)
    inputRef.current?.focus()
  }, [graded, index, sessionWords.length])

  useEffect(() => {
    if (finished || paused) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPaused(true)
        return
      }
      if (event.key !== 'Enter') return
      event.preventDefault()
      if (graded === null) submit()
      else goNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [finished, goNext, graded, paused, submit])

  const restart = () => {
    setSessionWords(buildSessionWords(words, settings))
    setIndex(0)
    setTyped('')
    setGraded(null)
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

  if (sessionWords.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-3 py-20 text-center">
        <h1 className="text-content text-xl font-bold">학습할 단어가 없어요</h1>
        <Link to={wordPackDetailPath(packId)} className="text-content font-semibold underline">
          단어팩으로 돌아가기
        </Link>
      </section>
    )
  }

  const caption = `${wordPackDetail.name} · 직접 입력`
  const correctCount = results.filter(Boolean).length

  if (finished) {
    return (
      <div className="bg-background min-h-dvh">
        <StudyExitHeader />
        <StudyResult
          caption={caption}
          percent={accuracyPercent(correctCount, results.length)}
          stats={[
            { label: '정답', value: String(correctCount) },
            { label: '오답', value: String(results.length - correctCount), tone: 'error' },
            { label: '획득 XP', value: `+${correctCount * xpPerCorrect('typing')}` },
          ]}
          items={sessionWords.slice(0, results.length).map((word, position) => ({
            id: word.id,
            word: word.word,
            meaning: word.meaning,
            correct: results[position],
          }))}
          filterLabel="틀린 단어만"
          footnote={
            results.length - correctCount > 0
              ? `틀린 ${results.length - correctCount}개는 오답노트에 담았어요`
              : undefined
          }
          onRetry={restart}
        />
      </div>
    )
  }

  let inputStateClass = 'border-transparent text-content'
  if (graded === true) inputStateClass = 'border-content text-content'
  if (graded === false) inputStateClass = 'border-error text-error'

  return (
    <div className="bg-background min-h-dvh">
      <StudyHeader
        current={Math.min(index + 1, sessionWords.length)}
        total={sessionWords.length}
        onExit={() => setPaused(true)}
      />

      <div className="mx-auto flex w-full max-w-[560px] flex-col px-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 pb-6">
          <p className="text-content-muted text-[13px] leading-5 tracking-[-0.15px]">{caption}</p>
          <p className="text-content-muted text-[13px] leading-5 tracking-[-0.15px]">
            Enter 확인 · 다음
          </p>
        </div>

        <StudyPromptCard
          title={typingTitle(settings.direction)}
          prompt={typingPrompt(current, settings.direction)}
          speakLabel={`${current.word} 발음 듣기`}
          canSpeak={canSpeak}
          unavailableTitle={unavailableTitle}
          onSpeak={() => speak(current.word)}
        />

        <div className="flex flex-col gap-2.5 pt-4">
          <input
            ref={inputRef}
            value={typed}
            readOnly={graded !== null}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={typingPlaceholder(settings.direction)}
            aria-label={typingPlaceholder(settings.direction)}
            className={`bg-background-subtle placeholder:text-content-muted focus-visible:ring-content h-[60px] rounded-md border px-3.5 text-xl leading-[30px] font-bold outline-none focus-visible:ring-2 ${inputStateClass}`}
          />

          {graded === false && (
            <p className="text-content-secondary text-[15px] leading-[22.5px] tracking-[-0.15px]">
              정답 <span className="text-content font-bold">{answer}</span>
            </p>
          )}
        </div>

        {graded === null ? (
          <div className="pt-6">
            <button
              type="button"
              onClick={submit}
              disabled={typed.trim().length === 0}
              className="bg-brand text-content-on-accent enabled:hover:bg-brand-strong disabled:bg-background-subtle disabled:text-content-muted h-14 w-full rounded-md px-5 text-base leading-6 font-bold disabled:cursor-not-allowed"
            >
              확인
            </button>
          </div>
        ) : (
          <StudyFeedback correct={graded} example={current.example} onNext={goNext} />
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
