'use client'

import { urlFor } from "@/lib/sanity.image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BlogTabs({ categories, posts, lang }: any) {
  const [active, setActive] = useState('alls')
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const [topOffset, setTopOffset] = useState(80)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < lastScroll) {
        setTopOffset(80)
      } else {
        setTopOffset(0)
      }
      setLastScroll(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }
    const filtered = posts.filter((p: any) =>
      p.headline?.[lang]
        ?.toLowerCase()
        .includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query, posts, lang])

  useEffect(() => {
    const handleScrollActive = () => {
      const sections = ['alls', ...categories.map((c: any) => c.slug.current)]
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScrollActive)
    return () => window.removeEventListener('scroll', handleScrollActive)
  }, [categories])

  const handleScrollTo = (slug: string) => {
    const el = document.getElementById(slug)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="border-b border-b-[#CDCDCD] bg-white z-50 sticky transition-all duration-300"
      style={{ top: `${topOffset}px` }}
    >
      <div className="andes-contenido flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
        <div className="flex gap-6 overflow-x-auto md:overflow-visible">
          <button
            onClick={() => {
              setActive('alls')
              handleScrollTo('alls')
            }}
            className={`flex items-center gap-2 whitespace-nowrap pb-2 cursor-pointer border-b-2 ${
              active === 'alls'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500'
            }`}
          >
            <img src="/images/header/menuOscuro.svg" className="w-5 h-5" />
            {lang === 'es' ? 'Todos' : 'Alls'}
          </button>

          {categories.map((cat: any) => (
            <button
              key={cat._id}
              onClick={() => {
                setActive(cat.slug.current)
                handleScrollTo(cat.slug.current)
              }}
              className={`flex items-center gap-2 whitespace-nowrap pb-2 cursor-pointer border-b-2 ${
                active === cat.slug.current
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {cat.icon && (
                <img
                  src={urlFor(cat.icon).width(50).url()}
                  className="w-5 h-5 object-contain"
                />
              )}
              {cat.title?.[lang]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-[250px]">
          <input
            type="text"
            placeholder={lang === 'es' ? 'Buscar' : 'Search'}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowResults(true)
            }}
            className="w-full border-b border-b-[#CDCDCD] outline-none py-1"
          />

          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              if (query) {
                setQuery('')
                setResults([])
              }
            }}
          >
            {query ? (
              <span className="text-gray-500 text-lg">✕</span>
            ) : (
              <img src="/images/header/search.svg" className="w-4 h-4" />
            )}
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 z-50 max-h-60 overflow-auto">
              {results.map((item: any) => (
                <div
                  key={item._id}
                  onClick={() => {
                    router.push(`/blogs/${item.slug.current}`)
                    setShowResults(false)
                    setQuery('')
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item.headline?.[lang]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}