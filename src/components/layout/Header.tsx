import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {
  AvatarIcon,
  BrandLockup,
  ChevronDownIcon,
  NotificationIcon,
} from '@/components/icons/WordmateIcons'
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
  { to: paths.wrongNotes, label: '오답노트' },
  { to: paths.todaySentence, label: '오늘의 문장' },
  { to: paths.studyLog, label: '학습 기록' },
]

const navLinkClass =
  'flex h-10 items-center gap-0.5 rounded-md px-3.5 text-[15px] font-bold tracking-[-0.15px] whitespace-nowrap'
const menuItemClass =
  'text-content hover:bg-background-subtle flex w-full items-center gap-2.5 px-4 py-2.5 text-sm'

export default function Header({
  userName,
  userCaption,
  notifications,
  wrongNoteCount,
}: HeaderProps) {
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="border-border-default sticky top-0 z-30 h-14 border-b bg-white/90 backdrop-blur-[14px] sm:h-16">
      <div className="desktop:gap-10 desktop:px-10 mx-auto flex h-[55px] w-full max-w-[1240px] items-center gap-3 px-5 sm:h-[63px] sm:gap-4 sm:px-6">
        <HeaderMenu
          className="relative hidden sm:block lg:hidden"
          label="전체 메뉴"
          triggerClassName="hover:bg-background-subtle text-content flex size-10 shrink-0 items-center justify-center rounded-md lg:hidden"
          panelClassName="left-0 right-auto w-52"
          trigger={() => <Menu size={22} />}
        >
          {(close) => (
            <>
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === paths.home}
                  onClick={close}
                  className={`${menuItemClass} font-bold`}
                >
                  {label}
                </NavLink>
              ))}
              <div className="border-border-default mt-1 border-t pt-1">
                <p className="text-content-muted px-4 pt-2 pb-1 text-xs font-bold">학습</p>
                {studyItems.map(({ to, label }) => (
                  <NavLink key={to} to={to} onClick={close} className={menuItemClass}>
                    <span className="flex-1 text-left">{label}</span>
                    {to === paths.wrongNotes && wrongNoteCount > 0 && (
                      <span className="text-content-muted text-xs">{wrongNoteCount}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </HeaderMenu>

        <NavLink to={paths.home} aria-label="홈으로" className="shrink-0">
          <BrandLockup />
        </NavLink>

        <nav aria-label="주요 메뉴" className="hidden h-[63px] shrink-0 items-center gap-1 lg:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === paths.home}
              className={({ isActive }) =>
                `${navLinkClass} relative ${
                  isActive
                    ? 'text-content after:bg-content after:absolute after:bottom-[-11px] after:left-3.5 after:h-0.5 after:w-[12.813px] after:content-[""]'
                    : 'text-content-secondary hover:text-content'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <HeaderMenu
            label="학습 메뉴"
            triggerClassName={`${navLinkClass} text-content-secondary hover:text-content aria-expanded:bg-background-subtle aria-expanded:text-content`}
            panelClassName="left-0 right-auto w-48"
            trigger={(open) => (
              <>
                학습
                <span className={`inline-flex transition-transform ${open ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </>
            )}
          >
            {(close) =>
              studyItems.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={close} className={menuItemClass}>
                  <span className="flex-1 text-left">{label}</span>
                  {to === paths.wrongNotes && wrongNoteCount > 0 && (
                    <span className="text-content-muted text-xs">{wrongNoteCount}</span>
                  )}
                </NavLink>
              ))
            }
          </HeaderMenu>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <HeaderMenu
            label={unreadCount > 0 ? `알림 ${unreadCount}개 안 읽음` : '알림'}
            triggerClassName="text-content hover:bg-background-subtle relative flex size-10 items-center justify-center rounded-md"
            panelClassName="right-0 w-[min(20rem,calc(100vw-2rem))] py-0"
            trigger={() => (
              <>
                <NotificationIcon />
                {unreadCount > 0 && (
                  <span className="bg-alert absolute top-2 left-[23px] size-2 rounded-sm ring-2 ring-white" />
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
                              <span className="bg-alert size-1.5 shrink-0 rounded-full" />
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
            className="relative hidden sm:block"
            label="내 메뉴"
            triggerClassName="hover:bg-background-subtle flex h-10 items-center gap-0.5 rounded-md pr-2 pl-1"
            panelClassName="right-0 w-56 py-0"
            trigger={(open) => (
              <span className="flex items-center gap-2">
                <span className="bg-content/7 flex size-[30px] items-center justify-center overflow-clip rounded-md">
                  <AvatarIcon />
                </span>
                <span className="text-content-secondary hidden text-sm font-bold whitespace-nowrap sm:inline">
                  {userName}
                </span>
                <span className={`inline-flex transition-transform ${open ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </span>
            )}
          >
            {(close) => (
              <>
                <div className="border-border-default border-b px-4 py-3">
                  <p className="text-content text-sm font-bold">{userName}</p>
                  <p className="text-content-muted mt-1 text-xs">{userCaption}</p>
                </div>
                <NavLink to={paths.myPage} onClick={close} className={`${menuItemClass} py-3`}>
                  마이페이지
                </NavLink>
                <div className="border-border-default border-t">
                  <button type="button" className={`${menuItemClass} py-3`}>
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
