'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { publications } from '@/lib/career'

export default function Research() {
  const reduced = useReducedMotion()
  return (
    <section id="research" className="content-section research-section" aria-labelledby="research-title">
      <div className="content-shell">
        <header className="section-heading">
          <h2 id="research-title">Questions worth<br /><em>staying with.</em></h2>
          <p>Exploring how AI can help us understand language, biological systems, and decisions that matter.</p>
        </header>
        <div className="research-list">
          {publications.map((paper, index) => (
            <motion.article className="research-row" key={paper.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }}
              transition={{ duration: .5, delay: index % 3 * .04 }}>
              <div className="research-meta"><span className={paper.status === 'Published' ? 'research-published' : ''}>{paper.status}</span><span>{paper.year}</span></div>
              <div><h3>{paper.title}</h3><p>{paper.venue}</p></div>
              {paper.doi && <a className="research-link" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" aria-label={`Read ${paper.title}`}>Read paper <FiArrowUpRight aria-hidden="true" /></a>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
