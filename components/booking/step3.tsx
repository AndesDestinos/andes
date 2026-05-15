import { useState } from "react";

export default function PagoStep({ form, setForm, next, prev }: any) {
  const [viajeros, setViajeros] = useState(2);
  const [mostrarAdicionales, setMostrarAdicionales] = useState(false);
  const [donacionActiva, setDonacionActiva] = useState(false);
  const [cantidadDonacion, setCantidadDonacion] = useState(1);

  const precioBase = 350;
  const adicionalesPrecio = 20;

  const totalDonacion = donacionActiva ? cantidadDonacion * viajeros : 0;

  return (
    <div className="flex min-h-screen bg-[#f7f7f5]">
      {/* LEFT */}
      <div className="w-2/3 p-10">
        <h2 className="text-sm tracking-widest text-gray-500 mb-2">TOUR SELECCIONADO</h2>
        <h1 className="text-3xl font-semibold mb-2">Clásico camino inca a Machu Picchu</h1>
        <p className="text-gray-500 mb-6">4 DÍAS / 3 NOCHES</p>

        <div className="bg-[#eae6df] p-6 mb-6 rounded">
          <h3 className="font-semibold mb-2">PAGAR TU TOUR</h3>
          <p className="text-sm text-gray-600">Verifique toda la información que proporcionó y a continuación pague.</p>
        </div>

        {/* BOTONES PAGO */}
        <div className="flex gap-4 mb-6">
          <button className="border px-6 py-3 rounded">$ 350<br/>Pagar el 50%</button>
          <button className="border px-6 py-3 rounded">$ 700<br/>Pagar el total</button>
        </div>

        {/* DONACION */}
        <div className="bg-[#efe6d2] p-6 rounded mb-6">
          <h4 className="font-semibold mb-2">Haz un viaje de impacto con una pequeña donación a la Fundación Andes</h4>
          <p className="text-sm text-gray-600 mb-4">Retribuya a las comunidades que visitará donando $1 por viajero.</p>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={donacionActiva}
              onChange={() => setDonacionActiva(!donacionActiva)}
            />
            <span>Donar $1 por viajero</span>

            <input
              type="number"
              className="border px-2 py-1 w-16"
              value={cantidadDonacion}
              onChange={(e) => setCantidadDonacion(Number(e.target.value))}
            />

            <span>Total: $ {totalDonacion}</span>
          </div>
        </div>

        {/* ADICIONALES */}
        <div className="mb-6">
          <button
            onClick={() => setMostrarAdicionales(true)}
            className="border px-4 py-2 rounded"
          >
            + Adicionales
          </button>
        </div>

        {/* MODAL */}
        {mostrarAdicionales && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-[500px]">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Adicionales</h3>
                <button onClick={() => setMostrarAdicionales(false)}>X</button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Bastones</span>
                  <span>$10</span>
                </div>
                <div className="flex justify-between">
                  <span>Bolsa dormir</span>
                  <span>$10</span>
                </div>
              </div>

              <button
                className="mt-4 w-full bg-black text-white py-2"
                onClick={() => setMostrarAdicionales(false)}
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {/* PAYPAL */}
        <div className="border p-6 mb-6">
          <h4 className="mb-4">Pagar con PayPal</h4>
          <button className="w-full bg-yellow-400 py-3 mb-2">PayPal</button>
          <button className="w-full bg-black text-white py-3">Tarjeta de debito o crédito</button>
        </div>

        {/* TARJETA */}
        <div className="border p-6 mb-6">
          <h4 className="mb-4">Pagar con tarjeta de crédito/debito</h4>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Nombre" className="border p-2" />
            <input placeholder="Número" className="border p-2" />
            <input placeholder="MM/AA" className="border p-2" />
            <input placeholder="CVC" className="border p-2" />
          </div>
        </div>

        <div className="flex justify-between">
          <button className="border px-6 py-2">VOLVER</button>
          <button className="bg-black text-white px-6 py-2">PAGAR AHORA</button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/3 bg-gray-200 p-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">RESUMEN DEL TOUR</h3>

          <div className="mb-4">
            <p>2 viajeros - 10 de julio</p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Deposito mínimo 50%</span>
              <span>$ 360</span>
            </div>
            <div className="flex justify-between">
              <span>Adicionales</span>
              <span>$ {adicionalesPrecio}</span>
            </div>
            <div className="flex justify-between">
              <span>Total restante</span>
              <span>$ 350</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Precio total</span>
              <span>S/ 720</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}