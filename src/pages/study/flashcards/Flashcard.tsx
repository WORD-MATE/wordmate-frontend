import type { DirectionId } from '@/pages/study/studySettingsData'
import type { VocabularyWord } from '@/pages/word-packs/wordPackDetailData'

type FlashcardProps = {
  word: VocabularyWord
  direction: DirectionId
  flipped: boolean
  onFlip: () => void
}

const faceClass =
  'bg-background-card absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg p-7 text-center [backface-visibility:hidden]'

const labelClass = 'text-content-muted text-xs leading-[18px] font-bold'

export default function Flashcard({ word, direction, flipped, onFlip }: FlashcardProps) {
  const promptIsEnglish = direction === 'en-ko'
  const prompt = promptIsEnglish ? word.word : word.meaning
  const answer = promptIsEnglish ? word.meaning : word.word

  return (
    <button
      type="button"
      onClick={onFlip}
      aria-label={`${word.word} 카드 뒤집기`}
      aria-pressed={flipped}
      className="h-80 w-full [perspective:1200px]"
    >
      <span
        className={`relative block size-full transition-transform duration-300 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <span className={faceClass} aria-hidden={flipped}>
          <span className={labelClass}>{promptIsEnglish ? '영어' : '뜻'}</span>
          <span
            className={`text-content font-extrabold ${
              promptIsEnglish
                ? 'text-[40px] leading-[60px] tracking-[-1.2px]'
                : 'text-[28px] leading-[42px] tracking-[-0.84px]'
            }`}
          >
            {prompt}
          </span>
          <span className="text-content-muted text-sm leading-[21px]">눌러서 뒤집기</span>
        </span>

        <span className={`${faceClass} [transform:rotateY(180deg)]`} aria-hidden={!flipped}>
          <span className={labelClass}>{promptIsEnglish ? '뜻' : '영어'}</span>
          <span
            className={`text-content font-extrabold ${
              promptIsEnglish
                ? 'text-[28px] leading-[42px] tracking-[-0.84px]'
                : 'text-[40px] leading-[60px] tracking-[-1.2px]'
            }`}
          >
            {answer}
          </span>
          <span className="text-content-muted text-sm leading-[21px]">{word.example}</span>
        </span>
      </span>
    </button>
  )
}
