"use client";

import { createContext, useContext, useState, useEffect } from 'react'
import { TOURS_DATA } from '../data/photoToursData'
import { GALLERY_IMAGES } from '../data/galleryData'

const STORAGE_KEY = 'vm_wild_site_content_v9'

export const normalizeTour = (tour) => {
  return {
    ...tour,
    vehicleLogistics: tour.vehicleLogistics || 'Guaranteed Open-top 4x4 Gypsy · Max 4 photographers (1 per row) · 360° unobstructed panning',
    fieldMasterclass: tour.fieldMasterclass || 'Daily in-Gypsy mentoring by Vijay Mathew on exposure compensation, histogram tracking, and animal anticipation, with evening RAW critiques in Lightroom.',
    whereYouStay: {
      title: tour.whereYouStay?.title || 'Luxury Eco-Lodges & Heritage Tented Camps',
      description: tour.whereYouStay?.description || 'All accommodation is handpicked for proximity to park gates, hot-water en-suite bathrooms, high-speed charging stations, and delicious chef-prepared meals.',
      note: tour.whereYouStay?.note || 'Confirmed based on your dates and room preferences during the booking process.',
    },
    itinerary: (tour.itinerary && tour.itinerary.length > 0)
      ? tour.itinerary
      : [
          {
            day: 1,
            title: `Arrival ${tour.destination || 'Reserve'} & Sunset Safari`,
            desc: `Check-in at heritage camp. First safari tracking predator trails around ${tour.destination || 'the park'}.`,
            photoTip: 'Golden hour field technique: Low vehicle perspective with 1-on-1 mentorship by Vijay Mathew.',
          },
          {
            day: 2,
            title: 'Dawn & Dusk Prime Core Drives',
            desc: 'Morning and evening drives in prime lake and corridor zones with maximum predator density.',
            photoTip: 'Golden hour field technique: Low vehicle perspective with 1-on-1 mentorship by Vijay Mathew.',
          },
          {
            day: 3,
            title: 'Morning Safari & Naturalist Masterclass',
            desc: 'Early morning game drive followed by afternoon guided architectural / habitat walk.',
            photoTip: 'Golden hour field technique: Low vehicle perspective with 1-on-1 mentorship by Vijay Mathew.',
          },
          {
            day: 4,
            title: 'Dawn Farewell Safari & Departure',
            desc: 'Final sunrise drive. Brunch, portfolio review, and departure transfer.',
            photoTip: 'Golden hour field technique: Low vehicle perspective with 1-on-1 mentorship by Vijay Mathew.',
          },
        ],
    inclusions: (tour.inclusions && tour.inclusions.length > 0)
      ? tour.inclusions
      : [
          '5 Core Zone Gypsy Safaris with priority allotment',
          '3 Nights Heritage Glamping stay',
          'All gourmet Rajasthani & Continental meals',
          'Guided by VM Wild Expeditions skipper',
          'All park permits and naturalist guide charges',
        ],
    exclusions: (tour.exclusions && tour.exclusions.length > 0)
      ? tour.exclusions
      : [
          `Travel to/from ${tour.destination || 'destination'}`,
          'Camera charges',
        ],
  }
}

export const DEFAULT_CONTENT = {
  brand: {
    siteName: 'VM Wild Expeditions',
    tagline: 'Beyond the Map. Into the Wild.',
    logoUrl: '/logo-clean.png',
  },
  social: {
    instagramUrl: 'https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz',
    instagramHandle: '@vm_wild_expeditions',
    whatsappNumber: '919087394546',
    contactEmail: 'admissions@vmwild.com',
  },
  hero: {
    eyebrow: 'THE PINNACLE OF WILDLIFE PHOTOGRAPHY',
    headlinePart1: 'Bespoke Photographic',
    headlinePart2: 'Expeditions',
    description: 'Masterclass field tracking, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation with expedition mentors across India’s wildest national parks.',
    heroBgImage: '/images/home-bg.png',
  },
  founders: TOURS_DATA.founders || [],
  animalTours: (TOURS_DATA.animalTours || []).map(normalizeTour),
  birdTours: (TOURS_DATA.birdTours || []).map(normalizeTour),
  galleryImages: GALLERY_IMAGES || [],
}

