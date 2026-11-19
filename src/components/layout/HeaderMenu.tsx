import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

type HeaderMenuProps = {
  label: string
  trigger: (open: boolean) => ReactNode
  triggerClassName?: string
  panelClassName?: string
  children: (close: () => void) => ReactNode
}

export default function HeaderMenu({
  label,
  trigger,
  triggerClassName = '',
  panelClassName = '',
  children,
}: HeaderMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={triggerClassName}
      >
        {trigger(open)}
      </button>

      {open && (
        <div
          id={panelId}
          className={`border-border-default absolute top-full right-0 z-20 mt-2 rounded-xl border bg-white py-2 shadow-lg ${panelClassName}`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}
