import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FlashcardStudyPage from '@/pages/study/flashcards/FlashcardStudyPage'

const renderPage = (query = '?count=3&shuffle=0', packId = 'suneung-12') =>
  render(
    <MemoryRouter initialEntries={[`/word-packs/${packId}/study/flashcards${query}`]}>
      <Routes>
        <Route path="/word-packs/:packId/study/flashcards" element={<FlashcardStudyPage />} />
        <Route path="/word-packs/:packId" element={<p>단어팩 상세</p>} />
      </Routes>
    </MemoryRouter>,
  )

const answerKnown = () => screen.getByRole('button', { name: '알아요' })
const answerUnknown = () => screen.getByRole('button', { name: '몰라요' })

test('첫 카드와 진행 상황을 보여준다', () => {
  renderPage()

  expect(screen.getByText('수능 필수 영단어 Day 12 · 플래시카드')).toBeInTheDocument()
  expect(screen.getByText('1/3')).toBeInTheDocument()
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
  expect(screen.getByRole('button', { name: 'abandon 카드 뒤집기' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
})

test('카드를 눌러 뒤집는다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: 'abandon 카드 뒤집기' }))

  expect(screen.getByRole('button', { name: 'abandon 카드 뒤집기' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('Space로 뒤집고 방향키로 답한다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.keyboard(' ')
  expect(screen.getByRole('button', { name: 'abandon 카드 뒤집기' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )

  await user.keyboard('{ArrowRight}')
  expect(screen.getByText('2/3')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'accurate 카드 뒤집기' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )

  await user.keyboard('{ArrowLeft}')
  expect(screen.getByText('3/3')).toBeInTheDocument()
})

test('마지막 카드까지 답하면 결과를 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(answerKnown())
  await user.click(answerUnknown())
  await user.click(answerKnown())

  expect(screen.getByRole('heading', { name: '수고했어요!' })).toBeInTheDocument()
  expect(screen.getByText('67')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '푼 단어 3' })).toBeInTheDocument()

  const stats = screen.getByText('알아요').parentElement as HTMLElement
  expect(within(stats).getByRole('definition')).toHaveTextContent('2')
})

test('결과에서 몰라요만 보기로 거를 수 있다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(answerKnown())
  await user.click(answerUnknown())
  await user.click(answerKnown())
  await user.click(screen.getByRole('checkbox', { name: /몰라요만/ }))

  expect(screen.getByText('accurate')).toBeInTheDocument()
  expect(screen.queryByText('abandon')).not.toBeInTheDocument()
})

test('다시 풀기를 누르면 처음부터 시작한다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(answerKnown())
  await user.click(answerKnown())
  await user.click(answerKnown())
  await user.click(screen.getByRole('button', { name: '다시 풀기' }))

  expect(screen.getByText('1/3')).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: '아주 잘했어요!' })).not.toBeInTheDocument()
})

test('나가기를 누르면 멈춤 모달을 띄우고 이어하기로 닫는다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: '학습 나가기' }))

  const dialog = screen.getByRole('dialog', { name: '학습을 멈출까요?' })
  expect(within(dialog).getByText(/지금까지 푼 0문항은 저장돼요/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '이어하기' }))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('푼 문항이 있을 때 그만하기를 누르면 결과로 간다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(answerKnown())
  await user.click(screen.getByRole('button', { name: '학습 나가기' }))
  await user.click(screen.getByRole('button', { name: '그만하기' }))

  expect(screen.getByRole('heading', { name: '푼 단어 1' })).toBeInTheDocument()
})

test('푼 문항이 없을 때 그만하기를 누르면 단어팩으로 돌아간다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: '학습 나가기' }))
  await user.click(screen.getByRole('button', { name: '그만하기' }))

  expect(screen.getByText('단어팩 상세')).toBeInTheDocument()
})

test('없는 단어팩이면 빈 상태를 보여준다', () => {
  renderPage('?count=3', 'unknown-pack')

  expect(screen.getByRole('heading', { name: '단어팩을 찾을 수 없어요' })).toBeInTheDocument()
})
