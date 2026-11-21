import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {
  AvatarIcon,
  BrandLockup,
  ChevronDownIcon,
  HistoryIcon,
  LightningIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
  TodaySentenceIcon,
  WrongNotesSmallIcon,
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
  { to: paths.wrongNotes, label: '오답노트', Icon: WrongNotesSmallIcon },
  { to: paths.todaySentence, label: '오늘의 문장', Icon: TodaySentenceIcon },
  { to: paths.studyLog, label: '학습 기록', Icon: HistoryIcon },
]

const navLinkClass =
  'flex h-10 items-center gap-0.5 rounded-md px-3.5 text-[15px] font-bold tracking-[-0.15px] whitespace-nowrap'
const menuItemClass =
  'text-content-secondary hover:bg-background-subtle flex h-10 w-full items-center gap-2.5 rounded-sm px-2.5 text-sm leading-[21px] font-semibold tracking-[-0.15px]'
const menuPanelClass = 'min-w-[220px] p-1.5 drop-shadow-[0px_16px_20px_rgba(0,0,0,0.35)]'

export default function Header({
  userName,
  userCaption,
  notifications,
  wrongNoteCount,
}: HeaderProps) {
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="border-border-default sticky top-0 z-30 h-16 border-b bg-white/90 backdrop-blur-[14px]">
      <div className="mx-auto flex h-[63px] w-full max-w-[1240px] items-center gap-4 px-4 min-[1240px]:gap-10 min-[1240px]:px-10 sm:px-6">
        <HeaderMenu
          label="전체 메뉴"
          triggerClassName="hover:bg-background-subtle text-content flex size-10 shrink-0 items-center justify-center rounded-md min-[1240px]:hidden"
          panelClassName={`${menuPanelClass} right-auto left-0`}
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
              <div className="bg-border-default my-1.5 h-px" />
              {studyItems.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} onClick={close} className={menuItemClass}>
                  <Icon />
                  {label}
                  {to === paths.wrongNotes && wrongNoteCount > 0 && (
                    <span className="text-content-muted ml-auto text-xs leading-[18px] font-semibold">
                      {wrongNoteCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </HeaderMenu>

        <NavLink to={paths.home} aria-label="홈으로" className="shrink-0">
          <BrandLockup />
        </NavLink>

        <nav
          aria-label="주요 메뉴"
          className="hidden h-[63px] shrink-0 items-center gap-1 min-[1240px]:flex"
        >
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
            panelClassName={`${menuPanelClass} right-auto left-0`}
            trigger={(open) => (
              <>
                학습
                <span className={open ? 'rotate-180' : undefined}>
                  <ChevronDownIcon />
                </span>
              </>
            )}
          >
            {(close) =>
              studyItems.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} onClick={close} className={menuItemClass}>
                  <Icon />
                  {label}
                  {to === paths.wrongNotes && wrongNoteCount > 0 && (
                    <span className="text-content-muted ml-auto text-xs leading-[18px] font-semibold">
                      {wrongNoteCount}
                    </span>
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
            panelClassName="right-0 w-[min(380px,calc(100vw-2rem))] overflow-clip shadow-[0px_16px_40px_0px_rgba(0,0,0,0.35)]"
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
                <div className="border-border-default flex h-[52px] items-center justify-between border-b pr-2 pl-4">
                  <p className="text-content flex items-start gap-1.5 text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]">
                    알림
                    <span
                      className="self-stretch"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, #b6e02a 60%)',
                      }}
                    >
                      {unreadCount}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="text-content-secondary hover:bg-background-subtle flex h-9 items-center rounded-sm px-3.5 text-[13px] leading-[19.5px] font-bold"
                  >
                    모두 읽음
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-content-muted px-4 py-10 text-center text-sm">
                    새로운 알림이 없어요
                  </p>
                ) : (
                  <ul className="max-h-[440px] overflow-y-auto p-1.5">
                    {notifications.map((notification) => (
                      <li key={notification.id} className="relative">
                        <div className="hover:bg-background-subtle flex gap-3.5 rounded-md px-2.5 py-3">
                          <span className="bg-content/7 flex size-10 shrink-0 items-center justify-center rounded-md">
                            <LightningIcon />
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <p className="text-content flex items-center gap-1.5 text-[15px] leading-[22.5px] font-bold">
                              {notification.title}
                              {!notification.read && (
                                <span className="bg-alert size-1.5 shrink-0 rounded-[3px]" />
                              )}
                            </p>
                            <p className="text-content-secondary truncate text-sm leading-[21px]">
                              {notification.body}
                            </p>
                            <p className="text-content-muted text-xs leading-[18px]">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                        {!notification.read && (
                          <button
                            type="button"
                            className="text-content-muted hover:text-content absolute top-3 right-2.5 text-xs leading-[22px] font-semibold"
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
            label="내 메뉴"
            triggerClassName="hover:bg-background-subtle flex h-10 items-center gap-0.5 rounded-md pr-2 pl-1"
            panelClassName={`${menuPanelClass} right-0 w-[220px]`}
            trigger={(open) => (
              <span className="flex items-center gap-2">
                <span className="bg-content/7 flex size-[30px] items-center justify-center overflow-clip rounded-md">
                  <AvatarIcon />
                </span>
                <span className="text-content-secondary hidden text-sm font-bold whitespace-nowrap sm:inline">
                  {userName}
                </span>
                <span className={open ? 'rotate-180' : undefined}>
                  <ChevronDownIcon />
                </span>
              </span>
            )}
          >
            {(close) => (
              <>
                <div className="border-border-default border-b px-2.5 pt-2 pb-2.5">
                  <p className="text-content text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]">
                    {userName}
                  </p>
                  <p className="text-content-muted text-xs leading-[18px] tracking-[-0.15px]">
                    {userCaption}
                  </p>
                </div>
                <div className="pt-1">
                  <NavLink to={paths.myPage} onClick={close} className={menuItemClass}>
                    <ProfileIcon />
                    마이페이지
                  </NavLink>
                </div>
                <div className="px-1 pt-1.5">
                  <div className="bg-border-default h-px" />
                </div>
                <div className="pt-1.5">
                  <button type="button" className={menuItemClass}>
                    <LogoutIcon />
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
