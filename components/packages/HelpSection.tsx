"use client"

import {urlFor} from '@/lib/sanity.image'
import ContactModal from './ContactModal'
import { useState } from 'react'

export default function HelpSection({ help, lang }: any) {
  const [open, setOpen] = useState(false)
  
  return (
    <section id="help">
        <div className="andes-contenido-pequenio grid md:grid-cols-2 grid-cols-1 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                    <img
                        src={help?.images?.length > 0 ? urlFor(help.images[0]).width(2000).url() : '/images/share/noImage.jpg'}
                        className="w-full h-[220px] object-cover rounded-[20px]"
                    />
                    <img
                        src={help?.images?.length > 1 ? urlFor(help.images[1]).width(2000).url() : '/images/share/noImage.jpg'}
                        className="w-full h-[180px] object-cover rounded-[20px]"
                    />
                </div>
                <div className="grid gap-4">
                    <img
                        src={help?.images?.length > 2 ? urlFor(help.images[2]).width(2000).url() : '/images/share/noImage.jpg'}
                        className="w-full h-[180px] object-cover rounded-[20px]"
                    />
                    <img
                        src={help?.images?.length > 3 ? urlFor(help.images[3]).width(2000).url() : '/images/share/noImage.jpg'}
                        className="w-full h-[220px] object-cover rounded-[20px]"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="leading-tight">
                    { help?.title?.[lang] }
                </h2>

                <p className="text-gray-600 max-w-md">
                    { help?.description?.[lang] }
                </p>

                <button className="bg-black cursor-pointer text-white px-6 py-3 w-fit" onClick={() => setOpen(true)}>
                    { help?.actionText?.[lang] }
                </button>
            </div>
        </div>
        <ContactModal
            isOpen={open}
            onClose={() => setOpen(false)}
        />
    </section>
  )
}