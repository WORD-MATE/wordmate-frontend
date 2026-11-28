import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import BattlePage from '@/pages/battle/BattlePage'

const renderPage = () =>
  render(
    <MemoryRouter>
      <BattlePage />
    </MemoryRouter>,
  )

const codeBox = (index: number) => screen.getByLabelText(`대결 코드 ${index}번째 자리`)

test('진입 카드 3종을 보여준다', () => {
  renderPage()

  expect(screen.getByRole('button', { name: /빠른 대결비슷한 실력/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /대결방 만들기/ })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '코드로 참가' })).toBeInTheDocument()
})

test('내 대결 기록의 요약과 목록을 보여준다', () => {
  renderPage()

  const summary = screen.getByText('승률').parentElement as HTMLElement
  expect(within(summary).getByRole('definition')).toHaveTextContent('33')

  expect(screen.getByText('수능 필수 영단어 Day 12')).toBeInTheDocument()
  expect(screen.getByText('1,320점')).toBeInTheDocument()
  expect(screen.getByText('이탈')).toBeInTheDocument()
})

test('혼자 연습하기 링크를 보여준다', () => {
  renderPage()

  expect(screen.getByRole('button', { name: /연습 모드/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /오늘의 챌린지/ })).toBeInTheDocument()
})

test('코드를 다 채우기 전에는 참가를 누를 수 없다', () => {
  renderPage()

  expect(screen.getByRole('button', { name: '참가' })).toBeDisabled()
})

test('입력하면 다음 칸으로 넘어가고 6자리를 채우면 참가가 열린다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(codeBox(1))
  await user.keyboard('ab12cd')

  expect(codeBox(1)).toHaveValue('A')
  expect(codeBox(2)).toHaveValue('B')
  expect(codeBox(6)).toHaveValue('D')
  expect(screen.getByRole('button', { name: '참가' })).toBeEnabled()
})

test('영숫자가 아닌 글자는 받지 않는다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(codeBox(1))
  await user.keyboard('-가!1')

  expect(codeBox(1)).toHaveValue('1')
  expect(screen.getByRole('button', { name: '참가' })).toBeDisabled()
})

test('백스페이스로 앞 칸을 지운다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(codeBox(1))
  await user.keyboard('ab')
  await user.keyboard('{Backspace}')

  expect(codeBox(1)).toHaveValue('A')
  expect(codeBox(2)).toHaveValue('')
  expect(codeBox(2)).toHaveFocus()
})

test('붙여넣기하면 여러 칸을 한 번에 채운다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(codeBox(1))
  await user.paste('k7q2mx')

  expect(codeBox(1)).toHaveValue('K')
  expect(codeBox(3)).toHaveValue('Q')
  expect(codeBox(6)).toHaveValue('X')
  expect(screen.getByRole('button', { name: '참가' })).toBeEnabled()
})
