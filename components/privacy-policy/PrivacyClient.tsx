'use client'

import { useState } from 'react'
import { urlFor } from '@/lib/sanity.image'

export default function PrivacyClient({ data, lang }: any) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section>
      <div className="relative w-full h-[60vh]">
        <img
          src={urlFor(data.hero.image).width(2000).url()}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-light text-center px-4">
          {data.hero.title?.[lang]}
        </h1>
      </div>

      <div className="andes-contenido-pequenio text-center flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {data.title?.[lang]}
        </h2>

        <p className="text-gray-600 whitespace-pre-line">
          {data.intro?.[lang]}
        </p>
      </div>

      <div className="andes-contenido-pequenio">
        <div className="flex flex-col text-center">
          {data.sections?.map((section: any, index: number) => {
            return (
              <div key={index} className="py-6">
                <h3>
                    {section.heading?.[lang]}
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                    {section.content?.[lang]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}