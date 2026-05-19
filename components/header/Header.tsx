'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  settings: any
  tours: Item[]
  packages: Item[]
  experiences: Item[]
}

export default function Header({
  lang,
  settings,
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
  const [showHeader, setShowHeader] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

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

  const logoLight = settings?.logoLight?.asset?.url
  const logoDark = settings?.logoDark?.asset?.url
  const storeLogoLight = settings?.storeLogoLight?.asset?.url
  const storeLogoDark = settings?.storeLogoDark?.asset?.url
  const currentLogo = (isScrolled || mobileOpen)
    ? logoDark
    : logoLight
  const currentStoreLogo = (isScrolled || mobileOpen)
    ? storeLogoDark
    : storeLogoLight

  useEffect(() => {
    let lastScroll = window.scrollY

    const handleScroll = () => {
      const currentScroll = window.scrollY

      setIsScrolled(currentScroll > 50)

      if (currentScroll < lastScroll) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
  if (mobileOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  return () => {
    document.body.style.overflow = 'auto'
  }
}, [mobileOpen])

  return (
    <header
  className={`
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${showHeader ? 'translate-y-0' : '-translate-y-full'}
    ${isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white'}
    ${mobileOpen ? 'bg-white text-black' : ''}
  `}
>
      <nav className="andes-contenido flex items-center justify-between relative">
        <div className="flex items-center justify-between w-full md:hidden">

    <div className='flex gap-5 items-center'>
    <div
      className="cursor-pointer"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      ☰
    </div>

    <div
      className="cursor-pointer"
      onClick={() => router.push(`/${lang}`)}
    >
      <img
  src={currentLogo}
  alt="Logo"
  className="h-3 w-auto"
/>
    </div>
  </div>

    <div
      onClick={() => goTo('booking')}
      className="border border-white px-4 py-1 text-xs tracking-widest cursor-pointer"
    >
      {lang === "es" ? "RESERVAR" : "BOOK"}
    </div>
    </div>

  <div
    className="hidden md:flex items-center cursor-pointer"
    onClick={() => router.push(`/${lang}`)}
  >
    <img
      src={currentLogo}
      alt="Andes Logo"
      className="h-3 w-auto"
    />
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
            <span onClick={() => goTo('blogs')} className="cursor-pointer">
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
            <img
  src={currentStoreLogo}
  className="h-5"
/>
            <span>{lang === "es" ? "TIENDA" : "STORE"}</span>
          </div>

        </div>

        <div className="hidden md:flex items-center gap-6">
          <div
  onClick={() => goTo('booking')}
  className={`
    relative cursor-pointer px-6 py-2 overflow-hidden border
    transition-colors duration-300
    ${isScrolled ? 'border-black text-black' : 'border-white text-white'}
    
    before:content-[''] before:absolute before:top-0 before:left-0
    before:h-full before:w-0 before:bg-black
    before:transition-all before:duration-300
    hover:before:w-full hover:text-white before:-z-10
  `}
>
            {lang === "es" ? "RESERVAR" : "BOOK NOW"}
          </div>
          <div className="flex items-center">
  <select
    value={lang}
    onChange={(e) => changeLang(e.target.value)}
    className={`
      px-3 py-1 text-sm cursor-pointer outline-none transition
      ${isScrolled || mobileOpen
        ? 'bg-white text-black border border-black/20'
        : 'bg-transparent text-white border border-white/30'}
    `}
  >
    <option className='text-black' value="es">ES</option>
    <option className='text-black' value="en">EN</option>
  </select>
</div>
        </div>
      </nav>

      {mobileOpen && (
  <div className="fixed inset-0 z-[999] bg-white text-black md:hidden flex flex-col h-screen">

    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center px-6 py-5 border-b border-black/10">
        <button onClick={() => setMobileOpen(false)} className="text-xl">
          ✕
        </button>

        <img
  src={logoDark}
  className="h-4"
/>

        <div className="w-5" />
      </div>

      <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm tracking-widest">
          <span>🔍</span>
          <span className="uppercase opacity-70">
            {lang === "es" ? "Buscar" : "Search"}
          </span>
        </div>
        <span className="text-lg">✕</span>
      </div>

      <div className="px-6 py-6 flex flex-col gap-6 text-sm tracking-widest">

  <div>
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() =>
        setMobileMenu(mobileMenu === 'tours' ? null : 'tours')
      }
    >
      <span>TOURS</span>
      <span className="text-lg">
        {mobileMenu === 'tours' ? '−' : '+'}
      </span>
    </div>

    {mobileMenu === 'tours' && (
      <div className="mt-4">
        <DropdownMenu
          type="tour"
          data={tours}
          lang={lang}
          activeCategory={0}
          setActiveCategory={() => {}}
          onNavigate={(slug) => {
            goToWithSlug('tours', slug)
            setMobileOpen(false)
          }}
          isMobile
        />
      </div>
    )}
  </div>

  <div>
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() =>
        setMobileMenu(mobileMenu === 'packages' ? null : 'packages')
      }
    >
      <span>{lang === "es" ? "PAQUETES" : "PACKAGES"}</span>
      <span className="text-lg">
        {mobileMenu === 'packages' ? '−' : '+'}
      </span>
    </div>

    {mobileMenu === 'packages' && (
      <div className="mt-4">
        <DropdownMenu
          type="package"
          data={packages}
          lang={lang}
          activeCategory={0}
          setActiveCategory={() => {}}
          onNavigate={(slug) => {
            goToWithSlug('packages', slug)
            setMobileOpen(false)
          }}
          isMobile
        />
      </div>
    )}
  </div>

  <div>
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() =>
        setMobileMenu(mobileMenu === 'experiences' ? null : 'experiences')
      }
    >
      <span>{lang === "es" ? "EXPERIENCIAS" : "EXPERIENCES"}</span>
      <span className="text-lg">
        {mobileMenu === 'experiences' ? '−' : '+'}
      </span>
    </div>

    {mobileMenu === 'experiences' && (
      <div className="mt-4">
        <DropdownMenu
          type="experience"
          data={experiences}
          lang={lang}
          activeCategory={0}
          setActiveCategory={() => {}}
          onNavigate={(slug) => {
            goToWithSlug('experiences', slug)
            setMobileOpen(false)
          }}
          isMobile
        />
      </div>
    )}
  </div>

  <div onClick={() => { goTo('about'); setMobileOpen(false) }}>
    {lang === "es" ? "NOSOTROS" : "ABOUT"}
  </div>

  <div onClick={() => { goTo('blogs'); setMobileOpen(false) }}>
    BLOG
  </div>

  <div
    onClick={() => { goTo('store'); setMobileOpen(false) }}
    className="flex items-center gap-2"
  >
    <img src={currentStoreLogo} className="h-4" />
    <span>{lang === "es" ? "TIENDA" : "STORE"}</span>
  </div>

  <div className="flex gap-12 text-sm tracking-widest">
  <span
    onClick={() => changeLang('es')}
    className={`
      cursor-pointer px-3 py-1 rounded-full transition-all duration-300
      ${lang === 'es'
        ? 'bg-black text-white'
        : 'border border-black text-black'}
    `}
  >
    ES
  </span>

  <span
    onClick={() => changeLang('en')}
    className={`
      cursor-pointer px-3 py-1 rounded-full transition-all duration-300
      ${lang === 'en'
        ? 'bg-black text-white'
        : 'border border-black text-black'}
    `}
  >
    EN
  </span>
</div>

  <div className="flex gap-12 mt-6">
  {settings?.socials?.map((social: any, i: number) => (
    <a
      key={i}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 border rounded-full p-3"
    >
      <img
        src={social.icon}
        alt="social"
        className="w-full h-full object-contain"
      />
    </a>
  ))}
</div>

</div>
    </div>

    <div className="px-6 pb-6">

      <div className="flex justify-between text-xs tracking-widest mb-4">
        <div className="flex items-center gap-2 opacity-70">
          <span>✉</span>
          <span>{lang === "es" ? "CONTACTAR" : "CONTACT"}</span>
        </div>

        <div className="flex items-center gap-2 opacity-70">
          <span>📞</span>
          <span>{lang === "es" ? "LLAMAR AHORA" : "CALL NOW"}</span>
        </div>
      </div>

      <div
        onClick={() => { goTo('booking'); setMobileOpen(false) }}
        className="border border-black text-center py-3 tracking-widest"
      >
        {lang === "es" ? "RESERVAR AHORA" : "BOOK NOW"}
      </div>

    </div>
  </div>
)}
    </header>
  )
}