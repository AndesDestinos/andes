import { useState } from "react";
import BookingLayout from "./layout";

export default function Step3({ lang, form, setForm, next, prev }: any) {
  const totalDonacion = form.donationActive ? form.donationAmount * form.viajeros : 0;
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'warn' | 'error';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false,
  });
  const showToast = (message: string, type: 'success' | 'warn' | 'error') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const validateStep3 = () => {
    if (!form.paymentType) {
      showToast('Selecciona un tipo de pago', 'warn');
      return false;
    }
    if (
      !form.cardName ||
      !form.cardNumber ||
      !form.cardExpiry ||
      !form.cardCvc
    ) {
      showToast('Completa los datos de la tarjeta', 'warn');
      return false;
    }
    return true;
  };

  return (
    <BookingLayout form={form} lang={lang} step={3}>
      {toast.visible && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-xl shadow-lg text-white transition-all duration-300
          ${
            toast.type === 'success'
              ? 'bg-green-500'
              : toast.type === 'warn'
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex flex-col gap-12">
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
          <span className="font-semibold">
            { lang === 'es' ? 
            'PAGA TU TOUR' :
            'PAY FOR YOUR TOUR' }
          </span>
          <span>
            { lang === 'es' ? 
            'Verifique toda la información que proporcionó y a continuación pague.': 
            'Please verify all the information you provided and then pay.' }
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setForm({ ...form, paymentType: 'half' })}
            className={`border px-6 py-3 rounded-[12px] hover:border-black ${
              form.paymentType === 'half' ? 'border-black bg-[#F5F2EB]' : 'border-[#CDCDCD]'
            }`}
          >
            $ {form.tourData.price / 2}
            <br />
            {lang === 'es' ? 'Pagar el 50%' : 'Pay the 50%'}
          </button>

          <button
            onClick={() => setForm({ ...form, paymentType: 'full' })}
            className={`border px-6 py-3 rounded-[12px] hover:border-black ${
              form.paymentType === 'full' ? 'border-black bg-[#F5F2EB]' : 'border-[#CDCDCD]'
            }`}
          >
            $ {form.tourData.price}
            <br />
            {lang === 'es' ? 'Pagar el total' : 'Pay the total'}
          </button>
        </div>
        
        <div className='flex flex-col w-full bg-[#FFF5DD] p-6 gap-3'>
          <span className="font-semibold">
            { lang === 'es' ? 
            'Haz un viaje de impacto con una pequeña donación a la Fundación Andes' :
            'Make a difference with a small donation to the Andes Foundation' }
          </span>
          <span>
            { lang === 'es' ? 
            'Retribuya a las comunidades que visitara donando $1 por viajero a la Fundación Andes. Únase a nosotros para empoderar a la población local.': 
            'Give back to the communities you visit by donating $1 per traveler to the Andes Foundation. Join us in empowering local people.' }
          </span>
        </div>

        <div className="flex items-center bg-[#FFF5DD] gap-3 p-6">
          <button
            onClick={() =>
              setForm({ ...form, donationActive: !form.donationActive, donationAmount: 0 })
            }
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
              form.donationActive ? 'bg-black' : 'bg-[#BFBFBF]'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                form.donationActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>

          <span>
            {lang === 'es' ? 'Donar $1 por viajero' : 'Donate $1 per traveler'}
          </span>

          <input
            type="number"
            className={`bg-white p-2 rounded border border-[#C9C9C9] outline-none transition-all ${
              !form.donationActive
                ? 'opacity-50 cursor-not-allowed'
                : 'border-black'
            }`}
            value={form.donationAmount}
            disabled={!form.donationActive}
            onChange={(e) =>
              setForm({ ...form, donationAmount: Number(e.target.value) })
            }
          />

          {/* TOTAL */}
          <span>
            {lang === 'es' ? 'Total: $' : 'Total: $'} {totalDonacion}
          </span>
        </div>

        <div className="border border-gray-300 p-6 w-full flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3>
              { lang === 'es' ? 
              'Pagar con tarjeta de crédito/debito' :
              'Pay with credit/debit card' }
            </h3>

            <h4 className="text-sm font-semibold mb-6">
              { lang === 'es' ? 
              'Tu información de pago' :
              'Your payment information' }
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label>
                { lang === 'es' ? 'Nombre en la tarjeta' : 'Name on card' }
              </label>
              <input value={form.cardName}
                onChange={(e) =>
                  setForm({ ...form, cardName: e.target.value })
                }
                type="text"
                placeholder="Ejemplo: John Smith"
                className="border border-[#DDDDDD] rounded-xl px-4 py-3 outline-none focus:border-black placeholder-[#DDDDDD]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>
                { lang === 'es' ? 'Numero de la tarjeta de crédito' : 'Credit card number' }
              </label>
              <input value={form.cardNumber}
                onChange={(e) =>
                  setForm({ ...form, cardNumber: e.target.value })
                }
                type="text"
                placeholder="1223 1334 3456 2356"
                className="border border-[#DDDDDD] rounded-xl px-4 py-3 outline-none focus:border-black placeholder-[#DDDDDD]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>
                { lang === 'es' ? 'Fecha de caducidad' : 'Expiration date' }
              </label>
              <input value={form.cardExpiry}
                onChange={(e) =>
                  setForm({ ...form, cardExpiry: e.target.value })
                }
                type="text"
                placeholder="MM/AA"
                className="border border-[#DDDDDD] rounded-xl px-4 py-3 outline-none focus:border-black placeholder-[#DDDDDD]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>
                CVC
              </label>
              <input value={form.cardCvc}
                onChange={(e) =>
                  setForm({ ...form, cardCvc: e.target.value })
                }
                type="text"
                placeholder="CVC"
                className="border border-[#DDDDDD] rounded-xl px-4 py-3 outline-none focus:border-black placeholder-[#DDDDDD]"
              />
            </div>
          </div>
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
              if (!validateStep3()) return;
              next();
            }}
            className="relative overflow-hidden border border-black pl-5 pr-3 text-black cursor-pointer group"
          >
            <div className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
            <div className="flex items-center relative z-10 transition-colors duration-300 group-hover:text-white">
              <span>
                { lang === 'es' ? 'PAGAR AHORA' : 'PAY NOW' }
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