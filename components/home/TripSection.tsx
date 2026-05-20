import Link from "next/link";

export default function TripSection({ data, lang }: any) {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto h-[650px] hidden md:block">
        <img
          src={data?.images?.[0]?.asset?.url}
          className="absolute left-0 top-[-70px] w-[35%] h-full object-cover"
        />

        <img
          src={data?.images?.[1]?.asset?.url}
          className="absolute right-0 bottom-[-70px] w-[35%] h-full object-cover"
        />

        <div className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[#f5f3ef]
          w-[40%]
          p-12
          shadow-lg
          z-20
        ">
          <h4 className="uppercase tracking-[3px] text-xs text-[#a08d5f] mb-4 text-center">
            {data?.subtitle?.[lang]}
          </h4>

          <h2 className="text-4xl font-serif text-center leading-tight mb-10">
            {data?.title?.[lang]}
          </h2>

          <div className="relative">
            <div className="absolute left-[25px] top-0 bottom-0 w-px bg-gray-300"></div>

            <div className="flex flex-col gap-10">
              {data?.steps?.map((step: any, i: number) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 min-w-12 min-h-12 rounded-full border border-gray-400 flex items-center justify-center bg-[#f5f3ef] z-10 leading-none">
                    {i + 1}
                  </div>

                  <div>
                    <h4 className="font-semibold tracking-wide">
                      {step.title?.[lang]}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {step.description?.[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <button className="uppercase text-sm tracking-widest border-b border-black pb-1">
              {lang === "es" ? "Reservar ahora" : "Book now"}
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden relative w-full h-[600px] overflow-hidden">
        <img
          src={data?.images?.[0]?.asset?.url}
          className="absolute left-0 top-[-70px] w-[50%] h-[80%] object-cover"
        />

        <img
          src={data?.images?.[1]?.asset?.url}
          className="absolute right-0 bottom-[-70px] w-[50%] h-[80%] object-cover"
        />

        <div className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[#f5f3ef]
          w-[85%]
          p-6
          shadow-lg
          z-20
        ">
          <h4 className="uppercase tracking-[2px] text-[10px] text-[#a08d5f] mb-3 text-center">
            {data?.subtitle?.[lang]}
          </h4>

          <h2 className="text-xl font-serif text-center leading-tight mb-6">
            {data?.title?.[lang]}
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>

            <div className="flex flex-col gap-6">
              {data?.steps?.map((step: any, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center bg-[#f5f3ef] text-xs z-10">
                    {i + 1}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      {step.title?.[lang]}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {step.description?.[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center cursor-pointer">
            <Link
              href={`/${lang}/booking`}
              className="uppercase text-sm tracking-wider border-b border-black pb-1 hover:opacity-70 transition"
            >
              {lang === "es" ? "Reservar ahora" : "Book now"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}