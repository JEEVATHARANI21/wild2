export default function ExpeditionDifference({ features }) {
  return (
    <section id="difference" className="py-24 px-5 sm:px-8 md:px-16 bg-[#242923] border-b border-[#151815]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              The VM Wild Edge · Section 04
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
            Why Travel with <span className="italic text-[#B87333] font-normal">VM Wild Expeditions</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            We don’t run tourist safaris. We design high-intensity photographic masterclasses crafted around animal behavior, optimal lighting conditions, and respectful fieldcraft.
          </p>
        </div>

        {/* 5 Pillars Grid: Dark Grey #151815 cards inside Forest Grey #242923 section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#B87333] transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#080908] border border-[#242923] flex items-center justify-center text-3xl mb-6 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#242923] text-[10px] font-sans tracking-widest text-[#D6A85C] uppercase font-bold">
                Pillar 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
