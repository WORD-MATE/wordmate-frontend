import { useState } from 'react'
import { PlusIcon, SearchIcon } from '@/components/icons/WordmateIcons'
import NewWordPackDialog from '@/pages/word-packs/NewWordPackDialog'
import WordPackCard, { type WordPack } from '@/pages/word-packs/WordPackCard'

const tabs = [
  { id: 'default', label: '기본 단어팩' },
  { id: 'mine', label: '내 단어팩' },
] as const

type TabId = (typeof tabs)[number]['id']

const categories = ['전체', '수능', '교과서', 'IT', '토익'] as const

const defaultPacks: WordPack[] = [
  {
    id: 'suneung-12',
    wordCount: 24,
    name: '수능 필수 영단어 Day 12',
    description: '고2 수준 핵심 어휘 24개',
    progress: 58,
    category: '수능',
  },
  {
    id: 'textbook-3',
    wordCount: 32,
    name: '교과서 2학년 3단원',
    description: 'Lesson 3. The Power of Habits',
    progress: 100,
    category: '교과서',
    badge: 'complete',
  },
  {
    id: 'it-english',
    wordCount: 40,
    name: 'IT 기술 영어',
    description: '개발 문서에 자주 나오는 단어',
    progress: 15,
    category: 'IT',
  },
  {
    id: 'toeic-verbs',
    wordCount: 50,
    name: '토익 빈출 동사',
    description: 'Part 5·6 자주 나오는 동사',
    progress: 0,
    category: '토익',
  },
]

const initialMyPacks: WordPack[] = [
  {
    id: 'midterm',
    wordCount: 18,
    name: '중간고사 대비',
    description: '수행평가 전에 다시 볼 것',
    progress: 61,
    badge: 'shared',
  },
  {
    id: 'confusing',
    wordCount: 9,
    name: '헷갈리는 단어 모음',
    description: '설명 없음',
    progress: 33,
  },
]

export default function WordPacksPage() {
  const [tab, setTab] = useState<TabId>('default')
  const [category, setCategory] = useState<string>('전체')
  const [keyword, setKeyword] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [myPacks, setMyPacks] = useState(initialMyPacks)

  const createPack = (name: string) => {
    setMyPacks((packs) => [
      ...packs,
      {
        id: `custom-${packs.length + 1}`,
        wordCount: 0,
        name,
        description: '새 단어팩',
        progress: 0,
      },
    ])
    setTab('mine')
    setKeyword('')
    setDialogOpen(false)
  }

  const packs = tab === 'default' ? defaultPacks : myPacks
  const visiblePacks = packs.filter(
    (pack) =>
      (tab === 'mine' || category === '전체' || pack.category === category) &&
      pack.name.toLowerCase().includes(keyword.trim().toLowerCase()),
  )

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1160px] flex-col">
        <div
          role="tablist"
          aria-label="단어팩 종류"
          className="bg-background-subtle flex w-fit gap-0.5 rounded-md p-[3px]"
        >
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex h-8 items-center justify-center rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold ${
                tab === id
                  ? 'bg-background text-content drop-shadow-[0px_1px_1px_rgba(0,0,0,0.25)]'
                  : 'text-content-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
          <div className="bg-background-subtle flex h-[50px] w-full max-w-[320px] items-center gap-3 rounded-md px-3.5">
            <SearchIcon />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="단어팩 이름으로 검색"
              aria-label="단어팩 이름으로 검색"
              className="text-content placeholder:text-content-muted min-w-0 flex-1 bg-transparent text-[15px] outline-none"
            />
          </div>

          {tab === 'default' ? (
            <div className="flex gap-1.5">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`flex h-[34px] items-center rounded-sm px-3 text-[13px] leading-[19.5px] font-semibold ${
                    category === item
                      ? 'bg-content text-background'
                      : 'bg-background-subtle text-content-secondary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="bg-brand text-content-on-accent hover:bg-brand-strong flex h-9 items-center justify-center gap-2 rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold"
            >
              <PlusIcon />새 단어팩
            </button>
          )}
        </div>

        <div className="pt-5">
          {visiblePacks.length === 0 ? (
            <p className="text-content-muted py-20 text-center text-sm">
              조건에 맞는 단어팩이 없어요
            </p>
          ) : (
            <div className="desktop:grid-cols-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visiblePacks.map((pack) => (
                <WordPackCard key={pack.id} pack={pack} />
              ))}
            </div>
          )}
        </div>
      </div>

      {dialogOpen && (
        <NewWordPackDialog onClose={() => setDialogOpen(false)} onCreate={createPack} />
      )}
    </>
  )
}
