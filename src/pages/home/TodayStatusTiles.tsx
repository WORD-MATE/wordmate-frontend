import { LevelBadgeIcon, StreakFire } from '@/components/icons/WordmateIcons'

const tiles = [
  { title: '연속 학습', value: '7일', progress: null },
  { title: '실버', value: null, progress: 47 },
  { title: '오늘 XP', value: '86/500', progress: 17 },
]

export default function TodayStatusTiles() {
  return (
    <section aria-label="오늘 상태" className="grid grid-cols-3 gap-2">
      {tiles.map((tile, index) => (
        <div
          key={tile.title}
          className="bg-background-card flex h-[88px] min-w-0 flex-col justify-between rounded-lg p-3"
        >
          <span className="text-content-muted flex items-center gap-1 truncate text-[11px] font-semibold">
            {index === 0 && <StreakFire />}
            {index === 1 && <LevelBadgeIcon />}
            {tile.title}
          </span>
          {tile.value ? (
            <strong className="text-content truncate text-[18px] leading-5 font-extrabold tracking-tight">
              {tile.value}
            </strong>
          ) : (
            <span className="text-content text-[18px] leading-5 font-extrabold tracking-tight">
              Lv.12
            </span>
          )}
          {tile.progress !== null && (
            <span className="bg-background-disabled block h-1 overflow-clip rounded-full">
              <span className="bg-brand block h-full" style={{ width: `${tile.progress}%` }} />
            </span>
          )}
        </div>
      ))}
    </section>
  )
}
