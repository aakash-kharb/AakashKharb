'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiFileText, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { personalInfo } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'
import { navigationItems as navItems } from '@/lib/siteConfig'


export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    if (!sections.length) return

    /*
     * A single reading line decides which section is current. The previous
     * IntersectionObserver could not: its rootMargin left a band roughly 12% of
     * the viewport tall, and every section is taller than the viewport, so the
     * intersection ratio topped out near 0.09 and the 0.1 / 0.35 thresholds
     * never fired. Journey and Contact never lit up at all as a result.
     */
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 28)

      const line = window.scrollY + window.innerHeight * 0.28
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top + window.scrollY <= line) current = section
      }

      // Once the page cannot scroll further the last section is what you are
      // looking at, however the reading line happens to fall.
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atEnd) current = sections[sections.length - 1]

      setActiveSection(current.id)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const goTo = (id: string) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
      >
        <nav className="site-nav" aria-label="Primary navigation">
          <button className="nav-logo" onClick={() => goTo('hero')} aria-label="Back to top">
            <span>AK</span>
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={activeSection === item.id ? 'is-active' : ''}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <a className="nav-cv-link" href="https://drive.google.com/file/d/1I6VM0yqsHBp9y7ls7UaJqgL5zqszSz1t/view?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="View CV (opens in a new tab)" title="View CV">
              <FiFileText aria-hidden="true" />
            </a>
            <button className="nav-icon-button" onClick={toggleTheme} aria-label="Toggle color theme">
              {mounted && (resolvedTheme === 'dark' ? <FiSun /> : <FiMoon />)}
            </button>
            <button
              className="nav-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <FiMenu />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-top">
              <span className="nav-logo"><span>AK</span></span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><FiX /></button>
            </div>
            <div className="mobile-menu-links">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={activeSection === item.id ? 'is-active' : ''}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + index * 0.045 }}
                  onClick={() => goTo(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  <FiArrowUpRight />
                </motion.button>
              ))}
            </div>
            <div className="mobile-menu-footer">
              <a href={personalInfo.social.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={`mailto:${personalInfo.email}`}>Email ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
