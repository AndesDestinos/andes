'use client';

import Step1 from '@/components/booking/step1';
import Step2 from '@/components/booking/step2';
import PagoStep from '@/components/booking/step3';
import { useState } from 'react';

export type FormData = {
  tour: string;
  viajeros: number;
  servicio: 'privado' | 'lujo';
  fechaInicio: Date | null;
  fechaFin: Date | null;
  viajerosData: any[];
};

export default function Booking() {
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