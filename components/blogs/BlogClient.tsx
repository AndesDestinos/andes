'use client'

import { useEffect, useRef, useState } from 'react'
import { urlFor } from '@/lib/sanity.image'
import { useRouter } from 'next/navigation'
import ContactModal from '../packages/ContactModal'

export default function BlogClient({ data, lang }: any) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [progress, setProgress] = useState(0)
    const [showIndex, setShowIndex] = useState(false)
    const [topOffset, setTopOffset] = useState(80)
    const lastScroll = useRef(0)

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
            title: data.headline?.[lang],
            text: data.headline?.[lang],
            url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copiado')
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY
            const total =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight

            const progressValue = (current / total) * 100
            setProgress(progressValue)
            const goingUp = current < lastScroll.current
            const goingDown = current > lastScroll.current
            if (goingDown) {
                setTopOffset(0)
            }
            if (goingUp || current < 10) {
                setTopOffset(80)
            }
            lastScroll.current = current
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!data) return null

    return (
        <div className='w-full'>
            <div className='w-full'>
               <div
                    className={`fixed left-0 right-0 z-50 bg-white transition-transform duration-300`}
                    style={{top: `${topOffset}px`,}}
                >
                    <div className="flex justify-between px-6 py-4">
                        <button
                            onClick={() => {
                            if (window.history.length > 1) {
                                router.back()
                            } else {
                                router.push('/blogs')
                            }
                            }}
                            className="hover:opacity-60 transition cursor-pointer"
                        >
                            ← VOLVER
                        </button>
                        <span className="hidden md:block truncate max-w-[400px] andes-blog-font">
                            {data.headline?.[lang]}
                        </span>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => router.push(`/${lang}/blogs`)}
                                className="hover:opacity-60 transition cursor-pointer"
                            >
                                {lang === 'es' ? 'VER TODOS' : 'ALL BLOGS'}
                            </button>

                            <button
                                onClick={handleShare}
                                className="hover:opacity-60 transition cursor-pointer"
                            >
                                {lang === 'es' ? 'COMPARTIR' : 'SHARE'}
                            </button>
                        </div>
                    </div>
                    <div className="h-[2px] bg-gray-200">
                        <div
                            className="h-full bg-black transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white scroll-smooth flex flex-col gap-20 pb-36">
                <section className="andes-contenido-pequenio text-center">
                    <h1 className="leading-tight andes-blog-font">
                        {data.headline?.[lang]}
                    </h1>
                    <div className="flex justify-center items-center gap-7 pt-7">
                        <span>
                            <b>{data.publishedAt}</b>
                        </span>
                        <span>|</span>
                        <span>TEAM ANDES</span>
                        <div className='flex items-center gap-2'>
                            <img 
                            src="/images/blogs/duracion.svg" 
                            alt="" 
                            className="h-[1em] w-auto"
                            />
                            <span>{data.readingTime}</span>
                        </div>
                        <span className='px-3 py-1 bg-black text-white rounded-full'>{data.category?.title?.[lang]}</span>
                    </div>
                    <img
                        src={urlFor(data.mainImage).url()}
                        className="mt-10 w-full h-[400px] object-cover"
                    />
                </section>

                <section className="andes-contenido-pequenio">
                    <div className="border-t border-b border-gray-300 py-5">
                        <div className="flex justify-between items-center">
                            <h3 className="">
                                { lang === 'es' ? 'INDICE DE CONTENIDOS' : 'TABLE OF CONTENTS' }
                            </h3>
                            <button
                                onClick={() => setShowIndex(!showIndex)}
                                className="relative w-8 h-8 flex items-center justify-center group transition-transform duration-200 hover:scale-110 active:scale-90"
                            >
                                <span
                                    className={`absolute h-[2px] w-5 bg-black transition-all duration-300 ${
                                    showIndex ? 'rotate-45 translate-y-0' : '-translate-y-2'
                                    }`}
                                />
                                <span
                                    className={`absolute h-[2px] w-5 bg-black transition-all duration-300 ${
                                    showIndex ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span
                                    className={`absolute h-[2px] w-5 bg-black transition-all duration-300 ${
                                    showIndex ? '-rotate-45 translate-y-0' : 'translate-y-2'
                                    }`}
                                />
                            </button>
                        </div>
                        {showIndex && (
                            <ul className="mt-4 space-y-2">
                                {data.sections.map((sec: any, i: number) => (
                                    <li key={i}>
                                    <button
                                        onClick={() => {
                                        document
                                            .getElementById(`section-${i}`)
                                            ?.scrollIntoView({ behavior: 'smooth' })
                                        }}
                                        className="hover:underline text-left cursor-pointer"
                                    >
                                        {i + 1}. {sec.heading?.[lang]}
                                    </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <section className="andes-contenido-pequenio flex flex-col gap-30">
                    {data.sections.map((sec: any, i: number) => {
                        const reverse = i % 2 !== 0
                        return (
                            <div
                                id={`section-${i}`}
                                key={i}
                                className="grid md:grid-cols-2 gap-12 items-center"
                            >
                                <div className={reverse ? 'md:order-2' : ''}>
                                    <h2 className='andes-blog-font'>
                                        {i + 1}/{data.sections.length}
                                    </h2>
                                    <h2 className='andes-blog-font'>
                                        {sec.heading?.[lang]}
                                    </h2>
                                    <p className="mt-4 text-gray-600 whitespace-pre-line">
                                        {sec.content?.[lang]}
                                    </p>
                                </div>
                                <div className={reverse ? 'md:order-1' : ''}>
                                    <img
                                    src={urlFor(sec.image).url()}
                                    className="w-full h-[420px] object-cover"
                                    />
                                </div>
                            </div>
                        )
                    })}
                </section>

                <section className="w-full">
                    <div className="relative andes-contenido-pequenio">
                        <div className="hidden md:block absolute left-0 top-0 w-[35%]">
                            <img
                                src={urlFor(data.cta?.images?.[0]).url()}
                                className="w-full h-[300px] object-cover"
                            />
                        </div>
                        <div className="hidden md:block absolute right-0 top-0 w-[35%]">
                            <img
                                src={urlFor(data.cta?.images?.[1]).url()}
                                className="w-full h-[300px] object-cover"
                            />
                        </div>
                        <div className="relative z-10 max-w-[500px] mx-auto bg-white px-8 py-10 text-center shadow-sm">
                            <h2 className="leading-snug andes-blog-font">
                                {data.cta?.title?.[lang]}
                            </h2>
                            <p className="text-gray-600 mt-4">
                                {data.cta?.description?.[lang]}
                            </p>
                            <button
                                onClick={() => setOpen(true)}
                                className="cursor-pointer inline-block mt-6 px-6 py-3 bg-black text-white hover:bg-gray-800 transition"
                            >
                                {data.cta?.buttonLabel?.[lang]}
                            </button>
                        </div>
                        <div className="md:hidden mt-10 flex flex-col gap-6">
                            <img
                                src={urlFor(data.cta?.images?.[0]).url()}
                                className="w-full h-[220px] object-cover"
                            />
                            <img
                                src={urlFor(data.cta?.images?.[1]).url()}
                                className="w-full h-[220px] object-cover"
                            />
                        </div>
                    </div>
                </section>

                <ContactModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />
            </div>
        </div>
    )
}