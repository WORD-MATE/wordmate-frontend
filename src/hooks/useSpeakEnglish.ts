import { useCallback, useEffect } from 'react'
import { useEnglishVoice } from '@/hooks/useEnglishVoice'

export const NO_ENGLISH_VOICE_TITLE =
  '영어 음성이 없어 발음을 재생할 수 없습니다. 운영체제에 영어 음성을 추가해주세요.'

export function useSpeakEnglish() {
  const voice = useEnglishVoice()

  const speak = useCallback(
    (text: string) => {
      if (!voice) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voice
      utterance.lang = voice.lang
      window.speechSynthesis.speak(utterance)
    },
    [voice],
  )

  useEffect(() => {
    if (!voice) return
    return () => window.speechSynthesis.cancel()
  }, [voice])

  return {
    speak,
    canSpeak: voice !== null,
    unavailableTitle: voice ? undefined : NO_ENGLISH_VOICE_TITLE,
  }
}
