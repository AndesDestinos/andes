import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import BookingEmail from "@/emails/BookingEmail";

type Lang = "es" | "en";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { form, payment, lang } = body as {
      form: any;
      payment: any;
      lang: Lang;
    };
    if (!form || !payment) {
      return NextResponse.json({ success: false, error: "Datos incompletos" });
    }

    const leader = form.viajerosData.find((v: any) => v.lider);
    const totalDonacion = form.donationActive
      ? form.donationAmount * form.viajeros
      : 0;
    const totalTour = form.tourData.price * form.viajeros;
    const total = totalTour + totalDonacion;
    const paid = form.paymentType === "half" ? total / 2 : total;
    const pending = total - paid;
    const { data: customerData, error: customerError } =
      await supabaseAdmin
        .from("customers")
        .insert({
          first_name: leader.nombre,
          last_name: leader.apellido,
          email: leader.email,
          phone: leader.phone,
          country_code: leader.countryCode,
          country_name: leader.countryName,
        })
        .select()
        .single();
    if (customerError) throw customerError;

    const { data: paymentData, error: paymentError } =
      await supabaseAdmin
        .from("payments")
        .insert({
          order_id: payment.orderID,
          payer_id: payment.payerID,
          email: payment.email,
          name: payment.name,
          amount: payment.amount,
          status: payment.status,
        })
        .select()
        .single();
    if (paymentError) throw paymentError;

    const { data: bookingData, error: bookingError } =
      await supabaseAdmin
        .from("bookings")
        .insert({
          customer_id: customerData.id,
          payment_id: paymentData.id,

          tour_id: form.tourId,
          tour_title: form.tourData.title,
          tour_price: form.tourData.price,

          start_date: form.fechaInicio,
          end_date: form.fechaFin,

          travelers: form.viajeros,
          service: form.servicio,

          total,
          paid,
          pending,

          payment_type: form.paymentType,

          donation_active: form.donationActive,
          donation_amount: form.donationAmount,
        })
        .select()
        .single();
    if (bookingError) throw bookingError;

    const travelers = form.viajerosData.map((t: any) => ({
      booking_id: bookingData.id,
      first_name: t.nombre,
      last_name: t.apellido,
      doc_type: t.tipoDoc,
      doc_number: t.numeroDoc,
      email: t.email,
      phone: t.phone,
      country_code: t.countryCode,
      country_name: t.countryName,
      birth_date: t.fechaNacimiento,
      is_leader: t.lider,
    }));
    const { error: travelersError } = await supabaseAdmin
      .from("travelers")
      .insert(travelers);
    if (travelersError) throw travelersError;

    const texto = {
      es: {
        subject: `Reserva ${payment.orderID} confirmada`,
      },
      en: {
        subject: `Booking ${payment.orderID} confirmed`,
      },
    };
    await resend.emails.send({
      from: "Andes Travel <noreply@andes.travel>",
      to: ["andesdestinos@gmail.com", leader.email],
      subject: texto[lang].subject,
      react: (
        <BookingEmail
          data={{ form, payment, totals: { total, paid, pending } }}
          lang={lang}
        />
      ),
    });
    return NextResponse.json({
      success: true,
      bookingId: bookingData.id,
      invoiceNumber: bookingData.invoice_number,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return NextResponse.json({
      success: false,
      error: "Error en la reserva",
    });
  }
}