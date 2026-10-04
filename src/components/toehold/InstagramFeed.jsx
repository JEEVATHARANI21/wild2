export default function InstagramFeed({ posts }) {
  const instagramUrl = 'https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz'

  return (
    <section className="py-24 px-5 sm:px-8 md:px-16 bg-[#151815] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
                Live Dispatches
              </span>
              <span className="w-8 h-[1.5px] bg-[#B87333]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F2F0E8] font-light leading-tight">
              Follow Us on <span className="italic text-[#B87333] font-normal">Instagram</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-1 font-light">
              Real-time sightings, camera gear breakdowns, and stories from the heart of the forest.
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper-primary inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-sans text-xs tracking-wider uppercase font-semibold shadow-lg text-center"
          >
            <svg className="w-4 h-4 text-[#080908]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>Follow @vm_wild_expeditions</span>
          </a>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#242923] border border-[#242923] hover:border-[#B87333] block shadow-lg transition-colors duration-300"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#080908]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <svg className="w-6 h-6 text-[#B87333] mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="font-sans text-[10px] text-[#F2F0E8] line-clamp-2 leading-tight">
                  {post.caption}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
