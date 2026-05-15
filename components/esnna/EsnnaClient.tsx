export default function EsnnaClient({ lang }: any) {
    return (
        <section>
            <div className="relative w-full h-[60vh]">
                <img
                src="/images/esnna/esnna.webp"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-light text-center px-4">
                    ESNNA
                </h1>
            </div>

            <div className="andes-contenido-pequenio text-center flex flex-col gap-12">
                <h2 className="text-2xl md:text-3xl font-semibold pt-12">
                    { lang === 'es' ? 'Compromiso con el programa ESNNA' : 'Commitment to the ESNNA program' }
                </h2>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-12">
                    <div className="grid">
                        <img
                            src="/images/esnna/protegeme.jpg"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid items-center text-left">
                        <div className="grid gap-7">
                        <h3>
                            { lang === 'es' ? 'NUESTRO COMPROMISO CON EL TURISMO RESPONSABLE Y SEGURO' : 'OUR COMMITMENT TO RESPONSIBLE AND SAFE TOURISM' }
                        </h3>
                        { lang === 'es' ? 
                        (<><p>
                            En Andes, asumimos con seriedad y compromiso al Programa ESNNA (Explotación Sexual de Niños, Niñas y Adolescentes), 
                            una iniciativa impulsada por el Ministerio de Comercio Exterior y Turismo (Mincetur) 
                            para la protección de poblaciones vulnerables. 
                        </p>
                        <p>
                            Este programa representa un pilar fundamental en nuestra política de responsabilidad social y ética turística. 
                            Nos dedicamos a la capacitación continua de nuestro equipo y proveedores, 
                            así como a la divulgación activa de las normas y objetivos de prevención.
                        </p>
                        <p>
                            En cada operación, garantizamos que nuestros servicios no solo cumplan, sino que superen las exigencias 
                            del Código de Conducta, reforzando así nuestro firme propósito de promover un turismo seguro, consciente 
                            y transformador.
                        </p></>) : 
                        (<><p>
                            At Andes, we take the ESNNA Program (Sexual Exploitation of Children and Adolescents) seriously and with commitment. 
                            This initiative, promoted by the Ministry of Foreign Trade and Tourism (MINCETUR), 
                            aims to protect vulnerable populations. 
                        </p>
                        <p>
                            This program is a fundamental pillar of our social responsibility and ethical tourism policy. 
                            We are dedicated to the ongoing training of our team and suppliers, as well as the active dissemination 
                            of prevention standards and objectives.
                        </p>
                        <p>
                            In every operation, we ensure that our services not only meet but exceed the requirements of the Code of Conduct, 
                            thus reinforcing our firm commitment to promoting safe, responsible, and transformative tourism.
                        </p></>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}