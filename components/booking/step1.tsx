'use client';

import { useState } from 'react';
import BookingLayout from './layout';

export default function Step1({ lang, form, setForm, data, next }: any) {
  const services = [
    { label: { es: 'Privado', en: 'Private'}, value: 'privado', icon: '/images/booking/crown.svg' },
    { label: { es: 'Lujo', en: 'Luxury'}, value: 'lujo', icon: '/images/booking/diamond.svg' }
  ];
  const [month, setMonth] = useState(new Date());
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const daysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();
  const firstDay = (y: number, m: number) =>
    (new Date(y, m, 1).getDay() + 6) % 7;
  const isSame = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();
  const handleDate = (d: Date) => {
    if (!form.tourData?.days) return;
    const start = new Date(d);
    const end = new Date(d);
    end.setDate(start.getDate() + form.tourData.days - 1);
    setForm({
      ...form,
      fechaInicio: start,
      fechaFin: end,
    });
  };

  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'warn' | 'success';
  } | null>(null);
  const showToast = (message: string, type: 'error' | 'warn' | 'success' = 'warn') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const today = new Date();
  today.setHours(0,0,0,0);

  const renderMonth = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const total = daysInMonth(y, m);
    const start = firstDay(y, m);
    const locale = lang === 'es' ? 'es-PE' : 'en-US';
    const name = date
      .toLocaleString(locale, {
        month: 'long',
        year: 'numeric',
      })
      .toUpperCase();

    return (
      <div>
        <h4 className="text-center mb-4">
          {name}
        </h4>

        <div className="grid grid-cols-7 text-gray-500 mb-2 text-center">
          {['Lu','Ma','Mi','Ju','Vi','Sa','Do'].map(d=> <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {[...Array(start)].map((_,i)=><div key={i}></div>)}

          {[...Array(total)].map((_,i)=>{
            const day=i+1;
            const full=new Date(y,m,day);

            const active =
              (form.fechaInicio && isSame(full, form.fechaInicio)) ||
              (form.fechaFin && isSame(full, form.fechaFin));
            const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const start = form.fechaInicio ? normalize(form.fechaInicio) : null;
            const end = form.fechaFin ? normalize(form.fechaFin) : null;
            const current = normalize(full);
            const isRange = start && end && current > start && current < end;
            const isPast = full < today;

            return(
              <button
                key={day}
                onClick={() => !isPast && handleDate(full)}
                disabled={isPast}
                className={`w-10 h-10 rounded-full flex items-center justify-center border border-transparent
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:border-black'}
                  ${active ? 'bg-black text-white' : ''}
                  ${isRange ? 'bg-[#F5F2EB]' : ''}
                `}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  const handleNext = () => {
    if (!form.tourId) {
      showToast(
        lang === 'es' ? 'Selecciona un tour' : 'Select a tour',
        'warn'
      );
      return;
    }
    if (!form.fechaInicio || !form.fechaFin) {
      showToast(
        lang === 'es' ? 'Selecciona fechas' : 'Select travel dates',
        'warn'
      );
      return;
    }
    if (!form.servicio) {
      showToast(
        lang === 'es' ? 'Selecciona el tipo de servicio' : 'Select service type',
        'warn'
      );
      return;
    }
    if (!form.viajeros || form.viajeros < 1) {
      showToast(
        lang === 'es' ? 'Debe haber al menos un viajero' : 'At least one traveler is required',
        'warn'
      );
      return;
    }
    next();
  };

  return (
    <BookingLayout form={form} lang={lang} step={1}>
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
      <div className='flex flex-col gap-12 mb-20'>
        <div className='flex flex-col w-full bg-[#F5F2EB] p-6 gap-3'>
          <span>
            { lang === 'es' ? 
            'Para reservar su viaje en menos de 5 minutos, podrías necesitar lo siguiente:' :
            'To book your trip in less than 5 minutes, you might need the following:' }
          </span>
          <div className='flex flex-col md:flex-row md:justify-between'>
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

        <div className="flex flex-col gap-7 border border-[#DDDDDD] p-6 bg-white">
          <h3>
            { lang === 'es' ? 'SELECCIONA TU TOUR' : 'SELECT YOUR TOUR' }
          </h3>

          <div className="flex flex-col gap-3">
            <select
              className="border-b border-b-[#DDDDDD] text-black p-3 w-full cursor-pointer"
              value={form.tourId || ''}
              onChange={(e) => {
                const selected = data.find((item: any) => item._id === e.target.value);
                if (!selected) return;
                setForm({
                  ...form,
                  tourId: selected._id,
                  tourData: selected
                });
              }}
            >
              <option value="">
                {lang === 'es' ? 'Selecciona un tour' : 'Select a tour'}
              </option>

              {data?.map((item: any) => (
                <option key={item._id} value={item._id} className='text-black'>
                  {item.title}
                </option>
              ))}
            </select>
            {form.tourData && (
              <div className="p-4 mt-4 rounded bg-[#F5F2EB] flex gap-4">
                <img
                  src={form.tourData.image}
                  className="w-32 h-20 object-cover rounded"
                />

                <div className="flex flex-col">
                  <div className='flex gap-5'>
                    <span className='uppercase'>{form.tourData.category?.type + ': '} </span>
                    <span>{form.tourData.category?.title}</span>
                  </div>

                  <strong className='text-[25px]'>
                    {form.tourData.title}
                  </strong>

                  <div className='flex gap-7'>
                    <span className="font-medium">
                      {form.tourData.durationLabel}
                    </span>

                    <span className="font-medium">
                      {'$ ' + form.tourData?.price}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-5">
              <span>
                { lang === 'es' ? '¿Cuántos Viajan?' : 'How many are traveling?' }
              </span>
              <div className="flex items-center gap-2">
                <button className="border border-[#DDDDDD] w-12 h-12 rounded-[12px] cursor-pointer hover:border-black hover:bg-[#F5F2EB]"
                  onClick={()=>setForm({...form,viajeros:Math.max(1,form.viajeros-1)})}>
                  -
                </button>
                <span>{form.viajeros}</span>
                <button className="border border-[#DDDDDD] w-12 h-12 rounded-[12px] cursor-pointer hover:border-black hover:bg-[#F5F2EB]"
                  onClick={()=>setForm({...form,viajeros:form.viajeros+1})}>
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3 md:gap-5 items-center">
              <span>
                { lang === 'es' ? 'Tipo de servicio' : 'Type of service' }
              </span>
              <div className='flex gap-2 md:gap-5'>
                {services.map((serviceItem, index)=>(
                  <button
                    key={index}
                    onClick={() => setForm({...form, servicio: serviceItem.value})}
                    className={`flex gap-2 md:gap-3 cursor-pointer border rounded-full px-2 md:px-5 py-3 hover:bg-[#F5F2EB] hover:border-black
                    ${form.servicio === serviceItem.value ? 'bg-[#F5F2EB] border-black' : 'border-[#C6C6C6]'}`}
                  >
                    <img src={serviceItem.icon} className="w-[15px] md:w-auto h-auto" />
                    {serviceItem.label[lang as 'es' | 'en']}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border border-[#DDDDDD] p-6 bg-white">
          <h3>
            { lang === 'es' ? 'SELECCIONE LA FECHA DE SU VIAJE' : 'SELECT YOUR TRAVEL DATE' }
          </h3>

          <div className="flex justify-center gap-6 mb-12">
            {[currentYear, currentYear + 1].map((y) => (
              <button
                key={y}
                onClick={() => {
                  setYear(y);
                  setMonth(new Date(y, month.getMonth()));
                }}
                className={`px-4 py-2 border-b-2 transition-all
                  ${year === y ? 'border-black text-black' : 'border-transparent text-gray-400'}
                `}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="flex justify-between">
              <button
                className="cursor-pointer absolute top-0 left-0 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#969696] rounded-full bg-white hover:bg-black hover:text-white"
                onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1))}
              >
                <img
                  src="/images/booking/izquierdaOscuro.svg"
                  onMouseEnter={(e) => (e.currentTarget.src = "/images/booking/izquierda.svg")}
                  onMouseLeave={(e) => (e.currentTarget.src = "/images/booking/izquierdaOscuro.svg")}
                  className="w-4 h-4"
                />
              </button>

              <button
                className="cursor-pointer absolute top-0 right-0 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#969696] rounded-full bg-white hover:bg-black hover:text-white"
                onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1))}
              >
                <img
                  src="/images/booking/derechaOscuro.svg"
                  onMouseEnter={(e) => (e.currentTarget.src = "/images/booking/derecha.svg")}
                  onMouseLeave={(e) => (e.currentTarget.src = "/images/booking/derechaOscuro.svg")}
                  className="w-4 h-4"
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {renderMonth(month)}
              <div className="hidden md:block">
                {renderMonth(new Date(month.getFullYear(),month.getMonth()+1))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end md:static fixed bottom-0 left-0 right-0 p-4 bg-white md:bg-transparent z-50 md:p-0">
          <button onClick={handleNext} className="cursor-pointer group relative overflow-hidden border border-black pl-5 pr-3 py-2 bg-black text-white">
            <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
            <div className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              <span>
                {lang === "es" ? "CONTINUAR" : "CONTINUE"}
              </span>

              <img
                src="/images/booking/derecha.svg"
                className="w-4 h-4 group-hover:hidden"
              />

              <img
                src="/images/booking/derechaOscuro.svg"
                className="w-4 h-4 hidden group-hover:block"
              />
            </div>
          </button>
        </div>
      </div>
    </BookingLayout>
  );
}