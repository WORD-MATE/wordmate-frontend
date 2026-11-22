import { useId } from 'react'
import { Link } from 'react-router-dom'
import { hasWordPackDetail } from '@/pages/word-packs/wordPackDetailData'
import { wordPackDetailPath } from '@/routes/paths'

export type WordPack = {
  id: string
  wordCount: number
  name: string
  description: string
  progress: number
  category?: string
  badge?: 'complete' | 'shared'
}

const badgeLabel = {
  complete: '완료',
  shared: '공유 중',
} as const

export default function WordPackCard({ pack }: { pack: WordPack }) {
  const nameId = useId()
  const progress = Math.min(100, Math.max(0, Math.round(pack.progress)))

  return (
    <article
      aria-labelledby={nameId}
      className="bg-background-card relative flex h-[168px] flex-col items-start gap-2 rounded-lg p-5 text-left"
    >
      <span className="flex w-full items-start gap-1">
        <span className="bg-background-disabled text-content-secondary flex h-[22px] items-center rounded-xs px-[7px] text-xs leading-[18px] font-semibold tracking-[-0.15px]">
          {pack.wordCount}단어
        </span>
        {pack.badge && (
          <span
            className={`flex h-[22px] items-center rounded-xs px-[7px] text-xs leading-[18px] font-semibold tracking-[-0.15px] ${
              pack.badge === 'shared'
                ? 'bg-brand text-content-on-accent'
                : 'bg-background-disabled text-content'
            }`}
          >
            {badgeLabel[pack.badge]}
          </span>
        )}
      </span>

      <h3
        id={nameId}
        className="text-content h-8 w-full truncate pt-1.5 text-[17px] leading-[25.5px] font-extrabold tracking-[-0.34px]"
      >
        {hasWordPackDetail(pack.id) ? (
          <Link
            to={wordPackDetailPath(pack.id)}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:underline"
          >
            {pack.name}
          </Link>
        ) : (
          pack.name
        )}
      </h3>

      <p className="text-content-secondary line-clamp-2 flex-1 text-[13px] leading-[19.5px] tracking-[-0.15px]">
        {pack.description}
      </p>

      <span className="flex w-full items-center gap-2.5">
        <span
          role="progressbar"
          aria-label="학습 진행률"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="bg-background-disabled h-1 flex-1 overflow-clip rounded-xs"
        >
          <span className="bg-brand block h-1" style={{ width: `${progress}%` }} />
        </span>
        <span
          aria-hidden="true"
          className="text-content-muted text-xs leading-[18px] tracking-[-0.15px]"
        >
          {progress}%
        </span>
      </span>
    </article>
  )
}
