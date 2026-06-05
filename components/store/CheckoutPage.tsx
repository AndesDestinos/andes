'use client';

import CheckoutForm from "@/components/store/CheckoutForm";
import OrderSummary from "@/components/store/OrderSummary";
import { urlFor } from "@/lib/sanity.image";
import { useState } from "react";

export default function CheckoutPage({ lang, hero }: any) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        countryCode: '',
        countryName: ''
    });

    return (
        <>
            <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
                <img src={hero?.image ? urlFor(hero.image).url() : '/images/share/noImage.jpg'}
                    className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-center">
                        {hero?.title?.[lang]}
                    </h1>
                </div>
            </section>
            <div className="andes-contenido-pequenio grid grid-cols-1 lg:grid-cols-2 gap-10">
                <CheckoutForm lang={lang} form={form} setForm={setForm} />
                <OrderSummary lang={lang} form={form} setForm={setForm} />
            </div>
        </>
    );
}