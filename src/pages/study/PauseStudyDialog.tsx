import { useId } from 'react'
import { useDialogBehavior } from '@/hooks/useDialogBehavior'

type PauseStudyDialogProps = {
  solvedCount: number
  onResume: () => void
  onStop: () => void
}

export default function PauseStudyDialog({ solvedCount, onResume, onStop }: PauseStudyDialogProps) {
  const dialogRef = useDialogBehavior(onResume)
  const titleId = useId()

  return (
    <div
      className="bg-overlay/45 fixed inset-0 z-40 flex items-center justify-center p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onResume()
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
          학습을 멈출까요?
        </h2>

        <p className="text-content-secondary pt-1.5 text-[15px] leading-[22.5px] tracking-[-0.15px]">
          지금까지 푼 {solvedCount}문항은 저장돼요.
          <br />
          홈의 이어서 학습에서 다시 시작할 수 있어요.
        </p>

        <div className="flex gap-2 pt-6">
          <button
            type="button"
            onClick={onStop}
            className="bg-background-subtle text-content hover:bg-background-disabled h-12 flex-1 rounded-md px-5 text-[15px] leading-[22.5px] font-bold"
          >
            그만하기
          </button>
          <button
            type="button"
            onClick={onResume}
            className="bg-brand text-content-on-accent hover:bg-brand-strong h-12 flex-1 rounded-md px-5 text-[15px] leading-[22.5px] font-bold"
          >
            이어하기
          </button>
        </div>
      </div>
    </div>
  )
}
