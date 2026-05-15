'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import DropdownMenu from './DropdownMenu'

type Item = {
  title: string
  slug: string
  category?: {
    title: string
    slug: string
  }
}

type Props = {
  lang: string
  tours: Item[]
  packages: Item[]
  experiences: Item[]
}

export default function Header({
  lang,
  tours,
  packages,
  experiences
}: Props) {

  const router = useRouter()
  const pathname = usePathname()

  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<number>(0)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<string | null>(null)

  const goTo = (path: string) => {
    router.push(`/${lang}/${path}`)
  }

  const goToWithSlug = (base: string, slug: string) => {
    router.push(`/${lang}/${base}/${slug}`)
  }

  const changeLang = (newLang: string) => {
    if (newLang == lang) return;
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) {
      localStorage.setItem('language', newLang)
      router.push(`/${newLang}`)
      return
    }

    segments[0] = newLang
    const newPath = '/' + segments.join('/')

    localStorage.setItem('language', newLang)
    router.push(newPath)
  }

  return (
    <header className="absolute top-0 left-0 w-full z-50 text-white">
      <nav className="andes-contenido flex items-center justify-between relative">
        <div className="flex items-center cursor-pointer"
            onClick={() => router.push(`/${lang}`)}>
            <img
                src="/images/header/logoAndes.svg"
                alt="Andes Logo"
                className="h-3 w-auto"
            />
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
          ☰
        </div>

        <div className="hidden md:flex items-center text-sm tracking-widest gap-7">
          <div
            onMouseEnter={() => setActiveMenu('tours')}
            onMouseLeave={() => setActiveMenu(null)}
            className="relative"
          >
            <div className=" flex gap-3
                relative cursor-pointer
                after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                after:h-[2px] after:w-full after:bg-black
                after:origin-center
                after:scale-x-0
                after:translate-x-[-50%]
                after:transition-transform after:duration-300
                hover:after:scale-x-100">
              <span className="opacity-50">◆</span>
              <span>TOURS</span>
            </div>
            {activeMenu === 'tours' && (
              <DropdownMenu
                type="tour"
                data={tours}
                lang={lang}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onNavigate={(slug) => goToWithSlug('tours', slug)}
              />
            )}
          </div>

          <div
            onMouseEnter={() => setActiveMenu('packages')}
            onMouseLeave={() => setActiveMenu(null)}
            className="relative"
          >
            <div className=" flex gap-3
                relative cursor-pointer
                after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                after:h-[2px] after:w-full after:bg-black
                after:origin-center
                after:scale-x-0
                after:translate-x-[-50%]
                after:transition-transform after:duration-300
                hover:after:scale-x-100">
              <span className="opacity-50">◆</span>
              <span>{lang === "es" ? "PAQUETES" : "PACKAGES"}</span>
            </div>
            {activeMenu === 'packages' && (
              <DropdownMenu
                type="package"
                data={packages}
                lang={lang}
                activeCategory={0}
                setActiveCategory={() => {}}
                onNavigate={(slug) => goToWithSlug('packages', slug)}
              />
            )}
          </div>

          <div
            onMouseEnter={() => setActiveMenu('experiences')}
            onMouseLeave={() => setActiveMenu(null)}
            className="relative"
          >
            <div
                className=" flex gap-3
                relative cursor-pointer
                after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                after:h-[2px] after:w-full after:bg-black
                after:origin-center
                after:scale-x-0
                after:translate-x-[-50%]
                after:transition-transform after:duration-300
                hover:after:scale-x-100">
              <span className="opacity-50">◆</span>
              <span>{lang === "es" ? "EXPERIENCIAS" : "EXPERIENCES"}</span>
            </div>
            {activeMenu === 'experiences' && (
              <DropdownMenu
                type="experience"
                data={experiences}
                lang={lang}
                activeCategory={0}
                setActiveCategory={() => {}}
                onNavigate={(slug) => goToWithSlug('experiences', slug)}
              />
            )}
          </div>

          <div className=" flex gap-3
            relative cursor-pointer
            after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
            after:h-[2px] after:w-full after:bg-black
            after:origin-center
            after:scale-x-0
            after:translate-x-[-50%]
            after:transition-transform after:duration-300
            hover:after:scale-x-100">
            <span className="opacity-50">◆</span>
            <span onClick={() => goTo('blog')} className="cursor-pointer">
              BLOG
            </span>
          </div>

          <div
            onClick={() => goTo('store')}
            className=" flex gap-3
            relative cursor-pointer
            after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
            after:h-[2px] after:w-full after:bg-black
            after:origin-center
            after:scale-x-0
            after:translate-x-[-50%]
            after:transition-transform after:duration-300
            hover:after:scale-x-100">
            <img src="/images/header/logoTienda.svg" className="h-5" />
            <span>{lang === "es" ? "TIENDA" : "STORE"}</span>
          </div>

        </div>

        <div className="hidden md:flex items-center gap-6">
          <div
            onClick={() => goTo('booking')}
            className="relative cursor-pointer border border-white px-6 py-2 overflow-hidden
                text-white transition-colors duration-300
                before:content-[''] before:absolute before:top-0 before:left-0
                before:h-full before:w-0 before:border-black before:bg-black
                before:text-white before:transition-all before:duration-300
                hover:before:w-full hover:text-white before:-z-10">
            {lang === "es" ? "RESERVAR" : "BOOK NOW"}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
                onClick={() => changeLang('es')}
                className={`
                px-2 py-1 rounded-full cursor-pointer transition-all duration-300
                ${lang === 'es'
                    ? 'bg-black text-white'
                    : 'text-white hover:bg-black hover:text-white'
                }
                `}
            >
                ES
            </span>
            <span className="text-white/50">|</span>
            <span
                onClick={() => changeLang('en')}
                className={`
                px-2 py-1 rounded-full cursor-pointer transition-all duration-300
                ${lang === 'en'
                    ? 'bg-black text-white'
                    : 'text-white hover:bg-black hover:text-white'
                }
                `}
            >
                EN
            </span>
            </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-black text-white p-6">
          <div onClick={() => setMobileMenu('tours')}>TOURS</div>
          {mobileMenu === 'tours' && (
            <DropdownMenu
              type="tour"
              data={tours}
              lang={lang}
              activeCategory={0}
              setActiveCategory={() => {}}
              onNavigate={(slug) => goToWithSlug('tours', slug)}
              isMobile
            />
          )}
          <div onClick={() => setMobileMenu('packages')}>PACKAGES</div>
          {mobileMenu === 'packages' && (
            <DropdownMenu
              type="package"
              data={packages}
              lang={lang}
              activeCategory={0}
              setActiveCategory={() => {}}
              onNavigate={(slug) => goToWithSlug('packages', slug)}
              isMobile
            />
          )}
          <div onClick={() => setMobileMenu('experiences')}>EXPERIENCES</div>
          {mobileMenu === 'experiences' && (
            <DropdownMenu
              type="experience"
              data={experiences}
              lang={lang}
              activeCategory={0}
              setActiveCategory={() => {}}
              onNavigate={(slug) => goToWithSlug('experiences', slug)}
              isMobile
            />
          )}
          <div onClick={() => goTo('blog')}>BLOG</div>
          <div onClick={() => goTo('store')}>STORE</div>
        </div>
      )}
    </header>
  )
}