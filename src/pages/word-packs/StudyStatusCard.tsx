type StudyStatusCardProps = {
  total: number
  memorized: number
  learning: number
  fresh: number
}

export default function StudyStatusCard({
  total,
  memorized,
  learning,
  fresh,
}: StudyStatusCardProps) {
  const legend = [
    { label: '암기 완료', count: memorized, dot: 'bg-brand' },
    { label: '학습 중', count: learning, dot: 'bg-learning' },
    { label: '새 단어', count: fresh, dot: 'bg-border-input' },
  ]

  return (
    <section className="bg-background-card flex flex-col gap-3 rounded-lg p-5">
      <div>
        <p className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
          학습 현황
        </p>
        <p className="text-content pt-1 tracking-[-0.96px]">
          <span className="text-[32px] leading-[48px] font-extrabold">{memorized}</span>
          <span className="text-content-secondary text-[15px] leading-[22.5px] font-semibold">
            {' '}
            / {total} 외웠어요
          </span>
        </p>
      </div>

      <div className="bg-background-disabled flex h-2.5 overflow-clip rounded-xs">
        <span className="bg-brand h-full" style={{ width: `${(memorized / total) * 100}%` }} />
        <span className="bg-learning h-full" style={{ width: `${(learning / total) * 100}%` }} />
        <span className="bg-border-input h-full" style={{ width: `${(fresh / total) * 100}%` }} />
      </div>

      <ul className="flex flex-col gap-2">
        {legend.map(({ label, count, dot }) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`size-2 shrink-0 rounded-sm ${dot}`} />
            <span className="text-content-secondary text-sm leading-[21px] tracking-[-0.15px]">
              {label}
            </span>
            <span className="text-content ml-auto text-sm leading-[21px] font-bold tracking-[-0.15px]">
              {count}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="bg-brand text-content-on-accent hover:bg-brand-strong h-12 w-full rounded-md px-5 text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]"
      >
        학습 시작
      </button>
    </section>
  )
}
