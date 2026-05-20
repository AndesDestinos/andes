import Link from "next/link";

export default function CompanySection({ data, lang }: any) {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-16">
      <div className="relative grid md:grid-cols-2 items-center">
        <div className="relative order-2 md:order-1">
          <img
            src={data?.image}
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
        </div>

        <div className="
          bg-[#f5f3ef]
          p-8 md:p-12
          shadow-lg
          order-1 md:order-2
          md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2
          md:w-[55%]
          w-full
          mt-6 md:mt-0
          z-1
        ">
          <h4 className="uppercase tracking-widest text-sm text-gray-500 mb-4">
            {data?.subtitle?.[lang]}
          </h4>

          <h2 className="text-3xl md:text-4xl font-serif leading-tight mb-6">
            {data?.title?.[lang]}
          </h2>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {data?.description?.[lang]}
          </p>
          
          <Link
            href={`/${lang}/about-us`}
            className="uppercase text-sm tracking-wider border-b border-black pb-1 hover:opacity-70 transition"
          >
            {lang==='es' ? 'Descubra nuestra filosofía' : 'Discover our philosophy'}
          </Link>
        </div>

      </div>
    </section>
  )
}