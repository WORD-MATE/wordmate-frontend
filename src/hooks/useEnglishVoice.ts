import { useEffect, useState } from 'react'

const normalize = (lang: string) => lang.replace('_', '-').toLowerCase()

export function pickEnglishVoice(voices: SpeechSynthesisVoice[]) {
  const english = voices.filter((voice) => normalize(voice.lang).startsWith('en'))
  if (english.length === 0) return null

  return (
    english.find((voice) => normalize(voice.lang) === 'en-us' && voice.localService) ??
    english.find((voice) => normalize(voice.lang) === 'en-us') ??
    english[0]
  )
}

export function useEnglishVoice() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    if (!supported) return

    const sync = () => setVoice(pickEnglishVoice(window.speechSynthesis.getVoices()))
    sync()
    // 음성 목록은 비동기로 채워지므로 준비되면 다시 고른다.
    window.speechSynthesis.addEventListener('voiceschanged', sync)

    return () => window.speechSynthesis.removeEventListener('voiceschanged', sync)
  }, [supported])

  return voice
}
