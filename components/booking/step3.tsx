import { useState } from "react";
import BookingLayout from "./layout";
import PaypalButton from "../paypal/Paypal";

export default function Step3({ lang, form, setForm, next, prev }: any) {
  const totalDonacion = form.donationActive ? form.donationAmount * form.viajeros : 0;
  const totalTour = form.tourData.price * form.viajeros;
  const total = totalTour + totalDonacion;
  const amountToPay = form.paymentType === "half" ? total / 2 : total;
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

      <div className="flex flex-col gap-12 mb-20">
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

        <div className="grid md:flex grid-cols-2 gap-3">
          <button
            onClick={() => setForm({ ...form, paymentType: 'half' })}
            className={`border px-6 py-3 rounded-[12px] hover:border-black ${
              form.paymentType === 'half' ? 'border-black bg-[#F5F2EB]' : 'border-[#CDCDCD]'
            }`}
          >
            <span className="!text-[30px]">$ {form.tourData.price / 2}</span>
            <br />
            {lang === 'es' ? 'Pagar el 50%' : 'Pay the 50%'}
          </button>

          <button
            onClick={() => setForm({ ...form, paymentType: 'full' })}
            className={`border px-6 py-3 rounded-[12px] hover:border-black ${
              form.paymentType === 'full' ? 'border-black bg-[#F5F2EB]' : 'border-[#CDCDCD]'
            }`}
          >
            <span className="!text-[30px]">$ {form.tourData.price}</span>
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

        <div className="flex flex-col md:flex-row items-center bg-[#FFF5DD] gap-1 md:gap-3 p-3 md:p-6">
          <div className="flex items-center bg-[#FFF5DD] gap-3 p-2">
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
          </div>

          <div className="flex items-center bg-[#FFF5DD] gap-3 p-2">
          <div className={`flex items-center bg-white border rounded border-[#C9C9C9] overflow-hidden transition-all ${
            !form.donationActive ? 'opacity-50 cursor-not-allowed' : 'border-black'
          }`}>
            <button
              type="button"
              disabled={!form.donationActive}
              onClick={() =>
                setForm({
                  ...form,
                  donationAmount: Math.max(0, Number(form.donationAmount || 0) - 1),
                })
              }
              className="px-3 py-2 text-lg disabled:opacity-50"
            >
              −
            </button>
            <input
              type="number"
              disabled={!form.donationActive}
              className="w-full text-center outline-none py-2"
              value={form.donationAmount}
              onChange={(e) =>
                setForm({
                  ...form,
                  donationAmount: Number(e.target.value),
                })
              }
            />
            <button
              type="button"
              disabled={!form.donationActive}
              onClick={() =>
                setForm({
                  ...form,
                  donationAmount: Number(form.donationAmount || 0) + 1,
                })
              }
              className="px-3 py-2 text-lg disabled:opacity-50"
            >
              +
            </button>
          </div>

          <span className="flex flex-row flex-0">
            {lang === 'es' ? 'Total: $' : 'Total: $'} {totalDonacion}
          </span>
          </div>
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

          <div className="grid">
            <PaypalButton 
              lang={lang}
              amount={amountToPay} 
              showToast={showToast}
              onSuccess={async (paymentData: any) => {
                try {
                  const res = await fetch("/api/booking", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      form,
                      payment: paymentData,
                      lang,
                    }),
                  });
                  const data = await res.json();
                  if (!data.success) {
                    showToast("Error al guardar la reserva", "error");
                    return;
                  }

                  setForm((prev: any) => ({
                    ...prev,
                    invoice: data.invoiceNumber,
                  }));

                  localStorage.removeItem('bookingForm');
                  localStorage.removeItem('bookingStep');
                  next();
                } catch (err) {
                  showToast("Error inesperado", "error");
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-start md:static fixed bottom-0 left-0 right-0 p-4 bg-white md:bg-transparent z-50 md:p-0">
          <button onClick={prev} 
            className="cursor-pointer group relative overflow-hidden border border-black pl-5 pr-3 py-2 bg-black text-white">
            <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
            <div className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              <img
                src="/images/booking/izquierda.svg"
                className="w-4 h-4 group-hover:hidden"
              />

              <img
                src="/images/booking/izquierdaOscuro.svg"
                className="w-4 h-4 hidden group-hover:block"
              />

              <span>
                { lang === 'es' ? 'VOLVER' : 'BACK' }
              </span>
            </div>
          </button>
        </div>
      </div>
    </BookingLayout>
  );
}