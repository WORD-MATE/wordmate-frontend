import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import StudySettingsPage from '@/pages/study/StudySettingsPage'

const renderPage = (packId = 'suneung-12') =>
  render(
    <MemoryRouter initialEntries={[`/word-packs/${packId}/study`]}>
      <Routes>
        <Route path="/word-packs/:packId/study" element={<StudySettingsPage />} />
      </Routes>
    </MemoryRouter>,
  )

const summaryValue = (term: string) =>
  within(screen.getByText(term).parentElement as HTMLElement).getByRole('definition').textContent

test('기본값으로 4지선다 · 영어 → 한국어 · 10문항을 보여준다', () => {
  renderPage()

  expect(screen.getByRole('heading', { name: '학습 설정' })).toBeInTheDocument()
  expect(screen.getByRole('radio', { name: /4지선다/ })).toHaveAttribute('aria-checked', 'true')
  expect(screen.getByRole('radio', { name: '영어 보고 뜻 맞히기' })).toHaveAttribute(
    'aria-checked',
    'true',
  )
  expect(screen.getByRole('radio', { name: '10문항' })).toHaveAttribute('aria-checked', 'true')

  expect(summaryValue('방식')).toBe('4지선다')
  expect(summaryValue('방향')).toBe('영어 → 한국어')
  expect(summaryValue('문항')).toBe('10문항 · 섞어서')
  expect(summaryValue('예상 시간')).toBe('약 1분')
  expect(summaryValue('최대 XP')).toBe('+10 XP')
  expect(screen.getByRole('link', { name: '10문항 시작하기' })).toBeInTheDocument()
})

test('학습 방식을 바꾸면 요약의 방식과 최대 XP가 바뀐다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('radio', { name: /직접 입력/ }))

  expect(summaryValue('방식')).toBe('직접 입력')
  expect(summaryValue('최대 XP')).toBe('+20 XP')
})

test('플래시카드는 XP 없음으로 표시한다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('radio', { name: /플래시카드/ }))

  expect(summaryValue('최대 XP')).toBe('XP 없음')
})

test('출제 방향을 바꾸면 요약의 방향이 바뀐다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('radio', { name: '뜻 보고 영어 맞히기' }))

  expect(summaryValue('방향')).toBe('한국어 → 영어')
})

test('전체를 고르면 문항 수와 예상 시간, 버튼 라벨이 바뀐다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('radio', { name: '전체 24' }))

  expect(summaryValue('문항')).toBe('24문항 · 섞어서')
  expect(summaryValue('예상 시간')).toBe('약 3분')
  expect(screen.getByRole('link', { name: '24문항 시작하기' })).toBeInTheDocument()
})

test('순서 섞기를 끄면 순서대로로 바뀐다', async () => {
  const user = userEvent.setup()
  renderPage()

  const shuffle = screen.getByRole('checkbox', { name: /순서 섞기/ })
  expect(shuffle).toBeChecked()

  await user.click(shuffle)

  expect(shuffle).not.toBeChecked()
  expect(summaryValue('문항')).toBe('10문항 · 순서대로')
})

test('없는 단어팩이면 빈 상태를 보여준다', () => {
  renderPage('unknown-pack')

  expect(screen.getByRole('heading', { name: '단어팩을 찾을 수 없어요' })).toBeInTheDocument()
})

test('방향 축에서 화살표 키로 선택을 옮긴다', async () => {
  const user = userEvent.setup()
  renderPage()

  const selected = screen.getByRole('radio', { name: '영어 보고 뜻 맞히기' })
  selected.focus()
  await user.keyboard('{ArrowRight}')

  const next = screen.getByRole('radio', { name: '뜻 보고 영어 맞히기' })
  expect(next).toHaveAttribute('aria-checked', 'true')
  expect(next).toHaveFocus()
  expect(summaryValue('방향')).toBe('한국어 → 영어')
})

test('학습 방식 축에서 화살표 키로 선택을 옮긴다', async () => {
  const user = userEvent.setup()
  renderPage()

  screen.getByRole('radio', { name: /4지선다/ }).focus()
  await user.keyboard('{ArrowLeft}')

  expect(screen.getByRole('radio', { name: /플래시카드/ })).toHaveAttribute('aria-checked', 'true')
  expect(summaryValue('방식')).toBe('플래시카드')
})

test('선택된 항목만 탭 순서에 들어간다', () => {
  renderPage()

  expect(screen.getByRole('radio', { name: '10문항' })).toHaveAttribute('tabindex', '0')
  expect(screen.getByRole('radio', { name: '20문항' })).toHaveAttribute('tabindex', '-1')
  expect(screen.getByRole('radio', { name: '전체 24' })).toHaveAttribute('tabindex', '-1')
})
