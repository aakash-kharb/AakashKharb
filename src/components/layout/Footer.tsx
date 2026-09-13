'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { personalInfo } from '@/lib/data'

const WORD = ['a', 'a', 'k', 'a', 's', 'h'] as const

/*
 * Timings below were measured frame-by-frame (60fps) off the reference footer.
 * The word is uncovered by a mask that rises from the baseline — the glyphs
 * themselves never move or squash — while the marks above pop in on a spring
 * that overshoots ~25% before settling, and the bar draws in from the right.
 */
const LETTER_DURATION = 0.55
const LETTER_STAGGER = 0.08
const LETTER_EASE = [0.33, 1, 0.68, 1] as const

const MARK_DELAY = 0.33
const MARK_STAGGER = 0.065
const MARK_SPRING = { type: 'spring', stiffness: 520, damping: 18, mass: 1 } as const

const BAR_DELAY = 0.72
const BAR_DURATION = 0.53
const BAR_EASE = [0.55, 0, 0.2, 1] as const

/*
 * Each letter is uncovered by a mask travelling across its own box, so the
 * animating edge runs a clean 100% -> 0% and the easing above is not distorted.
 * `.footer-letter` in globals.css sizes that box to contain the whole glyph.
 * Directions alternate: the odd letters sweep in from the left instead of up.
 */
const REVEAL = {
  up: { hidden: 'inset(100% 0% 0% 0%)', shown: 'inset(0% 0% 0% 0%)' },
  left: { hidden: 'inset(0% 100% 0% 0%)', shown: 'inset(0% 0% 0% 0%)' },
} as const

const LETTER_REVEALS = ['up', 'left', 'up', 'left', 'up', 'left'] as const

const MARKS = [
  { className: 'footer-mark-dot', rotate: 0 },
  { className: 'footer-mark-ring', rotate: 0 },
  { className: 'footer-mark-diamond', rotate: 45 },
  { className: 'footer-mark-square', rotate: 0 },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()
  const isInView = useInView(footerRef, { margin: '-18% 0px' })
  // Any part of the footer on screen at all — the second half of the hysteresis
  // below. Deliberately separate from the -18% trigger band above.
  const isTouchingViewport = useInView(footerRef)
  const [animationCycle, setAnimationCycle] = useState(0)
  const canReplay = useRef(true)
  const play = Boolean(reduceMotion || isInView)

  /*
   * Replay when the footer is genuinely revisited, but not when it merely
   * appears to leave. Overscrolling past the bottom — or a long swipe that
   * shows or hides a mobile browser's URL bar — changes the viewport height,
   * which moves the -18% band and makes `isInView` flicker off and back on
   * while the footer never actually left the screen. Re-arming only once the
   * footer is fully out of view ignores that, since it stays visible
   * throughout.
   */
  useEffect(() => {
    if (!isTouchingViewport) {
      canReplay.current = true
      return
    }
    if (isInView && canReplay.current) {
      canReplay.current = false
      setAnimationCycle((cycle) => cycle + 1)
    }
  }, [isInView, isTouchingViewport])

  return (
    <footer ref={footerRef} className="kinetic-footer">
      <div className="kinetic-footer-inner">
        <div className="kinetic-footer-top">
          <div className="kinetic-footer-intro">
            <span>ONE LAST THOUGHT</span>
            <p>“Motivation is temporary but Discipline is permanent.”</p>
          </div>

          <a className="kinetic-footer-email" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email} <FiArrowUpRight aria-hidden="true" />
          </a>

          <nav className="kinetic-footer-links" aria-label="Footer">
            <a className="arrow-link" href={personalInfo.social.github} target="_blank" rel="noreferrer">
              GitHub <span className="tilt-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="arrow-link" href={personalInfo.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span className="tilt-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="arrow-link" href={personalInfo.social.youtube} target="_blank" rel="noreferrer">
              YouTube <span className="tilt-arrow" aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>

        <div key={`marks-${animationCycle}`} className="kinetic-footer-marks" aria-hidden="true">
          {MARKS.map((mark, index) => (
            <motion.i
              key={mark.className}
              className={`footer-mark ${mark.className}`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0, rotate: mark.rotate }}
              animate={play
                ? { opacity: 1, scale: 1, rotate: mark.rotate }
                : { opacity: 0, scale: 0, rotate: mark.rotate }}
              transition={reduceMotion
                ? { duration: 0 }
                : { ...MARK_SPRING, delay: MARK_DELAY + index * MARK_STAGGER }}
            />
          ))}
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={play ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: reduceMotion ? 0 : BAR_DURATION,
              delay: reduceMotion ? 0 : BAR_DELAY,
              ease: BAR_EASE,
            }}
          />
        </div>

        <div key={`word-${animationCycle}`} className="kinetic-footer-word" aria-label="Aakash">
          {WORD.map((character, index) => {
            const reveal = REVEAL[LETTER_REVEALS[index]]
            return (
            <motion.span
              key={`${character}-${index}`}
              className="footer-letter"
              aria-hidden="true"
              initial={reduceMotion ? false : { clipPath: reveal.hidden }}
              animate={{ clipPath: play ? reveal.shown : reveal.hidden }}
              transition={{
                duration: reduceMotion ? 0 : LETTER_DURATION,
                delay: reduceMotion ? 0 : index * LETTER_STAGGER,
                ease: LETTER_EASE,
              }}
            >
              {character}
            </motion.span>
            )
          })}
        </div>

        <div className="kinetic-footer-bottom">
          <span>© {currentYear} Aakash Kharb</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
