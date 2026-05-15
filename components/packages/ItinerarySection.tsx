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
        rootMargin: '-40% 0px -40% 0px',
      }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="itinerario" className="relative">
      <div className="andes-contenido grid md:grid-cols-2 grid-cols-1 gap-12">
        <div className="md:sticky md:top-0 md:h-screen h-[300px] relative overflow-hidden">
          {itinerary?.map((item: any, i: number) => (
            <img
              key={i}
              src={item.image ? urlFor(item.image).width(1000).url() : '/images/share/noImage.jpg'}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
                activeIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <div className="grid w-full mx-auto gap-12">
          <div className='border-l-2 border-[#A18F63] pl-7'>
            <span>{ lang === 'es' ? 'EN EL VIAJE' : 'ON THE TRIP' }</span>
            <h2>{ lang === 'es' ? 'Itinerario' : 'Itinerary' }</h2>
          </div>
          <div className='relative grid gap-20 pl-10'>
            <div className="absolute left-0 top-0 w-[2px] h-full bg-gray-300" />
            <div
              className="absolute left-0 top-0 w-[2px] bg-[#A18F63] transition-all duration-500"
              style={{
                height: `${((activeIndex + 1) / itinerary.length) * 100}%`,
              }}
            />
            {itinerary?.map((day: any, index: number) => (
              <div
                key={index}
                ref={(el) => {(itemRefs.current[index] = el)}}
                data-index={index}
                className='relative flex flex-col gap-5'
              >
                <div
                  className={`absolute -left-[45px] top-[12px] -translate-y-1/2 w-3 h-3 rotate-45 ${
                    index <= activeIndex ? 'bg-[#A18F63]' : 'bg-gray-300'
                  }`}
                />
                <div className='flex gap-5 text-gray-300'>
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