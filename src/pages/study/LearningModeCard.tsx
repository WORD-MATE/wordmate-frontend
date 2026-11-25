import type { ReactNode } from 'react'
import { CheckIcon } from '@/components/icons/WordmateIcons'
import type { LearningMode } from '@/pages/study/studySettingsData'

type LearningModeCardProps = {
  mode: LearningMode
  icon: ReactNode
  selected: boolean
  onSelect: () => void
}

export default function LearningModeCard({
  mode,
  icon,
  selected,
  onSelect,
}: LearningModeCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={`flex h-[162.5px] flex-col items-start gap-1 rounded-lg border-[1.5px] border-transparent p-4 text-left ${
        selected ? 'bg-background-subtle' : 'bg-background-card'
      }`}
    >
      <span className="flex h-12 w-full items-start justify-between pb-2">
        <span className="bg-background-icon flex size-10 shrink-0 items-center justify-center rounded-md">
          {icon}
        </span>
        <span
          className={`flex size-[22px] shrink-0 items-center justify-center rounded-xl border-[1.5px] ${
            selected ? 'bg-brand border-brand' : 'border-border-input'
          }`}
        >
          {selected && <CheckIcon />}
        </span>
      </span>

      <span className="text-content text-base leading-6 font-bold">{mode.title}</span>
      <span className="text-content-secondary text-[13px] leading-[19.5px]">
        {mode.description}
      </span>
      <span className="text-content-muted pt-1.5 text-xs leading-[18px] font-semibold">
        {mode.footnote}
      </span>
    </button>
  )
}
