import { useId } from 'react'
import { Link } from 'react-router-dom'

type SetupSummaryCardProps = {
  rows: { term: string; description: string }[]
  questionCount: number
  startTo?: string
}

export default function SetupSummaryCard({ rows, questionCount, startTo }: SetupSummaryCardProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="bg-background-card flex flex-col gap-3 rounded-lg p-5"
    >
      <p id={titleId} className="text-content text-base leading-6 font-bold tracking-[-0.15px]">
        이렇게 시작해요
      </p>

      <dl className="flex flex-col gap-2.5 pt-[19px] pb-[23px]">
        {rows.map(({ term, description }) => (
          <div key={term} className="flex items-start justify-between gap-3">
            <dt className="text-content-muted text-sm leading-[21px] tracking-[-0.15px]">{term}</dt>
            <dd className="text-content pl-10 text-sm leading-[21px] font-semibold tracking-[-0.15px]">
              {description}
            </dd>
          </div>
        ))}
      </dl>

      {startTo ? (
        <Link
          to={startTo}
          className="bg-brand text-content-on-accent hover:bg-brand-strong flex h-12 w-full items-center justify-center rounded-md px-5 text-[15px] leading-[22.5px] font-bold"
        >
          {questionCount}문항 시작하기
        </Link>
      ) : (
        <button
          type="button"
          disabled
          title="이 학습 방식은 준비 중입니다."
          className="bg-background-disabled text-content-muted h-12 w-full cursor-not-allowed rounded-md px-5 text-[15px] leading-[22.5px] font-bold"
        >
          {questionCount}문항 시작하기
        </button>
      )}
    </section>
  )
}
