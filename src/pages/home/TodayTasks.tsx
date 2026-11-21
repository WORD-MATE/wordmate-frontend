import {
  ChevronRight20Icon,
  ReviewBookIcon,
  WrongNotesIcon,
} from '@/components/icons/WordmateIcons'

const tasks = [
  { Icon: ReviewBookIcon, label: '오늘의 복습', count: 12 },
  { Icon: WrongNotesIcon, label: '오답노트', count: 7 },
]

export default function TodayTasks() {
  return (
    <section>
      <h2 className="text-content text-[18px] leading-[27px] font-bold tracking-[-0.36px]">
        오늘 할 일
      </h2>

      <div className="grid grid-cols-1 gap-3 pt-3.5 min-[640px]:grid-cols-2">
        {tasks.map(({ Icon, label, count }) => (
          <button
            key={label}
            type="button"
            className="bg-background-card flex items-center gap-3.5 rounded-lg p-5 text-left"
          >
            <span className="bg-content/7 flex size-11 items-center justify-center rounded-md">
              <Icon />
            </span>
            <span className="flex flex-col">
              <span className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                {label}
              </span>
              <span className="flex items-baseline gap-1 tracking-[-0.66px]">
                <span className="text-content text-[22px] leading-[33px] font-extrabold">
                  {count}
                </span>
                <span className="text-content-secondary text-[13px] leading-[19.5px] font-semibold">
                  단어
                </span>
              </span>
            </span>
            <span className="ml-auto">
              <ChevronRight20Icon />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
