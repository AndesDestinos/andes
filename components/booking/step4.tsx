import BookingLayout from "./layout";

export default function Step4({ lang, form, reset }: any) {
  const totalDonacion = form.donationActive ? form.donationAmount * form.viajeros : 0;
  const totalTour = form.tourData.price * form.viajeros;
  const total = totalTour + totalDonacion;
  const pago = form.paymentType === "half" ? total / 2 : total;
  const restante = total - pago;
  const today = new Date().toLocaleDateString();
  const cliente = form.viajerosData.find((v: any) => v.lider);

  return (
    <BookingLayout form={form} lang={lang} step={4}>
      <div className="p-3 md:p-12 flex flex-col gap-7">
        <div className="w-full p-6 flex gap-5 justify-center items-center bg-[#F5F2EB]">
          <div className="relative flex items-center bg-white p-7 rounded-full">
            <img src="/images/booking/map.svg" />
            <div className="bg-[#3FDA8B] p-2 rounded-full absolute bottom-0 right-0">
              <img src="/images/booking/check.svg" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3>{ lang === 'es' ? 'Listo! su pago fue exitoso' : 'Done! Your payment was successful' }</h3>
            <span>{ lang === 'es' ? 'Gracias por reservar con Andes' : 'Thank you for booking with Andes' }</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-start">
          <div className="order-2 md:order-1 flex flex-col gap-2">
            <img src="/images/booking/logoCompleto.svg" className="hidden md:block" />
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="tracking-widest">{ lang === 'es' ? 'CLIENTE' : 'CLIENT' }</h3>
              <p>{ lang === 'es' ? 'Nombre' : 'Name' }: {cliente?.nombre} {cliente?.apellido}</p>
              <p>{ lang === 'es' ? 'Correo' : 'Email' }: {cliente?.email}</p>
              <p>{ lang === 'es' ? 'Teléfono' : 'Phone' }: {cliente?.phone}</p>
              <p>{ lang === 'es' ? 'País' : 'Country' }: {cliente?.countryName}</p>
            </div>
          </div>

          <div className="order-1 md:order-2 w-full text-right border-b border-b-[#CDCDCD] md:border-none pb-7 md:pb-0">
            <div className="w-full block md:hidden">
              <img src="/images/booking/logoCompleto.svg" className="w-36" />
            </div>
            <h1 className="">{ lang === 'es' ? 'Factura' : 'Invoice' }</h1>
            <p className="mt-4">
              {lang === 'es' ? 'Factura' : 'Invoice'} N°{' '}
              {String(form.invoice).padStart(4, '0')}
            </p>
            <p className="">{today}</p>
          </div>
        </div>

        <hr className="text-[#CDCDCD]" />

        <div className="flex flex-col gap-2">
          <h3 className="tracking-widest">{ lang === 'es' ? 'DATOS DE RESERVA' : 'RESERVATION DETAILS' }</h3>
          <div className="flex justify-between">
            <span>{ lang === 'es' ? 'Número de reserva' : 'Reservation number' }</span>
            <span className="font-semibold">{form.tourId.slice(0,5)}</span>
          </div>
          <div className="flex justify-between">
            <span>{ lang === 'es' ? 'Tour seleccionado' : 'Selected tour' }</span>
            <span className="font-semibold">{form.tourData.title}</span>
          </div>
          <div className="flex justify-between">
            <span>{ lang === 'es' ? 'Número de viajeros' : 'Number of travelers' }</span>
            <span className="font-semibold">{form.viajeros}</span>
          </div>
          <div className="flex justify-between">
            <span>{ lang === 'es' ? 'Fecha de viaje' : 'Travel date' }</span>
            <span className="font-semibold">
              {new Date(form.fechaInicio).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{ lang === 'es' ? 'Tipo de servicio' : 'Type of service' }</span>
            <span className="font-semibold capitalize">{form.servicio}</span>
          </div>
        </div>

        <hr className="text-[#CDCDCD]" />

        <div className="flex flex-col gap-3">
          <h3 className="tracking-widest">{ lang === 'es' ? 'DETALLES' : 'DETAILS' }</h3>
          <div className="grid grid-cols-4 font-semibold text-[#9A9A9A]">
            <span>{ lang === 'es' ? 'Servicios' : 'Services' }</span>
            <span>{ lang === 'es' ? 'Cantidad' : 'Amount' } </span>
            <span>{ lang === 'es' ? 'Precio unitario' : 'Unit price' }</span>
            <span className="text-right">{ lang === 'es' ? 'Precio' : 'Price' }</span>
          </div>
          <div className="grid grid-cols-4">
            <span>{form.tourData.title}</span>
            <span>{form.viajeros}</span>
            <span>$ {form.tourData.price}</span>
            <span className="text-right">$ {totalTour}</span>
          </div>
          {form.donationActive && (
            <div className="grid grid-cols-4">
              <span>{ lang === 'es' ? 'Donación ' : 'Donation ' }</span>
              <span>{form.viajeros}</span>
              <span>$ {form.donationAmount}</span>
              <span className="text-right">$ {totalDonacion}</span>
            </div>
          )}
          <div className="flex justify-between mt-4 font-semibold">
            <span>{ lang === 'es' ? 'Precio total ' : 'Total price ' }</span>
            <span>$ {total}</span>
          </div>
        </div>

        <hr className="text-[#CDCDCD]" />

        <div className="flex flex-col gap-2">
          <h3 className="tracking-widest">
            { lang === 'es' ? 'BALANCE' : 'BALANCE' }
          </h3>
          <div className="flex justify-between">
            <span>
              {form.paymentType === "half"
                ? (lang === 'es' ? 'Depósito 50% ' : '50% deposit ')
                : (lang === 'es' ? 'Pago total ' : 'Full payment ')}
            </span>
            <span className="font-semibold text-[#961AA4]">
              { lang === 'es' ? 'Pagado ' : 'Paid ' } $ {pago}
            </span>
          </div>
          {restante > 0 && (
            <div className="flex justify-between">
              <span>
                { lang === 'es' ? 'Total restante ' : 'Remaining total ' }
              </span>
              <span className="text-[#EE5E3F] font-semibold">
                { lang === 'es' ? 'Pendiente ' : 'Pending ' } $ {restante}
              </span>
            </div>
          )}
        </div>

        <hr className="text-[#CDCDCD]" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold">
            { lang === 'es' ? 'Impacto' : 'Impact' }
          </span>
          <span className="flex gap-3">
            <img src="/images/packages/check.svg" />
            { lang === 'es' ? 'Trabajo para guías locales' : 'I work for local guides' }
          </span>
          <span className="flex gap-3">
            <img src="/images/packages/check.svg" />
            { lang === 'es' ? 'Ingreso para comunidades' : 'Income for communities' }
          </span>
          <span className="flex gap-3">
            <img src="/images/packages/check.svg" />
            { lang === 'es' ? 'Apoyo a poblaciones nativas' : 'Support for native populations' }
          </span>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              reset();
            }}
            className="bg-black text-white px-8 py-3 cursor-pointer"
          >
            { lang === 'es' ? 'FINALIZAR RESERVA' : 'COMPLETE RESERVATION' }
          </button>
        </div>
      </div>
    </BookingLayout>
  );
}