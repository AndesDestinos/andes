'use client';

import { useEffect, useState } from "react";
import PaypalButton from "@/components/paypal/Paypal";

export default function OrderSummary({ lang, form, setForm }: { lang: "es" | "en", form: any, setForm: any }) {
  const [cart, setCart] = useState<any[]>([]);
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

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) setCart(JSON.parse(data));
  }, []);

  const isFormValid =
    form.firstName &&
    form.lastName &&
    form.address &&
    form.city &&
    form.phone &&
    form.email &&
    form.countryCode &&
    form.countryName;

  const t = {
    es: {
      title: "Tu pedido",
      subtotal: "Subtotal",
      shipping: "Envío",
      total: "Total",
    },
    en: {
      title: "Your order",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
    }
  }[lang];

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  const handleSuccess = () => {
    //localStorage.removeItem("cart");
    setCart([]);
    window.location.href = `/${lang}/store/success`;
  };

  return (
    <div className="border p-6 bg-gray-50 flex flex-col gap-4">
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

      <h2 className="font-semibold">{t.title}</h2>

      {cart.map((item) => (
        <div key={item._id} className="flex justify-between">
          <span>{item.name?.[lang]} x {item.quantity}</span>
          <span>$ {item.price * item.quantity}</span>
        </div>
      ))}

      <hr />

      <div className="flex justify-between">
        <span>{t.subtotal}</span>
        <span>$ {subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>{t.shipping}</span>
        <span>$ {shipping}</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>{t.total}</span>
        <span>$ {total}</span>
      </div>

      {cart.length > 0 && isFormValid ? (
        <PaypalButton
          lang={lang}
          amount={total}
          showToast={showToast}
          onSuccess={(paymentData: any) => {
            console.log("DATOS DEL PAGO EN STEP3:", paymentData);
            setForm({
              ...form,
              paymentData,
            });
            console.log("DATOS DEL FORM:", form);
            handleSuccess();
          }} 
        />
      ) : (
        <button
          disabled
          className="bg-gray-300 text-white py-3 cursor-not-allowed"
        >
          {lang === 'es'
            ? 'Completa el formulario'
            : 'Complete the form'}
        </button>
      )}

    </div>
  );
}