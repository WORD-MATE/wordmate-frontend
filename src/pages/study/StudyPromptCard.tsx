import { Volume20Icon } from '@/components/icons/WordmateIcons'

type StudyPromptCardProps = {
  title: string
  prompt: string
  speakLabel: string
  canSpeak: boolean
  unavailableTitle?: string
  onSpeak: () => void
}

export default function StudyPromptCard({
  title,
  prompt,
  speakLabel,
  canSpeak,
  unavailableTitle,
  onSpeak,
}: StudyPromptCardProps) {
  return (
    <div className="bg-background-card flex flex-col items-center gap-2.5 rounded-lg px-6 pt-12 pb-10">
      <p className="text-content-muted text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
        {title}
      </p>
      <p className="flex flex-wrap items-center justify-center gap-1 sm:pl-10">
        <span className="text-content text-center text-[36px] leading-[44px] font-extrabold tracking-[-1.68px] sm:text-[48px] sm:leading-[55.2px]">
          {prompt}
        </span>
        <button
          type="button"
          onClick={onSpeak}
          disabled={!canSpeak}
          title={unavailableTitle}
          aria-label={speakLabel}
          className="hover:bg-background-subtle flex size-10 shrink-0 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Volume20Icon />
        </button>
      </p>
    </div>
  )
}
