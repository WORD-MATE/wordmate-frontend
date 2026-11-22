import { useEffect, useId, useRef, useState, type FormEvent } from 'react'

const MAX_LENGTH = 30

type NewWordPackDialogProps = {
  onClose: () => void
  onCreate: (name: string) => void
}

export default function NewWordPackDialog({ onClose, onCreate }: NewWordPackDialogProps) {
  const [name, setName] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const baseId = useId()
  const titleId = `${baseId}-title`
  const nameId = `${baseId}-name`
  const counterId = `${baseId}-counter`

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    inputRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable.item(0)
      const last = focusable.item(focusable.length - 1)
      if (!first || !last) {
        event.preventDefault()
        dialog.focus()
        return
      }

      if (!dialog.contains(document.activeElement)) {
        event.preventDefault()
        const target = event.shiftKey ? last : first
        target.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [onClose])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (trimmedName) onCreate(trimmedName)
  }

  return (
    <div
      className="bg-overlay/45 fixed inset-0 z-40 flex items-center justify-center p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
        className="bg-background flex w-full max-w-[480px] flex-col rounded-lg p-7"
      >
        <h2
          id={titleId}
          className="text-content text-[19px] leading-[28.5px] font-extrabold tracking-[-0.15px]"
        >
          새 단어팩
        </h2>

        <form onSubmit={submit}>
          <div className="flex flex-col gap-2 pt-4">
            <label
              htmlFor={nameId}
              className="text-content-secondary text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]"
            >
              이름
            </label>
            <input
              ref={inputRef}
              id={nameId}
              value={name}
              maxLength={MAX_LENGTH}
              aria-describedby={counterId}
              onChange={(event) => setName(event.target.value)}
              placeholder="예: 기말고사 대비"
              className="bg-background-subtle text-content placeholder:text-content-muted focus-visible:ring-content h-[50px] rounded-md px-3.5 text-[15px] outline-none focus-visible:ring-2"
            />
            <p
              id={counterId}
              className="text-content-muted text-xs leading-[18px] tracking-[-0.15px]"
            >
              {name.length}/{MAX_LENGTH}
            </p>
          </div>

          <div className="flex gap-2 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-background-subtle text-content hover:bg-background-disabled h-12 flex-1 rounded-md px-5 text-[15px] leading-[22.5px] font-bold"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={name.trim().length === 0}
              className="bg-brand text-content-on-accent enabled:hover:bg-brand-strong disabled:bg-background-disabled disabled:text-content-muted h-12 flex-1 rounded-md px-5 text-[15px] leading-[22.5px] font-bold"
            >
              만들기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
