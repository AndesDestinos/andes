'use client';

export default function BookingLayout({ children, form, lang, step }: any) {
  const getStepStyles = (currentStep: number, stepNumber: number) => {
    if (currentStep > stepNumber) {
      return {
        bg: 'bg-[#3FDA8B]',
        text: 'text-white',
        label: 'text-black',
        icon: '/images/booking/check.svg'
      }
    }
    if (currentStep === stepNumber) {
      return {
        bg: 'bg-black',
        text: 'text-white',
        label: 'text-black',
        icon: null
      }
    }
    return {
      bg: 'bg-[#ABB8C3]',
      text: 'text-white',
      label: 'text-[#999999]',
      icon: null
    }
  }

  const step1 = getStepStyles(step, 1);
  const step2 = getStepStyles(step, 2);
  const step3 = getStepStyles(step, 3);

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="flex w-full items-center justify-center gap-2 mb-10 p-7 border-b border-b-2 border-b-[#E1E1E1]">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 ${step1.bg} ${step1.text} rounded-full flex items-center justify-center`}>
              {
                step1.icon
                  ? <img src={step1.icon} className="w-4 h-4" />
                  : '1'
              }
            </div>
            <span className="">
              { lang === 'es' ? 'FECHA' : 'DATE' }
            </span>
          </div>
          <div className="w-20 h-[1px] bg-black"/>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 ${step2.bg} ${step2.text} rounded-full flex items-center justify-center`}>
              {
                step2.icon
                  ? <img src={step2.icon} className="w-4 h-4" />
                  : '2'
              }
            </div>
            <span className='text-[#999999]'>
              { lang === 'es' ? 'INFORMACIÓN' : 'INFORMATION' }
            </span>
          </div>
          <div className="w-20 h-[1px] bg-black"/>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 ${step3.bg} ${step3.text} rounded-full flex items-center justify-center`}>
              {
                step3.icon
                  ? <img src={step3.icon} className="w-4 h-4" />
                  : '3'
              }
            </div>
            <span className='text-[#999999]'>
              { lang === 'es' ? 'PAGO' : 'PAY' }
            </span>
          </div>
        </div>

        <div className="andes-contenido-pequenio">
          {children}
        </div>
      </div>

      <div className="hidden lg:block w-[30%]">
  <div className="sticky top-10">
    
    {/* CONTENEDOR RELATIVO */}
    <div className="relative w-full">

      {/* BACKGROUND */}
      <img
        src="/images/booking/booking.webp"
        className="w-full h-[700px] object-cover"
      />

      {/* CARD FLOTANTE */}
      <div className="absolute top-10 left-[-60px] bg-white w-[320px] p-6 shadow flex flex-col gap-5 border border-[#DDDDDD]">
        
        {/* TU CONTENIDO IGUAL */}
        <div>
          <h4 className="text-sm tracking-widest font-semibold mb-2">
            {lang === 'es' ? 'RESUMEN DEL TOUR' : 'TOUR SUMMARY'}
          </h4>

          <p className="text-sm text-gray-600">
            {form.viajeros} {lang === 'es' ? 'viajeros' : 'travelers'} -{" "}
            {form.fechaInicio
              ? new Date(form.fechaInicio).toLocaleDateString()
              : '-'}
          </p>
        </div>


          <hr className="text-[#D9D9D9]"/>

          {/* IMPACTO */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-medium">Impacto</h5>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-700">

              {/* ITEM */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0l-3.2-3.2a1 1 0 1 1 1.4-1.4l2.5 2.5 6.5-6.5a1 1 0 0 1 1.4 0z"/>
                </svg>
                <span>Trabajos para guías locales</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0l-3.2-3.2a1 1 0 1 1 1.4-1.4l2.5 2.5 6.5-6.5a1 1 0 0 1 1.4 0z"/>
                </svg>
                <span>Ingreso para pobladores locales</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0l-3.2-3.2a1 1 0 1 1 1.4-1.4l2.5 2.5 6.5-6.5a1 1 0 0 1 1.4 0z"/>
                </svg>
                <span>Ayudamos a comunidades nativas</span>
              </div>

            </div>
          </div>

          <hr className="text-[#D9D9D9]" />

          {/* TOUR */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-medium">Tour seleccionado</h5>
            </div>

            <div className="flex gap-3 items-center">
              <img
                src={form.tourData?.image ? form.tourData.image : '/images/share/noImage.jpg'}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">
                  {form.tourData?.title}
                </p>
                <p className="text-sm text-gray-500">
                  {form.tourData?.type}
                </p>
              </div>

              <div className="text-sm font-semibold">
                $ {form.tourData?.price || 0}
              </div>
            </div>
          </div>

          <hr className="text-[#D9D9D9]" />

          {/* BALANCE */}
          <div className="flex flex-col gap-2 text-sm">

            {(() => {
              const price = form.tourData?.price || 0;
              const totalTour = price * form.viajeros;
              const totalDonacion = form.donationActive
                ? form.donationAmount * form.viajeros
                : 0;

              const total = totalTour + totalDonacion;
              const pago = form.paymentType === 'half' ? total / 2 : total;
              const restante = total - pago;

              return (
                <>
                  <h5 className="font-medium mb-2">Balance</h5>

                  <div className="flex justify-between">
                    <span>Depósito mínimo 50%</span>
                    <span>$ {pago}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Adicionales</span>
                    <span>$ {totalDonacion}</span>
                  </div>

                  <div className="flex justify-between text-red-500">
                    <span>Total Restante</span>
                    <span>$ {restante}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-purple-600 mt-2">
                    <span>Precio total</span>
                    <span>S/ {total}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}