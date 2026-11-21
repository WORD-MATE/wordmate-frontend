import ContinueLearning from '@/pages/home/ContinueLearning'
import DailyMissions from '@/pages/home/DailyMissions'
import DailySentenceCard from '@/pages/home/DailySentenceCard'
import HeroCard from '@/pages/home/HeroCard'
import LevelProgressCard from '@/pages/home/LevelProgressCard'
import MyRankingCard from '@/pages/home/MyRankingCard'
import TodayTasks from '@/pages/home/TodayTasks'
import TodayStatusTiles from '@/pages/home/TodayStatusTiles'

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-7 lg:max-w-none">
      <HeroCard />

      <div className="flex flex-col gap-7 lg:hidden">
        <div className="-mt-5">
          <TodayStatusTiles />
        </div>
        <TodayTasks />
        <ContinueLearning />
        <DailySentenceCard />
        <DailyMissions />
        <MyRankingCard />
      </div>

      <div className="hidden grid-cols-1 gap-x-3 gap-y-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px]">
        <DailySentenceCard />
        <MyRankingCard />

        <div className="flex flex-col gap-8">
          <TodayTasks />
          <ContinueLearning />
          <DailyMissions />
        </div>

        <div>
          <LevelProgressCard />
        </div>
      </div>
    </div>
  )
}
