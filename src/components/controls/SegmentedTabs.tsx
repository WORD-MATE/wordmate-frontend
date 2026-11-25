import { handleRadioGroupKeys } from '@/components/controls/radioGroupKeys'

export type SegmentedOption<T extends string> = {
  id: T
  label: string
}

type SegmentedTabsProps<T extends string> = {
  label: string
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
}

export default function SegmentedTabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedTabsProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleRadioGroupKeys}
      className="bg-background-subtle inline-flex gap-0.5 rounded-md p-[3px]"
    >
      {options.map((option) => {
        const selected = option.id === value

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={`flex h-8 items-center justify-center rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold ${
              selected
                ? 'bg-background text-content drop-shadow-[0px_1px_1px_rgba(0,0,0,0.25)]'
                : 'text-content-muted'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
