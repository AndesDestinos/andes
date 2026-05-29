'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownAboutMenu from './DropdownAboutMenu'
import { useRef } from 'react'

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
  experiences: Item[],
  blogs: any[],
}

export default function Header({
  lang,
  settings,
  tours,
  packages,
  experiences,
  blogs,
}: Props) {
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = !(pathname === `/${lang}` || pathname === '/')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const allItems = [
    ...tours.map((i) => ({ ...i, type: 'tour' })),
    ...packages.map((i) => ({ ...i, type: 'package' })),
    ...experiences.map((i) => ({ ...i, type: 'experience' })),
    ...blogs.map((i) => ({
      slug: i.slug,
      type: 'blog',
      category: i.category,
      title: i.headline,
    })),
  ]
  console.log(allItems);

  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<number>(0)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<string | null>(null)
  const [showHeader, setShowHeader] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const aboutSections = [
    {name: {es: 'NUESTRA HISTORIA', en: 'OUR HISTORY'}, link: 'story'},
    {name: {es: 'NUESTROS VALORES', en: 'OUR VALUES'}, link: 'values'},
    {name: {es: 'POR QUE ANDES', en: 'WHY ANDES'}, link: 'why'},
    {name: {es: 'TURISMO SOSTENIBLE', en: 'SUSTAINABLE TOURISM'}, link: 'sustainable'},
  ];

  const openMenu = (menu: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
    }
    setActiveMenu(menu)
  }

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null)
    }, 250)
  }

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
  const isActiveHeader = isHome || isScrolled || isHovered || mobileOpen
  const currentLogo = isActiveHeader ? logoDark : logoLight
  const currentStoreLogo = isActiveHeader ? storeLogoDark : storeLogoLight

  useEffect(() => {
    let lastScroll = window.scrollY
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setIsScrolled(currentScroll > 50)
      if (currentScroll < 10) {
        setShowHeader(true)
      } else {
        if (currentScroll < lastScroll) {
          setShowHeader(true)
        } else {
          setShowHeader(false)
        }
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

  useEffect(() => {
    if (!search) {
      setResults([])
      return
    }
    console.log(allItems);
    const filtered = allItems.filter((item: any) =>
      item.title?.[lang]?.toLowerCase().includes(search.toLowerCase())
    )
    setResults(filtered)
  }, [search])

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${showHeader ? 'translate-y-0' : '-translate-y-full'}
        ${(isHome || isScrolled || isHovered)
          ? 'bg-white text-black shadow-md'
          : 'bg-transparent text-white'
        }
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
      <img src={(isHome || isScrolled || isHovered) ? '/images/header/menuOscuro.svg' : '/images/header/menu.svg'} 
        className="w-7 h-auto cursor-pointer" />
    </div>

    <div
      className="cursor-pointer"
      onClick={() => router.push(`/${lang}`)}
    >
      <img
  src={currentLogo}
  alt="Logo"
  className="h-5 w-auto"
/>
    </div>
  </div>

    <div
      onClick={() => goTo('booking')}
      className="border border-white px-3 py-1 cursor-pointer"
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
      className="h-5 w-auto"
    />
  </div>

        <div className="hidden md:flex items-center gap-5">
          <div
            onMouseEnter={() => openMenu('tours')}
            onMouseLeave={closeMenu}
            className="relative"
          >
            <div className=" flex gap-3
                relative cursor-pointer
                after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                after:h-[1px] after:w-full after:bg-[#ABB8C3]
                after:origin-center
                after:scale-x-0
                after:translate-x-[-50%]
                after:transition-transform after:duration-300 
                hover:after:scale-x-100">
              <span className='!tracking-[3px]' onClick={() => goTo('tours')}>TOURS</span>
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

          <div className="text-[13px] opacity-50">◆</div>

          <div
            onMouseEnter={() => openMenu('packages')}
            onMouseLeave={closeMenu}
            className="relative"
          >
            <div className=" flex gap-3
                relative cursor-pointer
                after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                after:h-[1px] after:w-full after:bg-[#ABB8C3]
                after:origin-center
                after:scale-x-0
                after:translate-x-[-50%]
                after:transition-transform after:duration-300
                hover:after:scale-x-100">
              <span className='!tracking-[3px]' onClick={() => goTo('packages')}>{lang === "es" ? "PAQUETES" : "PACKAGES"}</span>
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

          <div className="text-[13px] opacity-50">◆</div>

          <div
            onMouseEnter={() => openMenu('experiences')}
            onMouseLeave={closeMenu}
            className="relative"
          >
            <div
                className=" flex gap-3
                relative cursor-pointer
                after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                after:h-[1px] after:w-full after:bg-[#ABB8C3]
                after:origin-center
                after:scale-x-0
                after:translate-x-[-50%]
                after:transition-transform after:duration-300
                hover:after:scale-x-100">
              <span className='!tracking-[3px]' onClick={() => goTo('experiences')}>{lang === "es" ? "EXPERIENCIAS" : "EXPERIENCES"}</span>
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

          <div className="text-[13px] opacity-50">◆</div>

          <div 
            onMouseEnter={() => openMenu('about')}
            onMouseLeave={closeMenu}
            className=" flex gap-3
            relative cursor-pointer
            after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
            after:h-[1px] after:w-full after:bg-[#ABB8C3]
            after:origin-center
            after:scale-x-0
            after:translate-x-[-50%]
            after:transition-transform after:duration-300
            hover:after:scale-x-100">
            <span onClick={() => goTo('about-us')}  className='!tracking-[3px]'>
              {lang === 'es' ? 'NOSOTROS' : 'ABOUT US'}
            </span>
            {activeMenu === 'about' && (
              <DropdownAboutMenu
                lang={lang}
                sections={aboutSections}
                onNavigate={(link) => {
                  router.push(`/${lang}/about-us#${link}`)
                  setActiveMenu(null)
                }}
              />
            )}
          </div>

          <div className="text-[13px] opacity-50">◆</div>

          <div className=" flex gap-3
            relative cursor-pointer
            after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
            after:h-[1px] after:w-full after:bg-[#ABB8C3]
            after:origin-center
            after:scale-x-0
            after:translate-x-[-50%]
            after:transition-transform after:duration-300
            hover:after:scale-x-100">
            <span onClick={() => goTo('blogs')} className='!tracking-[3px]'>
              BLOG
            </span>
          </div>

          <div className="text-[13px] opacity-50">◆</div>

          <div
            onClick={() => goTo('store')}
            className="flex gap-2 items-center
            relative cursor-pointer
            after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
            after:h-[1px] after:w-full after:bg-[#ABB8C3]
            after:origin-center
            after:scale-x-0
            after:translate-x-[-50%]
            after:transition-transform after:duration-300
            hover:after:scale-x-100">
            <img
              src={currentStoreLogo}
              className="h-5 mt-[-2px]"
            />
            <span className='!tracking-[3px]'>{lang === "es" ? "TIENDA" : "STORE"}</span>
          </div>

        </div>

        <div className="hidden md:flex items-center gap-6">
          <div
  onClick={() => goTo('booking')}
  className={`!tracking-[3px]
    relative cursor-pointer px-6 py-2 overflow-hidden border
    transition-colors duration-300
    ${(isHome || isScrolled || isHovered) ? 'border-black text-black' : 'border-white text-white'}
    
    before:content-[''] before:absolute before:top-0 before:left-0
    before:h-full before:w-0 before:bg-[#ABB8C3]
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
    className={`!tracking-[3px]
      px-2 py-1 cursor-pointer outline-none transition
      ${(isHome || isScrolled || isHovered || mobileOpen)
        ? 'bg-white text-black'
        : 'bg-transparent text-white'}
    `}
  >
    <option className='text-black' value="es">ESPAÑOL</option>
    <option className='text-black' value="en">ENGLISH</option>
  </select>
</div>
        </div>
      </nav>

      {mobileOpen && (
  <div className="fixed inset-0 z-[999] bg-white text-black md:hidden flex flex-col h-screen">

    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center px-6 py-5 border-b border-black/10">
        <button onClick={() => setMobileOpen(false)} className="">
          <img src="/images/header/close.svg" className="w-7 h-auto cursor-pointer" />
        </button>

        <img
  src={logoDark}
  className="h-5 w-auto"
/>

        <div className="w-5" />
      </div>

      <div className="px-6 py-5 border-b border-black/10 flex items-center gap-3">
        <div className="relative w-full">
          <div className="flex items-center gap-3 w-full border-b border-black/10 pb-2">
            <img
              src="/images/header/search.svg"
              className="w-6 h-auto"
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setShowResults(true)
              }}
              placeholder={lang === 'es' ? 'Buscar' : 'Search'}
              className="w-full outline-none"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch('')
                  setResults([])
                  setShowResults(false)
                }}
                className="text-xl px-2"
              >
                ✕
              </button>
            )}
          </div>

          {showResults && search && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border border-black/10 shadow-lg z-50">
              
              {results.length === 0 && (
                <div className="p-3 opacity-50">
                  {lang === 'es' ? 'Sin resultados' : 'No results'}
                </div>
              )}

              {results.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    const base =
                      item.type === 'tour'
                        ? 'tours'
                        : item.type === 'package'
                        ? 'packages'
                        : 'experiences'

                    router.push(`/${lang}/${base}/${item.slug}`)
                    setMobileOpen(false)
                  }}
                  className="p-3 border-b border-black/5 hover:bg-black/5 cursor-pointer"
                >
                  <div className="font-medium">
                    {item.title?.[lang]}
                  </div>

                  <div className="text-xs opacity-60">
                    {item.type} • {item.category?.title?.[lang]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-6 flex flex-col gap-6">
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

  <div>
  <div
    className="flex justify-between items-center cursor-pointer"
    onClick={() =>
      setMobileMenu(mobileMenu === 'about' ? null : 'about')
    }
  >
    <span>{lang === "es" ? "NOSOTROS" : "ABOUT"}</span>

    <span className="text-lg">
      {mobileMenu === 'about' ? '−' : '+'}
    </span>
  </div>

  {mobileMenu === 'about' && (
    <div className="mt-4 pl-4 flex flex-col gap-3">
      {aboutSections.map((section, i) => (
        <div
          key={i}
          className="cursor-pointer opacity-80 hover:opacity-100"
          onClick={() => {
            router.push(`/${lang}/about-us#${section.link}`)
            setMobileOpen(false)
          }}
        >
          {section.name[lang as 'es' | 'en']}
        </div>
      ))}
    </div>
  )}
</div>

  <div onClick={() => { goTo('blogs'); setMobileOpen(false) }}>
    BLOG
  </div>

  <div
    onClick={() => { goTo('store'); setMobileOpen(false) }}
    className="flex items-center gap-2"
  >
    <img src={currentStoreLogo} className="h-5 w-auto" />
    <span>{lang === "es" ? "TIENDA" : "STORE"}</span>
  </div>

<div className="w-full h-[1px] bg-gray-300 mb-3 opacity-80" />

  <div className="flex gap-12">
  <span
    onClick={() => changeLang('es')}
    className={`
      cursor-pointer px-3 py-1 rounded-full transition-all duration-300
      ${lang === 'es'
        ? 'bg-black text-white'
        : 'border border-black text-black'}
    `}
  >
    ESPAÑOL
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
    ENGLISH
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

      <div className="flex justify-between mb-4">
        <a href="mailto:hola@andes.travel" className="flex items-center gap-2 opacity-70">
          <img src="/images/header/email.svg" className="w-7 h-auto cursor-pointer" />
          <span>{lang === "es" ? "CONTACTAR" : "CONTACT"}</span>
        </a>

        <a href="tel:+51900111114" className="flex items-center gap-2 opacity-70">
          <img src="/images/header/phone.svg" className="w-7 h-auto cursor-pointer" />
          <span>{lang === "es" ? "LLAMAR AHORA" : "CALL NOW"}</span>
        </a>
      </div>

      <div
        onClick={() => { goTo('booking'); setMobileOpen(false) }}
        className="border border-black text-center py-3"
      >
        {lang === "es" ? "RESERVAR AHORA" : "BOOK NOW"}
      </div>

    </div>
  </div>
)}
    </header>
  )
}