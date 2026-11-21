import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { BookOpen, House, Swords, Trophy, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { paths } from '@/routes/paths'

const sampleUser = {
  name: '한국',
  caption: '2학년 2반 · Lv.12 실버',
}

const sampleNotifications = [
  {
    id: '1',
    title: '대결 초대',
    body: '양지우님이 대결방에 초대했어요. 코드 K7Q2MX',
    time: '55분 전',
    read: false,
  },
]

export default function AppLayout() {
  return (
    <div className="bg-background min-h-dvh">
      <Header
        userName={sampleUser.name}
        userCaption={sampleUser.caption}
        notifications={sampleNotifications}
        wrongNoteCount={7}
      />
      <main className="desktop:px-10 desktop:pb-16 mx-auto w-full max-w-[1240px] px-5 pt-4 pb-[92px] sm:px-6 sm:pt-8">
        <Outlet />
      </main>
      <nav
        aria-label="하단 메뉴"
        className="border-border-default fixed right-0 bottom-0 left-0 z-30 grid h-16 grid-cols-5 border-t bg-white/95 backdrop-blur sm:hidden"
      >
        {[
          [paths.home, '홈', House],
          [paths.wordPacks, '단어팩', BookOpen],
          [paths.battle, '대결', Swords],
          [paths.ranking, '랭킹', Trophy],
          [paths.myPage, '마이', UserRound],
        ].map(([to, label, Icon]) => (
          <NavLink
            key={to as string}
            to={to as string}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${isActive ? 'text-content' : 'text-content-muted'}`
            }
          >
            <Icon size={23} strokeWidth={1.8} />
            {label as string}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
