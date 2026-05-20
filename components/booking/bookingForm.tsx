'use client';

import Step1 from '@/components/booking/step1';
import Step2 from '@/components/booking/step2';
import PagoStep from '@/components/booking/step3';
import { urlFor } from '@/lib/sanity.image';
import { useState } from 'react';

export type FormData = {
  tour: string;
  viajeros: number;
  servicio: 'privado' | 'lujo';
  fechaInicio: Date | null;
  fechaFin: Date | null;
  viajerosData: any[];
};

export default function BookingForm({lang, hero}: any) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<FormData>({
    tour: '',
    viajeros: 2,
    servicio: 'privado',
    fechaInicio: null,
    fechaFin: null,
    viajerosData: []
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
        {step === 1 && (
            <Step1
            form={form}
            setForm={setForm}
            next={() => setStep(2)}
            />
        )}

        {step === 2 && (
            <Step2
            form={form}
            setForm={setForm}
            next={() => setStep(3)}
            prev={() => setStep(1)}
            />
        )}

        {step === 3 && (
            <PagoStep
            form={form}
            setForm={setForm}
            next={() => setStep(4)}
            prev={() => setStep(2)}
            />
        )}
    </>
  );
}