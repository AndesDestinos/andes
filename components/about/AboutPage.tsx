'use client'

import { urlFor } from '@/lib/sanity.image'
import { Fragment, useEffect } from 'react'

export default function AboutPage({ data, lang }: any) {
  const texto = (field: any) => field?.[lang] || '';

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')

    if (!hash) return

    const el = document.getElementById(hash)

    if (el) {
        setTimeout(() => {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        }, 100)
    }
  }, [])

  return (
    <div className="w-full flex flex-col gap-36 pb-36">
        <section className="relative w-full h-[50vh] md:h-[60vh]">
            <img
                src={urlFor(data.heroImage).url()}
                alt="hero"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white">
                    {texto(data.heroTitle)}
                </h1>
            </div>
        </section>

        <section id="story" className="andes-contenido-pequenio">
            <h2 className="w-full text-center">
                {texto(data.ourStory.title)}
            </h2>
            <p className="leading-relaxed whitespace-pre-line text-center">
                {texto(data.ourStory.description)}
            </p>
            <div className="flex items-center justify-center mt-8">
                <div className="w-16 h-[1px] bg-gray-400" />
                <div className="w-3 h-3 border rotate-45 mx-2" />
                <div className="w-16 h-[1px] bg-gray-400" />
            </div>
        </section>

        <section id="values" className='w-full bg-[#F6F4F0]'>
            <div className='andes-contenido-pequenio w-full grid grid-cols-1 md:grid-cols-2 gap-12'>
                <div className='grid gap-12'>
                    <div>
                        <h2>{texto(data.coreValuesSection.mission.title)}</h2>
                        <p className='whitespace-pre-line'>{texto(data.coreValuesSection.mission.description)}</p>
                    </div>
                    <div>
                        <h2>{texto(data.coreValuesSection.vision.title)}</h2>
                        <p className='whitespace-pre-line'>{texto(data.coreValuesSection.vision.description)}</p>
                    </div>
                </div>
                <div className='grid gap-5'>
                    <h2>{texto(data.coreValuesSection.values.title)}</h2>
                    {data?.coreValuesSection?.values?.items?.map((item: any, index: number) => (
                        <Fragment key={index}>
                        <div className="flex items-start gap-3">
                            <div className="w-3 h-3 bg-[#ABB8C3] rotate-45 shrink-0 mt-2" />
                            <div>
                                <span className="">
                                    {texto(item.title)}
                                </span>
                                <p className="text-gray-600">
                                    {texto(item.description)}
                                </p>
                            </div>
                        </div>
                        {(data?.coreValuesSection?.values?.items?.length - 1) !== index && (
                            <div className="border-b border-[#ABB8C3] my-3" />
                        )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>

        <section id="why" className='andes-contenido w-full flex flex-col gap-12'>
            <h2 className='w-full text-center'>{texto(data.strengthsSection.title)}</h2>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-21'>
                {data?.strengthsSection?.items?.map((item: any, index: number) => (
                    <div key={index} className='flex flex-col w-full gap-5 items-center text-center'>
                        <div className="bg-[#F5F2EB] rounded-full p-4 flex items-center justify-center">
                            <img 
                                src={item?.icon ? urlFor(item.icon).url() : ''} 
                                alt="icono"
                                className="h-4 w-4 object-contain"
                            />
                        </div>
                        <h4>{texto(item?.title)}</h4>
                        <p>{texto(item?.description)}</p>
                    </div>
                ))}
            </div>
        </section>

        <section id="sustainable" className="andes-contenido w-full">
            <div className="w-full flex flex-col gap-5 text-center">
                <h2 className="text-gray-800 mb-12">
                    {texto(data?.detalleSection?.title)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data?.detalleSection?.items?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <img
                                src={item?.image ? urlFor(item.image).url() : ''}
                                alt="Reforestación"
                                className="w-full h-[300px] object-cover mb-6"
                            />
                            <h3 className="text-gray-700 mb-3">
                                {texto(item?.title)}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {texto(item?.description)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  )
}