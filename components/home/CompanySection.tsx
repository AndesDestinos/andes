import Link from "next/link";

export default function CompanySection({ data, lang }: any) {
  return (
    <section className="relative">
      <div className="relative grid md:grid-cols-2 items-center">
        <div className="relative order-2 md:order-1">
          <img
            src={data?.image}
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
        </div>

        <div className="
          bg-white
          order-1 md:order-2
          md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2
          md:w-[60%]
          w-full
          mt-6 md:mt-0
          z-1
        ">
          <div className="bg-[#f5f3ef] py-3 md:py-5 text-center">
            <h4 className="text-gray-500 !tracking-[2px]">
            {data?.subtitle?.[lang]}
          </h4>
          </div>

          <div className="p-5 md:p-12">
          <h2 className="leading-tight mb-6">
            {data?.title?.[lang]}
          </h2>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {data?.description?.[lang]}
          </p>
          
          <Link
            href={`/${lang}/about-us`}
            className="border-b border-black pb-1 hover:opacity-70 transition !tracking-[2px]"
          >
            {lang==='es' ? 'DESCUBRA NUESTRA FILOSOFÍA' : 'DISCOVER OUR PHILOSOPLHY'}
          </Link>
        </div>
        </div>
      </div>
    </section>
  )
}