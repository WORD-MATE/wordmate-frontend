import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { VolumeIcon } from '@/components/icons/WordmateIcons'
import { useSpeakEnglish } from '@/hooks/useSpeakEnglish'
import Flashcard from '@/pages/study/flashcards/Flashcard'
import FlashcardResult from '@/pages/study/flashcards/FlashcardResult'
import PauseStudyDialog from '@/pages/study/PauseStudyDialog'
import StudyExitHeader from '@/pages/study/StudyExitHeader'
import StudyHeader from '@/pages/study/StudyHeader'
import {
  buildSessionWords,
  readStudySettings,
  type FlashcardAnswer,
} from '@/pages/study/studySession'
import { hasWordPackDetail, wordPackDetail, words } from '@/pages/word-packs/wordPackDetailData'
import { paths, wordPackDetailPath } from '@/routes/paths'

export default function FlashcardStudyPage() {
  const { packId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { speak, canSpeak, unavailableTitle } = useSpeakEnglish()

  const settings = useMemo(() => readStudySettings(searchParams, words.length), [searchParams])
  const [sessionWords, setSessionWords] = useState(() => buildSessionWords(words, settings))

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answers, setAnswers] = useState<FlashcardAnswer[]>([])
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)

  const current = sessionWords[index]

  const answer = useCallback(
    (value: FlashcardAnswer) => {
      setAnswers((prev) => [...prev, value])
      setFlipped(false)
      const next = index + 1
      setIndex(next)
      if (next >= sessionWords.length) setFinished(true)
    },
    [index, sessionWords.length],
  )

  useEffect(() => {
    if (finished || paused) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPaused(true)
        return
      }
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault()
        setFlipped((prev) => !prev)
        return
      }
      if (event.key === 'ArrowLeft') answer('unknown')
      if (event.key === 'ArrowRight') answer('known')
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [answer, finished, paused])

  const restart = () => {
    setSessionWords(buildSessionWords(words, settings))
    setIndex(0)
    setFlipped(false)
    setAnswers([])
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

  const caption = `${wordPackDetail.name} · 플래시카드`
  const solved = answers.length

  if (finished) {
    return (
      <div className="bg-background min-h-dvh">
        <StudyExitHeader />
        <FlashcardResult
          caption={caption}
          answers={sessionWords
            .slice(0, answers.length)
            .map((word, position) => ({ word, answer: answers[position] }))}
          onRetry={restart}
        />
      </div>
    )
  }

  return (
    <div className="bg-background min-h-dvh">
      <StudyHeader
        current={Math.min(index + 1, sessionWords.length)}
        total={sessionWords.length}
        onExit={() => setPaused(true)}
      />

      <div className="mx-auto flex w-full max-w-[560px] flex-col px-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <p className="text-content-muted text-[13px] leading-5 tracking-[-0.15px]">{caption}</p>
          <p className="text-content-muted text-[13px] leading-5 tracking-[-0.15px]">
            Space 뒤집기 · ← 몰라요 · → 알아요
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => current && speak(current.word)}
            disabled={!canSpeak}
            title={unavailableTitle}
            aria-label={current ? `${current.word} 발음 듣기` : '발음 듣기'}
            className="hover:bg-background-subtle flex size-10 shrink-0 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
          >
            <VolumeIcon />
          </button>
        </div>

        {current && (
          <Flashcard
            word={current}
            direction={settings.direction}
            flipped={flipped}
            onFlip={() => setFlipped((prev) => !prev)}
          />
        )}

        <div className="grid grid-cols-2 gap-2 pt-6">
          <button
            type="button"
            onClick={() => answer('unknown')}
            className="bg-background-subtle text-content hover:bg-background-disabled h-14 rounded-md px-5 text-base leading-6 font-bold"
          >
            몰라요
          </button>
          <button
            type="button"
            onClick={() => answer('known')}
            className="bg-brand text-content-on-accent hover:bg-brand-strong h-14 rounded-md px-5 text-base leading-6 font-bold"
          >
            알아요
          </button>
        </div>
      </div>

      {paused && (
        <PauseStudyDialog
          solvedCount={solved}
          onResume={() => setPaused(false)}
          onStop={() => {
            if (solved > 0) {
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
