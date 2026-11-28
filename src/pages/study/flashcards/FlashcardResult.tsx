import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon, CloseIcon } from '@/components/icons/WordmateIcons'
import { accuracyPercent, type FlashcardAnswer } from '@/pages/study/studySession'
import { paths } from '@/routes/paths'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

type FlashcardResultProps = {
  caption: string
  answers: { word: VocabularyWord; answer: FlashcardAnswer }[]
  onRetry: () => void
}

export default function FlashcardResult({ caption, answers, onRetry }: FlashcardResultProps) {
  const [unknownOnly, setUnknownOnly] = useState(false)

  const known = answers.filter((entry) => entry.answer === 'known').length
  const unknown = answers.length - known
  const percent = accuracyPercent(known, answers.length)
  const visible = unknownOnly ? answers.filter((entry) => entry.answer === 'unknown') : answers

  return (
    <div className="desktop:grid desktop:grid-cols-[400px_584px] desktop:gap-x-14 mx-auto flex w-full max-w-[1040px] flex-col gap-8 px-5 pb-16">
      <section className="flex flex-col gap-3">
        <p className="text-content-secondary text-[15px] leading-[22.5px] tracking-[-0.15px]">
          {caption}
        </p>
        <h1 className="text-content text-[28px] leading-[42px] font-extrabold tracking-[-0.98px]">
          {percent === 100 ? '아주 잘했어요!' : '수고했어요!'}
        </h1>

        <p className="text-content font-extrabold tracking-[-0.75px]">
          <span className="text-[96px] leading-[96px]">{percent}</span>
          <span className="text-content-secondary pl-2 text-[32px] leading-8">%</span>
        </p>

        <dl className="bg-background-card mt-2 grid grid-cols-3 gap-2 rounded-lg p-[18px]">
          <div className="flex flex-col gap-1">
            <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
              알아요
            </dt>
            <dd className="text-content text-[26px] leading-[39px] font-extrabold tracking-[-0.78px]">
              {known}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
              몰라요
            </dt>
            <dd className="text-error text-[26px] leading-[39px] font-extrabold tracking-[-0.78px]">
              {unknown}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
              획득 XP
            </dt>
            <dd className="text-content text-[26px] leading-[39px] font-extrabold tracking-[-0.78px]">
              -
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-2 pt-3">
          <button
            type="button"
            onClick={onRetry}
            className="bg-background-subtle text-content hover:bg-background-disabled flex h-14 items-center justify-center rounded-md px-5 text-base leading-6 font-bold"
          >
            다시 풀기
          </button>
          <Link
            to={paths.home}
            className="text-content-secondary flex h-14 items-center justify-center rounded-md px-5 text-base leading-6 font-bold tracking-[-0.15px]"
          >
            홈으로
          </Link>
        </div>
      </section>

      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-content text-base leading-6 font-bold tracking-[-0.15px]">
            푼 단어 {answers.length}
          </h2>

          <label className="flex items-center gap-1.5">
            <span className="text-content-secondary text-sm leading-[21px] tracking-[-0.15px]">
              몰라요만
            </span>
            <input
              type="checkbox"
              checked={unknownOnly}
              onChange={(event) => setUnknownOnly(event.target.checked)}
              className="sr-only"
            />
            <span
              className={`relative h-[26px] w-11 shrink-0 rounded-[13px] transition-colors ${
                unknownOnly ? 'bg-brand' : 'bg-background-disabled'
              }`}
            >
              <span
                className={`bg-background absolute top-[3px] size-5 rounded-[10px] transition-[left] ${
                  unknownOnly ? 'left-[21px]' : 'left-[3px]'
                }`}
              />
            </span>
          </label>
        </div>

        {visible.length === 0 ? (
          <p className="text-content-muted py-10 text-sm">몰라요로 넘긴 단어가 없어요</p>
        ) : (
          <ul className="pt-2">
            {visible.map(({ word, answer }) => (
              <li key={word.id} className="flex items-center gap-3.5 py-3.5">
                <span
                  role="img"
                  aria-label={answer === 'known' ? '알아요' : '몰라요'}
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                    answer === 'known' ? 'bg-brand' : 'bg-background-disabled'
                  }`}
                >
                  {answer === 'known' ? <CheckIcon /> : <CloseIcon />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-content block text-[17px] leading-[25.5px] font-bold tracking-[-0.17px]">
                    {word.word}
                  </span>
                  <span className="text-content-secondary block pt-0.5 text-sm leading-[21px] tracking-[-0.15px]">
                    {word.meaning}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
