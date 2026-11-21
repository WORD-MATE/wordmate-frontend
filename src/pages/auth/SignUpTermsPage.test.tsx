import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SignUpTermsPage from '@/pages/auth/SignUpTermsPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <SignUpTermsPage userName="한국" />
    </MemoryRouter>,
  )
}

const startButton = () => screen.getByRole('button', { name: '동의하고 시작하기' })
const agreeAll = () => screen.getByRole('button', { name: '전체 동의하기' })

test('처음에는 모두 미동의 상태이고 시작 버튼이 비활성이다', () => {
  renderPage()

  expect(screen.getByRole('heading', { name: /한국님, 환영해요/ })).toBeInTheDocument()
  expect(agreeAll()).toHaveAttribute('aria-pressed', 'false')
  expect(startButton()).toBeDisabled()
})

test('필수 항목을 하나만 동의하면 시작 버튼이 여전히 비활성이다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: '[필수] 서비스 이용약관' }))

  expect(startButton()).toBeDisabled()
})

test('필수 항목을 모두 동의하면 시작 버튼이 활성된다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: '[필수] 서비스 이용약관' }))
  await user.click(screen.getByRole('button', { name: '[필수] 개인정보 수집·이용 동의' }))

  expect(startButton()).toBeEnabled()
  expect(agreeAll()).toHaveAttribute('aria-pressed', 'false')
})

test('전체 동의하기를 누르면 모든 항목이 동의된다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(agreeAll())

  expect(screen.getByRole('button', { name: '[선택] 마케팅 정보 수신' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  expect(startButton()).toBeEnabled()
})

test('전체 동의 상태에서 선택 항목을 해제하면 전체 동의가 풀린다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(agreeAll())
  await user.click(screen.getByRole('button', { name: '[선택] 마케팅 정보 수신' }))

  expect(agreeAll()).toHaveAttribute('aria-pressed', 'false')
  expect(startButton()).toBeEnabled()
})
