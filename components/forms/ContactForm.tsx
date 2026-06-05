'use client'

import { urlFor } from '@/lib/sanity.image'
import { useState, useEffect } from 'react'
import ContactModal from '../packages/ContactModal'
import PhoneInput, { getCountries } from "react-phone-number-input";
import esCountries from "react-phone-number-input/locale/es.json";
import "react-phone-number-input/style.css";

type Language = 'en' | 'es'

export default function ContactUsForm({ language, hero }: { language: Language, hero: any }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
    const [toast, setToast] = useState<{
        message: string
        type: 'success' | 'error'
    } | null>(null)

    const messages = {
        es: {
            success: 'Mensaje enviado exitosamente',
            error: 'Error al enviar mensaje',
        },
        en: {
            success: 'Message sent successfully',
            error: 'Error sending message',
        }
    }
  const translations = {
    en: {
      titlePage: "CONTACT US",
      talk: "LET'S TALK!",
      talkDesc: 'Our team is ready to answer your questions quickly.',
      meet: 'SCHEDULE A MEETING',
      call: "LET'S SPEAK!",
      callDesc: 'Prefer to talk by phone? We are here to help.',
      request: 'REQUEST A CALL',
      title: 'TELL US, WE ARE HERE TO HELP YOU',
      subtitle: 'Our team will contact you as soon as possible.',
      name: 'Name*',
      email: 'Email*',
      phone: 'Phone / WhatsApp*',
      country: 'Country*',
      message: 'Message',
      accept: 'I have read and accept the privacy policy *',
      send: 'SEND NOW',
      error: 'Complete all required fields',
      success: 'Message sent successfully',
    },
    es: {
      titlePage: "CONTÁCTENOS",
      talk: '¡VAMOS A CHARLAR!',
      talkDesc: 'Nuestro equipo está listo para responder a sus preguntas.',
      meet: 'AGENDAR UNA REUNIÓN',
      call: '¡HABLEMOS!',
      callDesc: '¿Prefieres hablar por teléfono? estamos aquí para ayudarte.',
      request: 'SOLICITAR UNA LLAMADA',
      title: 'CUÉNTANOS, ESTAMOS AQUÍ PARA AYUDARTE',
      subtitle: 'Nuestro equipo se pondrá en contacto lo antes posible.',
      name: 'Nombre*',
      email: 'Correo*',
      phone: 'Teléfono / WhatsApp*',
      country: 'País*',
      message: 'Mensaje',
      accept: 'He leído y acepto la política de privacidad *',
      send: 'ENVIAR AHORA',
      error: 'Completa todos los campos obligatorios',
      success: 'Mensaje enviado correctamente',
    },
  }

  const texto = translations[language]

  const validate = (data: any) => {
    const e: Record<string, boolean> = {}

    if (!data.name) e.name = true
    if (!data.email || !data.email.includes('@')) e.email = true
    if (!data.phone) e.phone = true
    if (!data.country) e.country = true
    if (!data.accept) e.accept = true

    return e
  }

  const [formState, setFormState] = useState({
    countryCode: '',
    countryName: '',
    phone: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const form = new FormData(e.target)

    const data = {
      name: form.get('name'),
      email: form.get('email'),
      phone: formState.phone,
      country: formState.countryName,
      countryCode: formState.countryCode,
      message: form.get('message'),
      accept: form.get('accept'),
      lang: language,
    }

    const validation = validate(data)

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setToast({message: texto.error, type: "error"})
      return
    }

    setErrors({})
    setLoading(true)

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const result = await res.json()
    setToast(result.success ? {message: messages[language].success, type: "success"} : {message: messages[language].error, type: "success"})
    setLoading(false)
  }

  const getCalendlyUrl = () => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    date.setHours(10, 0, 0, 0)
    const iso = date.toISOString()
    return `https://calendly.com/dominick-santariga/30min?date=${iso}`
  }

    useEffect(() => {
        if (!toast) return

        const timer = setTimeout(() => {{hero?.title?.[language]}
            setToast(null)
        }, 2000)

        return () => clearTimeout(timer)
    }, [toast])

  return (
    <>
        <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
            <img
                src={hero?.image ? urlFor(hero.image).url() : '/images/share/noImage.jpg'}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-center">
                    {hero?.title?.[language]}
                </h1>
            </div>
        </section>

        <section className="w-full">
            {toast && (
                <div
                    className={`fixed top-5 right-5 z-[9999] px-5 py-3 rounded-lg shadow-lg
                    ${toast.type === 'success'
                        ? 'bg-green-50 border border-green-400 text-green-900'
                        : 'bg-red-50 border border-red-400 text-red-900'
                    }`}
                >
                    {toast.message}
                </div>
            )}

            <div className="andes-contenido-pequenio grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-21 text-center">
                <div className='grid gap-5'>
                    <div className="w-full flex items-center justify-center">
                        <div className="border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
                            <img
                                src="/images/forms/comentario.svg"
                                alt="chat"
                                className="w-5 h-5 object-contain"
                            />
                        </div>
                    </div>
                    <h4 className="">{texto.talk}</h4>
                    <p className="text-sm text-gray-600">{texto.talkDesc}</p>
                    <div className='w-full justify-center'>
                        <a
                            href={getCalendlyUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer relative overflow-hidden border border-black px-6 py-2 text-black group transition-colors duration-300 hover:text-white inline-block"
                        >
                            <span className="relative z-10">{texto.meet}</span>
                            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </a>
                    </div>
                </div>

                <div className='grid gap-5'>
                    <div className="w-full flex items-center justify-center">
                        <div className="border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
                            <img
                                src="/images/forms/llamada.svg"
                                alt="chat"
                                className="w-5 h-5 object-contain"
                            />
                        </div>
                    </div>
                    <h4 className="">{texto.call}</h4>
                    <p className="text-gray-600">{texto.callDesc}</p>
                    <div className='w-full justify-center'>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="cursor-pointer relative overflow-hidden border border-black px-6 py-2 text-black group 
                            transition-colors duration-300 hover:text-white inline-block"
                        >
                            <span className="relative z-10">{texto.request}</span>
                            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="andes-contenido-pequenio flex flex-col gap-5">
                <h2 className="">
                    {texto.title}
                </h2>
                <p className="text-gray-600 mt-2">{texto.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="andes-contenido-pequenio">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <input
                        name="name"
                        placeholder={texto.name}
                        className={`w-full border-b bg-transparent px-1 py-2 outline-none ${
                            errors.name ? 'border-red-500 border-b-2' : 'border-gray-300'
                        }`}
                    />

                    <input
                        name="email"
                        placeholder={texto.email}
                        className={`w-full border-b bg-transparent px-1 py-2 outline-none ${
                            errors.email ? 'border-red-500 border-b-2' : 'border-gray-300'
                        }`}
                    />

                        <select
                            value={formState.countryCode}
                            onChange={(e) => {
                            const code = e.target.value;
                            setFormState({
                                ...formState,
                                countryCode: code,
                                countryName: esCountries[code as keyof typeof esCountries],
                                phone: ''
                            });
                            }}
                            className={`w-full border-b bg-transparent px-1 py-2 outline-none ${
                            errors.country ? 'border-red-500 border-b-2' : 'border-gray-300'
                            }`}
                        >
                            <option value="">
                            {language === 'es' ? 'País*' : 'Country*'}
                            </option>

                            {getCountries().map((c) => (
                            <option key={c} value={c}>
                                {esCountries[c]} ({c})
                            </option>
                            ))}
                        </select>

                        <PhoneInput
                            international
                            defaultCountry={formState.countryCode || undefined as any}
                            value={formState.phone}
                            onChange={(value) => {
                            setFormState({ ...formState, phone: value || '' });
                            }}
                            onCountryChange={(country) => {
                            if (!country) return;
                            setFormState({
                                ...formState,
                                countryCode: country,
                                countryName: esCountries[country as keyof typeof esCountries]
                            });
                            }}
                            className={`w-full border-b py-2 outline-none ${
                            errors.phone ? 'border-red-500 border-b-2' : 'border-gray-300'
                            }`}
                        />
                </div>

                <textarea
                    name="message"
                    placeholder={texto.message}
                    className="w-full input mt-8 md:mt-10 h-[100px] outline-none focus:ring-0 border-b border-b-[#CDCDCD]"
                />

                <div className="mt-6 flex items-center gap-2">
                    <input type="checkbox" name="accept" />
                    <span className={errors.accept ? 'text-red-500' : ''}>
                        {texto.accept}
                    </span>
                </div>

                <div className="flex justify-center mt-8 md:mt-10 pb-25">
                    <button
                        disabled={loading}
                        className="w-full sm:w-auto cursor-pointer relative overflow-hidden border border-black px-6 sm:px-10 py-3 text-black group transition-colors duration-300 hover:text-white"
                    >
                        <span className="relative z-10">
                            {loading ? '...' : texto.send}
                        </span>

                        <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </button>
                </div>
            </form>

            <ContactModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </section>
    </>
  )
}