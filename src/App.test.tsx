import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '@/App'

test('홈 경로에서 공통 레이아웃과 홈 콘텐츠를 보여준다', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('navigation', { name: '주요 메뉴' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'WORD MATE' })).toBeInTheDocument()
})
