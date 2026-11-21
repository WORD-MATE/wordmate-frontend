import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'

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
      <main className="mx-auto w-full max-w-[1240px] px-4 pt-8 pb-16 min-[1240px]:px-10 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
