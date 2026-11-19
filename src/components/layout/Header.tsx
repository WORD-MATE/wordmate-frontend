import { BarChart3, Bell, ChevronDown, LogOut, NotebookPen, Sun, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import HeaderMenu from '@/components/layout/HeaderMenu'
import { paths } from '@/routes/paths'

type Notification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
}

type HeaderProps = {
  userName: string
  userCaption: string
  notifications: Notification[]
  wrongNoteCount: number
}

const navItems = [
  { to: paths.home, label: '홈' },
  { to: paths.wordPacks, label: '단어팩' },
  { to: paths.battle, label: '대결' },
  { to: paths.ranking, label: '랭킹' },
]

const studyItems = [
  { to: paths.wrongNotes, label: '오답노트', Icon: NotebookPen },
  { to: paths.todaySentence, label: '오늘의 문장', Icon: Sun },
  { to: paths.studyLog, label: '학습 기록', Icon: BarChart3 },
]

const menuItemClass =
  'text-content flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-background-subtle w-full'

export default function Header({
  userName,
  userCaption,
  notifications,
  wrongNoteCount,
}: HeaderProps) {
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="border-border-default bg-background border-b">
      <div className="mx-auto flex h-18 w-full max-w-[1248px] items-center gap-4 overflow-x-auto px-6">
        <NavLink
          to={paths.home}
          className="text-content shrink-0 text-2xl font-extrabold tracking-tight"
        >
          wordmate
        </NavLink>

        <nav aria-label="주요 메뉴" className="ml-14 flex shrink-0 items-center gap-9">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === paths.home}
              className={({ isActive }) =>
                `relative shrink-0 py-6 text-[15px] whitespace-nowrap ${
                  isActive
                    ? 'text-content after:bg-content font-bold after:absolute after:inset-x-0 after:bottom-4 after:h-0.5 after:content-[""]'
                    : 'text-content-muted hover:text-content font-medium'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <HeaderMenu
            label="학습 메뉴"
            triggerClassName="text-content-muted hover:text-content flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[15px] font-medium whitespace-nowrap aria-expanded:bg-background-subtle aria-expanded:text-content"
            panelClassName="left-0 right-auto w-48"
            trigger={(open) => (
              <>
                학습
                <ChevronDown size={16} className={open ? 'rotate-180' : undefined} />
              </>
            )}
          >
            {(close) =>
              studyItems.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} onClick={close} className={menuItemClass}>
                  <Icon size={16} className="text-content-muted" />
                  <span className="flex-1 text-left">{label}</span>
                  {to === paths.wrongNotes && wrongNoteCount > 0 && (
                    <span className="text-content-muted text-xs">{wrongNoteCount}</span>
                  )}
                </NavLink>
              ))
            }
          </HeaderMenu>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <HeaderMenu
            label={unreadCount > 0 ? `알림 ${unreadCount}개` : '알림'}
            triggerClassName="text-content relative flex size-9 items-center justify-center rounded-lg hover:bg-background-subtle"
            panelClassName="w-80 py-0"
            trigger={() => (
              <>
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="bg-alert absolute top-1.5 right-1.5 size-2 rounded-full" />
                )}
              </>
            )}
          >
            {() => (
              <>
                <div className="border-border-default flex items-center justify-between border-b px-4 py-3">
                  <p className="text-content text-sm font-bold">
                    알림 <span className="text-brand-strong">{unreadCount}</span>
                  </p>
                  <button type="button" className="text-content-muted hover:text-content text-xs">
                    모두 읽음
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-content-muted px-4 py-10 text-center text-sm">
                    새로운 알림이 없어요
                  </p>
                ) : (
                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="hover:bg-background-subtle flex gap-3 px-4 py-3.5"
                      >
                        <span className="bg-brand mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm">
                          ⚡
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-content flex items-center gap-1 text-sm font-bold">
                            {notification.title}
                            {!notification.read && (
                              <span className="bg-alert size-1.5 rounded-full" />
                            )}
                          </p>
                          <p className="text-content-secondary mt-1 text-xs">{notification.body}</p>
                          <p className="text-content-muted mt-1.5 text-xs">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <button
                            type="button"
                            className="text-content-muted hover:text-content shrink-0 self-start text-xs"
                          >
                            읽음
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </HeaderMenu>

          <HeaderMenu
            label="내 계정 메뉴"
            triggerClassName="text-content flex items-center gap-2 rounded-lg py-1.5 pr-2 pl-1.5 text-sm whitespace-nowrap hover:bg-background-subtle"
            panelClassName="w-56 py-0"
            trigger={(open) => (
              <>
                <span className="bg-background-subtle flex size-7 items-center justify-center rounded-lg">
                  <User size={16} />
                </span>
                {userName}
                <ChevronDown size={16} className={open ? 'rotate-180' : undefined} />
              </>
            )}
          >
            {(close) => (
              <>
                <div className="border-border-default border-b px-4 py-3">
                  <p className="text-content text-sm font-bold">{userName}</p>
                  <p className="text-content-muted mt-1 text-xs">{userCaption}</p>
                </div>
                <NavLink to={paths.myPage} onClick={close} className={`${menuItemClass} py-3`}>
                  <User size={16} className="text-content-muted" />
                  마이페이지
                </NavLink>
                <div className="border-border-default border-t">
                  <button type="button" className={`${menuItemClass} py-3`}>
                    <LogOut size={16} className="text-content-muted" />
                    로그아웃
                  </button>
                </div>
              </>
            )}
          </HeaderMenu>
        </div>
      </div>
    </header>
  )
}
