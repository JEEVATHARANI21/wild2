import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(hover: hover)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    const view = viewRef.current
    if (!dot || !ring || !view) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let rafId = null
    let isMoving = false
    let idleTimer = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      isMoving = true
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        isMoving = false
      }, 2000)
    }

    const animate = () => {
      const dx = mouseX - ringX
      const dy = mouseY - ringY

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || isMoving) {
        ringX += dx * 0.18
        ringY += dy * 0.18
        const transformStr = `translate3d(${ringX}px, ${ringY}px, 0)`
        ring.style.transform = transformStr
        view.style.transform = transformStr
      }

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // Activate VIEW cursor on collection images
    const onEnterImg = () => view.classList.add('active')
    const onLeaveImg = () => view.classList.remove('active')

    const elements = document.querySelectorAll('.collection-item')
    elements.forEach(el => {
      el.addEventListener('mouseenter', onEnterImg)
      el.addEventListener('mouseleave', onLeaveImg)
    })

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onEnterImg)
        el.removeEventListener('mouseleave', onLeaveImg)
      })
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-view" ref={viewRef}>VIEW</div>
    </>
  )
}
