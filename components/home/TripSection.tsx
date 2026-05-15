export default function TripSection({ data, lang }: any) {
  return (
    <section className="w-full">
      <div className="grid md:grid-cols-3 gap-5 items-center">
        <img
          src={data?.images?.[0]?.asset?.url}
          className="w-full h-[500px] object-cover"
        />

        <div className="flex flex-col gap-5 text-center p-5">
          <h4 className="opacity-60">
            {data?.subtitle?.[lang]}
          </h4>
          <h2 className="">
            {data?.title?.[lang]}
          </h2>
          <div className="text-left">
            {data?.steps?.map((step: any, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-2xl font-light w-10">
                  0{i + 1}
                </div>
                <div>
                  <h4 className="font-medium">
                    {step.title?.[lang]}
                  </h4>
                  <p className="">
                    {step.description?.[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <img
          src={data?.images?.[1]?.asset?.url}
          className="w-full h-[500px] object-cover"
        />
      </div>
    </section>
  )
}