const SiteContentContext = createContext(DEFAULT_CONTENT)

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          return {
            ...DEFAULT_CONTENT,
            ...parsed,
            brand: { ...DEFAULT_CONTENT.brand, ...(parsed.brand || {}) },
            social: { ...DEFAULT_CONTENT.social, ...(parsed.social || {}) },
            hero: { ...DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
            animalTours: (parsed.animalTours || DEFAULT_CONTENT.animalTours).map(normalizeTour),
            birdTours: (parsed.birdTours || DEFAULT_CONTENT.birdTours).map(normalizeTour),
          }
        }
      } catch (e) {
        console.error('Failed to load saved site content', e)
      }
    }
    return DEFAULT_CONTENT
  })

  const [lastSaveStatus, setLastSaveStatus] = useState({ success: true, message: '' })

  // Persist to localStorage whenever content updates
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const serialized = JSON.stringify(content)
      localStorage.setItem(STORAGE_KEY, serialized)
      setLastSaveStatus({ success: true, message: 'Saved successfully' })
    } catch (e) {
      console.error('Failed to save site content to localStorage', e)
      const isQuota = e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014
      const msg = isQuota
        ? 'Browser storage quota reached. Please use a smaller image URL or export a backup.'
        : 'Could not save to browser storage.'
      setLastSaveStatus({ success: false, message: msg })
    }
  }, [content])

  const updateBrand = (newBrand) => {
    setContent((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...newBrand },
    }))
  }

  const updateSocial = (newSocial) => {
    setContent((prev) => ({
      ...prev,
      social: { ...prev.social, ...newSocial },
    }))
  }

  const updateHero = (newHero) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...newHero },
    }))
  }

  const updateFounders = (newFounders) => {
    setContent((prev) => ({
      ...prev,
      founders: newFounders,
    }))
  }

  const updateFounder = (index, founderData) => {
    setContent((prev) => {
      const updated = [...prev.founders]
      updated[index] = { ...updated[index], ...founderData }
      return { ...prev, founders: updated }
    })
  }

  const updateTours = (category, newTours) => {
    setContent((prev) => ({
      ...prev,
      [category === 'animals' ? 'animalTours' : 'birdTours']: newTours,
    }))
  }

  const updateSingleTour = (category, tourId, tourData) => {
    const key = category === 'animals' ? 'animalTours' : 'birdTours'
    setContent((prev) => ({
      ...prev,
      [key]: prev[key].map((t) => (t.id === tourId ? { ...t, ...tourData } : t)),
    }))
  }

  const updateTourById = (tourId, tourData) => {
    setContent((prev) => {
      const isAnimal = prev.animalTours.some((t) => t.id === tourId)
      const key = isAnimal ? 'animalTours' : 'birdTours'
      return {
        ...prev,
        [key]: prev[key].map((t) => (t.id === tourId ? { ...t, ...tourData } : t)),
      }
    })
  }

  const updateGallery = (newGallery) => {
    setContent((prev) => ({
      ...prev,
      galleryImages: newGallery,
    }))
  }

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportContentJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'vm_wild_site_content_backup.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importContentJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString)
      setContent({
        ...DEFAULT_CONTENT,
        ...parsed,
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return (
    <SiteContentContext.Provider
      value={{
        content,
        lastSaveStatus,
        updateBrand,
        updateSocial,
        updateHero,
        updateFounders,
        updateFounder,
        updateTours,
        updateSingleTour,
        updateTourById,
        updateGallery,
        resetToDefaults,
        exportContentJSON,
        importContentJSON,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider')
  }
  return context
}
