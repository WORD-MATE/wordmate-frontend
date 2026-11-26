export type LearningModeId = 'flashcards' | 'multiple-choice' | 'typing'
export type DirectionId = 'en-ko' | 'ko-en'
export type QuestionCountId = '10' | '20' | 'all'

export type LearningMode = {
  id: LearningModeId
  title: string
  description: string
  footnote: string
  xpPerCorrect: number
}

export const learningModes: LearningMode[] = [
  {
    id: 'flashcards',
    title: '플래시카드',
    description: '뒤집어 보며 알아요·몰라요로 나눠요',
    footnote: 'XP 없음 · 훑어보기용',
    xpPerCorrect: 0,
  },
  {
    id: 'multiple-choice',
    title: '4지선다',
    description: '보기 4개 중에서 정답을 골라요',
    footnote: '정답당 +1 XP',
    xpPerCorrect: 1,
  },
  {
    id: 'typing',
    title: '직접 입력',
    description: '정답을 직접 써서 맞혀요',
    footnote: '정답당 +2 XP',
    xpPerCorrect: 2,
  },
]

export const directionLabel: Record<DirectionId, string> = {
  'en-ko': '영어 → 한국어',
  'ko-en': '한국어 → 영어',
}

export const directionOptions = [
  { id: 'en-ko' as const, label: '영어 보고 뜻 맞히기' },
  { id: 'ko-en' as const, label: '뜻 보고 영어 맞히기' },
]

const SECONDS_PER_QUESTION = 6

export const resolveQuestionCount = (count: QuestionCountId, total: number) =>
  count === 'all' ? total : Math.min(Number(count), total)

export const estimatedMinutes = (questionCount: number) =>
  Math.max(1, Math.ceil((questionCount * SECONDS_PER_QUESTION) / 60))

export const xpPerCorrect = (mode: LearningModeId) =>
  learningModes.find((item) => item.id === mode)?.xpPerCorrect ?? 0
