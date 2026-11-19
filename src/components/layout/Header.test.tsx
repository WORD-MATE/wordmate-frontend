import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { paths } from '@/routes/paths'

const notifications = [
  { id: '1', title: '대결 초대', body: '초대 코드 K7Q2MX', time: '55분 전', read: false },
]

function renderHeader(initialPath: string = paths.home, items = notifications) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header
        userName="한국"
        userCaption="2학년 2반 · Lv.12 실버"
        notifications={items}
        wrongNoteCount={7}
      />
    </MemoryRouter>,
  )
}

test('주요 메뉴 항목을 모두 보여준다', () => {
  renderHeader()

  const nav = screen.getByRole('navigation', { name: '주요 메뉴' })
  for (const label of ['홈', '단어팩', '대결', '랭킹']) {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
  }
  expect(nav).toBeInTheDocument()
})

test('현재 경로에 해당하는 메뉴를 활성 상태로 표시한다', () => {
  renderHeader(paths.wordPacks)

  expect(screen.getByRole('link', { name: '단어팩' })).toHaveAttribute('aria-current', 'page')
  expect(screen.getByRole('link', { name: '홈' })).not.toHaveAttribute('aria-current')
})

test('학습 메뉴를 열고 Escape로 닫는다', async () => {
  const user = userEvent.setup()
  renderHeader()

  const trigger = screen.getByRole('button', { name: '학습 메뉴' })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')

  await user.click(trigger)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByRole('link', { name: /오답노트/ })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '오늘의 문장' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '학습 기록' })).toBeInTheDocument()

  await user.keyboard('{Escape}')
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('읽지 않은 알림 개수를 알림 메뉴에 표시한다', async () => {
  const user = userEvent.setup()
  renderHeader()

  await user.click(screen.getByRole('button', { name: '알림 1개' }))
  expect(screen.getByText('대결 초대')).toBeInTheDocument()
})

test('알림이 없으면 빈 상태를 보여준다', async () => {
  const user = userEvent.setup()
  renderHeader(paths.home, [])

  await user.click(screen.getByRole('button', { name: '알림' }))
  expect(screen.getByText('새로운 알림이 없어요')).toBeInTheDocument()
})

test('계정 메뉴에서 사용자 정보와 항목을 보여준다', async () => {
  const user = userEvent.setup()
  renderHeader()

  await user.click(screen.getByRole('button', { name: '내 계정 메뉴' }))
  expect(screen.getByText('2학년 2반 · Lv.12 실버')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '마이페이지' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument()
})
