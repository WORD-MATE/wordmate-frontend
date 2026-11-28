import StudyResult from '@/pages/study/StudyResult'
import { accuracyPercent, type FlashcardAnswer } from '@/pages/study/studySession'
import { xpPerCorrect } from '@/pages/study/studySettingsData'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

type FlashcardResultProps = {
  caption: string
  answers: { word: VocabularyWord; answer: FlashcardAnswer }[]
  onRetry: () => void
}

export default function FlashcardResult({ caption, answers, onRetry }: FlashcardResultProps) {
  const known = answers.filter((entry) => entry.answer === 'known').length
  const unknown = answers.length - known
  const xp = known * xpPerCorrect('flashcards')

  return (
    <StudyResult
      caption={caption}
      percent={accuracyPercent(known, answers.length)}
      stats={[
        { label: '알아요', value: String(known) },
        { label: '몰라요', value: String(unknown), tone: 'error' },
        { label: '획득 XP', value: xp > 0 ? `+${xp}` : '-' },
      ]}
      items={answers.map(({ word, answer }) => ({
        id: word.id,
        word: word.word,
        meaning: word.meaning,
        correct: answer === 'known',
      }))}
      filterLabel="몰라요만"
      onRetry={onRetry}
    />
  )
}
