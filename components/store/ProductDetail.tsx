"use client";

import { urlFor } from "@/lib/sanity.image";
import { useState } from "react";

export default function ProductDetail({ product, lang }: any) {
  const [current, setCurrent] = useState(0);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const images = product?.images || [];

  const t = (field: any) => field?.[lang] || field?.es || "";

  const toggle = (index: number) => {
    setOpenItems((prev) =>
        prev.includes(index)
        ? prev.filter((i) => i !== index) // cerrar
        : [...prev, index] // abrir
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 text-xl"
                  >
                    ‹
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 text-xl"
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
          <h1 className="text-2xl font-normal">
            {t(product?.name)}
          </h1>

          <p className="mt-2 mb-6 text-lg">
            ${product?.price?.usd} USD
          </p>

          <div className="mb-6">
            <label className="block mb-2">
              {lang === "es" ? "Cantidad" : "Quantity"}
            </label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="w-full border p-2"
            />
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 mb-8">
            <button className="bg-black text-white py-3 w-full">
              {lang === "es"
                ? "AGREGAR AL CARRITO"
                : "ADD TO CART"}
            </button>

            <button className="border border-black py-3 w-full">
              {lang === "es" ? "COMPRAR AHORA" : "BUY NOW"}
            </button>
          </div>

          {/* 🔥 ACCORDION */}
          <div className="border-t">
            {product?.details?.map((item: any, i: number) => {
                const isOpen = openItems.includes(i);

                return (
                <div
                    key={i}
                    className="border-b py-4 cursor-pointer"
                    onClick={() => toggle(i)}
                >
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                        {t(item.title)}
                    </h3>

                    {/* ICONO ANIMADO */}
                    <span
                        className={`text-xl transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                        }`}
                    >
                        +
                    </span>
                    </div>

                    {/* CONTENIDO */}
                    <div
                    className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                    >
                    <p className="text-sm text-gray-600">
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