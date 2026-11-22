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
  return (
    <button
      type="button"
      className="bg-background-card flex h-[168px] min-h-[168px] flex-col items-start gap-2 rounded-lg p-5 text-left"
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

      <span className="text-content h-8 pt-1.5 text-[17px] leading-[25.5px] font-extrabold tracking-[-0.34px]">
        {pack.name}
      </span>

      <span className="text-content-secondary flex-1 text-[13px] leading-[19.5px] tracking-[-0.15px]">
        {pack.description}
      </span>

      <span className="flex w-full items-center gap-2.5">
        <span className="bg-background-disabled h-1 flex-1 overflow-clip rounded-xs">
          <span className="bg-brand block h-1" style={{ width: `${pack.progress}%` }} />
        </span>
        <span className="text-content-muted text-xs leading-[18px] tracking-[-0.15px]">
          {pack.progress}%
        </span>
      </span>
    </button>
  )
}
