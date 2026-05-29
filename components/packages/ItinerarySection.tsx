'use client'

import {urlFor} from '@/lib/sanity.image'
import {useState, useRef, useEffect} from 'react'

export default function ItinerarySection({itinerary, lang}: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveIndex(index)
          }
        })
      },
      {
        rootMargin: '-30% 0px -50% 0px'
      }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="itinerary" className="relative">
      <div className="andes-contenido grid md:grid-cols-2 grid-cols-1 gap-12 relative">
        <div className="hidden md:block md:sticky md:top-0 md:h-screen relative overflow-hidden md:-ml-8 md:pl-8">
          {itinerary?.map((item: any, i: number) => ( 
            <img
              key={i}
              src={item.image ? urlFor(item.image).width(1000).url() : '/images/share/noImage.jpg'}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                activeIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {itinerary?.[activeIndex] && (
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <span className="p-3 opacity-80 bg-[#000000]">
                {lang === 'es' ? 'DÍA ' : 'DAY '} {activeIndex + 1}
              </span>
              <h3 className="mt-6 font-semibold">
                {itinerary[activeIndex].title?.[lang]}
              </h3>
            </div>
          )}
        </div>

        <div className="grid w-full mx-auto gap-12">
          <div className='border-l-2 border-[#A18F63] pl-7'>
            <span>{ lang === 'es' ? 'EN EL VIAJE' : 'ON THE TRIP' }</span>
            <h2>{ lang === 'es' ? 'Itinerario' : 'Itinerary' }</h2>
          </div>
          <div className='relative grid gap-20 pl-10'>
            <div className="absolute left-0 top-0 w-[2px] h-full bg-gray-300" />
            
            {itinerary?.map((day: any, index: number) => (
              <div
                key={index}
                ref={(el) => {(itemRefs.current[index] = el)}}
                data-index={index}
                className='relative flex flex-col gap-5'
              >
                <div
                  className={`absolute -left-[45px] top-[12px] -translate-y-1/2 w-3 h-3 rotate-45 ${
                    index == activeIndex ? 'bg-[#A18F63]' : 'bg-gray-300'
                  }`}
                />
                <div className={`flex gap-5 ${
                  index === activeIndex ? 'text-[#A18F63]' : 'text-gray-300'
                }`}>
                  <span>
                    { lang === 'es' ? 'DÍA ' : 'DAY '} {index + 1}
                  </span>
                  <span>____________</span>
                  <div className='flex gap-2 items-center'>
                    <img 
                      src="/images/packages/ubicacion.svg" 
                      alt="" 
                      className="h-[1em] w-auto"
                    />
                    <span>{day?.destinations?.join(' - ')}</span>
                  </div>
                </div>
                <h3>
                  {day.title?.[lang]}
                </h3>
                {/* Imagen solo mobile */}
                <div className="md:hidden mt-4">
                  <img
                    src={
                      day.image
                        ? urlFor(day.image).width(800).url()
                        : '/images/share/noImage.jpg'
                    }
                    alt=""
                    className="w-full h-[220px] object-cover rounded-xl"
                  />
                </div>
                <p className='whitespace-pre-line'>{day.description?.[lang]}</p>
                <ul className="list-disc pl-5 pb-7">
                  {day.additionalInfo?.map((item: any, i: number) => (
                    <li key={i}>{item?.[lang]}</li>
                  ))}
                </ul>
                {(day.nightLocation?.[lang] || day.accommodation?.[lang]) && (
                  <div className='grid gap-5 border-t-2 pt-5 border-gray-300'>
                    {day.nightLocation?.[lang] && (
                      <div className='flex gap-5 items-center'>
                        <img 
                          src="/images/packages/luna.svg" 
                          alt="" 
                          className="h-[1em] w-auto"
                        />
                        <span>
                          <b>Noche:</b> {day.nightLocation?.[lang]}
                        </span>
                      </div>
                    )}
                    {day.accommodation?.[lang] && (
                      <div className='flex gap-5 items-center'>
                        <img 
                          src="/images/packages/cama.svg" 
                          alt="" 
                          className="h-[1em] w-auto"
                        />
                        <span>
                          <b>Acomodación:</b> {day.accommodation?.[lang]}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}