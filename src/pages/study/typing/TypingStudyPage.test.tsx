import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import TypingStudyPage from '@/pages/study/typing/TypingStudyPage'

const renderPage = (query = '?count=3&shuffle=0', packId = 'suneung-12') =>
  render(
    <MemoryRouter initialEntries={[`/word-packs/${packId}/study/typing${query}`]}>
      <Routes>
        <Route path="/word-packs/:packId/study/typing" element={<TypingStudyPage />} />
        <Route path="/word-packs/:packId" element={<p>단어팩 상세</p>} />
      </Routes>
    </MemoryRouter>,
  )

const input = () => screen.getByLabelText('뜻을 입력하세요')

test('문제와 입력 칸을 보여주고 확인은 비활성이다', () => {
  renderPage()

  expect(screen.getByText('수능 필수 영단어 Day 12 · 직접 입력')).toBeInTheDocument()
  expect(screen.getByText('뜻을 써 보세요')).toBeInTheDocument()
  expect(screen.getByText('abandon')).toBeInTheDocument()
  expect(screen.getByText('1/3')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '확인' })).toBeDisabled()
})

test('입력하면 확인이 활성된다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(input(), '버리다')

  expect(screen.getByRole('button', { name: '확인' })).toBeEnabled()
})

test('정답이면 정답 피드백과 예문을 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(input(), '버리다')
  await user.click(screen.getByRole('button', { name: '확인' }))

  expect(screen.getByText('정답이에요')).toBeInTheDocument()
  expect(screen.getByText('They had to abandon the car in the snow.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument()
  expect(screen.queryByText(/^정답 /)).not.toBeInTheDocument()
})

test('오답이면 정답을 알려준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(input(), '정확한')
  await user.click(screen.getByRole('button', { name: '확인' }))

  expect(screen.getByText('아쉬워요, 오답노트에 담았어요')).toBeInTheDocument()
  expect(screen.getByText('버리다, 포기하다')).toBeInTheDocument()
})

test('채점한 뒤에는 입력을 고칠 수 없다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(input(), '버리다')
  await user.click(screen.getByRole('button', { name: '확인' }))

  expect(input()).toHaveAttribute('readonly')
})

test('Enter로 확인하고 다시 Enter로 넘어간다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(input(), '버리다')
  await user.keyboard('{Enter}')
  expect(screen.getByText('정답이에요')).toBeInTheDocument()

  await user.keyboard('{Enter}')
  expect(screen.getByText('2/3')).toBeInTheDocument()
  expect(screen.getByText('accurate')).toBeInTheDocument()
  expect(input()).toHaveValue('')
})

test('빈 입력으로는 채점되지 않는다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.keyboard('{Enter}')

  expect(screen.queryByText('정답이에요')).not.toBeInTheDocument()
  expect(screen.queryByText('아쉬워요, 오답노트에 담았어요')).not.toBeInTheDocument()
  expect(screen.getByText('1/3')).toBeInTheDocument()
})

test('마지막 문제까지 풀면 결과를 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  for (const typed of ['버리다', '정확한', '성취하다']) {
    await user.type(input(), typed)
    await user.click(screen.getByRole('button', { name: '확인' }))
    await user.click(screen.getByRole('button', { name: '다음' }))
  }

  expect(screen.getByRole('heading', { name: '아주 잘했어요!' })).toBeInTheDocument()

  const xp = screen.getByText('획득 XP').parentElement as HTMLElement
  expect(within(xp).getByRole('definition')).toHaveTextContent('+6')
})

test('푼 문항이 있을 때 그만하기를 누르면 결과로 간다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(input(), '버리다')
  await user.click(screen.getByRole('button', { name: '확인' }))
  await user.click(screen.getByRole('button', { name: '학습 나가기' }))
  await user.click(screen.getByRole('button', { name: '그만하기' }))

  expect(screen.getByRole('heading', { name: '푼 단어 1' })).toBeInTheDocument()
})

test('없는 단어팩이면 빈 상태를 보여준다', () => {
  renderPage('?count=3', 'unknown-pack')

  expect(screen.getByRole('heading', { name: '단어팩을 찾을 수 없어요' })).toBeInTheDocument()
})
