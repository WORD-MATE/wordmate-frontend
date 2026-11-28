import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react'
import { JoinCodeIcon } from '@/components/icons/WordmateIcons'
import { JOIN_CODE_LENGTH, isJoinCodeComplete, normalizeJoinCode } from '@/pages/battle/battleData'

export default function JoinCodeCard() {
  const [code, setCode] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusAt = (index: number) => {
    const target = inputRefs.current[Math.min(Math.max(index, 0), JOIN_CODE_LENGTH - 1)]
    target?.focus()
    target?.select()
  }

  const setCharAt = (index: number, char: string) => {
    const next = code.padEnd(JOIN_CODE_LENGTH, ' ').split('')
    next[index] = char || ' '
    setCode(normalizeJoinCode(next.join('').replace(/ /g, '')))
  }

  const handleChange = (index: number, raw: string) => {
    const typed = normalizeJoinCode(raw)
    if (typed.length === 0) {
      setCharAt(index, '')
      return
    }

    if (typed.length > 1) {
      setCode(normalizeJoinCode(code.slice(0, index) + typed))
      focusAt(index + typed.length)
      return
    }

    setCharAt(index, typed)
    focusAt(index + 1)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !code[index]) {
      event.preventDefault()
      setCharAt(index - 1, '')
      focusAt(index - 1)
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusAt(index - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusAt(index + 1)
    }
  }

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = normalizeJoinCode(event.clipboardData.getData('text'))
    if (!pasted) return
    setCode(normalizeJoinCode(code.slice(0, index) + pasted))
    focusAt(index + pasted.length)
  }

  const complete = isJoinCodeComplete(code)

  return (
    <section className="bg-background-card flex h-[225px] flex-col gap-1 rounded-lg p-6">
      <span className="bg-background-icon mb-3 flex size-10 shrink-0 items-center justify-center rounded-md">
        <JoinCodeIcon />
      </span>

      <h2 className="text-content text-[17px] leading-[25.5px] font-bold tracking-[-0.15px]">
        코드로 참가
      </h2>
      <p className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
        친구나 선생님이 알려준 6자리 코드
      </p>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex items-start gap-2 pt-5"
        aria-label="대결 코드 참가"
      >
        <div className="flex min-w-0 flex-1 gap-1.5">
          {Array.from({ length: JOIN_CODE_LENGTH }, (_, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element
              }}
              value={code[index] ?? ''}
              inputMode="text"
              autoComplete="off"
              maxLength={JOIN_CODE_LENGTH}
              aria-label={`대결 코드 ${index + 1}번째 자리`}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={(event) => handlePaste(index, event)}
              className="bg-background-subtle text-content focus-visible:ring-content h-12 min-w-0 flex-1 rounded-md text-center text-[17px] font-bold outline-none focus-visible:ring-2"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!complete}
          className="bg-brand text-content-on-accent enabled:hover:bg-brand-strong disabled:bg-background-disabled disabled:text-content-muted h-12 w-[72px] shrink-0 rounded-md px-5 text-[15px] leading-[22.5px] font-bold transition-colors duration-200 disabled:cursor-not-allowed motion-reduce:transition-none"
        >
          참가
        </button>
      </form>
    </section>
  )
}
