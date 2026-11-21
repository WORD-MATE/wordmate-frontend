import { ArrowRightAltIcon, AvatarSmallIcon, RankUpIcon } from '@/components/icons/WordmateIcons'

const rows = [
  { rank: 22, name: '양지우', xp: '450 XP', delta: '+38', me: false },
  { rank: 23, name: '나', xp: '412 XP', delta: null, me: true },
  { rank: 24, name: '양지우', xp: '401 XP', delta: '−11', me: false },
]

export default function MyRankingCard() {
  return (
    <section className="bg-background-card flex flex-col gap-4 rounded-lg p-5">
      <div className="flex items-start gap-3">
        <div className="flex flex-1 items-center gap-2.5">
          <p className="text-content text-[28px] leading-[33.6px] font-extrabold tracking-[-0.84px]">
            23위
          </p>
          <p className="bg-background-disabled flex h-[22px] items-center gap-0.5 rounded-xs pr-[7px] pl-[5px]">
            <RankUpIcon />
            <span className="text-info text-xs leading-[14.4px] font-bold">5</span>
          </p>
        </div>
        <button type="button" className="flex items-center gap-0.5">
          <span className="text-content-muted text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
            전체 랭킹
          </span>
          <ArrowRightAltIcon />
        </button>
      </div>

      <ol className="flex flex-col gap-0.5">
        {rows.map((row) => (
          <li
            key={row.rank}
            className={`grid h-11 grid-cols-[24px_28px_1fr_auto_40px] items-center gap-2.5 rounded-md px-2.5 ${
              row.me ? 'bg-background-disabled' : ''
            }`}
          >
            <span
              className={`text-center text-sm leading-[21px] font-extrabold tracking-[-0.15px] ${
                row.me ? 'text-content' : 'text-content-secondary'
              }`}
            >
              {row.rank}
            </span>
            <span className="bg-content/7 flex size-7 items-center justify-center overflow-clip rounded-md">
              <AvatarSmallIcon />
            </span>
            <span
              className={`text-content truncate text-sm leading-[21px] tracking-[-0.15px] ${
                row.me ? 'font-bold' : ''
              }`}
            >
              {row.name}
            </span>
            <span className="text-content text-sm leading-[21px] font-bold tracking-[-0.15px]">
              {row.xp}
            </span>
            <span className="text-content-secondary text-right text-xs leading-[18px] font-bold tracking-[-0.15px]">
              {row.delta}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
