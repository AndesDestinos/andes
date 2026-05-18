'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  lang: string,
  home: any
}

export default function Footer({ lang, home }: Props) {
  const router = useRouter()
  const [openSection, setOpenSection] = useState<string | null>('contact')

  const goTo = (path: string) => {
    router.push(`/${lang}/${path}`)
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="border-t border-[#BFBFBF] w-full justify-center items-center">
      <div className="andes-contenido">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4 border-b md:border-none pb-4 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('contact')}
            >
              <h3 className="tracking-widest opacity-70">
                {lang === 'es' ? 'CONTACTOS' : 'CONTACT'}
              </h3>
              <span className="md:hidden">
                {openSection === 'contact' ? '−' : '+'}
              </span>
            </div>

            <div className={`${openSection === 'contact' ? 'block' : 'hidden'} md:block text-sm space-y-2`}>
              <p>
                <b>{lang === 'es' ? 'Razón social:' : 'Company name:'} </b>
                {home?.businessName}
              </p>
              <p>
                <b>RUC: </b>
                {home?.ruc}
              </p>
              <p>
                <b>{lang === 'es' ? 'Reservas:' : 'Reservations:'} </b>
                <a
                  href={`mailto:${home?.email?.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:underline"
                >
                  {home?.email}
                </a>
              </p>
              <p>
                <b>{lang === 'es' ? 'Teléfono / WhatsApp:' : 'Phone / WhatsApp:'} </b>
                <a
                  href={`https://wa.me/${home?.phone?.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:underline"
                >
                  {home?.phone}
                </a>
              </p>
              <p>
                <b>{lang === 'es' ? 'Dirección:' : 'Address:'} </b>
                {home?.address}
              </p>

              <button
                onClick={() => goTo('contact-us')}
                className="relative mt-3 px-5 py-2 border border-black text-sm text-black overflow-hidden transition-colors duration-300 before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-300 hover:before:w-full hover:text-white"
              >
                <span className="relative z-10">
                  {lang === 'es' ? 'CONTACTAR AHORA' : 'CONTACT NOW'}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-4 border-b md:border-none pb-4 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('help')}
            >
              <h3 className="tracking-widest opacity-70">
                {lang === 'es' ? 'AYUDA' : 'HELP'}
              </h3>
              <span className="md:hidden">
                {openSection === 'help' ? '−' : '+'}
              </span>
            </div>

            <ul className={`${openSection === 'help' ? 'block' : 'hidden'} md:block space-y-2 text-sm`}>
              <li onClick={() => goTo('contact-us')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Contáctenos' : 'Contact us'}
              </li>
              <li onClick={() => goTo('blogs')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Blog de viaje' : 'Travel blog'}
              </li>
              <li onClick={() => goTo('travel-planner')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Planear mi viaje' : 'Plan my trip'}
              </li>
            </ul>
          </div>

          <div className="space-y-4 border-b md:border-none pb-4 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('company')}
            >
              <h3 className="tracking-widest opacity-70">
                {lang === 'es' ? 'COMPAÑÍA' : 'COMPANY'}
              </h3>
              <span className="md:hidden">
                {openSection === 'company' ? '−' : '+'}
              </span>
            </div>

            <ul className={`${openSection === 'company' ? 'block' : 'hidden'} md:block space-y-2 text-sm`}>
              <li onClick={() => goTo('about-us')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Sobre Andes' : 'About Andes'}
              </li>
              <li onClick={() => goTo('values')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Nuestros valores' : 'Our values'}
              </li>
              <li onClick={() => goTo('social-projects')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Proyectos sociales' : 'Social projects'}
              </li>
              <li onClick={() => goTo('esnna')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Código ESNNA' : 'ESNNA Code'}
              </li>
              <li>
                <img src="/images/footer/protegeme.svg" className="w-20 h-auto" />
              </li>
            </ul>
          </div>

          <div className="space-y-4 border-b md:border-none pb-4 md:pb-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('legal')}
            >
              <h3 className="tracking-widest opacity-70">
                {lang === 'es' ? 'LEGAL' : 'LEGAL'}
              </h3>
              <span className="md:hidden">
                {openSection === 'legal' ? '−' : '+'}
              </span>
            </div>

            <ul className={`${openSection === 'legal' ? 'block' : 'hidden'} md:block space-y-2 text-sm`}>
              <li onClick={() => goTo('terms-conditions')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Términos y condiciones' : 'Terms & Conditions'}
              </li>
              <li onClick={() => goTo('privacy-policy')} className="cursor-pointer hover:underline">
                {lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
              </li>
              <li onClick={() => goTo('complaints-book')} className="flex gap-1 items-center cursor-pointer hover:underline">
                <img src="/images/footer/book.svg" className="h-5 w-5" />
                {lang === 'es' ? 'Libro de reclamaciones' : 'Complaints Book'}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className='flex gap-5 items-center'>
            <p className="text-sm opacity-70">
              {lang === 'es' ? 'Síguenos en' : 'Follow us'}
            </p>
            <div className="flex gap-4">
              {home?.socials?.map((social: any, i: number) => (
                <a key={i} href={social.url} target="_blank">
                  <img src={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className='flex gap-5 items-center'>
            <p className="text-sm opacity-70">
              {lang === 'es' ? 'Métodos de pago' : 'Payment methods'}
            </p>
            <div className="flex gap-4 items-center flex-wrap">
              {home?.paymentMethods?.map((method: any, i: number) => (
                <img
                  key={i}
                  src={method.icon}
                  className="h-10 object-contain"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#BFBFBF] pt-6 text-center text-xs opacity-70">
          Andes Copyright © 2026,{' '}
          {lang === 'es'
            ? 'Todos los derechos reservados'
            : 'All rights reserved'}
        </div>
      </div>
    </footer>
  )
}