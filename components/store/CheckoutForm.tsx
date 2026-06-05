'use client';

import PhoneInput, { getCountries } from "react-phone-number-input";
import es from "react-phone-number-input/locale/es.json";
import "react-phone-number-input/style.css";

export default function CheckoutForm({ lang, form, setForm }: { lang: "es" | "en", form: any, setForm: any }) {
    const t = {
        es: {
        title: "Detalles de facturación",
        firstName: "Nombre",
        lastName: "Apellido",
        address: "Dirección",
        city: "Ciudad",
        phone: "Teléfono",
        email: "Correo electrónico",
        },
        en: {
        title: "Billing details",
        firstName: "First name",
        lastName: "Last name",
        address: "Address",
        city: "City",
        phone: "Phone",
        email: "Email",
        }
    }[lang];

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{t.title}</h2>

            <input placeholder={t.firstName}
                onChange={(e)=>setForm({...form, firstName:e.target.value})}
                className="border-b border-b-[#BCBCBC] py-2 outline-none text-[#BCBCBC] focus:border-black focus:text-black valid:text-black" />

            <input placeholder={t.lastName}
                onChange={(e)=>setForm({...form, lastName:e.target.value})}
                className="border-b border-b-[#BCBCBC] py-2 outline-none text-[#BCBCBC] focus:border-black focus:text-black valid:text-black" />

            <input placeholder={t.address}
                onChange={(e)=>setForm({...form, address:e.target.value})}
                className="border-b border-b-[#BCBCBC] py-2 outline-none text-[#BCBCBC] focus:border-black focus:text-black valid:text-black" />

            <div className="flex flex-col gap-2">
                <select
                    value={form.countryCode || ''}
                    onChange={(e) => {
                    const code = e.target.value;
                    setForm({
                        ...form,
                        countryCode: code,
                        countryName: es[code as keyof typeof es],
                        phone: ''
                    });
                    }}
                    className="border-b border-b-[#BCBCBC] py-2 outline-none
                    text-[#BCBCBC]
                    focus:border-black focus:text-black">
                    <option value="">
                    {lang === 'es' ? 'País' : 'Country'}
                    </option>
                    {getCountries().map((c) => (
                        <option key={c} value={c}>
                            {es[c]} ({c})
                        </option>
                    ))}
                </select>

                <PhoneInput
                    international
                    defaultCountry={form?.countryCode || undefined as any}
                    value={form.phone}
                    onChange={(value) => {
                        setForm({ ...form, phone: value || '' });
                    }}
                    onCountryChange={(country) => {
                        if (!country) return;
                        setForm({
                            ...form,
                            countryCode: country,
                            countryName: es[country as keyof typeof es]
                        });
                    }}
                    className="w-full border-b border-b-[#BCBCBC] py-2 outline-none
                    text-[#BCBCBC]
                    focus:border-black focus:text-black"/>
            </div>

            <input placeholder={t.city}
                onChange={(e)=>setForm({...form, city:e.target.value})}
                className="border-b border-b-[#BCBCBC] py-2 outline-none text-[#BCBCBC] focus:border-black focus:text-black valid:text-black" />

            <input placeholder={t.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}
                className="border-b border-b-[#BCBCBC] py-2 outline-none text-[#BCBCBC] focus:border-black focus:text-black valid:text-black" />
        </div>
    );
}