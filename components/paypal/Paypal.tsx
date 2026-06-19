"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalButton({ lang, amount, onSuccess, showToast }: any) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        components: "buttons,funding-eligibility",
        intent: "capture",
        currency: "USD",
        locale: lang === "es" ? "es_ES" : "en_US",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}

        createOrder={(data, actions) => {
          if (!actions.order) {
            showToast(
              lang === "es" 
                ? "Error iniciando el pago" 
                : "Error initiating payment",
              "error"
            );
            throw new Error("PayPal actions.order no disponible");
          }

          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: Number(amount).toFixed(2),
                },
              },
            ],
          });
        }}

        onApprove={(data, actions) => {
          if (!actions.order) {
            showToast(
              lang === "es" 
                ? "Error al aprobar el pago" 
                : "Error approving payment",
              "error"
            );
            throw new Error("PayPal actions.order no disponible");
          }

          return actions.order.capture().then((details) => {
            const paymentData = {
              orderID: data.orderID,
              payerID: data.payerID,
              email: details?.payer?.email_address,
              name: details?.payer?.name?.given_name,
              amount: amount,
              status: details?.status,
            };
            showToast(
              lang === "es" 
                ? "Pago realizado correctamente ✅" 
                : "Payment completed successfully ✅",
              "success"
            );
            onSuccess(paymentData);
          });
        }}

        onError={(err) => {
          console.error("PayPal Error:", err);
          showToast(
            lang === "es" 
              ? "Error en el pago ❌" 
              : "Payment error ❌",
            "error"
          );
        }}

        onCancel={() => {
          showToast(
            lang === "es" 
              ? "Pago cancelado ⚠️" 
              : "Payment canceled ⚠️",
            "warn"
          );
        }}
      />
    </PayPalScriptProvider>
  );
}