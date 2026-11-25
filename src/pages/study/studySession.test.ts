import { accuracyPercent, buildSessionWords, readStudySettings } from '@/pages/study/studySession'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

const word = (id: string): VocabularyWord => ({
  id,
  word: id,
  meaning: id,
  example: id,
  status: 'new',
  favorite: false,
})

const pool = [word('a'), word('b'), word('c'), word('d')]

test('쿼리가 없으면 기본값을 쓴다', () => {
  const settings = readStudySettings(new URLSearchParams(''), 24)

  expect(settings).toEqual({ direction: 'en-ko', count: 24, shuffle: true })
})

test('쿼리의 방향과 문항 수, 섞기를 읽는다', () => {
  const settings = readStudySettings(new URLSearchParams('direction=ko-en&count=10&shuffle=0'), 24)

  expect(settings).toEqual({ direction: 'ko-en', count: 10, shuffle: false })
})

test('문항 수는 단어 수를 넘지 않는다', () => {
  expect(readStudySettings(new URLSearchParams('count=100'), 24).count).toBe(24)
})

test('이상한 값은 기본값으로 떨어진다', () => {
  const settings = readStudySettings(new URLSearchParams('direction=xx&count=abc'), 24)

  expect(settings).toEqual({ direction: 'en-ko', count: 24, shuffle: true })
})

test('섞지 않으면 단어팩 순서를 지킨다', () => {
  const picked = buildSessionWords(pool, { count: 3, shuffle: false })

  expect(picked.map((item) => item.id)).toEqual(['a', 'b', 'c'])
})

test('섞으면 순서가 바뀌고 개수는 유지된다', () => {
  const picked = buildSessionWords(pool, { count: 4, shuffle: true }, () => 0)

  expect(picked).toHaveLength(4)
  expect([...picked].map((item) => item.id).sort()).toEqual(['a', 'b', 'c', 'd'])
  expect(picked.map((item) => item.id)).not.toEqual(['a', 'b', 'c', 'd'])
})

test('원본 배열은 건드리지 않는다', () => {
  buildSessionWords(pool, { count: 4, shuffle: true }, () => 0)

  expect(pool.map((item) => item.id)).toEqual(['a', 'b', 'c', 'd'])
})

test('정답률은 반올림한다', () => {
  expect(accuracyPercent(1, 3)).toBe(33)
  expect(accuracyPercent(2, 3)).toBe(67)
  expect(accuracyPercent(0, 0)).toBe(0)
})
