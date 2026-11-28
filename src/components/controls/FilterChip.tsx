import type { ReactNode } from 'react'

type FilterChipProps = {
  selected: boolean
  onClick: () => void
  children: ReactNode
}

export default function FilterChip({ selected, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-[34px] items-center gap-1.5 rounded-sm px-3 text-[13px] leading-[19.5px] font-semibold transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none ${
        selected ? 'bg-content text-background' : 'bg-background-subtle text-content-secondary'
      }`}
    >
      {children}
    </button>
  )
}
