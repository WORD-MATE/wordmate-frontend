import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import MultipleChoiceStudyPage from '@/pages/study/multiple-choice/MultipleChoiceStudyPage'

const renderPage = (query = '?count=3&shuffle=0', packId = 'suneung-12') =>
  render(
    <MemoryRouter initialEntries={[`/word-packs/${packId}/study/multiple-choice${query}`]}>
      <Routes>
        <Route
          path="/word-packs/:packId/study/multiple-choice"
          element={<MultipleChoiceStudyPage />}
        />
        <Route path="/word-packs/:packId" element={<p>단어팩 상세</p>} />
      </Routes>
    </MemoryRouter>,
  )

const choices = () => screen.getAllByRole('button', { name: /^\d/ })

const pickCorrect = async (user: ReturnType<typeof userEvent.setup>, meaning: string) => {
  const target = choices().find((button) => button.textContent?.includes(meaning))
  if (!target) throw new Error(`보기에 ${meaning}가 없습니다`)
  await user.click(target)
}

const pickWrong = async (user: ReturnType<typeof userEvent.setup>, meaning: string) => {
  const target = choices().find((button) => !button.textContent?.includes(meaning))
  if (!target) throw new Error('오답 보기를 찾지 못했습니다')
  await user.click(target)
}

test('문제와 보기 4개를 보여준다', () => {
  renderPage()

  expect(screen.getByText('수능 필수 영단어 Day 12 · 4지선다')).toBeInTheDocument()
  expect(screen.getByText('알맞은 뜻을 고르세요')).toBeInTheDocument()
  expect(screen.getByText('abandon')).toBeInTheDocument()
  expect(choices()).toHaveLength(4)
  expect(screen.getByText('1/3')).toBeInTheDocument()
})

test('정답을 고르면 정답 피드백과 예문을 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await pickCorrect(user, '버리다, 포기하다')

  expect(screen.getByText('정답이에요')).toBeInTheDocument()
  expect(screen.getByText('They had to abandon the car in the snow.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument()
})

test('오답을 고르면 오답 피드백과 정답 표시를 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await pickWrong(user, '버리다, 포기하다')

  expect(screen.getByText('아쉬워요, 오답노트에 담았어요')).toBeInTheDocument()
  expect(screen.getAllByRole('img', { name: '정답' })).toHaveLength(1)
  expect(screen.getAllByRole('img', { name: '오답' })).toHaveLength(1)
})

test('답한 뒤에는 보기를 더 고를 수 없다', async () => {
  const user = userEvent.setup()
  renderPage()

  await pickCorrect(user, '버리다, 포기하다')

  choices().forEach((button) => expect(button).toBeDisabled())
})

test('숫자 키로 고르고 Enter로 넘어간다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.keyboard('1')
  expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument()

  await user.keyboard('{Enter}')
  expect(screen.getByText('2/3')).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: '다음' })).not.toBeInTheDocument()
})

test('마지막 문제까지 풀면 결과를 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  for (const meaning of ['버리다, 포기하다', '정확한', '성취하다, 이루다']) {
    await pickCorrect(user, meaning)
    await user.click(screen.getByRole('button', { name: '다음' }))
  }

  expect(screen.getByRole('heading', { name: '아주 잘했어요!' })).toBeInTheDocument()
  expect(screen.getByText('100')).toBeInTheDocument()

  const xp = screen.getByText('획득 XP').parentElement as HTMLElement
  expect(within(xp).getByRole('definition')).toHaveTextContent('+3')
  expect(screen.queryByRole('button', { name: '틀린 단어만 풀기' })).not.toBeInTheDocument()
})

test('틀린 문제가 있으면 틀린 단어만 풀기를 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await pickWrong(user, '버리다, 포기하다')
  await user.click(screen.getByRole('button', { name: '다음' }))
  await pickCorrect(user, '정확한')
  await user.click(screen.getByRole('button', { name: '다음' }))
  await pickCorrect(user, '성취하다, 이루다')
  await user.click(screen.getByRole('button', { name: '다음' }))

  expect(screen.getByText('틀린 1개는 오답노트에 담았어요')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '틀린 단어만 풀기' }))

  expect(screen.getByText('1/1')).toBeInTheDocument()
  expect(screen.getByText('abandon')).toBeInTheDocument()
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
