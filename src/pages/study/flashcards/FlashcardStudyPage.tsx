import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CloseIcon, VolumeIcon } from '@/components/icons/WordmateIcons'
import { useEnglishVoice } from '@/hooks/useEnglishVoice'
import Flashcard from '@/pages/study/flashcards/Flashcard'
import FlashcardResult from '@/pages/study/flashcards/FlashcardResult'
import PauseStudyDialog from '@/pages/study/PauseStudyDialog'
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
  const englishVoice = useEnglishVoice()

  const settings = useMemo(() => readStudySettings(searchParams, words.length), [searchParams])
  const [sessionKey, setSessionKey] = useState(0)
  const sessionWords = useMemo(
    // sessionKey가 바뀌면 섞인 순서를 새로 만든다.
    () => (sessionKey >= 0 ? buildSessionWords(words, settings) : []),
    [settings, sessionKey],
  )

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
      setIndex((prev) => {
        const next = prev + 1
        if (next >= sessionWords.length) setFinished(true)
        return next
      })
    },
    [sessionWords.length],
  )

  const speak = useCallback(() => {
    if (!englishVoice || !current) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(current.word)
    utterance.voice = englishVoice
    utterance.lang = englishVoice.lang
    window.speechSynthesis.speak(utterance)
  }, [englishVoice, current])

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
    setSessionKey((prev) => prev + 1)
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

  const caption = `${wordPackDetail.name} · 플래시카드`
  const solved = answers.length

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
            onClick={speak}
            disabled={!englishVoice}
            title={
              englishVoice
                ? undefined
                : '영어 음성이 없어 발음을 재생할 수 없습니다. 운영체제에 영어 음성을 추가해주세요.'
            }
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
