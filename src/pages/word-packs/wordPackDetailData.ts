export type WordStatus = 'new' | 'learning' | 'memorized'

export type VocabularyWord = {
  id: string
  word: string
  meaning: string
  status: WordStatus
  favorite: boolean
}

export const statusDotClass: Record<WordStatus, string> = {
  new: 'bg-border-input',
  learning: 'bg-learning',
  memorized: 'bg-brand',
}

export const statusLabel: Record<WordStatus, string> = {
  new: '새 단어',
  learning: '학습 중',
  memorized: '암기 완료',
}

export const wordPackDetail = {
  id: 'suneung-12',
  name: '수능 필수 영단어 Day 12',
  caption: '기본 단어팩 · 24단어 · 고2 수준 핵심 어휘 24개',
}

export const hasWordPackDetail = (packId: string) => packId === wordPackDetail.id

export const words: VocabularyWord[] = [
  {
    id: 'abandon',
    word: 'abandon',
    meaning: '버리다, 포기하다',
    status: 'memorized',
    favorite: false,
  },
  { id: 'accurate', word: 'accurate', meaning: '정확한', status: 'memorized', favorite: false },
  {
    id: 'achieve',
    word: 'achieve',
    meaning: '성취하다, 이루다',
    status: 'learning',
    favorite: true,
  },
  {
    id: 'adapt',
    word: 'adapt',
    meaning: '적응하다, 각색하다',
    status: 'learning',
    favorite: false,
  },
  {
    id: 'adequate',
    word: 'adequate',
    meaning: '충분한, 적절한',
    status: 'learning',
    favorite: false,
  },
  { id: 'analyze', word: 'analyze', meaning: '분석하다', status: 'memorized', favorite: false },
  {
    id: 'anticipate',
    word: 'anticipate',
    meaning: '예상하다, 기대하다',
    status: 'learning',
    favorite: false,
  },
  {
    id: 'apparent',
    word: 'apparent',
    meaning: '명백한, 겉보기의',
    status: 'learning',
    favorite: false,
  },
  { id: 'assume', word: 'assume', meaning: '가정하다, 떠맡다', status: 'new', favorite: false },
  { id: 'attempt', word: 'attempt', meaning: '시도하다, 시도', status: 'learning', favorite: true },
  {
    id: 'attribute',
    word: 'attribute',
    meaning: '~의 탓으로 돌리다',
    status: 'new',
    favorite: false,
  },
  {
    id: 'capable',
    word: 'capable',
    meaning: '~할 수 있는, 유능한',
    status: 'learning',
    favorite: false,
  },
  {
    id: 'circumstance',
    word: 'circumstance',
    meaning: '환경, 상황',
    status: 'new',
    favorite: false,
  },
  { id: 'comprehend', word: 'comprehend', meaning: '이해하다', status: 'learning', favorite: true },
  {
    id: 'consequence',
    word: 'consequence',
    meaning: '결과, 중요성',
    status: 'new',
    favorite: false,
  },
  {
    id: 'considerable',
    word: 'considerable',
    meaning: '상당한',
    status: 'memorized',
    favorite: false,
  },
  { id: 'constant', word: 'constant', meaning: '끊임없는, 일정한', status: 'new', favorite: false },
  {
    id: 'contribute',
    word: 'contribute',
    meaning: '기여하다, 기부하다',
    status: 'learning',
    favorite: false,
  },
  { id: 'convince', word: 'convince', meaning: '납득시키다', status: 'new', favorite: false },
  {
    id: 'declare',
    word: 'declare',
    meaning: '선언하다, 신고하다',
    status: 'memorized',
    favorite: false,
  },
  { id: 'definite', word: 'definite', meaning: '확실한, 명확한', status: 'new', favorite: false },
  {
    id: 'demonstrate',
    word: 'demonstrate',
    meaning: '증명하다, 시위하다',
    status: 'learning',
    favorite: false,
  },
  { id: 'derive', word: 'derive', meaning: '끌어내다, 유래하다', status: 'new', favorite: false },
  { id: 'distinguish', word: 'distinguish', meaning: '구별하다', status: 'new', favorite: false },
]
