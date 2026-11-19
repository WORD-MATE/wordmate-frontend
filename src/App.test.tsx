import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '@/App'

test('홈 경로에서 서비스 이름을 보여준다', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'WORD MATE' })).toBeInTheDocument()
})
