export const paths = {
  login: '/login',
  signUpTerms: '/sign-up/terms',
  home: '/',
  wordPacks: '/word-packs',
  wordPackDetail: '/word-packs/:packId',
  studySettings: '/word-packs/:packId/study',
  flashcardStudy: '/word-packs/:packId/study/flashcards',
  multipleChoiceStudy: '/word-packs/:packId/study/multiple-choice',
  battle: '/battle',
  ranking: '/ranking',
  wrongNotes: '/wrong-notes',
  todaySentence: '/today-sentence',
  studyLog: '/study-log',
  myPage: '/my-page',
} as const

export const wordPackDetailPath = (packId: string) => `/word-packs/${packId}`

export const studySettingsPath = (packId: string) => `/word-packs/${packId}/study`

export const flashcardStudyPath = (packId: string) => `/word-packs/${packId}/study/flashcards`

export const multipleChoiceStudyPath = (packId: string) =>
  `/word-packs/${packId}/study/multiple-choice`
