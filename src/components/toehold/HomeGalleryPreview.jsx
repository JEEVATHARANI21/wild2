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

          {/* Category Filter Tabs & CTA */}
          <div className="flex flex-wrap items-center gap-3">
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

        {/* DNA HELIX CAROUSEL */}
        <div className="w-full relative">
          <DnaCarousel items={dnaItems} />
        </div>

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
          </div>

          <div
            className="relative max-w-5xl w-full bg-[#0d100d] border border-[#242923] rounded-3xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >

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
