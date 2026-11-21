import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '@/App'

test('홈 경로에서 공통 레이아웃과 메인화면을 보여준다', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('navigation', { name: '주요 메뉴' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('한국님, 오늘도')
  expect(screen.getByRole('heading', { name: '오늘 할 일' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '이어서 학습' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '일일 미션' })).toBeInTheDocument()
})

test('로그인 경로에서는 공통 헤더를 보여주지 않는다', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.queryByRole('navigation', { name: '주요 메뉴' })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'DataGSM으로 로그인' })).toBeInTheDocument()
})
