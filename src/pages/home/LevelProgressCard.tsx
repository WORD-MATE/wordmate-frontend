import { LevelBadgeIcon } from '@/components/icons/WordmateIcons'

export default function LevelProgressCard() {
  return (
    <section className="bg-background-card flex flex-col gap-4 rounded-lg p-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <p className="text-content text-[28px] leading-[33.6px] font-extrabold tracking-[-0.84px]">
            Lv.12
          </p>
          <p className="bg-background-disabled flex h-[22px] items-center gap-[3px] rounded-xs pr-[7px] pl-1">
            <LevelBadgeIcon />
            <span className="text-content-secondary text-xs leading-[14.4px] font-bold tracking-[-0.84px]">
              실버
            </span>
          </p>
        </div>
        <p className="text-content-secondary ml-auto text-[13px] leading-[19.5px] tracking-[-0.15px]">
          누적 2,340 XP
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-background-disabled h-2 overflow-clip rounded-xs">
          <div className="bg-brand h-2" style={{ width: '47%' }} />
        </div>
        <div className="flex items-center justify-between text-[13px] leading-[19.5px] font-medium tracking-[-0.15px]">
          <span className="text-content-muted">140 / 300 XP</span>
          <span className="text-content-muted">
            Lv.13까지 <span className="text-content font-bold">160 XP</span>
          </span>
        </div>
      </div>

      <div className="border-border-default flex flex-col gap-2 border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-content text-sm leading-[21px] font-semibold tracking-[-0.15px]">
            오늘 받은 XP
          </span>
          <span className="text-content text-[15px] leading-[22.5px] font-extrabold tracking-[-0.15px]">
            86{' '}
            <span className="text-content-muted text-xs leading-[18px] font-semibold">/ 500</span>
          </span>
        </div>
        <div className="bg-background-disabled h-1 overflow-clip rounded-xs">
          <div className="bg-brand h-1" style={{ width: '17%' }} />
        </div>
      </div>
    </section>
  )
}
