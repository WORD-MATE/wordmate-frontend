import type { KeyboardEvent } from 'react'

const PREVIOUS_KEYS = ['ArrowLeft', 'ArrowUp']
const NEXT_KEYS = ['ArrowRight', 'ArrowDown']

export function handleRadioGroupKeys(event: KeyboardEvent<HTMLElement>) {
  const { key } = event
  const isPrevious = PREVIOUS_KEYS.includes(key)
  const isNext = NEXT_KEYS.includes(key)
  if (!isPrevious && !isNext && key !== 'Home' && key !== 'End') return

  const radios = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]:not([disabled])'),
  )
  if (radios.length === 0) return

  const focused = (event.target as HTMLElement).closest<HTMLElement>('[role="radio"]')
  const current = focused ? radios.indexOf(focused) : -1
  if (current === -1) return

  let next = current
  if (isPrevious) next = (current - 1 + radios.length) % radios.length
  if (isNext) next = (current + 1) % radios.length
  if (key === 'Home') next = 0
  if (key === 'End') next = radios.length - 1
  if (next === current) return

  event.preventDefault()
  radios[next].focus()
  radios[next].click()
}
