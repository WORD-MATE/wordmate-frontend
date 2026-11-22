import { StarFilledIcon, StarOutlineIcon, VolumeIcon } from '@/components/icons/WordmateIcons'
import {
  statusDotClass,
  statusLabel,
  type VocabularyWord,
} from '@/pages/word-packs/wordPackDetailData'

type VocabularyRowProps = {
  word: VocabularyWord
  meaningHidden: boolean
  onToggleFavorite: (id: string) => void
  onPlayPronunciation: (word: string) => void
  pronunciationDisabled: boolean
}

const iconButtonClass =
  'hover:bg-background-subtle flex size-9 shrink-0 items-center justify-center rounded-md'

export default function VocabularyRow({
  word,
  meaningHidden,
  onToggleFavorite,
  onPlayPronunciation,
  pronunciationDisabled,
}: VocabularyRowProps) {
  return (
    <li className="border-border-default flex items-center gap-3.5 border-b py-3.5">
      <span
        role="img"
        aria-label={statusLabel[word.status]}
        className={`size-2 shrink-0 rounded-sm ${statusDotClass[word.status]}`}
      />

      <div className="min-w-0 flex-1">
        <p className="text-content text-[17px] leading-[25.5px] font-bold tracking-[-0.17px]">
          {word.word}
        </p>
        <p
          aria-hidden={meaningHidden}
          className={`text-content-secondary pt-0.5 text-sm leading-[21px] tracking-[-0.15px] ${
            meaningHidden ? 'bg-background-disabled text-transparent select-none' : ''
          }`}
        >
          {word.meaning}
        </p>
      </div>

      <div className="flex shrink-0 items-start gap-0.5">
        <button
          type="button"
          aria-label={`${word.word} 발음 듣기`}
          disabled={pronunciationDisabled}
          title={
            pronunciationDisabled ? '이 브라우저에서는 발음 재생을 지원하지 않습니다.' : undefined
          }
          onClick={() => onPlayPronunciation(word.word)}
          className={`${iconButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <VolumeIcon />
        </button>
        <button
          type="button"
          aria-label={`${word.word} 즐겨찾기`}
          aria-pressed={word.favorite}
          onClick={() => onToggleFavorite(word.id)}
          className={iconButtonClass}
        >
          {word.favorite ? <StarFilledIcon /> : <StarOutlineIcon />}
        </button>
      </div>
    </li>
  )
}
