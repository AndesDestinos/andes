'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

export default function StoreGrid({ storePage, products, categories, lang }: any) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = storePage?.images?.length
    ? storePage.images.map((img: any) => urlFor(img).url())
    : ['/images/share/noImage.jpg'];
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [activeCategory, setActiveCategory] = useState(
    categories?.[0]?._id
  )
  const filteredProducts = activeCategory
    ? products.filter(
        (p: any) => p.category?._ref === activeCategory
      )
    : products

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      el.scrollBy({
        left: 280,
        behavior: "smooth",
      });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full flex flex-col gap-25 pb-25'>
      <section className="relative w-full h-screen overflow-hidden">
        {heroImages.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === currentHero ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-12 left-12 text-white max-w-xl z-10">
          <h1 className="text-5xl mb-4">
            {storePage?.title?.[lang]}
          </h1>

          <p className="mb-6 text-lg opacity-90">
            {storePage?.description?.[lang]}
          </p>

          <Link
            href={`/${lang}/about-us`}
            className={`!tracking-[2px]
            relative cursor-pointer px-6 py-2 overflow-hidden border
            transition-colors duration-300
            border-white text-white
            before:content-[''] before:absolute before:top-0 before:left-0
            before:h-full before:w-0 before:bg-[#ABB8C3]
            before:transition-all before:duration-300
            hover:before:w-full hover:text-white before:-z-10
          `}
          >
            { lang === 'es' ? 'CONTÁCTENOS' : 'CONTACT US' }
          </Link>
        </div>

        <div className="absolute bottom-12 right-12 flex gap-4 z-10">
          {heroImages.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              onClick={() => setCurrentHero(i)}
              className={`w-28 h-20 object-cover cursor-pointer border transition-all duration-300 ${
                i === currentHero
                  ? 'border-white scale-105'
                  : 'border-transparent opacity-70'
              }`}
            />
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 w-full grid z-10"
          style={{ gridTemplateColumns: `repeat(${heroImages.length}, 1fr)` }}
        >
          {heroImages.map((_: any, i: number) => (
            <div key={i} className="h-[5px] bg-[#DDDDDD]/40 pr-3">
              <div
                className={`h-full bg-[#DDDDDD] transition-all duration-[4000ms] ${
                  i === currentHero ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="andes-contenido">
        <div className="mb-10">
          <h1 className="">
              {lang === 'es' ? 'The Verin Wardrobe' : 'The Verin Wardrobe'}
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl">
              {lang === 'es' ? 
              'An edit of essentials built to last. Each garment is designed with quiet precision and a focus on effortless sophistication.' : 
              'An edit of essentials built to last. Each garment is designed with quiet precision and a focus on effortless sophistication.'}
          </p>
        </div>

        <div className="flex gap-6 mb-10">
          {categories?.map((cat: any) => {
            const isActive = activeCategory === cat._id
            return (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`pb-1 border-b transition ${
                  isActive
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                {cat.title?.[lang] ?? 'Sin nombre'}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts?.map((product: any) => (
            <div key={product._id} className="group">
              <div className="relative overflow-hidden bg-[#f7f7f7]">
                <img
                  src={product.image ? urlFor(product.image).url() : ''}
                  className="w-full h-[320px] object-contain transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition">
                  <Link
                    href={`/${lang}/store/${product.slug.current}`}
                    className="w-full text-center mb-2 border border-gray-300 bg-white px-6 py-2 hover:bg-black hover:text-white transition"
                  >
                    {lang === 'es' ? 'VER DETALLE' : 'VIEW DETAILS'}
                  </Link>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="">
                  {product.name?.[lang]}
                </h3>

                <p className="text-gray-500">
                  { `$${product.price}` }
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='andes-contenido flex flex-col'>
        <div className='flex flex-col p-6 gap-2'>
          <h2>{storePage?.faq?.title?.[lang]}</h2>
          <span>{storePage?.faq?.subtitle?.[lang]}</span>
        </div>
        <div className="w-full p-6">
          {storePage?.faq?.items?.map((item:any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-[#DDDDDD] py-4">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left cursor-pointer"
                >
                  <h3>
                    {item?.title?.[lang]}
                  </h3>

                  <div className="relative w-5 h-5">
                    <span
                      className={`absolute left-0 top-1/2 w-full h-0.5 bg-black transition-all duration-300
                        ${isOpen ? 'rotate-45' : 'rotate-0'}
                      `}
                      style={{ transformOrigin: 'center' }}
                    />

                    <span
                      className={`absolute left-1/2 top-0 h-full w-0.5 bg-black transition-all duration-300
                        ${isOpen ? 'rotate-45' : 'rotate-0'}
                      `}
                      style={{ transformOrigin: 'center' }}
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p>
                    {item?.description?.[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className='andes-contenido text-center flex flex-col gap-12'>
        <div className='flex flex-col gap-3'>
          <h2>{storePage?.strengths?.title?.[lang]}</h2>
          <span>{storePage?.strengths?.subtitle?.[lang]}</span>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storePage?.strengths?.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-[#DDDDDD] p-6 flex gap-7 flex-col items-center text-center rounded-xl"
            >
              {item?.image?.asset?.url && (
                <img
                  src={item.image.asset.url}
                  alt="icon"
                  className="w-16 h-16 object-contain"
                />
              )}

              <h3>
                {item?.title?.[lang]}
              </h3>

              <p>
                {item?.description?.[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}