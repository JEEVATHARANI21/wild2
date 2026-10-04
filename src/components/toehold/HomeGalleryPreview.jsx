import { useState } from 'react'
import { GALLERY_IMAGES } from '../../data/galleryData'
import DnaCarousel from '../../../components/DnaCarousel'

export default function HomeGalleryPreview({ onViewFullGallery, onNavigateToGallery, onPlanTrip }) {
  const handleViewGallery = onViewFullGallery || onNavigateToGallery

  const [activeTab, setActiveTab] = useState('all') // 'all' | 'Wild' | 'Birds'
  const [galleryViewMode, setGalleryViewMode] = useState('dna') // 'dna' | 'grid'
  const [selectedImage, setSelectedImage] = useState(null)

  // Filter images based on tab selection
  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (activeTab === 'all') return true
    if (activeTab === 'Wild') return img.category === 'Wild'
    if (activeTab === 'Birds') return img.category === 'Birds'
    return true
  })

  // Format images for DnaCarousel
  const dnaItems = filteredImages.map((img, idx) => ({
    id: img.id || idx,
    title: img.title,
    category: img.category,
    location: img.location,
    src: img.src,
    exif: {
      camera: img.gear ? img.gear.split('·')[0] : 'Nikon Z9',
      lens: img.gear ? img.gear.split('·')[1] || '400mm f/2.8' : '400mm f/2.8',
    },
  }))

  return (
    <section
      id="gallery-preview"
      className="py-20 sm:py-28 bg-[#090A09] border-b border-[#20251f] relative overflow-hidden select-none"
    >
      {/* Warm Ambient Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[350px] sm:h-[450px] bg-[#B87333]/[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
                CURATED WILDLIFE GALLERY
              </span>
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
              Wilderness <span className="italic text-[#D6A85C] font-normal">Moments</span>
            </h2>
          </div>

          {/* Category Filter Tabs, DNA Mode Toggle & CTA */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Mode Switcher: DNA Helix vs Grid */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#121512] border border-[#242923]">
              <button
                onClick={() => setGalleryViewMode('dna')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  galleryViewMode === 'dna'
                    ? 'bg-[#B87333] text-[#080908] font-bold shadow-md'
                    : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                }`}
              >
                <span>🧬 DNA HELIX</span>
              </button>
              <button
                onClick={() => setGalleryViewMode('grid')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  galleryViewMode === 'grid'
                    ? 'bg-[#B87333] text-[#080908] font-bold shadow-md'
                    : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                }`}
              >
                <span>🔳 GRID</span>
              </button>
            </div>

            {/* Species Filter Tabs */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#121512] border border-[#242923]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-md'
                    : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                }`}
              >
                All ({GALLERY_IMAGES.length})
              </button>
              <button
                onClick={() => setActiveTab('Wild')}
                className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'Wild'
                    ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-md'
                    : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                }`}
              >
                Mammals
              </button>
              <button
                onClick={() => setActiveTab('Birds')}
                className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'Birds'
                    ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-md'
                    : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                }`}
              >
                Birds
              </button>
            </div>

            <button
              onClick={handleViewGallery}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_25px_rgba(214,168,92,0.45)] hover:scale-102 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>EXPLORE ALL</span>
              <span className="font-bold">→</span>
            </button>
          </div>
        </div>

        {/* MODE 1: DNA HELIX CAROUSEL */}
        {galleryViewMode === 'dna' ? (
          <div className="w-full relative">
            <div className="text-center mb-2 text-xs font-sans uppercase tracking-[0.25em] text-[#D6A85C]/80">
              🧬 3D DNA Double Helix • Drag or Scroll to rotate helix • Far images blurred & lens-fringed
            </div>
            <DnaCarousel items={dnaItems} />
          </div>
        ) : (
          /* MODE 2: 2D Responsive Image Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 animate-fadeIn">
            {filteredImages.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#111411] border border-[#20251f] hover:border-[#D6A85C]/60 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden bg-[#080908]">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#080908]/80 backdrop-blur-md border border-[#D6A85C]/40 text-[#D6A85C] text-[9.5px] font-sans tracking-widest uppercase font-bold shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Inspect Icon */}
                  <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#080908]/70 backdrop-blur-md border border-[#ffffff]/20 text-[#F2F0E8] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-xl">
                    <span className="text-sm">🔍</span>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <span className="text-[10px] font-sans text-[#D6A85C] tracking-wider uppercase block mb-0.5">
                      📍 {item.location}
                    </span>
                    <h3 className="font-serif text-lg text-[#F2F0E8] font-light leading-snug group-hover:text-[#D6A85C] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-4 bg-[#0e110e] border-t border-[#1e231d] flex flex-col justify-between flex-1">
                  <p className="font-sans text-xs text-[#A7A59B] italic line-clamp-1">
                    {item.species}
                  </p>

                  <div className="mt-2 pt-2 border-t border-[#181c17] flex items-center justify-between text-[10px] text-[#A7A59B] font-mono">
                    <span>{item.gear ? item.gear.split('·')[0] : '400mm f/2.8'}</span>
                    <span className="text-[#D6A85C] group-hover:underline">Inspect Photo →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Full Gallery CTA Bar */}
        <div className="mt-12 sm:mt-16 p-8 rounded-3xl bg-[#0e120f] border border-[#20251f] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="font-serif text-2xl text-[#F2F0E8] font-light">
              Explore Our Complete <span className="italic text-[#D6A85C]">Wilderness Archive</span>
            </h4>
            <p className="font-sans text-xs text-[#A7A59B] mt-1">
              Over 200+ high-definition field expedition photographs captured across India's premier tiger reserves and bird sanctuaries.
            </p>
          </div>

          <button
            onClick={handleViewGallery}
            className="px-6 py-3.5 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>VIEW FULL ARCHIVE</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Lightbox / Specimen Inspection Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] bg-[#040504]/96 backdrop-blur-2xl flex flex-col items-center justify-center p-4 pt-20 md:p-8 md:pt-24 overflow-y-auto animate-fadeIn select-none"
          onClick={() => setSelectedImage(null)}
        >
          {/* Top Bar with Back Button */}
          <div className="max-w-5xl w-full mb-3 flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151815] border border-[#D6A85C]/60 text-[#D6A85C] hover:bg-[#D6A85C] hover:text-[#080908] text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
            >
              <span>←</span>
              <span>Back to Gallery</span>
            </button>

            <button
              onClick={() => setSelectedImage(null)}
              className="px-4 py-2 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#D6A85C] text-xs font-sans font-medium transition-all cursor-pointer"
              title="Close (Go Back)"
            >
              ✕ Close
            </button>
          </div>

          <div
            className="relative max-w-5xl w-full bg-[#0d100d] border border-[#242923] rounded-3xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#080908]/80 border border-[#ffffff]/20 text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-center text-xl transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Full Image Display */}
              <div className="lg:w-3/5 bg-[#050605] flex items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#20251f]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[60vh] lg:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Image Info Panel */}
              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#D6A85C]/15 border border-[#D6A85C]/40 text-[#D6A85C] text-[10px] font-sans tracking-widest uppercase font-bold">
                      {selectedImage.category}
                    </span>
                    <span className="text-xs font-sans text-[#A7A59B]">📍 {selectedImage.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] font-light mb-2">
                    {selectedImage.title}
                  </h3>

                  <p className="font-sans text-xs text-[#D6A85C] italic font-light mb-4">
                    Species: {selectedImage.species}
                  </p>

                  <p className="font-sans text-xs text-[#A7A59B] leading-relaxed mb-6 font-light">
                    {selectedImage.caption || 'Captured during prime habitat activity in high-dynamic lighting conditions.'}
                  </p>

                  <div className="p-4 rounded-xl bg-[#131713] border border-[#20251f] mb-6">
                    <span className="block text-[9px] uppercase tracking-widest text-[#D6A85C] mb-1">
                      EXIF Field Metadata
                    </span>
                    <span className="text-[#F2F0E8] font-mono text-xs block">
                      {selectedImage.gear || '400mm f/2.8 · 1/1000s · ISO 400'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#20251f]">
                  <button
                    onClick={() => {
                      setSelectedImage(null)
                      if (onPlanTrip) onPlanTrip()
                    }}
                    className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_25px_rgba(214,168,92,0.45)] transition-all cursor-pointer text-center"
                  >
                    Enquire This Habitat Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
