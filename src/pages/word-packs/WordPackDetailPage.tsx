import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SearchIcon, StarSmallIcon } from '@/components/icons/WordmateIcons'
import StudyStatusCard from '@/pages/word-packs/StudyStatusCard'
import VocabularyRow from '@/pages/word-packs/VocabularyRow'
import {
  statusDotClass,
  wordPackDetail,
  words as initialWords,
} from '@/pages/word-packs/wordPackDetailData'

type FilterId = 'all' | 'new' | 'learning' | 'memorized' | 'favorite'

export default function WordPackDetailPage() {
  const navigate = useNavigate()
  const [words, setWords] = useState(initialWords)
  const [filter, setFilter] = useState<FilterId>('all')
  const [keyword, setKeyword] = useState('')
  const [meaningHidden, setMeaningHidden] = useState(false)

  const counts = useMemo(
    () => ({
      all: words.length,
      new: words.filter((word) => word.status === 'new').length,
      learning: words.filter((word) => word.status === 'learning').length,
      memorized: words.filter((word) => word.status === 'memorized').length,
      favorite: words.filter((word) => word.favorite).length,
    }),
    [words],
  )

  const filters: { id: FilterId; label: string; dot?: string; star?: boolean }[] = [
    { id: 'all', label: '전체' },
    { id: 'new', label: '새 단어', dot: statusDotClass.new },
    { id: 'learning', label: '학습 중', dot: statusDotClass.learning },
    { id: 'memorized', label: '암기 완료', dot: statusDotClass.memorized },
    { id: 'favorite', label: '즐겨찾기', star: true },
  ]

  const visibleWords = words.filter((word) => {
    const matchesFilter =
      filter === 'all' || (filter === 'favorite' ? word.favorite : word.status === filter)
    const query = keyword.trim().toLowerCase()
    const matchesKeyword =
      query === '' ||
      word.word.toLowerCase().includes(query) ||
      word.meaning.toLowerCase().includes(query)

    return matchesFilter && matchesKeyword
  })

  const toggleFavorite = (id: string) =>
    setWords((prev) =>
      prev.map((word) => (word.id === id ? { ...word, favorite: !word.favorite } : word)),
    )

  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col">
      <div className="flex items-center gap-1 pb-6">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="hover:bg-background-subtle -ml-2 flex size-10 shrink-0 items-center justify-center rounded-md"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="text-content text-[28px] leading-[42px] font-extrabold tracking-[-0.84px]">
          {wordPackDetail.name}
        </h1>
      </div>

      <p className="text-content-secondary -mt-4 text-sm leading-[21px] tracking-[-0.15px]">
        {wordPackDetail.caption}
      </p>

      <div className="desktop:grid-cols-[788px_360px] grid grid-cols-1 gap-x-3 gap-y-8 pt-6">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-1.5">
            {filters.map(({ id, label, dot, star }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={`flex h-[34px] items-center gap-1.5 rounded-sm px-3 text-[13px] leading-[19.5px] font-semibold ${
                  filter === id
                    ? 'bg-content text-background'
                    : 'bg-background-subtle text-content-secondary'
                }`}
              >
                {dot && <span className={`size-2 rounded-sm ${dot}`} />}
                {star && <StarSmallIcon />}
                {label}
                <span className="font-medium opacity-60">{counts[id]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2 pb-3">
            <div className="bg-background-subtle flex h-[38px] w-full max-w-[320px] min-w-0 flex-1 items-center gap-3 rounded-md px-3.5">
              <SearchIcon />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="단어나 뜻으로 찾기"
                aria-label="단어나 뜻으로 찾기"
                className="text-content placeholder:text-content-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>

            <label className="ml-auto flex shrink-0 items-center gap-2.5">
              <span className="text-content-secondary text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
                뜻 가리기
              </span>
              <input
                type="checkbox"
                checked={meaningHidden}
                onChange={(event) => setMeaningHidden(event.target.checked)}
                className="sr-only"
              />
              <span
                className={`relative h-[26px] w-11 rounded-[13px] transition-colors ${
                  meaningHidden ? 'bg-brand' : 'bg-background-disabled'
                }`}
              >
                <span
                  className={`bg-background absolute top-[3px] size-5 rounded-[10px] transition-[left] ${
                    meaningHidden ? 'left-[21px]' : 'left-[3px]'
                  }`}
                />
              </span>
            </label>
          </div>

          {visibleWords.length === 0 ? (
            <p className="text-content-muted py-20 text-center text-sm">
              조건에 맞는 단어가 없어요
            </p>
          ) : (
            <ul>
              {visibleWords.map((word) => (
                <VocabularyRow
                  key={word.id}
                  word={word}
                  meaningHidden={meaningHidden}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="desktop:order-none order-first">
          <StudyStatusCard
            total={counts.all}
            memorized={counts.memorized}
            learning={counts.learning}
            fresh={counts.new}
          />
        </div>
      </div>
    </div>
  )
}
