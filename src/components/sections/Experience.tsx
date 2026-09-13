'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { experience } from '@/lib/career'
import { useState } from 'react'

export default function Experience() {
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  return (
    <section id="experience" className="content-section experience-section" aria-labelledby="experience-title">
      <div className="content-shell">
        <header className="section-heading">
          <h2 id="experience-title">Ideas meet<br /><em>the real world.</em></h2>
          <p>Research, engineering, and teaching. Different settings, the same instinct to make things useful.</p>
        </header>
        <div className="experience-list">
          {experience.map((item, index) => (
            <motion.article key={item.role} className="experience-row"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }}
              transition={{ duration: .55, delay: index * .04 }}>
              <div className="experience-context"><span>{item.period}</span><p>{item.discipline}</p></div>
              <div className="experience-copy">
                <h3>{item.role}</h3><p className="experience-org">{item.organization}</p>
                <p className="experience-summary">{item.summary}</p>
                <div className="experience-details">
                  <button className="contributions-toggle" id={`contributions-toggle-${index}`} aria-expanded={Boolean(expanded[item.role])} aria-controls={`contributions-${index}`}
                    onClick={() => setExpanded(current => ({ ...current, [item.role]: !current[item.role] }))}>
                    Contributions <FiPlus aria-hidden="true" />
                  </button>
                  <motion.div id={`contributions-${index}`} role="region" aria-labelledby={`contributions-toggle-${index}`} aria-hidden={!expanded[item.role]}
                    initial={false} animate={{ height: expanded[item.role] ? 'auto' : 0, opacity: expanded[item.role] ? 1 : 0 }}
                    transition={{ height: { duration: reduced ? 0 : .4, ease: [.22, 1, .36, 1] }, opacity: { duration: reduced ? 0 : .22 } }}
                    className="contributions-panel">
                    <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
