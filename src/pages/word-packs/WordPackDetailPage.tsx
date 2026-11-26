import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, SearchIcon, StarSmallIcon } from '@/components/icons/WordmateIcons'
import ToggleSwitch from '@/components/controls/ToggleSwitch'
import { useEnglishVoice } from '@/hooks/useEnglishVoice'
import StudyStatusCard from '@/pages/word-packs/StudyStatusCard'
import VocabularyRow from '@/pages/word-packs/VocabularyRow'
import { paths } from '@/routes/paths'
import {
  statusDotClass,
  wordPackDetail,
  words as initialWords,
  type VocabularyWord,
} from '@/pages/word-packs/wordPackDetailData'

type FilterId = 'all' | 'new' | 'learning' | 'memorized' | 'favorite'
const EMPTY_WORDS: VocabularyWord[] = []

export default function WordPackDetailPage() {
  const { packId = wordPackDetail.id } = useParams()
  const [wordsByPack, setWordsByPack] = useState<Record<string, VocabularyWord[]>>(() => ({
    [wordPackDetail.id]: initialWords,
  }))
  const [filter, setFilter] = useState<FilterId>('all')
  const [keyword, setKeyword] = useState('')
  const [meaningHidden, setMeaningHidden] = useState(false)
  const [revealedIds, setRevealedIds] = useState<ReadonlySet<string>>(() => new Set())
  const englishVoice = useEnglishVoice()
  const canSpeak = englishVoice !== null
  const detail = packId === wordPackDetail.id ? wordPackDetail : null
  const words = wordsByPack[packId] ?? EMPTY_WORDS

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

  const playPronunciation = useCallback(
    (text: string) => {
      if (!englishVoice) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = englishVoice
      utterance.lang = englishVoice.lang
      window.speechSynthesis.speak(utterance)
    },
    [englishVoice],
  )

  useEffect(() => {
    if (!canSpeak) return
    return () => window.speechSynthesis.cancel()
  }, [canSpeak])

  const toggleMeaningHidden = (hidden: boolean) => {
    setMeaningHidden(hidden)
    // 가리기를 껐다 켜면 펼쳐 둔 뜻도 다시 가린다.
    setRevealedIds(new Set())
  }

  const toggleMeaning = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }

  const toggleFavorite = (id: string) => {
    setWordsByPack((prev) => ({
      ...prev,
      [packId]: (prev[packId] ?? []).map((word) =>
        word.id === id ? { ...word, favorite: !word.favorite } : word,
      ),
    }))
  }

  if (!detail) {
    return (
      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-3 py-20 text-center">
        <h1 className="text-content text-xl font-bold">단어팩을 찾을 수 없어요</h1>
        <p className="text-content-secondary text-sm">목록에서 다른 단어팩을 선택해주세요.</p>
        <Link
          to={paths.wordPacks}
          className="text-content mt-2 rounded-md px-4 py-2 font-semibold underline"
        >
          단어팩 목록으로
        </Link>
      </section>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col">
      <div className="flex items-center gap-1 pb-6">
        <Link
          to={paths.wordPacks}
          aria-label="단어팩 목록으로 돌아가기"
          className="hover:bg-background-subtle -ml-2 flex size-10 shrink-0 items-center justify-center rounded-md"
        >
          <ArrowLeftIcon />
        </Link>
        <h1 className="text-content text-[28px] leading-[42px] font-extrabold tracking-[-0.84px]">
          {detail.name}
        </h1>
      </div>

      <p className="text-content-secondary -mt-4 text-sm leading-[21px] tracking-[-0.15px]">
        {detail.caption}
      </p>

      <div className="desktop:grid-cols-[788px_360px] grid grid-cols-1 gap-x-3 gap-y-8 pt-6">
        <div className="min-w-0">
          <div role="group" aria-label="단어 상태" className="flex flex-wrap gap-1.5">
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
            <div className="bg-background-subtle focus-within:ring-content flex h-[38px] w-full max-w-[320px] min-w-0 flex-1 items-center gap-3 rounded-md px-3.5 focus-within:ring-2">
              <SearchIcon />
              <input
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="단어나 뜻으로 찾기"
                aria-label="단어나 뜻으로 찾기"
                className="text-content placeholder:text-content-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </div>

            <ToggleSwitch
              label="뜻 가리기"
              className="ml-auto"
              checked={meaningHidden}
              onChange={toggleMeaningHidden}
            />
          </div>

          {visibleWords.length === 0 ? (
            <p role="status" className="text-content-muted py-20 text-center text-sm">
              조건에 맞는 단어가 없어요
            </p>
          ) : (
            <ul aria-label="단어 목록">
              {visibleWords.map((word) => (
                <VocabularyRow
                  key={word.id}
                  word={word}
                  meaningHidden={meaningHidden}
                  meaningRevealed={revealedIds.has(word.id)}
                  onToggleMeaning={toggleMeaning}
                  onToggleFavorite={toggleFavorite}
                  onPlayPronunciation={playPronunciation}
                  pronunciationDisabled={!canSpeak}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="desktop:order-none order-first">
          <StudyStatusCard
            packId={packId}
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
