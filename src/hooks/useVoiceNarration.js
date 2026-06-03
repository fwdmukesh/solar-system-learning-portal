import { useState, useCallback, useRef, useEffect } from 'react'

export function useVoiceNarration() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const utteranceRef = useRef(null)

  useEffect(() => {
    if (!window.speechSynthesis) {
      setIsSupported(false)
    }
  }, [])

  const speak = useCallback((text, options = {}) => {
    if (!window.speechSynthesis || !text) return

    // Stop any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = options.rate || 0.9
    utterance.pitch = options.pitch || 1.1
    utterance.volume = options.volume || 1

    // Try to find a child-friendly voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (v) => v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Female')
    )
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const pause = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause()
    }
  }, [])

  const resume = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume()
    }
  }, [])

  return { speak, stop, pause, resume, isSpeaking, isSupported }
}
