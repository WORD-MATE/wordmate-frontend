import ContinueLearning from '@/pages/home/ContinueLearning'
import DailyMissions from '@/pages/home/DailyMissions'
import DailySentenceCard from '@/pages/home/DailySentenceCard'
import HeroCard from '@/pages/home/HeroCard'
import LevelProgressCard from '@/pages/home/LevelProgressCard'
import MyRankingCard from '@/pages/home/MyRankingCard'
import TodayTasks from '@/pages/home/TodayTasks'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-7">
      <HeroCard />

      <div className="grid grid-cols-1 gap-x-3 gap-y-8 lg:grid-cols-[788px_360px]">
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
