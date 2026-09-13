'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import { useRef } from 'react'
import { personalInfo } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'

const roles = ['Generative AI', 'ML Engineering', 'Cloud Systems', 'Creative Code']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '26%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const fade = useTransform(scrollYProgress, [0, 0.82], [1, 0])

  return (
    <section ref={sectionRef} id="hero" className="hero-shell">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <motion.div style={{ opacity: fade }} className="hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-coordinates">28.89° N / 76.61° E</span>
        </div>

        <motion.div style={{ y: titleY }} className="hero-name-wrap">
          <p className="hero-overline">AI / ML ENGINEER · CREATIVE DEVELOPER</p>
          <h1 className="hero-name" aria-label="Aakash">
            AAKASH
          </h1>
        </motion.div>

        <motion.div style={{ y: contentY }} className="hero-bottom">
          <div className="hero-statement">
            <h2>
              I build intelligence
              <br />
              <em>people can use.</em>
            </h2>
          </div>

          <div className="hero-copy">
            <p>
              I turn complex AI, data and cloud systems into useful digital products—designed with clarity,
              built to ship, and made to last.
            </p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => scrollToSection('projects')}>
                Explore work <FiArrowUpRight aria-hidden="true" />
              </button>
              <a className="button-text" href={`mailto:${personalInfo.email}`}>
                Start a conversation
              </a>
            </div>
          </div>
        </motion.div>

        <button className="hero-scroll" onClick={() => scrollToSection('about')} aria-label="Scroll to about">
          <span>Scroll to discover</span>
          <FiArrowDown aria-hidden="true" />
        </button>
      </motion.div>

      <div className="hero-ticker" aria-label="Areas of expertise">
        <div className="hero-ticker-track">
          {[...roles, ...roles].map((role, index) => (
            <span key={`${role}-${index}`}>
              {role} <b>↗</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
