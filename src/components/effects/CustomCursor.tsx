'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isProjectCard, setIsProjectCard] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const visibleRef = useRef(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { damping: 28, stiffness: 420, mass: .45 })
  const cursorYSpring = useSpring(cursorY, { damping: 28, stiffness: 420, mass: .45 })

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updatePointerMode = () => setHasFinePointer(pointerQuery.matches)
    updatePointerMode()
    pointerQuery.addEventListener('change', updatePointerMode)

    const syncHoverState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null
      const overProject = Boolean(element?.closest('[data-cursor="project"]'))
      const overInteractive = Boolean(element?.closest('a, button, input, textarea, [role="button"]'))
      setIsProjectCard(overProject)
      setIsHovering(overProject || overInteractive)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerQuery.matches) return

      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setIsVisible(true)
      }
    }

    const handlePointerOver = (event: PointerEvent) => {
      if (!pointerQuery.matches) return
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setIsVisible(true)
      }
      syncHoverState(event.target)
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (!pointerQuery.matches) return
      syncHoverState(event.relatedTarget)
    }

    const hideCursor = () => {
      visibleRef.current = false
      setIsVisible(false)
      setIsProjectCard(false)
      setIsHovering(false)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.addEventListener('pointerout', handlePointerOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', hideCursor)
    window.addEventListener('blur', hideCursor)

    return () => {
      pointerQuery.removeEventListener('change', updatePointerMode)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      document.documentElement.removeEventListener('mouseleave', hideCursor)
      window.removeEventListener('blur', hideCursor)
    }
  }, [cursorX, cursorY])

  if (!hasFinePointer || !isVisible) return null

  return (
    <motion.div
      className="custom-cursor-shell"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden="true"
    >
      {isProjectCard ? (
        <motion.div
          key="project"
          className="project-cursor-bubble"
          initial={{ opacity: 0, scale: .35 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 430, damping: 25 }}
        >
          <FiArrowUpRight />
        </motion.div>
      ) : (
        <motion.div
          key="default"
          className="default-cursor-dot"
          initial={{ opacity: 0, scale: .5 }}
          animate={{
            opacity: 1,
            width: isHovering ? 44 : 14,
            height: isHovering ? 44 : 14,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      )}
    </motion.div>
  )
}
