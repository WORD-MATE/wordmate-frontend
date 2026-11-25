import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { paths } from '@/routes/paths'
import WordPackDetailPage from '@/pages/word-packs/WordPackDetailPage'

const renderPage = () =>
  render(
    <MemoryRouter>
      <WordPackDetailPage />
    </MemoryRouter>,
  )

test('단어팩 이름과 학습 현황을 보여준다', () => {
  renderPage()

  expect(screen.getByRole('heading', { name: '수능 필수 영단어 Day 12' })).toBeInTheDocument()
  expect(screen.getByText('학습 현황')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '학습 시작' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /전체/ })).toHaveAttribute('aria-pressed', 'true')
})

test('상태 필터를 고르면 해당 상태 단어만 남는다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: /암기 완료/ }))

  expect(screen.getByText('abandon')).toBeInTheDocument()
  expect(screen.queryByText('assume')).not.toBeInTheDocument()
})

test('즐겨찾기 필터는 즐겨찾기한 단어만 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('button', { name: /^즐겨찾기/ }))

  expect(screen.getByText('achieve')).toBeInTheDocument()
  expect(screen.queryByText('abandon')).not.toBeInTheDocument()
})

test('즐겨찾기 버튼을 누르면 상태가 바뀐다', async () => {
  const user = userEvent.setup()
  renderPage()

  const favoriteButton = screen.getByRole('button', { name: 'abandon 즐겨찾기' })
  expect(favoriteButton).toHaveAttribute('aria-pressed', 'false')

  await user.click(favoriteButton)

  expect(screen.getByRole('button', { name: 'abandon 즐겨찾기' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('단어나 뜻으로 검색한다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(screen.getByLabelText('단어나 뜻으로 찾기'), '분석')

  expect(screen.getByText('analyze')).toBeInTheDocument()
  expect(screen.queryByText('abandon')).not.toBeInTheDocument()
})

test('조건에 맞는 단어가 없으면 빈 상태를 보여준다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.type(screen.getByLabelText('단어나 뜻으로 찾기'), '없는단어')

  expect(screen.getByText('조건에 맞는 단어가 없어요')).toBeInTheDocument()
})

test('뜻 가리기를 켜면 뜻을 숨긴다', async () => {
  const user = userEvent.setup()
  renderPage()

  const toggle = screen.getByRole('checkbox', { name: '뜻 가리기' })
  expect(toggle).not.toBeChecked()

  await user.click(toggle)

  expect(toggle).toBeChecked()
  expect(screen.getByText('버리다, 포기하다')).toHaveClass('text-transparent')
})

test('없는 단어팩이면 안내와 목록 링크를 보여준다', () => {
  render(
    <MemoryRouter initialEntries={['/word-packs/unknown-pack']}>
      <Routes>
        <Route path={paths.wordPackDetail} element={<WordPackDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: '단어팩을 찾을 수 없어요' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '단어팩 목록으로' })).toHaveAttribute(
    'href',
    paths.wordPacks,
  )
})

test('뜻을 가린 상태에서 뜻을 누르면 그 단어만 보인다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('checkbox', { name: '뜻 가리기' }))
  expect(screen.getByText('버리다, 포기하다')).toHaveClass('text-transparent')

  await user.click(screen.getByRole('button', { name: 'abandon 뜻 보기' }))

  expect(screen.getByText('버리다, 포기하다')).not.toHaveClass('text-transparent')
  expect(screen.getByText('정확한')).toHaveClass('text-transparent')
})

test('펼친 뜻을 다시 누르면 가려진다', async () => {
  const user = userEvent.setup()
  renderPage()

  await user.click(screen.getByRole('checkbox', { name: '뜻 가리기' }))
  await user.click(screen.getByRole('button', { name: 'abandon 뜻 보기' }))
  await user.click(screen.getByRole('button', { name: 'abandon 뜻 숨기기' }))

  expect(screen.getByText('버리다, 포기하다')).toHaveClass('text-transparent')
})

test('뜻 가리기를 껐다 켜면 펼쳐 둔 뜻도 다시 가려진다', async () => {
  const user = userEvent.setup()
  renderPage()

  const toggle = screen.getByRole('checkbox', { name: '뜻 가리기' })
  await user.click(toggle)
  await user.click(screen.getByRole('button', { name: 'abandon 뜻 보기' }))
  await user.click(toggle)
  await user.click(toggle)

  expect(screen.getByText('버리다, 포기하다')).toHaveClass('text-transparent')
})

type FakeVoice = Pick<SpeechSynthesisVoice, 'name' | 'lang' | 'localService'>

function stubSpeechSynthesis(voices: FakeVoice[]) {
  const spoken: { text: string; voice: FakeVoice | null; lang: string }[] = []

  class FakeUtterance {
    text: string
    voice: FakeVoice | null = null
    lang = ''
    constructor(text: string) {
      this.text = text
    }
  }

  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
  vi.stubGlobal('speechSynthesis', {
    getVoices: () => voices,
    speak: (utterance: FakeUtterance) =>
      spoken.push({ text: utterance.text, voice: utterance.voice, lang: utterance.lang }),
    cancel: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  })

  return spoken
}

afterEach(() => {
  // 언마운트 정리가 speechSynthesis를 쓰므로 스텁을 걷어내기 전에 먼저 돌린다.
  cleanup()
  vi.unstubAllGlobals()
})

test('영어 음성이 있으면 그 음성으로 읽는다', async () => {
  const spoken = stubSpeechSynthesis([
    { name: 'Heami', lang: 'ko-KR', localService: true },
    { name: 'Microsoft Zira', lang: 'en-US', localService: true },
  ])
  const user = userEvent.setup()
  renderPage()

  const button = await waitFor(() => {
    const found = screen.getByRole('button', { name: 'abandon 발음 듣기' })
    expect(found).toBeEnabled()
    return found
  })
  await user.click(button)

  expect(spoken).toHaveLength(1)
  expect(spoken[0].text).toBe('abandon')
  expect(spoken[0].voice?.name).toBe('Microsoft Zira')
  expect(spoken[0].lang).toBe('en-US')
})

test('영어 음성이 없으면 발음 버튼을 비활성화한다', () => {
  const spoken = stubSpeechSynthesis([{ name: 'Heami', lang: 'ko-KR', localService: true }])
  renderPage()

  const button = screen.getByRole('button', { name: 'abandon 발음 듣기' })
  expect(button).toBeDisabled()
  expect(button).toHaveAttribute(
    'title',
    '영어 음성이 없어 발음을 재생할 수 없습니다. 운영체제에 영어 음성을 추가해주세요.',
  )
  expect(spoken).toHaveLength(0)
})
