'use client'

import { motion } from 'framer-motion'
import { education } from '@/lib/data'

export default function Education() {
  return (
    <section id="education" className="content-section journey-section">
      <div className="content-shell">
        <header className="section-heading">
          <h2>Built through<br /><em>practice and proof.</em></h2>
          <p>The foundations behind the work.</p>
        </header>

        <div className="journey-list">
          {education.map((item, index) => (
            <motion.article
              key={`${item.degree}-${item.duration}`}
              className={item.cgpa ? 'journey-card journey-card-current' : 'journey-card'}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <div className="journey-time">
                <span className="journey-dot" aria-hidden="true" />
                <span className="journey-year">{item.duration}</span>
              </div>
              <div className="journey-main">
                <h3>{item.degree}</h3>
                <p>{item.field}</p>
                <small><span>{item.institution}</span><span>{item.location}</span></small>
              </div>
              <div className="journey-extra">
                <b>{item.cgpa ? `CGPA · ${item.cgpa}` : `SCORE · ${item.percentage}`}</b>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
