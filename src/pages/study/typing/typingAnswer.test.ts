import {
  acceptedAnswers,
  isTypedAnswerCorrect,
  typingAnswer,
  typingPlaceholder,
  typingPrompt,
  typingTitle,
} from '@/pages/study/typing/typingAnswer'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

const word: VocabularyWord = {
  id: 'abandon',
  word: 'abandon',
  meaning: '버리다, 포기하다',
  example: 'They had to abandon the car in the snow.',
  status: 'new',
  favorite: false,
}

test('쉼표로 나눈 뜻 중 하나만 맞아도 정답이다', () => {
  expect(isTypedAnswerCorrect('버리다', '버리다, 포기하다')).toBe(true)
  expect(isTypedAnswerCorrect('포기하다', '버리다, 포기하다')).toBe(true)
})

test('앞뒤 공백과 가운데 공백을 무시한다', () => {
  expect(isTypedAnswerCorrect('  버리다  ', '버리다, 포기하다')).toBe(true)
  expect(isTypedAnswerCorrect('~ 할 수 있는', '~할 수 있는, 유능한')).toBe(true)
})

test('물결과 마침표 같은 기호를 무시한다', () => {
  expect(isTypedAnswerCorrect('할 수 있는', '~할 수 있는, 유능한')).toBe(true)
  expect(isTypedAnswerCorrect('분석하다.', '분석하다')).toBe(true)
})

test('영어를 쓸 때는 대소문자를 구분하지 않는다', () => {
  expect(isTypedAnswerCorrect('Abandon', 'abandon')).toBe(true)
  expect(isTypedAnswerCorrect('ABANDON', 'abandon')).toBe(true)
})

test('틀린 답과 빈 입력은 오답이다', () => {
  expect(isTypedAnswerCorrect('정확한', '버리다, 포기하다')).toBe(false)
  expect(isTypedAnswerCorrect('', '버리다, 포기하다')).toBe(false)
  expect(isTypedAnswerCorrect('   ', '버리다, 포기하다')).toBe(false)
})

test('부분만 겹치는 답은 오답이다', () => {
  expect(isTypedAnswerCorrect('버리', '버리다, 포기하다')).toBe(false)
  expect(isTypedAnswerCorrect('버리다 포기', '버리다, 포기하다')).toBe(false)
})

test('허용 답안은 뜻 개수만큼 나온다', () => {
  expect(acceptedAnswers('버리다, 포기하다')).toEqual(['버리다', '포기하다'])
  expect(acceptedAnswers('분석하다')).toEqual(['분석하다'])
})

test('출제 방향에 따라 묻는 쪽과 답이 바뀐다', () => {
  expect(typingPrompt(word, 'en-ko')).toBe('abandon')
  expect(typingAnswer(word, 'en-ko')).toBe('버리다, 포기하다')
  expect(typingPrompt(word, 'ko-en')).toBe('버리다, 포기하다')
  expect(typingAnswer(word, 'ko-en')).toBe('abandon')
})

test('안내 문구와 placeholder도 출제 방향을 따른다', () => {
  expect(typingTitle('en-ko')).toBe('뜻을 써 보세요')
  expect(typingTitle('ko-en')).toBe('영어 단어를 써 보세요')
  expect(typingPlaceholder('en-ko')).toBe('뜻을 입력하세요')
  expect(typingPlaceholder('ko-en')).toBe('영어 단어를 입력하세요')
})
