export type BattleRecord = {
  id: string
  rank: string
  name: string
  caption: string
  score: number
  retired?: boolean
}

export const battleSummary = {
  battles: 4,
  winRate: 33,
  averageAccuracy: 78,
}

export const battleRecords: BattleRecord[] = [
  {
    id: 'suneung-12',
    rank: '1위',
    name: '수능 필수 영단어 Day 12',
    caption: '11.07 · 4명 중',
    score: 1320,
  },
  {
    id: 'textbook-2-3',
    rank: '3위',
    name: '교과서 2학년 3단원',
    caption: '11.06 · 6명 중',
    score: 980,
  },
  {
    id: 'quick-1105',
    rank: '2위',
    name: '빠른 대결',
    caption: '11.05 · 2명 중',
    score: 1105,
  },
  {
    id: 'it-english',
    rank: '이탈',
    name: 'IT 기술 영어',
    caption: '11.03 · 5명 중',
    score: 410,
    retired: true,
  },
]

export const JOIN_CODE_LENGTH = 6

export const normalizeJoinCode = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '')
    .slice(0, JOIN_CODE_LENGTH)

export const isJoinCodeComplete = (code: string) => code.length === JOIN_CODE_LENGTH
