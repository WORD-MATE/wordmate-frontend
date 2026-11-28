import { CheckIcon, CloseSmallIcon } from '@/components/icons/WordmateIcons'

type AnswerChoicesProps = {
  choices: string[]
  answer: string
  picked: string | null
  onPick: (choice: string) => void
}

export default function AnswerChoices({ choices, answer, picked, onPick }: AnswerChoicesProps) {
  const revealed = picked !== null

  return (
    <ul className="flex flex-col gap-2">
      {choices.map((choice, index) => {
        const isAnswer = choice === answer
        const isPicked = choice === picked
        const wrongPick = revealed && isPicked && !isAnswer

        let rowClass = 'bg-background-card'
        let numberClass = 'text-content-muted'
        let labelClass = 'text-content'

        if (revealed && (isAnswer || isPicked)) {
          rowClass = 'bg-background-disabled'
        } else if (revealed) {
          rowClass = 'bg-background-card opacity-50'
        }

        if (wrongPick) {
          numberClass = 'text-error'
          labelClass = 'text-error'
        }

        return (
          <li key={choice}>
            <button
              type="button"
              disabled={revealed}
              aria-pressed={isPicked}
              onClick={() => onPick(choice)}
              className={`flex h-14 w-full items-center gap-3 rounded-md border-[1.5px] border-transparent py-3 pr-4 pl-[18px] text-left disabled:cursor-default ${rowClass}`}
            >
              <span
                className={`w-3.5 shrink-0 text-[13px] leading-[19.5px] font-semibold ${numberClass}`}
              >
                {index + 1}
              </span>
              <span className={`text-base leading-6 font-bold ${labelClass}`}>{choice}</span>

              {revealed && (isAnswer || isPicked) && (
                <span className="ml-auto flex shrink-0 items-center">
                  <span
                    role="img"
                    aria-label={isAnswer ? '정답' : '오답'}
                    className={`flex size-6 items-center justify-center rounded-full ${
                      isAnswer ? 'bg-brand' : 'bg-error'
                    }`}
                  >
                    {isAnswer ? <CheckIcon /> : <CloseSmallIcon />}
                  </span>
                </span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
