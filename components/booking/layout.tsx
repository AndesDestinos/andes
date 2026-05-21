'use client';

export default function BookingLayout({ children, form }: any) {
  return (
    <div className="flex w-full bg-[#f7f5f2]">
      <div className="w-full andes-contenido-pequenio">
        {children}
      </div>

      <div className="hidden lg:block w-[30%] relative">
        <img
          src="/images/booking/booking.webp"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-10 left-[-60px] bg-white w-[300px] p-6 shadow">
          <h4 className="mb-4">
            RESUMEN DEL TOUR
          </h4>

          <p className="mb-4">
            {form.viajeros} viajeros
          </p>

          <div className="">
            S/ 700
          </div>
        </div>
      </div>

    </div>
  );
}