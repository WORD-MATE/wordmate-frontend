import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

type HeaderMenuProps = {
  label: string
  trigger: (open: boolean) => ReactNode
  triggerClassName?: string
  panelClassName?: string
  className?: string
  children: (close: () => void) => ReactNode
}

export default function HeaderMenu({
  label,
  trigger,
  triggerClassName = '',
  panelClassName = '',
  className = 'relative',
  children,
}: HeaderMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className={className}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
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
          className={`border-border-default bg-background absolute top-full z-20 mt-2 rounded-xl border shadow-lg ${panelClassName}`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}
