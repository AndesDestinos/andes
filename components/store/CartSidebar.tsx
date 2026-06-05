"use client";

import { urlFor } from "@/lib/sanity.image";
import { useCart } from "../cart/CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar({ lang }: any) {
  const router = useRouter();

  const {
    cart,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white border-l border-l-[#CDCDCD] z-51 p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between mb-6">
          <h2>
            { lang === 'es' ? 'Tu carrito' : 'Your Cart' }
          </h2>
          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto h-[70%]">
          {cart.map((item: any) => (
            <div key={item._id} className="flex gap-4">
              <img
                src={urlFor(item.images[0]).url()}
                className="w-16 h-16 object-cover"
              />

              <div className="flex-1">
                <h4>{item.name?.es}</h4>
                <p>${item.price} USD</p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-sm underline"
                >
                  { lang === 'es' ? 'Eliminar' : 'Remove' }
                </button>
              </div>

              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  updateQuantity(item._id, Number(e.target.value))
                }
                className="w-16 border p-1"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-4">
            <span>
                { lang === 'es' ? 'Subtotal' : 'Subtotal' }
            </span>
            <span>${subtotal.toFixed(2)} USD</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              router.push(`/${lang}/store/checkout`);
            }}
            className="w-full bg-black text-white py-3 cursor-pointer"
          >
            {lang === "es" ? "CONTINUAR AL PAGO" : "CONTINUE TO CHECKOUT"}
          </button>
        </div>
      </div>
    </>
  );
}