import { CheckIcon } from '@/components/icons/WordmateIcons'

type Mission = {
  id: string
  label: string
  done: number
  total: number
  reward: string
  claimable: boolean
}

const missions: Mission[] = [
  { id: 'battle', label: '대결 1회 참여', done: 1, total: 1, reward: '+15 XP', claimable: true },
  { id: 'words', label: '단어 20개 학습', done: 14, total: 20, reward: '+20 XP', claimable: false },
  { id: 'quiz', label: '오늘의 문장 퀴즈', done: 0, total: 1, reward: '+10 XP', claimable: false },
]

export default function DailyMissions() {
  return (
    <section>
      <h2 className="text-content text-[18px] leading-[27px] font-bold tracking-[-0.36px]">
        일일 미션
      </h2>

      <ul className="bg-background-card mt-3.5 rounded-lg px-5 py-1">
        {missions.map((mission, index) => {
          const complete = mission.done >= mission.total

          return (
            <li
              key={mission.id}
              className={`flex items-center gap-3.5 py-3.5 ${
                index < missions.length - 1 ? 'border-border-default border-b' : ''
              }`}
            >
              <span
                className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                  complete ? 'bg-brand border-brand' : 'border-border-input'
                }`}
              >
                {complete && <CheckIcon />}
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="flex items-baseline justify-between">
                  <span className="text-content truncate text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]">
                    {mission.label}
                  </span>
                  <span className="text-content-muted shrink-0 text-xs leading-[18px] tracking-[-0.15px]">
                    {mission.done}/{mission.total}
                  </span>
                </span>
                <span className="bg-background-disabled block h-1 overflow-clip rounded-xs">
                  <span
                    className="bg-brand block h-1"
                    style={{ width: `${(mission.done / mission.total) * 100}%` }}
                  />
                </span>
              </span>

              {mission.claimable ? (
                <button
                  type="button"
                  className="bg-brand flex h-9 min-w-24 shrink-0 items-center justify-center rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold text-[#0b0c0e]"
                >
                  {mission.reward} 받기
                </button>
              ) : (
                <span className="text-content-muted min-w-24 shrink-0 text-right text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
                  {mission.reward}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
