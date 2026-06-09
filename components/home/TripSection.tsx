import Link from "next/link";

export default function TripSection({ data, lang }: any) {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto h-[650px] hidden md:block">
        <img
          src={data?.images?.[0]?.asset?.url}
          className="absolute left-0 top-[-70px] w-[50%] h-full object-cover"
        />

        <img
          src={data?.images?.[1]?.asset?.url}
          className="absolute right-0 bottom-[-70px] w-[50%] h-full object-cover"
        />

        <div className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-white
          w-[50%]
          p-12
          z-20
        ">
          <h4 className="text-[#a08d5f] mb-4 text-center">
            {data?.subtitle?.[lang]}
          </h4>

          <h2 className="text-center leading-tight mb-10">
            {data?.title?.[lang]}
          </h2>

          <div className="relative">
            <div className="absolute left-[25px] top-0 bottom-0 w-px bg-gray-300 mb-[18px]"></div>

            <div className="flex flex-col gap-3">
              {data?.steps?.map((step: any, i: number) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 min-w-12 min-h-12 rounded-full border border-gray-400 flex items-center justify-center bg-white z-10 leading-none">
                    {i + 1}
                  </div>

                  <div>
                    <h4 className="">
                      {step.title?.[lang]}
                    </h4>
                    <p className="text-gray-600">
                      {step.description?.[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${lang}/booking`}
              className="cursor-pointer border-b border-black pb-1 hover:opacity-70 transition !tracking-[2px]"
            >
              {lang === "es" ? "RESERVAR AHORA" : "BOOK NOW"}
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden relative w-full h-[600px] overflow-hidden">
        <img
          src={data?.images?.[0]?.asset?.url}
          className="hidden md:block absolute left-0 top-[-70px] w-[50%] h-[80%] object-cover"
        />

        <img
          src={data?.images?.[1]?.asset?.url}
          className="hidden md:block absolute right-0 bottom-[-70px] w-[50%] h-[80%] object-cover"
        />

        <div className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[#ffffff]
          w-[85%]
          p-3
          z-20
        ">
          <h4 className="text-[#a08d5f] mb-3 text-center">
            {data?.subtitle?.[lang]}
          </h4>

          <h2 className="text-center leading-tight mb-6">
            {data?.title?.[lang]}
          </h2>

          <div className="relative">
            <div className="absolute left-[20px] mb-[80px] top-0 bottom-0 w-px bg-gray-300"></div>

            <div className="flex flex-col gap-6">
              {data?.steps?.map((step: any, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-gray-400 flex items-center justify-center bg-white z-10 leading-none">
                    {i + 1}
                  </div>

                  <div>
                    <h4 className="">
                      {step.title?.[lang]}
                    </h4>
                    <p className="text-gray-600">
                      {step.description?.[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href={`/${lang}/booking`}
              className="cursor-pointer border-b border-black pb-1 hover:opacity-70 transition !tracking-[2px]"
            >
              {lang === "es" ? "RESERVAR AHORA" : "BOOK NOW"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}