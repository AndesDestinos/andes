
export default function IncludeSection({includes, notIncludes, lang}: any) {
    return (
        <section id="includes" className="relative">
        <div className="andes-contenido grid md:grid-cols-2 grid-cols-1 gap-21 items-start">
            <div className='grid gap-12'>
                <div className='border-l-2 border-[#A18F63] pl-7'>
                    <span className="text-[#A18F63]">{ lang === 'es' ? 'LO ESENCIAL' : 'THE ESSENTIAL' }</span>
                    <h2>{ lang === 'es' ? 'Incluye' : 'Include' }</h2>
                </div>
                <ul className="list-none pl-0 space-y-2">
                    {includes.map((item: any, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                            <img 
                                src="/images/packages/check.svg" 
                                alt="" 
                                className="h-[1em] w-auto"
                            />
                            <span>{item?.[lang]}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='grid gap-12'>
                <div className='border-l-2 border-[#A18F63] pl-7'>
                    <span className="text-[#A18F63]">{ lang === 'es' ? 'ADICIONAL' : 'ADDITIONAL' }</span>
                    <h2>{ lang === 'es' ? 'No Incluye' : 'Not Include' }</h2>
                </div>
                <ul className="list-none pl-0 space-y-2">
                    {notIncludes.map((item: any, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                            <img 
                                src="/images/packages/cancel.svg" 
                                alt="" 
                                className="h-[1em] w-auto"
                            />
                            <span>{item?.[lang]}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </section>
    )
}