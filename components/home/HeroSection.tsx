'use client'

import { useRouter } from 'next/navigation'

export default function HeroSection({ data, lang }: any) {
  const router = useRouter()

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {data?.heroMedia?.type === 'image' && (
        <img
          src={data.heroMedia?.image}
          className="w-full h-full object-cover"
        />
      )}
      {data?.heroMedia?.type === 'video' && (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={data.heroMedia?.video} />
        </video>
      )}

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white max-w-[1500px] px-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide">
            {data?.heroTitle?.[lang]}
          </h1>
          <button
            onClick={() => router.push(`/${lang}/travel-planner`)}
            className="
                relative mt-6 px-6 py-3 border border-white
                text-white overflow-hidden
                transition-colors duration-300
                before:content-[''] before:absolute before:top-0 before:left-0
                before:h-full before:w-0 before:bg-black
                before:transition-all before:duration-300
                before:z-0
                hover:before:w-full
                hover:border-black">
            <span className="relative z-10">
                {lang === 'es' ? 'EMPEZAR A PLANIFICAR' : 'START PLANNING'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}