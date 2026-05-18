'use client'

import { useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

export default function StoreGrid({ products, categories, lang }: any) {

  const [activeCategory, setActiveCategory] = useState(
    categories?.[0]?._id
  )

  const filteredProducts = activeCategory
    ? products.filter(
        (p: any) => p.category?._ref === activeCategory
      )
    : products

  return (
    <section className="andes-contenido">
      <div className="mb-10">
        <h1 className="font-light">
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
                  className="w-full text-center mb-2 border border-gray-300 bg-white px-6 py-2 text-xs tracking-wide hover:bg-black hover:text-white transition"
                >
                  {lang === 'es' ? 'VER DETALLE' : 'VIEW DETAILS'}
                </Link>
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-medium">
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
  )
}