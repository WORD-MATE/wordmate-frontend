import { render, screen, within } from '@testing-library/react'
import LoginPage from '@/pages/auth/LoginPage'

test('서비스 소개와 로그인 버튼을 보여준다', () => {
  render(<LoginPage />)

  expect(
    screen
      .getAllByRole('heading', { level: 1 })
      .some((heading) => heading.textContent?.includes('매일 10분,')),
  ).toBe(true)
  expect(screen.getByRole('button', { name: 'DataGSM으로 로그인' })).toBeInTheDocument()
  expect(screen.getByAltText('wordmate')).toBeInTheDocument()
})

test('오늘의 단어 뜻을 순서대로 보여준다', () => {
  render(<LoginPage />)

  const items = within(screen.getByRole('list', { name: '단어 뜻 예시' })).getAllByRole('listitem')
  expect(items[0]).toHaveTextContent('짝, 친구')
  expect(items[1]).toHaveTextContent('외통수')
  expect(items[2]).toHaveTextContent('동료')
})
