export default function RecomendationSection({recommendations, lang}: any) {
    return (
        <section id="recomendations" className="relative">
        <div className="andes-contenido grid items-start">
            <div className='grid gap-12'>
                <div className='border-l-2 border-[#A18F63] pl-7'>
                    <h2>{ lang === 'es' ? 'Que llevar' : 'What to wear' }</h2>
                </div>
                <div className="grid md:grid-cols-2">
                    <div className="flex flex-col gap-7">
                        <span className="text-[#A18F63]">{ lang === 'es' ? 'LO ESENCIAL' : 'THE ESSENTIAL' }</span>
                        <ul className="list-none pl-0 space-y-2">
                            {recommendations?.essentials?.map((item: any, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <img src="/images/packages/rombo.svg" />
                                    <span>{item?.[lang]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-7">
                        <span className="text-[#A18F63]">{ lang === 'es' ? 'OTROS' : 'OTHERS' }</span>
                        <ul className="list-none pl-0 space-y-2">
                            {recommendations?.additional?.map((item: any, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <img src="/images/packages/rombo.svg" />
                                    <span>{item?.[lang]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}