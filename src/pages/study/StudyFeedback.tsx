import { CheckIcon, CloseSmallIcon } from '@/components/icons/WordmateIcons'

type StudyFeedbackProps = {
  correct: boolean
  example: string
  onNext: () => void
}

export default function StudyFeedback({ correct, example, onNext }: StudyFeedbackProps) {
  return (
    <div className="flex flex-col pt-6">
      <div className="flex items-start gap-2.5 pb-3.5">
        <span
          className={`mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full ${
            correct ? 'bg-brand' : 'bg-error'
          }`}
        >
          {correct ? <CheckIcon /> : <CloseSmallIcon />}
        </span>
        <span>
          <span
            className={`block text-[15px] leading-[22px] font-bold tracking-[-0.15px] ${
              correct ? 'text-content' : 'text-error'
            }`}
          >
            {correct ? '정답이에요' : '아쉬워요, 오답노트에 담았어요'}
          </span>
          <span className="text-content-secondary block pt-0.5 text-sm leading-[21px] tracking-[-0.15px]">
            {example}
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="bg-brand text-content-on-accent hover:bg-brand-strong h-14 w-full rounded-md px-5 text-base leading-6 font-bold"
      >
        다음
      </button>
    </div>
  )
}
