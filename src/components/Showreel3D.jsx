import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GALLERY_IMAGES } from '../data/galleryData'

const SHOWREEL_IMAGES = GALLERY_IMAGES

export default function Showreel3D() {
  const containerRef = useRef(null)
  const [activeItem, setActiveItem] = useState(SHOWREEL_IMAGES[0])
  const [isRotating, setIsRotating] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene, Camera, Renderer (Optimized pixelRatio capped at 1.5 to save GPU memory)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 8.5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    // Lighting (Lighter standard lighting model)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xfff8ee, 1.5)
    directionalLight.position.set(4, 6, 5)
    scene.add(directionalLight)

    // Group for carousel cylinder
    const group = new THREE.Group()
    scene.add(group)

    // Geometry & Texture Loader (Low polygon count for max 60+ FPS)
    const textureLoader = new THREE.TextureLoader()
    const cardGeometry = new THREE.PlaneGeometry(1.6, 2.2, 1, 1)

    const count = SHOWREEL_IMAGES.length
    const radius = 4.2
    const meshes = []
    const materials = []
    const textures = []

    SHOWREEL_IMAGES.forEach((item, index) => {
      const angle = (index / count) * Math.PI * 2

      const texture = textureLoader.load(item.src)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false // Reduces GPU texture upload time & VRAM
      textures.push(texture)

      // MeshStandardMaterial is significantly faster to render than MeshPhysicalMaterial
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.35,
        metalness: 0.05,
      })
      materials.push(material)

      const mesh = new THREE.Mesh(cardGeometry, material)
      mesh.position.x = Math.sin(angle) * radius
      mesh.position.z = Math.cos(angle) * radius
      mesh.position.y = Math.sin(index * 0.8) * 0.25
      mesh.rotation.y = angle

      mesh.userData = { id: item.id, item: item, angle: angle }
      group.add(mesh)
      meshes.push(mesh)
    })

    group.rotation.x = 0.08

    // Interactive Drag
    let isDragging = false
    let prevMouseX = 0
    let targetRotationY = 0
    let autoRotate = true

    const onMouseDown = (e) => {
      isDragging = true
      autoRotate = false
      prevMouseX = e.clientX
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      prevMouseX = e.clientX
      targetRotationY += deltaX * 0.006
    }

    const onMouseUp = () => {
      isDragging = false
      setTimeout(() => {
        let closestMesh = meshes[0]
        let maxZ = -999
        meshes.forEach((m) => {
          const worldPos = new THREE.Vector3()
          m.getWorldPosition(worldPos)
          if (worldPos.z > maxZ) {
            maxZ = worldPos.z
            closestMesh = m
          }
        })
        if (closestMesh && closestMesh.userData.item) {
          setActiveItem(closestMesh.userData.item)
        }
      }, 100)
    }

    // Raycaster for clicking cards directly
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(meshes)
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object
        const item = clickedMesh.userData.item
        if (item) {
          setActiveItem(item)
          targetRotationY = -clickedMesh.userData.angle
        }
      }
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    domEl.addEventListener('click', onClick)

    // Touch support
    let touchStartX = 0
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
      autoRotate = false
    }
    const onTouchMove = (e) => {
      const deltaX = e.touches[0].clientX - touchStartX
      touchStartX = e.touches[0].clientX
      targetRotationY += deltaX * 0.006
    }
    const onTouchEnd = () => {
      onMouseUp()
      setTimeout(() => {
        autoRotate = true
      }, 2500)
    }
    domEl.addEventListener('touchstart', onTouchStart, { passive: true })
    domEl.addEventListener('touchmove', onTouchMove, { passive: true })
    domEl.addEventListener('touchend', onTouchEnd, { passive: true })

    // Only render when the section is in view to conserve CPU/GPU
    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    // Render loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Skip render calculations when scrolled out of view
      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      if (autoRotate && isRotating) {
        targetRotationY += 0.002
      }

      // Smooth damping interpolation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.08

      // Floating wave animation on cards
      for (let i = 0; i < meshes.length; i++) {
        meshes[i].position.y = Math.sin(elapsedTime * 1.5 + i) * 0.18
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      domEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      domEl.removeEventListener('click', onClick)
      domEl.removeEventListener('touchstart', onTouchStart)
      domEl.removeEventListener('touchmove', onTouchMove)
      domEl.removeEventListener('touchend', onTouchEnd)
      if (container.contains(domEl)) {
        container.removeChild(domEl)
      }
      cardGeometry.dispose()
      materials.forEach((m) => m.dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()
    }
  }, [isRotating])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', background: '#090A09' }}>
      {/* Editorial Large Typography header in Pacôme Pertant style */}
      <div className="relative z-10 pt-20 sm:pt-28 px-5 sm:px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pointer-events-none">
        <div>
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#A7A59B]">
              3D Interactive Showreel · Motion & Specimen
            </p>
          </div>
          <h2
            className="font-serif text-[#F1EFE8] leading-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight"
          >
            Tactile Biology
          </h2>
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-4 py-2 rounded-full border border-[#2A2B28] text-[#F1EFE8] text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:bg-[#F1EFE8] hover:text-[#0B0C0A]"
          >
            {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
          </button>
          <span className="text-xs text-[#A7A59B] hidden md:inline font-sans">
            [ Drag to rotate · Click card to focus ]
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[68vh] md:h-[76vh] relative cursor-grab active:cursor-grabbing"
      />

      {/* Active Card HUD Info Panel */}
      <div className="relative z-10 pb-8 px-5 sm:px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-5 sm:gap-6 border-t border-[#2A2B28]/60 pt-5 sm:pt-6">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="font-serif text-3xl md:text-5xl text-[#F1EFE8]/30 font-light">
            {String(activeItem.id).padStart(2, '0')}
          </span>
          <div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-emerald-400 font-sans mb-0.5 sm:mb-1">
              {activeItem.category}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl md:text-4xl text-[#F1EFE8] font-light">
              {activeItem.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-xs text-[#A7A59B] font-sans">
          <div>
            <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-[#666] mb-0.5">Location</span>
            <span className="text-[#F1EFE8]">{activeItem.location}</span>
          </div>
          <div className="hidden xs:block">
            <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-[#666] mb-0.5">Format</span>
            <span className="text-[#F1EFE8]">High-Res Specimen</span>
          </div>
          <a
            href="#work"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#2A2B28] flex items-center justify-center text-[#F1EFE8] hover:border-emerald-500 transition-colors"
            title="Explore Collection"
          >
            ↗
          </a>
        </div>
      </div>
    </section>
  )
}
