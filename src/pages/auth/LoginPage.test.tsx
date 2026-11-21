import { render, screen } from '@testing-library/react'
import LoginPage from '@/pages/auth/LoginPage'

test('서비스 소개와 로그인 버튼을 보여준다', () => {
  render(<LoginPage />)

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('매일 10분,')
  expect(screen.getByRole('button', { name: 'DataGSM으로 로그인' })).toBeInTheDocument()
  expect(screen.getByAltText('wordmate')).toBeInTheDocument()
})

test('오늘의 단어 뜻을 순서대로 보여준다', () => {
  render(<LoginPage />)

  const items = screen.getAllByRole('listitem')
  expect(items[0]).toHaveTextContent('짝, 친구')
  expect(items[1]).toHaveTextContent('외통수')
  expect(items[2]).toHaveTextContent('동료')
})
