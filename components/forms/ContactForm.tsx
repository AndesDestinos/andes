'use client'

import { useState, useEffect } from 'react'

type Language = 'en' | 'es'

export default function ContactUsForm({ language }: { language: Language }) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState('')

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

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const form = new FormData(e.target)

    const data = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      country: form.get('country'),
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

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (result.ok) {
      setToast(texto.success)
      e.target.reset()
    } else {
      setToast('Error')
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
        setToast('')
    }, 2500)

    return () => clearTimeout(timer)
  }, [toast])

  return (
    <>
        <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
            <img
                src="/images/forms/contactenos.webp"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-center">
                    {texto.titlePage}
                </h1>
            </div>
        </section>

        <section className="w-full">
            {toast && (
                <div className="fixed top-5 right-5 z-[9999] bg-red-50 border border-red-400 text-red-900 px-5 py-3 rounded-lg shadow-lg text-sm animate-[fadeIn_0.4s_ease]">
                    {toast}
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
                    <h4 className="font-semibold">{texto.talk}</h4>
                    <p className="text-sm text-gray-600">{texto.talkDesc}</p>
                    <div className='w-full justify-center'>
                        <button className="cursor-pointer relative overflow-hidden border border-black px-6 py-3 text-sm text-black group transition-colors duration-300 hover:text-white">
                            <span className="relative z-10">{texto.meet}</span>
                            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </button>
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
                    <h4 className="font-semibold">{texto.call}</h4>
                    <p className="text-sm text-gray-600">{texto.callDesc}</p>
                    <div className='w-full justify-center'>
                        <button className="cursor-pointer relative overflow-hidden border border-black px-6 py-2 text-sm text-black group transition-colors duration-300 hover:text-white">
                            <span className="relative z-10">{texto.request}</span>
                            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="andes-contenido-pequenio flex flex-col gap-5">
                <h2 className="text-xl md:text-2xl tracking-wide">
                    {texto.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{texto.subtitle}</p>
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

                    <input
                        name="phone"
                        placeholder={texto.phone}
                        className={`w-full border-b bg-transparent px-1 py-2 outline-none ${
                            errors.phone ? 'border-red-500 border-b-2' : 'border-gray-300'
                        }`}
                    />

                    <input
                        name="country"
                        placeholder={texto.country}
                        className={`w-full border-b bg-transparent px-1 py-2 outline-none ${
                            errors.country ? 'border-red-500 border-b-2' : 'border-gray-300'
                        }`}
                    />
                </div>

                <textarea
                    name="message"
                    placeholder={texto.message}
                    className="w-full input mt-8 md:mt-10 h-[100px]"
                />

                <div className="mt-6 flex items-start gap-2 text-sm">
                    <input type="checkbox" name="accept" />
                    <span className={errors.accept ? 'text-red-500' : ''}>
                        {texto.accept}
                    </span>
                </div>

                <div className="flex justify-center mt-8 md:mt-10">
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
        </section>
    </>
  )
}