import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

type Thumb = {
  left: number
  width: number
}

export default function SegmentedTabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedTabsProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<Thumb | null>(null)
  const [animated, setAnimated] = useState(false)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const selected = track.querySelector<HTMLElement>('[aria-checked="true"]')
      if (!selected) return
      setThumb({ left: selected.offsetLeft, width: selected.offsetWidth })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [value, options])

  useEffect(() => {
    if (!thumb || animated) return
    const frame = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(frame)
  }, [thumb, animated])

  return (
    <div
      ref={trackRef}
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleRadioGroupKeys}
      className="bg-background-subtle relative inline-flex gap-0.5 rounded-md p-[3px]"
    >
      {thumb && (
        <span
          aria-hidden="true"
          className={`bg-background pointer-events-none absolute top-[3px] bottom-[3px] rounded-sm drop-shadow-[0px_1px_1px_rgba(0,0,0,0.25)] ${
            animated
              ? 'transition-[left,width] duration-200 ease-out motion-reduce:transition-none'
              : ''
          }`}
          style={{ left: thumb.left, width: thumb.width }}
        />
      )}

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
            className={`relative flex h-8 items-center justify-center rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold transition-colors duration-200 motion-reduce:transition-none ${
              selected ? 'text-content' : 'text-content-muted'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
