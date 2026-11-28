import type { DirectionId } from '@/pages/study/studySettingsData'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

export const CHOICE_COUNT = 4

export type Question = {
  word: VocabularyWord
  prompt: string
  answer: string
  choices: string[]
}

const labelOf = (word: VocabularyWord, direction: DirectionId) =>
  direction === 'en-ko' ? word.meaning : word.word

const shuffled = <T>(items: T[], random: () => number) => {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export function buildQuestion(
  word: VocabularyWord,
  pool: VocabularyWord[],
  direction: DirectionId,
  random: () => number = Math.random,
): Question {
  const answer = labelOf(word, direction)
  const distractors = shuffled(
    pool.filter((item) => item.id !== word.id).map((item) => labelOf(item, direction)),
    random,
  )
    .filter((label, index, all) => label !== answer && all.indexOf(label) === index)
    .slice(0, CHOICE_COUNT - 1)

  return {
    word,
    prompt: direction === 'en-ko' ? word.word : word.meaning,
    answer,
    choices: shuffled([answer, ...distractors], random),
  }
}

export const buildQuestions = (
  words: VocabularyWord[],
  pool: VocabularyWord[],
  direction: DirectionId,
  random: () => number = Math.random,
) => words.map((word) => buildQuestion(word, pool, direction, random))

export const promptTitle = (direction: DirectionId) =>
  direction === 'en-ko' ? '알맞은 뜻을 고르세요' : '알맞은 영어 단어를 고르세요'
