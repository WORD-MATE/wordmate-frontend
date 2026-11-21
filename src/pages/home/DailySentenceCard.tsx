import { ArrowRightIcon } from '@/components/icons/WordmateIcons'

export default function DailySentenceCard() {
  return (
    <section className="bg-background-card flex flex-col rounded-lg px-8 py-7">
      <p className="text-content-muted text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
        오늘의 문장 · 11월 8일
      </p>

      <p className="text-content flex-1 pt-3 pb-5 text-[26px] leading-[36.4px] font-extrabold tracking-[-0.52px]">
        Small <u>habits</u>, <u>repeated</u> every day, quietly <u>shape</u> who we become.
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          className="bg-brand flex h-9 items-center justify-center gap-2 rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold tracking-[-0.15px] text-[#0b0c0e]"
        >
          퀴즈 풀기
          <ArrowRightIcon />
        </button>
      </div>
    </section>
  )
}
