'use client';

import { useState } from 'react';
import BookingLayout from './layout';

export default function Step1({ form, setForm, next }: any) {

  const [month, setMonth] = useState(new Date(2026, 6));

  const daysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();

  const firstDay = (y: number, m: number) =>
    (new Date(y, m, 1).getDay() + 6) % 7;

  const isSame = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  const handleDate = (d: Date) => {
    if (!form.fechaInicio || form.fechaFin) {
      setForm({ ...form, fechaInicio: d, fechaFin: null });
    } else if (d < form.fechaInicio) {
      setForm({ ...form, fechaInicio: d });
    } else {
      setForm({ ...form, fechaFin: d });
    }
  };

  const renderMonth = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();

    const total = daysInMonth(y, m);
    const start = firstDay(y, m);

    const name = date.toLocaleString('es-PE', {
      month: 'long',
      year: 'numeric',
    });

    return (
      <div>
        <h4 className="text-center text-sm font-medium mb-4 uppercase">
          {name}
        </h4>

        <div className="grid grid-cols-7 text-xs text-gray-500 mb-2 text-center">
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

            return(
              <button
                key={day}
                onClick={()=>handleDate(full)}
                className={`w-10 h-10 text-sm rounded-full flex items-center justify-center
                ${active ? 'bg-black text-white' : 'hover:bg-gray-200'}
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

  return (
    <BookingLayout form={form}>

      {/* HEADER */}
      <div className="flex items-center justify-center gap-6 mb-10 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</div>
          <span className="font-medium">FECHA</span>
        </div>
        <div className="w-10 h-[1px] bg-gray-300"/>
        <div className="text-gray-400">2 INFORMACIÓN</div>
        <div className="w-10 h-[1px] bg-gray-300"/>
        <div className="text-gray-400">3 PAGAR</div>
      </div>

      {/* resto igual */}
      <div className="border p-6 mb-6 bg-white">
        <h3 className="text-xs tracking-widest mb-4">
          SELECCIONA TU TOUR
        </h3>

        <select
          className="w-full border-b pb-2 mb-4 outline-none"
          value={form.tour}
          onChange={(e)=>setForm({...form,tour:e.target.value})}
        >
          <option>Seleccione el tour</option>
        </select>

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm">¿Cuántos Viajan?</span>
            <div className="flex items-center gap-2">
              <button className="border w-8 h-8 rounded"
                onClick={()=>setForm({...form,viajeros:Math.max(1,form.viajeros-1)})}>
                -
              </button>
              <span>{form.viajeros}</span>
              <button className="border w-8 h-8 rounded"
                onClick={()=>setForm({...form,viajeros:form.viajeros+1})}>
                +
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            {['privado','lujo'].map(s=>(
              <button
                key={s}
                onClick={()=>setForm({...form,servicio:s as any})}
                className={`px-4 py-1 border rounded-full text-sm
                ${form.servicio===s?'bg-black text-white':''}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border p-6 bg-white">
        <h3 className="text-xs tracking-widest mb-4">
          SELECCIONE LA FECHA DE SU VIAJE
        </h3>

        <div className="flex justify-between mb-6">
          <button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1))}>←</button>
          <button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1))}>→</button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {renderMonth(month)}
          {renderMonth(new Date(month.getFullYear(),month.getMonth()+1))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={next}
          className="bg-black text-white px-10 py-3 text-sm"
        >
          CONTINUAR →
        </button>
      </div>

    </BookingLayout>
  );
}