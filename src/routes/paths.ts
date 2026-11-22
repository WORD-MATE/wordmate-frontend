export const paths = {
  login: '/login',
  signUpTerms: '/sign-up/terms',
  home: '/',
  wordPacks: '/word-packs',
  wordPackDetail: '/word-packs/:packId',
  battle: '/battle',
  ranking: '/ranking',
  wrongNotes: '/wrong-notes',
  todaySentence: '/today-sentence',
  studyLog: '/study-log',
  myPage: '/my-page',
} as const

export const wordPackDetailPath = (packId: string) => `/word-packs/${packId}`
