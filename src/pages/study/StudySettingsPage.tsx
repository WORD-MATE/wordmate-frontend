import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SegmentedTabs from '@/components/controls/SegmentedTabs'
import {
  ArrowLeftIcon,
  FlashcardsIcon,
  KeyboardIcon,
  MultipleChoiceIcon,
} from '@/components/icons/WordmateIcons'
import LearningModeCard from '@/pages/study/LearningModeCard'
import SetupSummaryCard from '@/pages/study/SetupSummaryCard'
import {
  directionLabel,
  directionOptions,
  estimatedMinutes,
  learningModes,
  resolveQuestionCount,
  type DirectionId,
  type LearningModeId,
  type QuestionCountId,
} from '@/pages/study/studySettingsData'
import { hasWordPackDetail, wordPackDetail, words } from '@/pages/word-packs/wordPackDetailData'
import { paths, wordPackDetailPath } from '@/routes/paths'

const modeIcon: Record<LearningModeId, React.ReactNode> = {
  flashcards: <FlashcardsIcon />,
  'multiple-choice': <MultipleChoiceIcon />,
  typing: <KeyboardIcon />,
}

const sectionHeadingClass =
  'text-content-secondary text-sm leading-[21px] font-bold tracking-[-0.15px]'

export default function StudySettingsPage() {
  const { packId = '' } = useParams()
  const [mode, setMode] = useState<LearningModeId>('multiple-choice')
  const [direction, setDirection] = useState<DirectionId>('en-ko')
  const [count, setCount] = useState<QuestionCountId>('10')
  const [shuffle, setShuffle] = useState(true)

  if (!hasWordPackDetail(packId)) {
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

  const total = words.length
  const selectedMode = learningModes.find((item) => item.id === mode) ?? learningModes[0]
  const questionCount = resolveQuestionCount(count, total)
  const maxXp = selectedMode.xpPerCorrect * questionCount

  const summaryRows = [
    { term: '방식', description: selectedMode.title },
    { term: '방향', description: directionLabel[direction] },
    {
      term: '문항',
      description: `${questionCount}문항 · ${shuffle ? '섞어서' : '순서대로'}`,
    },
    { term: '예상 시간', description: `약 ${estimatedMinutes(questionCount)}분` },
    { term: '최대 XP', description: maxXp > 0 ? `+${maxXp} XP` : 'XP 없음' },
  ]

  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col">
      <div className="flex items-center gap-1 pb-6">
        <Link
          to={wordPackDetailPath(packId)}
          aria-label="단어팩으로 돌아가기"
          className="hover:bg-background-subtle -ml-2 flex size-10 shrink-0 items-center justify-center rounded-md"
        >
          <ArrowLeftIcon />
        </Link>
        <h1 className="text-content text-[28px] leading-[42px] font-extrabold tracking-[-0.84px]">
          학습 설정
        </h1>
      </div>

      <p className="text-content-secondary -mt-4 text-sm leading-[21px] tracking-[-0.15px]">
        {wordPackDetail.name} · {total}단어
      </p>

      <div className="desktop:grid-cols-[788px_360px] grid grid-cols-1 gap-x-3 gap-y-8 pt-6">
        <div className="flex min-w-0 flex-col gap-7">
          <section className="flex flex-col gap-2.5">
            <h2 className={sectionHeadingClass}>학습 방식</h2>
            <div
              role="radiogroup"
              aria-label="학습 방식"
              className="desktop:grid-cols-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {learningModes.map((item) => (
                <LearningModeCard
                  key={item.id}
                  mode={item}
                  icon={modeIcon[item.id]}
                  selected={item.id === mode}
                  onSelect={() => setMode(item.id)}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col items-start gap-2.5">
            <h2 className={sectionHeadingClass}>출제 방향</h2>
            <SegmentedTabs
              label="출제 방향"
              options={directionOptions}
              value={direction}
              onChange={setDirection}
            />
          </section>

          <section className="flex flex-col items-start gap-2.5">
            <h2 className={sectionHeadingClass}>문항 수</h2>
            <SegmentedTabs
              label="문항 수"
              options={[
                { id: '10', label: '10문항' },
                { id: '20', label: '20문항' },
                { id: 'all', label: `전체 ${total}` },
              ]}
              value={count}
              onChange={setCount}
            />
          </section>

          <label className="bg-background-card flex items-center justify-between rounded-lg px-5 py-4">
            <span className="flex flex-col">
              <span className="text-content text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]">
                순서 섞기
              </span>
              <span className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                끄면 단어팩 순서대로 나와요
              </span>
            </span>
            <input
              type="checkbox"
              checked={shuffle}
              onChange={(event) => setShuffle(event.target.checked)}
              className="sr-only"
            />
            <span
              className={`relative h-[26px] w-11 shrink-0 rounded-[13px] transition-colors ${
                shuffle ? 'bg-brand' : 'bg-background-disabled'
              }`}
            >
              <span
                className={`bg-background absolute top-[3px] size-5 rounded-[10px] transition-[left] ${
                  shuffle ? 'left-[21px]' : 'left-[3px]'
                }`}
              />
            </span>
          </label>
        </div>

        <div className="desktop:order-none order-first">
          <SetupSummaryCard rows={summaryRows} questionCount={questionCount} />
        </div>
      </div>
    </div>
  )
}
