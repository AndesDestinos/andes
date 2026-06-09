"use client";

import { urlFor } from "@/lib/sanity.image";
import { useState } from "react";
import { useCart } from "../cart/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product, lang }: any) {
  const [current, setCurrent] = useState(0);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const router = useRouter();

  const isOutOfStock = product?.stock <= 0;
  const exceedsStock = qty > product?.stock;

  const images = product?.images || [];

  const t = (field: any) => field?.[lang] || field?.es || "";

  const toggle = (index: number) => {
    setOpenItems((prev) =>
        prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleBuyNow = () => {
    addToCart(product, qty, { openCart: false });
    router.push(`/${lang}/store/checkout`);
  };

  return (
    <div className="andes-contenido flex flex-col md:flex-row gap-12">
      <div className="w-full md:w-1/2 md:sticky md:top-0 h-[60vh] md:h-screen">
        <div className="relative w-full h-full">
          {images.length > 0 && (
            <>
              <img
                src={urlFor(images[current]).url()}
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="text-[25px] absolute left-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full"
                  >
                    ‹
                  </button>

                  <button
                    onClick={next}
                    className="text-[25px] absolute right-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full"
                  >
                    ›
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="w-full">
          <h1 className="">
            {t(product?.name)}
          </h1>

          <div className="flex justify-between mb-3">
            <p>
              {lang === "es"
                ? `Stock disponible: ${product.stock}`
                : `Available stock: ${product.stock}`}
            </p>
            <p>
              {lang === "es"
                ? `Precio: $ ${product.price}`
                : `Price: $ ${product.price}`}
            </p>
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              {lang === "es" ? "Cantidad" : "Quantity"}
            </label>
            <div className="flex items-center border">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-[25px]"
              >
                −
              </button>

              <input
                type="number"
                value={qty}
                min={1}
                max={product?.stock || 1}
                onChange={(e) => {
                  const value = Number(e.target.value)

                  if (value > product.stock) {
                    setQty(product.stock)
                    return
                  }

                  if (value < 1) {
                    setQty(1)
                    return
                  }

                  setQty(value)
                }}
                className="w-full text-center outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setQty(Math.min(product.stock || 1, qty + 1))
                }
                className="px-3 py-2 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              disabled={isOutOfStock || exceedsStock}
              onClick={() => addToCart(product, qty)}
              className={`py-3 w-full cursor-pointer ${
                isOutOfStock || exceedsStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              {isOutOfStock
                ? lang === "es"
                  ? "SIN STOCK"
                  : "OUT OF STOCK"
                : lang === "es"
                ? "AGREGAR AL CARRITO"
                : "ADD TO CART"}
            </button>
            
            <button
              disabled={isOutOfStock || exceedsStock}
              onClick={handleBuyNow}
              className={`py-3 w-full border cursor-pointer ${
                isOutOfStock || exceedsStock
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-black"
              }`}
            >
              {lang === "es" ? "COMPRAR AHORA" : "BUY NOW"}
            </button>
          </div>

          <div className="border-t pb-25">
            {product?.details?.map((item: any, i: number) => {
                const isOpen = openItems.includes(i);
                return (
                <div
                    key={i}
                    className="border-b border-b-[#CDCDCD] py-4 cursor-pointer"
                    onClick={() => toggle(i)}
                >
                    <div className="flex justify-between items-center">
                    <h3 className="">
                        {t(item.title)}
                    </h3>

                    <span
                        className={`!text-[25px] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                        }`}
                    >
                        +
                    </span>
                    </div>

                    <div
                    className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                    >
                    <p className="text-gray-600">
                        {t(item.description)}
                    </p>
                    </div>
                </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}