import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon, CloseSmallIcon } from '@/components/icons/WordmateIcons'
import { resultHeadline } from '@/pages/study/studySession'
import { paths } from '@/routes/paths'

export type ResultStat = {
  label: string
  value: string
  tone?: 'error'
}

export type ResultItem = {
  id: string
  word: string
  meaning: string
  correct: boolean
}

type StudyResultProps = {
  caption: string
  percent: number
  stats: ResultStat[]
  items: ResultItem[]
  filterLabel: string
  footnote?: string
  primaryAction?: { label: string; onClick: () => void }
  onRetry: () => void
}

export default function StudyResult({
  caption,
  percent,
  stats,
  items,
  filterLabel,
  footnote,
  primaryAction,
  onRetry,
}: StudyResultProps) {
  const [wrongOnly, setWrongOnly] = useState(false)
  const visible = wrongOnly ? items.filter((item) => !item.correct) : items

  return (
    <div className="desktop:grid desktop:grid-cols-[400px_584px] desktop:gap-x-14 mx-auto flex w-full max-w-[1040px] flex-col gap-8 px-5 pb-16">
      <section className="flex flex-col gap-3">
        <p className="text-content-secondary text-[15px] leading-[22.5px] tracking-[-0.15px]">
          {caption}
        </p>
        <h1 className="text-content text-[28px] leading-[42px] font-extrabold tracking-[-0.98px]">
          {resultHeadline(percent)}
        </h1>

        <p className="text-content font-extrabold tracking-[-0.75px]">
          <span className="text-[96px] leading-[96px]">{percent}</span>
          <span className="text-content-secondary pl-2 text-[32px] leading-8">%</span>
        </p>

        <dl className="bg-background-card mt-2 grid grid-cols-3 gap-2 rounded-lg p-[18px]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                {stat.label}
              </dt>
              <dd
                className={`text-[26px] leading-[39px] font-extrabold tracking-[-0.78px] ${
                  stat.tone === 'error' ? 'text-error' : 'text-content'
                }`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-2 pt-3">
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="bg-brand text-content-on-accent hover:bg-brand-strong flex h-14 items-center justify-center rounded-md px-5 text-base leading-6 font-bold"
            >
              {primaryAction.label}
            </button>
          )}
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
          {footnote && (
            <p className="text-content-muted text-center text-[13px] leading-[19.5px] tracking-[-0.15px]">
              {footnote}
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-content text-base leading-6 font-bold tracking-[-0.15px]">
            푼 단어 {items.length}
          </h2>

          <label className="flex items-center gap-1.5">
            <span className="text-content-secondary text-sm leading-[21px] tracking-[-0.15px]">
              {filterLabel}
            </span>
            <input
              type="checkbox"
              checked={wrongOnly}
              onChange={(event) => setWrongOnly(event.target.checked)}
              className="sr-only"
            />
            <span
              className={`relative h-[26px] w-11 shrink-0 rounded-[13px] transition-colors ${
                wrongOnly ? 'bg-brand' : 'bg-background-disabled'
              }`}
            >
              <span
                className={`bg-background absolute top-[3px] size-5 rounded-[10px] transition-[left] ${
                  wrongOnly ? 'left-[21px]' : 'left-[3px]'
                }`}
              />
            </span>
          </label>
        </div>

        {visible.length === 0 ? (
          <p className="text-content-muted py-10 text-sm">해당하는 단어가 없어요</p>
        ) : (
          <ul className="pt-2">
            {visible.map((item) => (
              <li key={item.id} className="flex items-center gap-3.5 py-3.5">
                <span
                  role="img"
                  aria-label={item.correct ? '맞음' : '틀림'}
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                    item.correct ? 'bg-brand' : 'bg-error'
                  }`}
                >
                  {item.correct ? <CheckIcon /> : <CloseSmallIcon />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-content block text-[17px] leading-[25.5px] font-bold tracking-[-0.17px]">
                    {item.word}
                  </span>
                  <span className="text-content-secondary block pt-0.5 text-sm leading-[21px] tracking-[-0.15px]">
                    {item.meaning}
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
