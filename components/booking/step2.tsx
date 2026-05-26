'use client';

import { useState, useEffect } from "react";
import BookingLayout from "./layout";

const extrasList = [
  { id: 1, name: "Walking Sticks", price: 20 },
  { id: 2, name: "Bolsa dormir", price: 25 },
  { id: 3, name: "Matra inflable", price: 20 },
  { id: 4, name: "Tren Expedition", price: 0 },
  { id: 5, name: "Tren Vistadome", price: 75 },
];

export default function Step2({ lang, form, setForm, next, prev }: any) {
  const texto = {
    es: {
      missing: (i:number)=>`Faltan datos en el viajero ${i+1}`,
      noLeader: 'Debe haber un líder del grupo'
    },
    en: {
      missing: (i:number)=>`Missing data for traveler ${i+1}`,
      noLeader: 'There must be a group leader'
    }
  };
  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'warn' | 'success';
  } | null>(null);
  const [openExtras, setOpenExtras] = useState<number | null>(null);
  const [openCard, setOpenCard] = useState<number | null>(0);

  const showToast = (message: string, type: 'error' | 'warn' | 'success' = 'warn') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    setForm((prev: any) => {
      let nuevos = [...prev.viajerosData];
      while (nuevos.length < prev.viajeros) {
        nuevos.push({
          denominacion: 'Sr.',
          nombre: '',
          apellido: '',
          pais: 'Perú',
          tipoDoc: 'DNI',
          numeroDoc: '',
          fechaNacimiento: '',
          lider: nuevos.length === 0 && !nuevos.some(v => v.lider),
          extras: []
        });
      }
      if (nuevos.length > prev.viajeros) {
        nuevos = nuevos.slice(0, prev.viajeros);
      }
      return {
        ...prev,
        viajerosData: nuevos
      };
    });
  }, [form.viajeros]);

  const update = (i: number, field: string, value: any) => {
    const arr = [...form.viajerosData];
    arr[i] = { ...arr[i], [field]: value };
    setForm({ ...form, viajerosData: arr });
  };

  const removeViajero = (i: number) => {
    let arr = [...form.viajerosData];
    arr.splice(i, 1);
    const hasLeader = arr.some(v => v.lider);
    if (!hasLeader && arr.length > 0) {
      arr[0].lider = true;
    }
    setForm({
      ...form,
      viajeros: Math.max(1, form.viajeros - 1),
      viajerosData: arr
    });
    setOpenCard(null);
    setOpenExtras(null);
  };

  const viajeroBase = {
    denominacion: '',
    nombre: '',
    apellido: '',
    pais: '',
    tipoDoc: '',
    numeroDoc: '',
    fechaNacimiento: '',
    lider: false,
    extras: []
  };

  const addViajero = () => {
    setForm({
      ...form,
      viajeros: form.viajeros + 1,
      viajerosData: [...form.viajerosData, { ...viajeroBase }]
    });
  };

  const toggleLeader = (index: number) => {
    const arr = form.viajerosData.map((v: any, i: number) => ({
      ...v,
      lider: i === index
    }));
    setForm({ ...form, viajerosData: arr });
  };

  const toggleExtra = (i: number, id: number) => {
    const arr = [...form.viajerosData];
    const current = arr[i]?.extras || [];

    arr[i].extras = current.includes(id)
      ? current.filter((e: number) => e !== id)
      : [...current, id];

    setForm({ ...form, viajerosData: arr });
  };

  const viajeros = form.viajerosData;
  const validateStep2 = () => {
    for (let i = 0; i < form.viajerosData.length; i++) {
      const v = form.viajerosData[i];
      if (
        !v.denominacion ||
        !v.nombre ||
        !v.apellido ||
        !v.pais ||
        !v.tipoDoc ||
        !v.numeroDoc ||
        !v.fechaNacimiento
      ) {
        showToast(texto[lang as 'es' | 'en'].missing(i), 'warn');
        return false;
      }
    }
    const hasLeader = form.viajerosData.some((v: any) => v.lider);
    if (!hasLeader) {
      showToast(texto[lang as 'es' | 'en'].noLeader, 'error');
      return false;
    }
    return true;
  };

  return (
    <BookingLayout form={form} lang={lang} step={2}>
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg text-white transition-all
              ${toast.type === 'error' ? 'bg-red-500' : ''}
              ${toast.type === 'warn' ? 'bg-yellow-500' : ''}
              ${toast.type === 'success' ? 'bg-green-500' : ''}
            `}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className='flex flex-col gap-12'>
        <div className="flex flex-col gap-1">
          <h4 className="text-[#ABB8C3]">
            { lang === 'es' ? 'TOUR SELECCIONADO' : 'SELECTED TOUR' }
          </h4>
          <h2>
            {form.tourData.title}
          </h2>
          <span>
            {form.tourData.durationLabel}
          </span>
        </div>
      
        <div className='flex flex-col w-full bg-[#F5F2EB] p-6 gap-3'>
          <span>
            { lang === 'es' ? 
            'Para reservar su viaje en menos de 5 minutos, podrías necesitar lo siguiente:' :
            'To book your trip in less than 5 minutes, you might need the following:' }
          </span>
          <div className='flex justify-between'>
            <div className='flex gap-3 items-center'>
              <img src='/images/booking/information.svg' />
              <span>
                { lang === 'es' ? 'Información de los viajeros' : 'Traveler information' }
              </span>
            </div>
            <div className='flex gap-3 items-center'>
              <img src='/images/booking/card.svg' />
              <span>
                { lang === 'es' ? 'Tarjeta de crédito' : 'Credit card' }
              </span>
            </div>
            <div className='flex gap-3 items-center'>
              <img src='/images/booking/paypal.svg' />
              <span>
                { lang === 'es' ? 'PayPal' : 'PayPal' }
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2>
            { lang === 'es' ? '¿QUIÉNES VIAJARÁN?' : 'WHO WILL TRAVEL?' }
          </h2>
          <span>
            { lang === 'es' ? 
            'Para su reserva, necesitamos los datos de cada viajero.' : 
            'For your reservation, we need the details of each traveler.' }
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {viajeros.map((v: any, i: number) => {
            const isOpen = openCard === i;
            return (
              <div key={i} className="border border-[#DDDDDD] bg-white relative">
                <div className="flex justify-between items-center p-5">
                  <div className="flex flex-col gap-3">
                    <h3 className={v?.nombre ? '' : 'text-[#B0B0B0]'}>
                      {v?.nombre || ( lang === 'es' ? 'Nombre del pasajero' : 'Passenger name')}
                    </h3>
                    <span className="">
                      {( lang === 'es' ? 'Información del viajero ' : 'Traveler Information ') + (i + 1)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => removeViajero(i)}
                      className="cursor-pointer w-12 h-12 rounded-full flex items-center justify-center bg-[#FEE5E5]"
                    >
                      <img 
                        src="/images/booking/back.svg" 
                        alt="remove" 
                        className="w-5 h-5"
                      />
                    </button>

                    <button
                      onClick={() => setOpenCard(isOpen ? null : i)}
                      className="cursor-pointer w-12 h-12 rounded-full border border-[#DCDCDC] flex items-center justify-center hover:border-black"
                    >
                      <svg
                        className={`w-7 h-7 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox={`0 0 ${isOpen ? '25 25' : '24 21'}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="w-full p-6">
                    <div className="grid grid-cols-12 gap-7">
                      <div className="col-span-2 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          {lang === 'es' ? 'Denominación' : 'Denomination'}
                        </span>
                        <select value={v?.denominacion || 'Sr.'}
                          onChange={(e) => update(i, 'denominacion', e.target.value)}
                          className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black">
                          <option value="Sr.">Sr.</option>
                          <option value="Sra.">Sra.</option>
                        </select>
                      </div>

                      <div className="col-span-4 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          {lang === 'es' ? 'Nombre *' : 'Name *'}
                        </span>
                        <input
                          className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black"
                          value={v?.nombre || ""}
                          onChange={(e)=>update(i,'nombre',e.target.value)}
                        />
                      </div>

                      <div className="col-span-4 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          {lang === 'es' ? 'Apellido *' : 'Last name *'}
                        </span>
                        <input
                          className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black"
                          value={v?.apellido || ""}
                          onChange={(e)=>update(i,'apellido',e.target.value)}
                        />
                      </div>

                      <div className="col-span-2 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          {lang === 'es' ? 'País *' : 'Country *'}
                        </span>
                        <select value={v?.pais  || 'Perú'}
                          onChange={(e) => update(i, 'pais', e.target.value)}
                          className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black">
                          <option value="Perú">Perú</option>
                          <option value="USA">USA</option>
                        </select>
                      </div>

                      <div className="col-span-2 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          Doc.
                        </span>
                        <select value={v?.tipoDoc  || 'DNI'}
                          onChange={(e) => update(i, 'tipoDoc', e.target.value)}
                          className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black">
                          <option value="DNI">DNI</option>
                          <option value="Passport">Passport</option>
                        </select>
                      </div>

                      <div className="col-span-4 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          {lang === 'es' ? 'Número doc. *' : 'Document number *'}
                        </span>
                        <input
                          className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black"
                          value={v?.numeroDoc || ""}
                          onChange={(e) => update(i, 'numeroDoc', e.target.value)}
                        />
                      </div>

                      <div className="col-span-4 flex flex-col gap-2">
                        <span className="text-[#BCBCBC]">
                          {lang === 'es' ? 'Fecha de nacimiento *' : 'Birth date *'}
                        </span>
                        <input value={v?.fechaNacimiento || ''}
                          onChange={(e) => update(i, 'fechaNacimiento', e.target.value)}
                          type="date" className="border-b border-b-[#BCBCBC] py-2 outline-none
                          text-[#BCBCBC]
                          focus:border-black focus:text-black
                          valid:text-black" />
                      </div>

                      <div className="col-span-2 flex items-end justify-end gap-3">
                        <span className={`${v?.lider ? 'text-black' : 'text-[#BCBCBC]'}`}>
                          {lang === 'es' ? 'Líder del grupo' : 'Group leader'}
                        </span>
                        <button
                          onClick={() => toggleLeader(i)}
                          className={`w-10 h-6 rounded-full relative transition-colors duration-200
                            ${v?.lider ? 'bg-black' : 'bg-[#BCBCBC]'}
                          `}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200
                              ${v?.lider ? 'right-0.5' : 'left-0.5'}
                            `}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end relative">
                      <button
                        onClick={() => setOpenExtras(openExtras === i ? null : i)}
                        className="flex items-center text-white bg-[#EC4724] gap-2 px-5 py-2 cursor-pointer"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="12" y1="7" x2="12" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>
                          { lang === 'es' ? 'Adicionales' : 'Additional' }
                        </span>
                      </button>

                      {openExtras === i && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
                          <div className="bg-white w-full max-w-md p-6 relative">
                            <button
                              onClick={() => setOpenExtras(null)}
                              className="absolute top-3 right-3 text-gray-500"
                            >
                              ✕
                            </button>
                            <h4 className="mb-4">
                              Elige tus complementos
                            </h4>
                            <div className="flex flex-col gap-3">
                              {extrasList.map((extra) => {
                                const selected = v?.extras?.includes(extra.id);
                                return (
                                  <label
                                    key={extra.id}
                                    className="flex justify-between items-center border p-3 cursor-pointer"
                                  >
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="checkbox"
                                        checked={selected}
                                        onChange={() => toggleExtra(i, extra.id)}
                                      />
                                      {extra.name}
                                    </div>

                                    <span>${extra.price}</span>
                                  </label>
                                );
                              })}
                            </div>
                            <button
                              onClick={() => setOpenExtras(null)}
                              className="mt-6 w-full bg-black text-white py-2"
                            >
                              Confirmar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-[-36px]">
          <button
            onClick={addViajero}
            className="flex items-center gap-2 px-6 py-2 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#EC4724" />
              <line x1="12" y1="7" x2="12" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            <span>
              { lang === 'es' ? 'Agregar viajero' : 'Add traveler' }
            </span>
          </button>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prev}
            className="relative overflow-hidden border border-black pl-3 pr-3 text-black cursor-pointer group"
          >
            <div className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
            <div className="flex items-center relative z-10 transition-colors duration-300 group-hover:text-white">
              <svg
                className="w-9 h-9 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <text x="6" y="17" fontSize="16">{'<'}</text>
              </svg>
              <span>
                { lang === 'es' ? 'VOLVER' : 'BACK' }
              </span>
            </div>
          </button>
          <button
            onClick={() => {
              if (!validateStep2()) return;
              next();
            }}
            className="relative overflow-hidden border border-black pl-5 pr-3 text-black cursor-pointer group"
          >
            <div className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
            <div className="flex items-center relative z-10 transition-colors duration-300 group-hover:text-white">
              <span>
                { lang === 'es' ? 'CONTINUAR' : 'CONTINUE' }
              </span>
              <svg
                className="w-9 h-9 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <text x="6" y="17" fontSize="16">{'>'}</text>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </BookingLayout>
  );
}