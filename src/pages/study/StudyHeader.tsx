import { CloseIcon } from '@/components/icons/WordmateIcons'

type StudyHeaderProps = {
  current: number
  total: number
  onExit: () => void
}

export default function StudyHeader({ current, total, onExit }: StudyHeaderProps) {
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0

  return (
    <header className="flex h-18 items-center gap-3 px-5 sm:px-8">
      <button
        type="button"
        onClick={onExit}
        aria-label="학습 나가기"
        className="hover:bg-background-subtle flex size-10 shrink-0 items-center justify-center rounded-md"
      >
        <CloseIcon />
      </button>

      <div
        role="progressbar"
        aria-label="학습 진행률"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        className="bg-background-disabled h-1 flex-1 overflow-clip rounded-xs"
      >
        <div className="bg-brand h-full" style={{ width: `${percent}%` }} />
      </div>

      <p className="text-content-muted min-w-11 text-right text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
        {current}/{total}
      </p>
    </header>
  )
}
