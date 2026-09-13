'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiArrowUpRight, FiCheck, FiCopy, FiX } from 'react-icons/fi'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { personalInfo } from '@/lib/data'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [brief, setBrief] = useState('')
  const [draftPrepared, setDraftPrepared] = useState(false)
  const [preparedDraftHref, setPreparedDraftHref] = useState('')
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!dialogOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 180)
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDialogOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [dialogOpen])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${personalInfo.email}`
    }
  }

  const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = `Portfolio conversation with ${name.trim()}`
    const body = `Hi Aakash,\n\n${brief.trim()}\n\n— ${name.trim()}`
    const draftHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setPreparedDraftHref(draftHref)
    setDraftPrepared(true)
    window.requestAnimationFrame(() => {
      window.location.href = draftHref
    })
  }

  const openDialog = () => {
    if (draftPrepared) {
      setName('')
      setBrief('')
      setPreparedDraftHref('')
    }
    setDraftPrepared(false)
    setDialogOpen(true)
  }

  return (
    <>
      <section id="contact" className="content-section contact-section">
        <div className="content-shell">
          <motion.div
            className="contact-main"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.75 }}
          >
            <h2>Have a hard problem?<br /><em>Let’s make it simple.</em></h2>
            <button type="button" onClick={openDialog} className="contact-orb" aria-haspopup="dialog">
              <FiArrowUpRight />
              <span>LET’S TALK</span>
            </button>
          </motion.div>

          <div className="contact-grid">
            <div className="contact-email-card">
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              <button onClick={copyEmail} type="button">
                <FiCopy /> {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="contact-note">
              <p>
                Tell me what you’re building, what is not working, or what currently feels impossible. I’ll reply
                with a clear next step.
              </p>
              <div>
                <a className="arrow-link" href={personalInfo.social.github} target="_blank" rel="noreferrer">
                  GitHub <span className="tilt-arrow" aria-hidden="true">↗</span>
                </a>
                <a className="arrow-link" href={personalInfo.social.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <span className="tilt-arrow" aria-hidden="true">↗</span>
                </a>
                <a className="arrow-link" href={personalInfo.social.youtube} target="_blank" rel="noreferrer">
                  YouTube <span className="tilt-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            className="contact-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setDialogOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-dialog-title"
              className="contact-dialog"
              initial={{ opacity: 0, y: 36, scale: .96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: .97 }}
              transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="contact-dialog-topline">
                <button type="button" onClick={() => setDialogOpen(false)} aria-label="Close contact form">
                  <FiX />
                </button>
              </div>

              <div className="contact-dialog-layout">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={draftPrepared ? 'prepared-copy' : 'form-copy'}
                    className="contact-dialog-copy"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 id="contact-dialog-title">
                      {draftPrepared ? <>Consider it<br /><em>in motion.</em></> : <>What should we<br /><em>make useful?</em></>}
                    </h3>
                    <p>
                      {draftPrepared
                        ? 'Your draft is ready in your mail app. I’ll keep an eye out for your message.'
                        : 'Two details are enough. I’ll turn them into a draft you can review in your mail app.'}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait" initial={false}>
                  {draftPrepared ? (
                    <motion.div
                      key="acknowledgement"
                      className="contact-dialog-ack"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="contact-dialog-check" aria-hidden="true"><FiCheck /></span>
                      <div>
                        <span>Draft prepared</span>
                        <h4>Thank you, {name.trim()}.</h4>
                        <p>The final send remains in your hands. From this side, the conversation has already begun.</p>
                      </div>
                      <div className="contact-dialog-ack-actions">
                        <button type="button" onClick={() => setDialogOpen(false)}>Done</button>
                        <a href={preparedDraftHref}>Open draft again <FiArrowRight /></a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      onSubmit={prepareEmail}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: .3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="contact-field">
                        <label htmlFor="contact-name">Your name</label>
                        <input
                          ref={nameInputRef}
                          id="contact-name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="How should I address you?"
                          autoComplete="name"
                          required
                        />
                      </div>

                      <div className="contact-field contact-field-brief">
                        <label htmlFor="contact-brief">The short version</label>
                        <textarea
                          id="contact-brief"
                          value={brief}
                          onChange={(event) => setBrief(event.target.value)}
                          placeholder="An idea, project, or difficult problem…"
                          rows={3}
                          required
                        />
                      </div>

                      <button type="submit" className="contact-dialog-submit">
                        Create my draft <FiArrowRight />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
