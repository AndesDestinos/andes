import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import OrderEmail from "@/emails/OrderEmail";
import { sanityAdmin } from "@/lib/sanity.admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { products, payment, customer, lang } = body;
    if (!products?.length || !payment || !customer) {
      return NextResponse.json({
        success: false,
        error: "Datos incompletos",
      });
    }

    for (const item of products) {
      const product = await sanityAdmin.getDocument(item._id);

      if (!product) {
        throw new Error(`Producto no existe`);
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({
          success: false,
          error: `Stock insuficiente para ${product.name?.es || "producto"}`,
        });
      }
    }

    const total = products.reduce((acc: number, item: any) => {
      return acc + item.price * item.quantity;
    }, 0);
    const { data: customerData, error: customerError } =
      await supabaseAdmin
        .from("customers")
        .insert({
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          country_code: customer.countryCode,
          country_name: customer.countryName,
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

    const { data: orderData, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .insert({
          customer_id: customerData.id,
          payment_id: paymentData.id,
          total,
          status: payment.status,
        })
        .select()
        .single();
    if (orderError) throw orderError;

    const itemsToInsert = products.map((item: any) => ({
      order_id: orderData.id,
      product_id: item._id,
      name: item.name?.en || item.name?.es || "Producto",
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(itemsToInsert);
    if (itemsError) throw itemsError;

    await Promise.all(
      products.map((item: any) =>
        sanityAdmin
          .patch(item._id)
          .dec({ stock: item.quantity })
          .commit()
      )
    );

    const texto = {
      es: {
        subject: `Orden ${payment.orderID} confirmada`,
      },
      en: {
        subject: `Order ${payment.orderID} confirmed`,
      },
    };
    await resend.emails.send({
      from: "Andes Travel <noreply@andes.travel>",
      to: [
        "andesdestinos@gmail.com",
        customer.email,
      ],
      subject: texto[lang as "es" | "en"]?.subject || texto.en.subject,
      react: <OrderEmail data={{products, customer, payment}} lang={lang} />,
    });
    return NextResponse.json({
      success: true,
      orderId: orderData.id,
    });

  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json({
      success: false,
      error: "Error en el proceso de checkout",
    });
  }
}