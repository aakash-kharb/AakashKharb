'use client'

import { useEffect, useState } from 'react'

interface ZoomIntroProps {
  text?: string
  duration?: number
  children: React.ReactNode
}

// The CSS timeline owns the visual entrance and exit. React only removes the
// already-hidden layer, so a cold bundle can never hold the page hostage.
const MIN_TAIL = 60

export default function ZoomIntro({
  text = 'AAKASH',
  duration = 1800,
  children,
}: ZoomIntroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const letters = text.split('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false)
      return
    }

    /*
     * Both entrance and exit are CSS-only and begin at first paint. This timer
     * follows navigation time and merely removes the layer after its CSS exit.
     */
    const remaining = Math.max(MIN_TAIL, duration - performance.now())
    const timer = window.setTimeout(() => setIsVisible(false), remaining)

    return () => window.clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (!isVisible) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isVisible])

  return (
    <>
      {isVisible && (
        <div role="status" aria-label="Loading Aakash Kharb portfolio" className="intro-screen">
          <div className="intro-topline">
            <span>PORTFOLIO / 2026</span>
            <button type="button" onClick={() => setIsVisible(false)}>
              Skip intro
            </button>
          </div>

          <div className="intro-word" aria-hidden="true">
            {letters.map((letter, index) => (
              <span key={`${letter}-${index}`} style={{ ['--i' as string]: index }}>
                {letter}
              </span>
            ))}
          </div>

          <div className="intro-progress" aria-hidden="true">
            <span>INITIALISING CREATIVE SYSTEM</span>
            <div className="intro-progress-track">
              <div />
            </div>
            <span>100</span>
          </div>
        </div>
      )}

      {children}
    </>
  )
}
