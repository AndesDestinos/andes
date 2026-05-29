"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
  isOpen: boolean
  onClose: () => void
  lang?: "es" | "en"
}

export default function ContactModal({ isOpen, onClose, lang = "es" }: Props) {
  const [errors, setErrors] = useState<any>({})
  const [showToast, setShowToast] = useState(false)
  const [successToast, setSuccessToast] = useState(false)
  const [form, setForm] = useState({
    title: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    message: ""
  })

  const validate = () => {
    const newErrors: any = {}

    if (!form.title) newErrors.title = true
    if (!form.name) newErrors.name = true
    if (!form.email) newErrors.email = true
    if (!form.phone) newErrors.phone = true
    if (!form.country) newErrors.country = true

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!isOpen) return null

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const isValid = validate()

    if (!isValid) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    try {
      const res = await fetch("/api/modal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          lang
        })
      })

      const data = await res.json()

      if (data.success) {
        setSuccessToast(true)
        setForm({
          title: "",
          name: "",
          email: "",
          phone: "",
          country: "",
          message: ""
        })

        setTimeout(() => {
          setSuccessToast(false)
          onClose()
        }, 2500)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {showToast && (
        <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-[1000]">
            {lang === "es"
            ? "Por favor completa todos los campos obligatorios"
            : "Please complete all required fields"}
        </div>
      )}

      {successToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-[1000]">
          {lang === "es"
            ? "Mensaje enviado correctamente"
            : "Message sent successfully"}
        </div>
      )}

      <div className="relative w-[95%] max-w-6xl bg-white grid md:grid-cols-2 shadow-2xl">
        <div className="hidden md:block relative h-full min-h-[500px]">
          <Image
            src="/images/share/formModal.jpg"
            alt="Cusco"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-10 md:p-14 flex flex-col gap-6">
          
          <button 
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <div>
            <h2 className="font-semibold tracking-wide">
              {lang === "es" 
                ? "NECESITAS AYUDA CONTACTAMOS" 
                : "NEED HELP CONTACT US"}
            </h2>

            <p className="text-gray-500 mt-2">
              {lang === "es"
                ? "Personaliza tu viaje con experto en viaje"
                : "Customize your trip with a travel expert"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="title"
              value={form.title}
              onChange={handleChange}
              className={`border-b py-2 outline-none bg-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">
                {lang === "es" ? "Título *" : "Title *"}
              </option>
              <option value="mr">
                {lang === "es" ? "Sr." : "Mr."}
              </option>
              <option value="mrs">
                {lang === "es" ? "Sra." : "Mrs."}
              </option>
            </select>

            <input 
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder={lang === "es" ? "Nombre*" : "Name*"}
              className={`border-b py-2 outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            <input 
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder={lang === "es" ? "Correo*" : "Email*"}
              className={`border-b py-2 outline-none md:col-span-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            <input 
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder={lang === "es" ? "Teléfono / WhatsApp*" : "Phone / WhatsApp*"}
              className={`border-b py-2 outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              required
            />

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className={`border-b py-2 outline-none bg-transparent ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">
                {lang === "es" ? "País *" : "Country *"}
              </option>
              <option value="national">
                {lang === "es" ? "Nacional" : "Local"}
              </option>
              <option value="foreign">
                {lang === "es" ? "Extranjero" : "Foreigner"}
              </option>
            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={lang === "es" ? "Mensaje" : "Message"}
              className="border-b border-gray-300 py-2 outline-none md:col-span-2 resize-none"
              rows={4}
            />

            <div className="md:col-span-2 flex justify-end">
              <button 
                type="submit"
                className="cursor-pointer bg-black text-white px-8 py-3 tracking-wide hover:bg-gray-900 transition"
              >
                {lang === "es" ? "ENVIAR AHORA" : "SEND NOW"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}