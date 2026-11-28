import {
  CHOICE_COUNT,
  buildQuestion,
  buildQuestions,
  promptTitle,
} from '@/pages/study/multiple-choice/multipleChoiceQuiz'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

const word = (id: string, meaning: string): VocabularyWord => ({
  id,
  word: id,
  meaning,
  example: `${id} example`,
  status: 'new',
  favorite: false,
})

const pool = [
  word('alpha', '첫째'),
  word('bravo', '둘째'),
  word('charlie', '셋째'),
  word('delta', '넷째'),
  word('echo', '다섯째'),
]

test('보기는 4개이고 정답을 포함한다', () => {
  const question = buildQuestion(pool[0], pool, 'en-ko', () => 0)

  expect(question.choices).toHaveLength(CHOICE_COUNT)
  expect(question.choices).toContain('첫째')
  expect(question.prompt).toBe('alpha')
  expect(question.answer).toBe('첫째')
})

test('보기는 서로 겹치지 않는다', () => {
  const question = buildQuestion(pool[0], pool, 'en-ko', () => 0.5)

  expect(new Set(question.choices).size).toBe(CHOICE_COUNT)
})

test('정답이 오답 보기로 다시 들어가지 않는다', () => {
  const question = buildQuestion(pool[2], pool, 'en-ko', () => 0.3)

  expect(question.choices.filter((choice) => choice === '셋째')).toHaveLength(1)
})

test('뜻 보고 영어 맞히기는 묻고 답하는 쪽이 바뀐다', () => {
  const question = buildQuestion(pool[1], pool, 'ko-en', () => 0)

  expect(question.prompt).toBe('둘째')
  expect(question.answer).toBe('bravo')
  expect(question.choices).toContain('bravo')
})

test('단어 수만큼 문제를 만든다', () => {
  const questions = buildQuestions(pool.slice(0, 3), pool, 'en-ko', () => 0)

  expect(questions).toHaveLength(3)
  expect(questions.map((question) => question.word.id)).toEqual(['alpha', 'bravo', 'charlie'])
})

test('보기가 모자라면 있는 만큼만 만든다', () => {
  const small = pool.slice(0, 2)
  const question = buildQuestion(small[0], small, 'en-ko', () => 0)

  expect(question.choices).toHaveLength(2)
  expect(question.choices).toContain('첫째')
})

test('문제 안내 문구는 출제 방향을 따른다', () => {
  expect(promptTitle('en-ko')).toBe('알맞은 뜻을 고르세요')
  expect(promptTitle('ko-en')).toBe('알맞은 영어 단어를 고르세요')
})
