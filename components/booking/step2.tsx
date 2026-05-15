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

export default function Step2({ form, setForm, next, prev }: any) {

  const [openExtras, setOpenExtras] = useState<number | null>(null);
  const [openCard, setOpenCard] = useState<number | null>(0);

  /* SINCRONIZA VIAJEROS */
  useEffect(() => {
    const nuevos = [...form.viajerosData];

    while (nuevos.length < form.viajeros) {
      nuevos.push({ extras: [] });
    }

    if (nuevos.length > form.viajeros) {
      nuevos.splice(form.viajeros);
    }

    setForm({ ...form, viajerosData: nuevos });

  }, [form.viajeros]);

  /* UPDATE INPUT */
  const update = (i: number, field: string, value: any) => {
    const arr = [...form.viajerosData];
    arr[i] = { ...arr[i], [field]: value };
    setForm({ ...form, viajerosData: arr });
  };

  /* ELIMINAR */
  const removeViajero = (i: number) => {
    const arr = [...form.viajerosData];
    arr.splice(i, 1);

    setForm({
      ...form,
      viajeros: Math.max(1, form.viajeros - 1),
      viajerosData: arr
    });

    setOpenCard(null);
    setOpenExtras(null);
  };

  /* AGREGAR */
  const addViajero = () => {
    setForm({
      ...form,
      viajeros: form.viajeros + 1,
      viajerosData: [...form.viajerosData, { extras: [] }]
    });
  };

  /* TOGGLE EXTRA */
  const toggleExtra = (i: number, id: number) => {
    const arr = [...form.viajerosData];
    const current = arr[i]?.extras || [];

    arr[i].extras = current.includes(id)
      ? current.filter((e: number) => e !== id)
      : [...current, id];

    setForm({ ...form, viajerosData: arr });
  };

  const viajeros = form.viajerosData;

  return (
    <BookingLayout form={form}>

      {/* HEADER */}
      <div className="flex items-center justify-center gap-6 mb-10 text-sm">
        <div className="text-green-500">✓ FECHA</div>
        <div className="w-10 h-[1px] bg-gray-300"/>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">2</div>
          INFORMACIÓN
        </div>
        <div className="w-10 h-[1px] bg-gray-300"/>
        <div className="text-gray-400">3 PAGAR</div>
      </div>

      <h2 className="text-lg font-semibold mb-6">
        ¿QUIÉNES VIAJARÁN?
      </h2>

      {viajeros.map((v: any, i: number) => {

        const isOpen = openCard === i;

        return (
          <div key={i} className="border bg-white mb-4 relative">

            {/* HEADER CARD */}
            <div className="flex justify-between items-center p-4 border-b">

              <div className="font-medium">
                {v?.nombre || `Viajero ${i + 1}`}
              </div>

              <div className="flex gap-2">

                {/* ELIMINAR */}
                <button
                  onClick={() => removeViajero(i)}
                  className="w-8 h-8 rounded-full border text-red-500"
                >
                  ×
                </button>

                {/* TOGGLE */}
                <button
                  onClick={() => setOpenCard(isOpen ? null : i)}
                  className="w-8 h-8 rounded-full border"
                >
                  {isOpen ? "⌃" : "⌄"}
                </button>

              </div>
            </div>

            {/* BODY */}
            {isOpen && (
              <div className="p-6">

                <div className="grid grid-cols-12 gap-4 text-sm">

                  <div className="col-span-6">
                    <input
                      placeholder="Nombre"
                      className="w-full border-b py-2"
                      value={v?.nombre || ""}
                      onChange={(e)=>update(i,'nombre',e.target.value)}
                    />
                  </div>

                  <div className="col-span-6">
                    <input
                      placeholder="Apellido"
                      className="w-full border-b py-2"
                      value={v?.apellido || ""}
                      onChange={(e)=>update(i,'apellido',e.target.value)}
                    />
                  </div>

                  <div className="col-span-6">
                    <input
                      placeholder="Email"
                      className="w-full border-b py-2"
                      value={v?.email || ""}
                      onChange={(e)=>update(i,'email',e.target.value)}
                    />
                  </div>

                  <div className="col-span-6">
                    <input
                      placeholder="Teléfono"
                      className="w-full border-b py-2"
                      value={v?.telefono || ""}
                      onChange={(e)=>update(i,'telefono',e.target.value)}
                    />
                  </div>

                </div>

                {/* ADICIONALES */}
                <div className="mt-6 flex justify-end relative">

                  <button
                    onClick={() => setOpenExtras(openExtras === i ? null : i)}
                    className="bg-orange-600 text-white px-6 py-2 text-sm"
                  >
                    + Adicionales
                  </button>

                  {openExtras === i && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

    <div className="bg-white w-full max-w-md p-6 relative">

      {/* CERRAR */}
      <button
        onClick={() => setOpenExtras(null)}
        className="absolute top-3 right-3 text-gray-500 text-lg"
      >
        ✕
      </button>

      <h4 className="text-lg font-semibold mb-4">
        Elige tus complementos
      </h4>

      <div className="flex flex-col gap-3 text-sm">
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

      {/* AGREGAR VIAJERO */}
      <div className="flex justify-center my-6">
        <button
          onClick={addViajero}
          className="border px-6 py-2 text-sm hover:bg-gray-100"
        >
          + Agregar viajero
        </button>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between mt-10">
        <button onClick={prev} className="border px-10 py-3 text-sm">
          ← VOLVER
        </button>

        <button onClick={next} className="bg-black text-white px-10 py-3 text-sm">
          CONTINUAR →
        </button>
      </div>

    </BookingLayout>
  );
}