import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'
import type { DirectionId } from '@/pages/study/studySettingsData'

export type StudySettings = {
  direction: DirectionId
  count: number
  shuffle: boolean
}

export type FlashcardAnswer = 'known' | 'unknown'

const isDirection = (value: string | null): value is DirectionId =>
  value === 'en-ko' || value === 'ko-en'

export function readStudySettings(params: URLSearchParams, total: number): StudySettings {
  const direction = params.get('direction')
  const parsedCount = Number(params.get('count'))
  const count =
    Number.isFinite(parsedCount) && parsedCount > 0 ? Math.min(parsedCount, total) : total

  return {
    direction: isDirection(direction) ? direction : 'en-ko',
    count,
    shuffle: params.get('shuffle') !== '0',
  }
}

export function buildSessionWords(
  words: VocabularyWord[],
  { count, shuffle }: Pick<StudySettings, 'count' | 'shuffle'>,
  random: () => number = Math.random,
) {
  const pool = [...words]

  if (shuffle) {
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
  }

  return pool.slice(0, Math.min(count, pool.length))
}

export const accuracyPercent = (known: number, total: number) =>
  total > 0 ? Math.round((known / total) * 100) : 0

export function resultHeadline(percent: number) {
  if (percent >= 90) return '아주 잘했어요!'
  if (percent >= 70) return '잘했어요!'
  return '조금만 더 하면 돼요'
}
