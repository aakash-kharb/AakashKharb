'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skills } from '@/lib/data'

const groups = [
  {
    title: 'Build',
    eyebrow: 'Development',
    description: 'The languages I reach for when an idea needs to become a reliable product.',
    items: skills.development,
  },
  {
    title: 'Scale',
    eyebrow: 'Cloud & DevOps',
    description: 'Infrastructure and delivery tools that keep useful systems useful under pressure.',
    items: skills.cloudDevOps,
  },
  {
    title: 'Learn',
    eyebrow: 'AI & Data',
    description: 'My core layer: modelling, experimentation and turning raw data into decisions.',
    items: skills.aiDataScience,
  },
  {
    title: 'Operate',
    eyebrow: 'Tools & Systems',
    description: 'The everyday environment behind versioned, testable and repeatable work.',
    items: skills.toolsOS,
  },
]

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState(2)
  const displayRef = useRef<HTMLDivElement>(null)
  const displayInView = useInView(displayRef, { once: true, margin: '-15% 0px -15% 0px' })
  const active = groups[activeGroup]

  return (
    <section id="skills" className="content-section skills-section">
      <div className="content-shell skills-shell">
        <header className="skills-compact-heading">
          <h2>One stack.<br /><em>Four ways of thinking.</em></h2>
        </header>

        <div className="skill-console">
          <div className="skill-switcher" role="tablist" aria-label="Skill groups">
            {groups.map((group, index) => (
              <button
                key={group.title}
                type="button"
                role="tab"
                aria-selected={activeGroup === index}
                aria-controls="skill-display"
                className={activeGroup === index ? 'active' : ''}
                onClick={() => setActiveGroup(index)}
                onMouseEnter={() => setActiveGroup(index)}
              >
                <b>{group.title}</b>
                <small>{group.eyebrow}</small>
              </button>
            ))}
          </div>

          <div ref={displayRef} id="skill-display" className="skill-display" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0 }}
                animate={displayInView ? { opacity: 1 } : { opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }}
                  animate={displayInView
                    ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
                    : { opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active.eyebrow}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={displayInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active.description}
                </motion.p>
                <div className="skill-cloud">
                  {active.items.map((skill, index) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, y: 10, scale: .96 }}
                      animate={displayInView
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 10, scale: .96 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.16 + index * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
