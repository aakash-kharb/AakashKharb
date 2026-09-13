'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '@/lib/data'

const categories = [
  ['all', 'All work'],
  ['research', 'Research'],
  ['mle', 'AI / ML'],
  ['sw', 'Software'],
]

export default function Projects2() {
  const [activeFilter, setActiveFilter] = useState('all')
  const visibleProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="content-section projects-section">
      <div className="content-shell">
        <header className="section-heading projects-heading">
          <h2>Things I’ve<br /><em>made real.</em></h2>
          <p>Research, intelligent tools, and software built around real use cases.</p>
        </header>

        <div className="project-filters" role="group" aria-label="Filter projects">
          {categories.map(([id, label]) => (
            <button
              key={id}
              className={activeFilter === id ? 'active' : ''}
              aria-pressed={activeFilter === id}
              onClick={() => setActiveFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.a
                layout
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card ${index % 4 === 0 ? 'project-card-wide' : ''}`}
                data-cursor="project"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, delay: index * 0.035 }}
              >
                <Image
                  src={project.image}
                  alt={`Preview of ${project.title}`}
                  fill
                  quality={92}
                  sizes={index % 4 === 0
                    ? '(max-width: 760px) 100vw, 94vw'
                    : '(max-width: 760px) 100vw, 48vw'}
                  className="project-image"
                />
                <div className="project-overlay" />
                <div className="project-glass" />
                <div className="project-topline">
                  <span>{project.category === 'mle' ? 'AI / ML' : project.category.toUpperCase()}</span>
                </div>
                <div className="project-content">
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="project-title-row">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
