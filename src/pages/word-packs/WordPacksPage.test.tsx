import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordPacksPage from '@/pages/word-packs/WordPacksPage'

const tab = (name: string) => screen.getByRole('tab', { name })

test('기본 단어팩 탭에서 카테고리 칩과 단어팩을 보여준다', () => {
  render(<WordPacksPage />)

  expect(tab('기본 단어팩')).toHaveAttribute('aria-selected', 'true')
  expect(screen.getByRole('button', { name: '전체' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText('수능 필수 영단어 Day 12')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /새 단어팩/ })).not.toBeInTheDocument()
})

test('카테고리를 고르면 해당 단어팩만 남는다', async () => {
  const user = userEvent.setup()
  render(<WordPacksPage />)

  await user.click(screen.getByRole('button', { name: '토익' }))

  expect(screen.getByText('토익 빈출 동사')).toBeInTheDocument()
  expect(screen.queryByText('수능 필수 영단어 Day 12')).not.toBeInTheDocument()
})

test('이름으로 검색하면 일치하는 단어팩만 남는다', async () => {
  const user = userEvent.setup()
  render(<WordPacksPage />)

  await user.type(screen.getByLabelText('단어팩 이름으로 검색'), 'IT')

  expect(screen.getByText('IT 기술 영어')).toBeInTheDocument()
  expect(screen.queryByText('토익 빈출 동사')).not.toBeInTheDocument()
})

test('조건에 맞는 단어팩이 없으면 빈 상태를 보여준다', async () => {
  const user = userEvent.setup()
  render(<WordPacksPage />)

  await user.type(screen.getByLabelText('단어팩 이름으로 검색'), '없는단어팩')

  expect(screen.getByText('조건에 맞는 단어팩이 없어요')).toBeInTheDocument()
})

test('내 단어팩 탭에서는 새 단어팩 버튼을 보여준다', async () => {
  const user = userEvent.setup()
  render(<WordPacksPage />)

  await user.click(tab('내 단어팩'))

  expect(screen.getByRole('button', { name: /새 단어팩/ })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: '전체' })).not.toBeInTheDocument()
  expect(screen.getByText('중간고사 대비')).toBeInTheDocument()
  expect(screen.getByText('공유 중')).toBeInTheDocument()
})

test('새 단어팩 모달은 이름을 입력해야 만들기가 활성된다', async () => {
  const user = userEvent.setup()
  render(<WordPacksPage />)

  await user.click(tab('내 단어팩'))
  await user.click(screen.getByRole('button', { name: /새 단어팩/ }))

  const dialog = screen.getByRole('dialog', { name: '새 단어팩' })
  expect(dialog).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '만들기' })).toBeDisabled()

  await user.type(screen.getByLabelText('이름'), '기말고사 대비')

  expect(screen.getByText('7/30')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '만들기' })).toBeEnabled()
})

test('새 단어팩 모달을 Escape로 닫는다', async () => {
  const user = userEvent.setup()
  render(<WordPacksPage />)

  await user.click(tab('내 단어팩'))
  await user.click(screen.getByRole('button', { name: /새 단어팩/ }))
  await user.keyboard('{Escape}')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
