import { pickEnglishVoice } from '@/hooks/useEnglishVoice'

const voice = (name: string, lang: string, localService = true) =>
  ({ name, lang, localService, default: false, voiceURI: name }) as SpeechSynthesisVoice

test('영어 음성이 없으면 null을 돌려준다', () => {
  expect(pickEnglishVoice([voice('Heami', 'ko-KR')])).toBeNull()
  expect(pickEnglishVoice([])).toBeNull()
})

test('en-US 로컬 음성을 가장 먼저 고른다', () => {
  const picked = pickEnglishVoice([
    voice('Heami', 'ko-KR'),
    voice('UK English', 'en-GB'),
    voice('Google US English', 'en-US', false),
    voice('Microsoft Zira', 'en-US'),
  ])

  expect(picked?.name).toBe('Microsoft Zira')
})

test('로컬 en-US가 없으면 원격 en-US를 고른다', () => {
  const picked = pickEnglishVoice([voice('Google US English', 'en-US', false)])

  expect(picked?.name).toBe('Google US English')
})

test('en-US가 없으면 다른 영어 음성을 고른다', () => {
  const picked = pickEnglishVoice([voice('Heami', 'ko-KR'), voice('UK English', 'en-GB')])

  expect(picked?.name).toBe('UK English')
})

test('en_US 형태의 로케일 표기도 영어로 인식한다', () => {
  const picked = pickEnglishVoice([voice('Legacy', 'en_US')])

  expect(picked?.name).toBe('Legacy')
})

test('한국어 음성은 영어 단어를 읽는 데 쓰지 않는다', () => {
  expect(pickEnglishVoice([voice('Heami', 'ko-KR'), voice('Yuna', 'ko-KR')])).toBeNull()
})
