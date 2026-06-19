'use client';

import Step1 from '@/components/booking/step1';
import Step2 from '@/components/booking/step2';
import Step3 from '@/components/booking/step3';
import { urlFor } from '@/lib/sanity.image';
import { useEffect, useState } from 'react';
import Step4 from './step4';
import { useSearchParams } from 'next/navigation';
import RecognizedExcellence from '../shared/RecognizedExcellence';

export type FormData = {
  tourId: string;
  tourData: {
    title: string;
    price: number;
    image: any;
    days: number;
    category: {
      title: string;
      type: string;
    };
    type: string;
  } | null;
  viajeros: number;
  servicio: 'privado' | 'lujo';
  fechaInicio: Date | null;
  fechaFin: Date | null;
  viajerosData: any[];
  paymentType: 'half' | 'full' | null;
  donationActive: boolean;
  donationAmount: number;
};

export default function BookingForm({lang, hero, data, reconocimiento}: any) {
  const searchParams = useSearchParams()
  const tourIdFromUrl = searchParams.get('tourId')
  const inititalStateForm: FormData = {
    tourId: '',
    tourData: null,
    viajeros: 2,
    servicio: 'privado',
    fechaInicio: null,
    fechaFin: null,
    viajerosData: [],
    paymentType: null,
    donationActive: false,
    donationAmount: 0,
  }

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(inititalStateForm);

  const reset = () => {
    setForm(inititalStateForm);
    setStep(1);
  };

  useEffect(() => {
    const savedStep = localStorage.getItem('bookingStep');
    if (savedStep) {
      setStep(Number(savedStep));
    }
    const saved = localStorage.getItem('bookingForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm({
        ...parsed,
        fechaInicio: parsed.fechaInicio ? new Date(parsed.fechaInicio) : null,
        fechaFin: parsed.fechaFin ? new Date(parsed.fechaFin) : null,
      });
    }
  }, []);

  useEffect(() => {
    if (!tourIdFromUrl || !data?.length) return
    const selected = data.find((item: any) => item._id === tourIdFromUrl)
    if (selected) {
        setForm((prev) => ({
        ...prev,
        tourId: selected._id,
        tourData: selected,
        }))
    }
  }, [tourIdFromUrl, data])

  useEffect(() => {
    const safeForm = {
        ...form,
    };
    localStorage.setItem('bookingForm', JSON.stringify(safeForm));
  }, [form]);

  useEffect(() => {
    localStorage.setItem('bookingStep', step.toString());
  }, [step]);

  return (
    <>
        <section className="relative h-[40vh] sm:h-[50vh] md:h-[75vh] w-full">
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
                lang={lang}
                form={form}
                setForm={setForm}
                data={data}
                next={() => setStep(2)}
            />
        )}

        {step === 2 && (
            <Step2
                lang={lang}
                form={form}
                setForm={setForm}
                next={() => setStep(3)}
                prev={() => setStep(1)}
            />
        )}

        {step === 3 && (
            <Step3
                lang={lang}
                form={form}
                setForm={setForm}
                next={() => setStep(4)}
                prev={() => setStep(2)}
            />
        )}

        {step === 4 && (
            <Step4
                lang={lang}
                form={form}
                reset={() => reset()}
            />
        )}

        <div className='pt-36'>
          <RecognizedExcellence
            title={reconocimiento.title}
            items={reconocimiento.items}
            lang={lang}
          />
        </div>
    </>
  );
}