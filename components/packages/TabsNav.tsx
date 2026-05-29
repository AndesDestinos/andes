"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const sections = [
  { id: "resumen", label: { es: "Resumen", en: "Resume" } },
  { id: "itinerary", label: { es: "Itinerario", en: "Itinerary" } },
  { id: "includes", label: { es: "Incluye", en: "Include" } },
  { id: "recomendations", label: { es: "Que llevar", en: "What to wear" } },
  { id: "help", label: { es: "Ayuda", en: "Help" } },
  { id: "moreDestinations", label: { es: "Más destinos", en: "More destinations" } },
]

export default function TabsNav({ lang, currentTourId }: any) {
  const [active, setActive] = useState("resumen")
  const [offset, setOffset] = useState(80)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    )
    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [offset])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setOffset(0)
      } else {
        setOffset(80)
      }
      lastScrollY = window.scrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({
      top: y,
      behavior: "smooth",
    })
  }

  return (
    <section
      className="sticky z-50 bg-white border-b border-b-[#E6E6E6]"
      style={{ top: `${offset}px` }}
    >
      <div className="andes-contenido flex justify-between">
        <nav className="flex gap-12 overflow-x-auto whitespace-nowrap text-[#6E7881]">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`shrink-0 cursor-pointer border-b-2 transition ${
                active === item.id
                  ? "border-[#A18F63] text-black"
                  : "border-transparent"
              }`}
            >
              {item.label[lang === "es" ? "es" : "en"]}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            router.push(`/${lang}/booking?tourId=${currentTourId}`)
          }}
          className="relative cursor-pointer px-6 py-2 overflow-hidden border
          transition-colors duration-300
          before:content-[''] before:absolute before:top-0 before:left-0
          before:h-full before:w-0 before:bg-[#ABB8C3]
          before:transition-all before:duration-300
          hover:before:w-full hover:text-white before:-z-10"
        >
          {lang === 'es' ? 'Reservar' : 'Book now'}
        </button>
      </div>
    </section>
  )
}