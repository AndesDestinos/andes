'use client'

import { useState, useEffect } from 'react'

type Language = 'en' | 'es'

export default function ComplaintsBookForm({ language }: { language: Language }) {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, boolean>>({})
    const [toast, setToast] = useState('')

    const translations = {
        en: {
            hero: 'COMPLAINTS BOOK',
            title: 'Virtual complaints book',
            subtitle:
                'In accordance with consumer protection law, this company provides a virtual complaints book.',
            consumer: 'CONSUMER IDENTIFICATION',
            details: 'DETAILS OF CLAIM / COMPLAINT',
            name: 'Name*',
            lastname: 'Last name*',
            document: 'Document',
            documentNumber: 'Document number*',
            address: 'Address*',
            email: 'Email*',
            phone: 'Phone*',
            type: 'Complaint type',
            service: 'Service contracted*',
            date: 'Date*',
            message: 'Observations',
            accept:
                'I declare that the information provided is true and accurate.',
            send: 'SEND NOW',
            error: 'Complete all required fields',
            success: 'Sent successfully',
        },
        es: {
            hero: 'LIBRO DE RECLAMACIONES',
            title: 'Libro virtual de reclamaciones',
            subtitle:
                'De conformidad con el Código de Protección y Defensa del Consumidor, esta empresa pone a su disposición un Libro Virtual de Reclamaciones.',
            consumer: 'IDENTIFICACION DEL CONSUMIDOR',
            details: 'DETALLES DEL RECLAMO / QUEJA',
            name: 'Nombre*',
            lastname: 'Apellidos*',
            document: 'DNI',
            documentNumber: 'Número de DNI*',
            address: 'Dirección*',
            email: 'Correo*',
            phone: 'Teléfono*',
            type: 'Tipo',
            service: 'Servicio contratado*',
            date: 'Fecha*',
            message: 'Observaciones',
            accept:
                'Declaro que los datos consignados son correctos y fiel expresión de la verdad.',
            send: 'ENVIAR AHORA',
            error: 'Completa todos los campos obligatorios',
            success: 'Enviado correctamente',
        },
    }

    const texto = translations[language] || translations.es

    const validate = (data: any) => {
        const e: Record<string, boolean> = {}
        if (!data.name) e.name = true
        if (!data.lastname) e.lastname = true
        if (!data.documentNumber) e.documentNumber = true
        if (!data.address) e.address = true
        if (!data.email || !data.email.includes('@')) e.email = true
        if (!data.phone) e.phone = true
        if (!data.type) e.type = true
        if (!data.service) e.service = true
        if (!data.date) e.date = true
        if (!data.accept) e.accept = true
        return e
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const data = {
            name: form.get('name'),
            lastname: form.get('lastname'),
            documentNumber: form.get('documentNumber'),
            address: form.get('address'),
            email: form.get('email'),
            phone: form.get('phone'),
            type: form.get('type'),
            service: form.get('service'),
            date: form.get('date'),
            message: form.get('message'),
            accept: form.get('accept'),
        }
        const validation = validate(data)
        if (Object.keys(validation).length > 0) {
            setErrors(validation)
            setToast(texto.error)
            return
        }
        setErrors({})
        setLoading(true)
        await new Promise((r) => setTimeout(r, 1500))
        setToast(texto.success)
        e.target.reset()
        setLoading(false)
    }

    useEffect(() => {
        if (!toast) return
        const timer = setTimeout(() => setToast(''), 2500)
        return () => clearTimeout(timer)
    }, [toast])

    const inputClass = (field: string) =>
        `w-full border-b bg-transparent px-1 py-2 outline-none ${
        errors[field] ? 'border-red-500 border-b-2' : 'border-gray-300'
    }`

    return (
        <>
            <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
                <img
                    src="/images/forms/reclamaciones.webp"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-center tracking-widest">
                        {texto.hero}
                    </h1>
                </div>
            </section>

            <section className="w-full">
                {toast && (
                    <div className="fixed top-5 right-5 z-[9999] bg-red-50 border border-red-400 text-red-900 px-5 py-3 rounded-lg shadow-lg text-sm">
                        {toast}
                    </div>
                )}

                <div className="andes-contenido-pequenio">
                    <div className="text-center mb-12">
                        <h2 className="font-serif">
                            {texto.title}
                        </h2>
                        <p className="text-gray-600 mt-3">
                            {texto.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h3 className="tracking-widest mb-8 text-sm">
                            {texto.consumer}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-10">
                            <input name="name" placeholder={texto.name} className={inputClass('name')} />
                            <input name="lastname" placeholder={texto.lastname} className={inputClass('lastname')} />
                            <select name="type" className={inputClass('type')}>
                                <option value="">{texto.document}</option>
                                <option>DNI</option>
                                <option>Pasaporte</option>
                            </select>
                            <input name="documentNumber" placeholder={texto.documentNumber} className={inputClass('documentNumber')} />
                            <input name="address" placeholder={texto.address} className={inputClass('address')} />
                            <input name="email" placeholder={texto.email} className={inputClass('email')} />
                            <input name="phone" placeholder={texto.phone} className={inputClass('phone')} />
                        </div>

                        <h3 className="tracking-widest mt-16 mb-8">
                            {texto.details}
                        </h3>

                        <div className="grid md:grid-cols-3 gap-10">
                            <select name="type" className={inputClass('type')}>
                                <option value="">{texto.type}</option>
                                <option>Reclamo</option>
                                <option>Queja</option>
                            </select>
                            <input name="service" placeholder={texto.service} className={inputClass('service')} />
                            <input type="date" name="date" className={inputClass('date')} />
                        </div>

                        <textarea
                            name="message"
                            placeholder={texto.message}
                            className="w-full border-b border-gray-300 bg-transparent px-1 py-2 outline-none mt-10 h-[100px]"
                        />

                        <div className="mt-6 flex items-center gap-2 text-sm">
                            <input type="checkbox" name="accept" />
                            <span className={errors.accept ? 'text-red-500' : ''}>
                                {texto.accept}
                            </span>
                        </div>

                        <div className="flex justify-center mt-10">
                            <button
                                disabled={loading}
                                className="cursor-pointer relative overflow-hidden border border-black px-10 py-3 text-black group transition-colors duration-300 hover:text-white"
                            >
                                <span className="relative z-10">
                                {loading ? '...' : texto.send}
                                </span>
                                <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            </button>
                        </div>
                    </form>

                    <div className="mt-16 border border-gray-300 p-6 text-xs text-gray-600 space-y-4">
                        <p>
                            * La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
                        </p>

                        <p>
                            * La empresa deberá dar respuesta al reclamo en un plazo no mayor de 15 (quince) días hábiles improrrogables.
                        </p>

                        <p>
                            * Le informamos que, para efectos de procesar adecuadamente su queja o reclamo, sus datos serán recopilados en nuestro banco de datos de clientes. Sus datos personales serán tratados con confidencialidad y bajo medidas de seguridad.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}