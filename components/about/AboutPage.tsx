'use client'

import { urlFor } from '@/lib/sanity.image'

export default function AboutPage({ data, lang }: any) {
  const texto = (field: any) => field?.[lang] || ''

  return (
    <div className="w-full flex flex-col gap-12">
        <section className="relative w-full h-[300px] md:h-[400px]">
            <img
                src={urlFor(data.heroImage).url()}
                alt="hero"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-2xl md:text-4xl tracking-widest">
                    {texto(data.heroTitle)}
                </h1>
            </div>
        </section>

        <section className="andes-contenido">
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

        <section className='w-full bg-[#F6F4F0]'>
            <div className='andes-contenido grid grid-cols-1 md:grid-cols-2 gap-12'>
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
                        <div key={index} className="flex items-start gap-3">
                            <div className="w-3 h-3 bg-black rotate-45 shrink-0 mt-2" />
                            <div>
                                <span className="font-semibold">
                                    {texto(item.title)}
                                </span>
                                <p className="text-sm text-gray-600">
                                    {texto(item.description)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className='andes-contenido w-full flex flex-col gap-12'>
            <h2 className='w-full text-center'>{texto(data.strengthsSection.title)}</h2>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-21'>
                {data?.strengthsSection?.items?.map((item: any, index: number) => (
                    <div key={index} className='flex flex-col w-full gap-5 items-center text-center'>
                        <div className="w-16 h-16 rounded-full bg-[#F5F2EB] flex items-center justify-center">
                            <img 
                                src={item?.icon ? urlFor(item.icon).url() : ''} 
                                alt="icono"
                                className="h-8 w-8 object-contain"
                            />
                        </div>
                        <h4>{texto(item?.title)}</h4>
                        <p>{texto(item?.description)}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="andes-contenido w-full">
            <div className="w-full flex flex-col gap-5 text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12">
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
                            <h3 className="tracking-widest text-gray-700 font-semibold mb-3">
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