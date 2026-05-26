import { urlFor } from "@/lib/sanity.image";

export default function StrengthsSection({ data, lang }: any) {
    return (
        <section className='w-full flex flex-col gap-12'>
            <div className='w-full text-center flex flex-col gap-2'>
                <h4>{ lang === 'es' ? 'LO QUE NOS DIFERENCIA' : 'WHAT SETS US APART' }</h4>
                <h2>{data.title?.[lang]}</h2>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-21'>
                {data?.items?.map((item: any, index: number) => (
                    <div key={index} className='flex flex-col w-full gap-5 items-center text-center'>
                        <div className="bg-[#F5F2EB] rounded-full p-4 flex items-center justify-center">
                            <img 
                                src={item?.icon ? urlFor(item.icon).url() : ''} 
                                alt="icono"
                                className="h-4 w-4 object-contain"
                            />
                        </div>
                        <h4>{item?.title?.[lang]}</h4>
                        <p>{item?.description?.[lang]}</p>
                    </div>
                ))}
            </div>
        </section>
    )
};