export default function CompanySection({ data, lang }: any) {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <img
        src={data?.image}
        className="w-full h-[500px] object-cover order-2 md:order-1"
      />
      <div className="flex flex-col gap-5 order-1 md:order-2">
        <h4 className="opacity-60">
          {data?.subtitle?.[lang]}
        </h4>
        <h2 className="">
          {data?.title?.[lang]}
        </h2>
        <p className="whitespace-pre-line">
          {data?.description?.[lang]}
        </p>
      </div>
    </section>
  )
}