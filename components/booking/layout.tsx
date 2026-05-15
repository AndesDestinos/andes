'use client';

export default function BookingLayout({ children, form }: any) {
  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="w-full lg:w-[70%] bg-[#f7f5f2] px-6 md:px-16 py-10">
        {children}
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block w-[30%] relative">
        <img
          src="/images/booking/booking.webp"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-10 left-[-60px] bg-white w-[300px] p-6 shadow">
          <h4 className="text-sm font-semibold mb-4">
            RESUMEN DEL TOUR
          </h4>

          <p className="text-xs mb-4">
            {form.viajeros} viajeros
          </p>

          <div className="text-sm font-semibold">
            S/ 700
          </div>
        </div>
      </div>

    </div>
  );
}