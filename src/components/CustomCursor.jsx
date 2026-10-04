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

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      view.style.left = ringX + 'px'
      view.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }
    animate()

    // Activate VIEW cursor on collection images
    const onEnterImg = () => view.classList.add('active')
    const onLeaveImg = () => view.classList.remove('active')

    document.querySelectorAll('.collection-item').forEach(el => {
      el.addEventListener('mouseenter', onEnterImg)
      el.addEventListener('mouseleave', onLeaveImg)
    })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
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
