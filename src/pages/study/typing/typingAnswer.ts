import type { DirectionId } from '@/pages/study/studySettingsData'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[~,.·\s]/g, '')
    .trim()

export const acceptedAnswers = (answer: string) =>
  answer
    .split(',')
    .map((part) => normalize(part))
    .filter((part) => part.length > 0)

export function isTypedAnswerCorrect(typed: string, answer: string) {
  const guess = normalize(typed)
  if (guess.length === 0) return false

  return acceptedAnswers(answer).includes(guess)
}

export const typingPrompt = (word: VocabularyWord, direction: DirectionId) =>
  direction === 'en-ko' ? word.word : word.meaning

export const typingAnswer = (word: VocabularyWord, direction: DirectionId) =>
  direction === 'en-ko' ? word.meaning : word.word

export const typingTitle = (direction: DirectionId) =>
  direction === 'en-ko' ? '뜻을 써 보세요' : '영어 단어를 써 보세요'

export const typingPlaceholder = (direction: DirectionId) =>
  direction === 'en-ko' ? '뜻을 입력하세요' : '영어 단어를 입력하세요'
