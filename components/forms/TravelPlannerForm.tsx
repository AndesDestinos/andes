'use client'

import { useState } from 'react'

type Language = 'en' | 'es'

export default function TravelPlannerForm({ language }: { language: Language }) {
    const [activeSection, setActiveSection] = useState<number | null>(0)

    const [destinations, setDestinations] = useState<string[]>([])
    const [service, setService] = useState<string | null>(null)
    const [month, setMonth] = useState<string | null>(null)
    const [year, setYear] = useState<string | null>(null)
    const [contact, setContact] = useState<string | null>(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [travelers, setTravelers] = useState(2)
    const [includeHotel, setIncludeHotel] = useState(false)
    const [stars, setStars] = useState(4)

    const [errors, setErrors] = useState({
        step1: false,
        step2: false,
        step3: false,
        fields: {
            name: false,
            email: false,
            phone: false,
            country: false,
        }
    })

    const toggleSection = (i: number) => {
        setActiveSection(prev => (prev === i ? null : i))
    }

    const toggleMulti = (value: string) => {
        setDestinations(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    }

    const validate = () => {
        const newErrors = {
            step1: destinations.length === 0,
            step2: !service || !month || !year || !contact,
            step3: false,
            fields: {
                name: !name,
                email: !email,
                phone: !phone,
                country: !country,
            }
        }
        newErrors.step3 =
            newErrors.fields.name ||
            newErrors.fields.email ||
            newErrors.fields.phone ||
            newErrors.fields.country
        setErrors(newErrors)
        return !(newErrors.step1 || newErrors.step2 || newErrors.step3)
    }

    const texto = {
        es: {
            hero: 'EMPIEZA A PLANIFICAR',
            title: 'Planea y personaliza tu viaje a tu manera',
            subtitle: 'Permítenos diseñar el mejor viaje de tu vida a los Andes',
            destinations: '¿A DONDE TE GUSTARIA VIAJAR?',
            service: '¿QUE TIPO DE SERVICIO PREFIERES?',
            date: '¿CUANDO TE GUSTARÍA VIAJAR?',
            contact: '¿COMO PREFIERES QUE TE CONTACTEN?',
            about: 'ACERCA DE TI',
            send: 'ENVIAR AHORA',
            months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        },
        en: {
            hero: 'START PLANNING',
            title: 'Plan and customize your trip your way',
            subtitle: 'Let us design the best trip of your life',
            destinations: 'WHERE WOULD YOU LIKE TO TRAVEL?',
            service: 'WHAT TYPE OF SERVICE DO YOU PREFER?',
            date: 'WHEN WOULD YOU LIKE TO TRAVEL?',
            contact: 'HOW DO YOU WANT TO BE CONTACTED?',
            about: 'ABOUT YOU',
            send: 'SEND NOW',
            months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        }
    }[language]

    const chip = (active: boolean) =>
        `px-4 py-2 rounded-full border text-sm transition ${
            active
                ? 'border-black bg-gray-200'
                : 'border-gray-300 bg-white hover:border-black'
        }`

    return (
        <>
            <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
                <img src="/images/forms/planificar.webp" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-5xl tracking-widest text-center px-4">
                        {texto.hero}
                    </h1>
                </div>
            </section>

            <section className="w-full mt-12">
                <div className="andes-contenido">
                    <div className="text-center mb-10">
                        <h2 className="text-xl md:text-3xl font-serif">{texto.title}</h2>
                        <p className="text-gray-600 mt-3 text-sm">{texto.subtitle}</p>

                        <div className="mb-12">
                            <div className="flex justify-between max-w-3xl mx-auto">
                                <div className="flex flex-col items-center text-center flex-1">
                                    <div className="w-10 h-10 flex items-center justify-center border border-black rounded-full text-sm font-medium">
                                        1
                                    </div>
                                    <span className="mt-2 text-xs sm:text-sm tracking-wide">
                                        {language === 'es' ? 'SELECCIONA' : 'SELECT'}
                                    </span>
                                    <span className="mt-2 text-xs sm:text-sm tracking-wide">
                                        {language === 'es' ? 'Tu destino o tour y tipo de servicio que prefieres' : 'Your destination or tour and type of service you prefer'}
                                    </span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-2"></div>

                                <div className="flex flex-col items-center text-center flex-1">
                                    <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-sm">
                                        2
                                    </div>
                                    <span className="mt-2 text-xs sm:text-sm text-gray-400">
                                        {language === 'es' ? 'PLANIFICA' : 'PLAN'}
                                    </span>
                                    <span className="mt-2 text-xs sm:text-sm tracking-wide">
                                        {language === 'es' ? 'Fecha de viaje, numero de viajeros y hotel' : 'Travel date, number of travelers and hotel'}
                                    </span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-2"></div>

                                <div className="flex flex-col items-center text-center flex-1">
                                    <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-sm">
                                        3
                                    </div>
                                    <span className="mt-2 text-xs sm:text-sm text-gray-400">
                                        {language === 'es' ? 'FINALIZA' : 'FINISH'}
                                    </span>
                                    <span className="mt-2 text-xs sm:text-sm tracking-wide">
                                        {language === 'es' ? 'Agregando medio de contacto, Tus datos y listo viaja tranquilo' : "Add your contact information and details, and you're ready to travel with peace of mind."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Section title={texto.destinations} error={errors.step1} open={activeSection===0} onClick={()=>toggleSection(0)}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {['Machu Picchu','Cusco','Valle Sagrado','Camino Inca','Lima','Cañón del Colca','Huacachina','Turismo Vivencial'].map(item => (
                                <button key={item} onClick={()=>toggleMulti(item)} className={chip(destinations.includes(item))}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </Section>

                    <Section title={texto.service} error={errors.step2} open={activeSection===1} onClick={()=>toggleSection(1)}>
                        <div className="flex gap-3 flex-wrap">
                            {['Privado','Lujo'].map(item => (
                                <button key={item} onClick={()=>setService(item)} className={chip(service===item)}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </Section>

                    <Section title={texto.date} error={errors.step2} open={activeSection===2} onClick={()=>toggleSection(2)}>
                        <div className="flex gap-3 flex-wrap mb-4">
                            {['2025','2026','2027'].map(y => (
                                <button key={y} onClick={()=>setYear(y)} className={chip(year===y)}>
                                    {y}
                                </button>
                            ))}
                        </div>
                        {year && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {texto.months.map(m => (
                                    <button key={m} onClick={()=>setMonth(m)} className={chip(month===m)}>
                                        {m}
                                    </button>
                                ))}
                            </div>
                        )}
                    </Section>

                    <Section title={texto.contact} error={errors.step2} open={activeSection===3} onClick={()=>toggleSection(3)}>
                        <div className="flex gap-3 flex-wrap">
                            {['Correo','Llamada','WhatsApp'].map(item => (
                                <button key={item} onClick={()=>setContact(item)} className={chip(contact===item)}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </Section>

                    <Section title={texto.about} error={errors.step3} open={activeSection===4} onClick={()=>toggleSection(4)}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder="Nombre*"
                                className={`border-b py-3 outline-none ${
                                    errors.fields.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <input
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Correo *"
                                className={`border-b py-3 outline-none ${
                                    errors.fields.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <input
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                placeholder="Teléfono / WhatsApp *"
                                className={`border-b py-3 outline-none ${
                                    errors.fields.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <input
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                placeholder="País *"
                                className={`border-b py-3 outline-none ${
                                    errors.fields.country ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mt-8">
                            <div className="flex items-center gap-3">
                                <span className="text-sm">¿Cuántos viajan?</span>
                                <button
                                    onClick={()=>setTravelers(prev => Math.max(1, prev - 1))}
                                    className="w-10 h-10 border rounded-lg flex items-center justify-center text-lg"
                                >
                                    -
                                </button>
                                <span className="w-6 text-center">{travelers}</span>
                                <button
                                    onClick={()=>setTravelers(prev => prev + 1)}
                                    className="w-10 h-10 border rounded-lg flex items-center justify-center text-lg"
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm">Incluir hotel al tour</span>
                                <button
                                    onClick={()=>setIncludeHotel(!includeHotel)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                                        includeHotel ? 'bg-black' : 'bg-gray-300'
                                    }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                                            includeHotel ? 'translate-x-6' : ''
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm">Categoría del hotel:</span>
                                {[1,2,3,4,5].map(i => (
                                    <span
                                        key={i}
                                        onClick={()=>setStars(i)}
                                        className={`cursor-pointer text-xl ${
                                            i <= stars ? 'text-black' : 'text-gray-300'
                                        }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <textarea
                            placeholder="Mensaje"
                            className="w-full border-b mt-8 py-3 outline-none"
                        />

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => {
                                    const ok = validate()
                                    if (!ok) return
                                }}
                                className="bg-black text-white px-10 py-3"
                            >
                                {texto.send}
                            </button>
                        </div>
                    </Section>
                </div>
            </section>
        </>
    )
}

function Section({ title, children, open, onClick, error }: any) {
    return (
        <div className="mb-6 pb-4">
            <div onClick={onClick} className="flex justify-between items-center cursor-pointer">
                <h3 className={`tracking-widest text-sm ${error ? 'text-red-500' : ''}`}>
                    {title}
                </h3>

                <div className="relative w-5 h-5">
                    <span className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2"></span>
                    <span className={`absolute left-1/2 top-0 h-full w-[2px] bg-black -translate-x-1/2 transition-all duration-300 ${open ? 'opacity-0 scale-y-0' : ''}`}></span>
                </div>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] mt-6' : 'max-h-0'}`}>
                {children}
            </div>
        </div>
    )
}