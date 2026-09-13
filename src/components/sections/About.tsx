'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import { personalInfo } from '@/lib/data'

const focusAreas = [
  ['Intelligent products', 'Applied AI that solves a clear human problem.'],
  ['Cloud systems', 'Reliable infrastructure built for real-world scale.'],
  ['Research mindset', 'Curiosity, experimentation and evidence in every build.'],
]

export default function About() {
  return (
    <section id="about" className="content-section about-section">
      <div className="content-shell">
        <motion.header
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7 }}
        >
          <h2>Curious by nature.<br /><em>Precise by practice.</em></h2>
          <p>A little context behind the code.</p>
        </motion.header>

        <div className="about-layout">
          <motion.div
            className="about-portrait-wrap"
            initial={{ opacity: 0, clipPath: 'inset(12% 0 12% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Aakash Kharb"
              fill
              quality={94}
              sizes="(max-width: 900px) calc(100vw - 2rem), 41vw"
              className="about-portrait"
            />
            <span className="portrait-location"><FiMapPin /> Rohtak, India</span>
          </motion.div>

          <div className="about-copy">
            <motion.p
              className="about-lede"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              I’m Aakash—an AI &amp; ML engineer interested in the point where ambitious technology becomes
              genuinely useful.
            </motion.p>
            <p className="about-body">{personalInfo.bio}</p>

            <div className="about-facts">
              <div><b>15+</b><span>Projects built</span></div>
              <div><b>4</b><span>Core disciplines</span></div>
              <div><b>∞</b><span>Things to learn</span></div>
            </div>

            <div className="focus-list">
              {focusAreas.map(([title, copy], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                >
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.div>
              ))}
            </div>

            <a className="text-link" href={`mailto:${personalInfo.email}`}>
              Let’s make something useful <FiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
