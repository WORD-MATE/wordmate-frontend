import { StarFilledIcon, StarOutlineIcon, VolumeIcon } from '@/components/icons/WordmateIcons'
import {
  statusDotClass,
  statusLabel,
  type VocabularyWord,
} from '@/pages/word-packs/wordPackDetailData'

type VocabularyRowProps = {
  word: VocabularyWord
  /** 뜻 가리기가 켜져 있는지 */
  meaningHidden: boolean
  /** 뜻 가리기가 켜진 상태에서 이 단어의 뜻을 눌러서 펼쳐 뒀는지 */
  meaningRevealed: boolean
  onToggleMeaning: (id: string) => void
  onToggleFavorite: (id: string) => void
  onPlayPronunciation: (word: string) => void
  pronunciationDisabled: boolean
}

const meaningClass =
  'text-content-secondary block w-full pt-0.5 text-left text-sm leading-[21px] tracking-[-0.15px]'

const iconButtonClass =
  'hover:bg-background-subtle flex size-9 shrink-0 items-center justify-center rounded-md'

export default function VocabularyRow({
  word,
  meaningHidden,
  meaningRevealed,
  onToggleMeaning,
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
        {meaningHidden ? (
          <button
            type="button"
            aria-label={`${word.word} 뜻 ${meaningRevealed ? '숨기기' : '보기'}`}
            aria-expanded={meaningRevealed}
            onClick={() => onToggleMeaning(word.id)}
            className={`${meaningClass} focus-visible:ring-content cursor-pointer rounded-xs focus-visible:ring-2 ${
              meaningRevealed ? '' : 'bg-background-disabled text-transparent select-none'
            }`}
          >
            {word.meaning}
          </button>
        ) : (
          <p className={meaningClass}>{word.meaning}</p>
        )}
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
