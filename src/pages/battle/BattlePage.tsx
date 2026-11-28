import {
  ChevronRightAlt2Icon,
  ChevronRightIcon,
  CreateRoomIcon,
  PracticeIcon,
  QuickBattleIcon,
  StreakFire,
} from '@/components/icons/WordmateIcons'
import { battleRecords, battleSummary } from '@/pages/battle/battleData'
import JoinCodeCard from '@/pages/battle/JoinCodeCard'

const cardClass = 'flex h-[225px] flex-col gap-1 rounded-lg p-6 text-left'
const sectionHeadingClass = 'text-content text-[18px] leading-[27px] font-bold tracking-[-0.36px]'

export default function BattlePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-8">
      <div className="desktop:grid-cols-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" className={`${cardClass} bg-brand hover:bg-brand-strong`}>
          <span className="mb-3 flex size-10 shrink-0 items-center justify-center rounded-md bg-[rgba(11,12,14,0.08)]">
            <QuickBattleIcon />
          </span>
          <span className="text-content-on-accent text-[17px] leading-[25.5px] font-bold">
            빠른 대결
          </span>
          <span className="text-[13px] leading-[19.5px] text-[rgba(11,12,14,0.65)]">
            비슷한 실력의 친구와 1:1로 붙어요
          </span>
          <span className="flex w-full flex-1 items-end justify-between">
            <span className="text-[13px] leading-[19.5px] font-semibold text-[rgba(11,12,14,0.65)]">
              바로 시작
            </span>
            <ChevronRightAlt2Icon />
          </span>
        </button>

        <button
          type="button"
          className={`${cardClass} bg-background-card hover:bg-background-subtle`}
        >
          <span className="bg-background-icon mb-3 flex size-10 shrink-0 items-center justify-center rounded-md">
            <CreateRoomIcon />
          </span>
          <span className="text-content text-[17px] leading-[25.5px] font-bold tracking-[-0.15px]">
            대결방 만들기
          </span>
          <span className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
            단어팩과 문항을 정하고 친구를 초대해요
          </span>
          <span className="flex w-full flex-1 items-end justify-between">
            <span className="text-content-muted text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
              최대 30명
            </span>
            <ChevronRightIcon />
          </span>
        </button>

        <JoinCodeCard />
      </div>

      <div className="desktop:grid-cols-[769px_379px] grid grid-cols-1 gap-3">
        <section className="bg-background-card flex min-w-0 flex-col rounded-lg p-5">
          <h2 className={sectionHeadingClass}>내 대결 기록</h2>

          <dl className="border-border-default grid grid-cols-3 gap-2 border-b pt-3.5 pb-4">
            <div className="flex flex-col gap-1">
              <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                대결
              </dt>
              <dd className="text-content text-[22px] leading-[33px] font-extrabold tracking-[-0.66px]">
                {battleSummary.battles}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                승률
              </dt>
              <dd className="text-content text-[22px] leading-[33px] font-extrabold tracking-[-0.66px]">
                {battleSummary.winRate}
                <span className="text-content-secondary pl-1 text-sm leading-[21px] font-semibold">
                  %
                </span>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                평균 정답률
              </dt>
              <dd className="text-content text-[22px] leading-[33px] font-extrabold tracking-[-0.66px]">
                {battleSummary.averageAccuracy}
                <span className="text-content-secondary pl-1 text-sm leading-[21px] font-semibold">
                  %
                </span>
              </dd>
            </div>
          </dl>

          <ul>
            {battleRecords.map((record) => (
              <li key={record.id}>
                <button
                  type="button"
                  className="hover:bg-background-subtle flex w-full items-center gap-3.5 rounded-md py-3.5 text-left"
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-md text-[13px] leading-[19.5px] font-extrabold tracking-[-0.15px] ${
                      record.rank === '1위'
                        ? 'bg-brand text-content-on-accent'
                        : record.retired
                          ? 'bg-background-subtle text-content-muted'
                          : 'bg-background-subtle text-content'
                    }`}
                  >
                    {record.rank}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="text-content block truncate text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]">
                      {record.name}
                    </span>
                    <span className="text-content-secondary block truncate text-[13px] leading-[19.5px] tracking-[-0.15px]">
                      {record.caption}
                    </span>
                  </span>

                  <span className="text-content shrink-0 text-sm leading-[21px] font-bold tracking-[-0.15px]">
                    {record.score.toLocaleString()}점
                  </span>
                  <span className="pl-1">
                    <ChevronRightIcon />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex min-w-0 flex-col gap-2">
          <h2 className={`${sectionHeadingClass} pb-1.5`}>혼자 연습하기</h2>

          <button
            type="button"
            className="bg-background-card hover:bg-background-subtle flex items-center gap-3.5 rounded-lg p-5 text-left"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[rgba(18,20,23,0.07)]">
              <PracticeIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-content block text-base leading-6 font-bold tracking-[-0.15px]">
                연습 모드
              </span>
              <span className="text-content-secondary block text-[13px] leading-[19.5px] tracking-[-0.15px]">
                대결 방식으로 혼자 풀기 · XP 없음
              </span>
            </span>
            <ChevronRightIcon />
          </button>

          <button
            type="button"
            className="bg-background-card hover:bg-background-subtle flex items-center gap-3.5 rounded-lg p-5 text-left"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[rgba(18,20,23,0.07)]">
              <StreakFire />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-content block text-base leading-6 font-bold tracking-[-0.15px]">
                오늘의 챌린지
              </span>
              <span className="text-content-secondary block text-[13px] leading-[19.5px] tracking-[-0.15px]">
                모두 같은 10문제 · 하루 1회
              </span>
            </span>
            <ChevronRightIcon />
          </button>
        </section>
      </div>
    </div>
  )
}
