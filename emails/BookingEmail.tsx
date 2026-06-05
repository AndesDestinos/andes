import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Hr,
} from "@react-email/components";

type Lang = "es" | "en";

export default function BookingEmail({ data, lang }: { data: any; lang: Lang }) {
  const { form, payment } = data;

  const leader = form.viajerosData.find((v: any) => v.lider);

  // cálculos
  const totalDonacion = form.donationActive
    ? form.donationAmount * form.viajeros
    : 0;

  const totalTour = form.tourData.price * form.viajeros;
  const total = totalTour + totalDonacion;

  const pago = form.paymentType === "half" ? total / 2 : total;
  const restante = total - pago;

  const today = new Date().toLocaleDateString();

  const t = {
    es: {
      title: "Factura",
      client: "CLIENTE",
      reservation: "DATOS DE RESERVA",
      details: "DETALLES",
      balance: "BALANCE",
      travelers: "Número de viajeros",
      service: "Tipo de servicio",
      tour: "Tour seleccionado",
      total: "Precio total",
      paid: "Pagado",
      pending: "Pendiente",
      donation: "Donación",
    },
    en: {
      title: "Invoice",
      client: "CLIENT",
      reservation: "RESERVATION DETAILS",
      details: "DETAILS",
      balance: "BALANCE",
      travelers: "Travelers",
      service: "Service",
      tour: "Tour",
      total: "Total price",
      paid: "Paid",
      pending: "Pending",
      donation: "Donation",
    },
  }[lang];

  return (
    <Html>
      <Body style={{ fontFamily: "Arial", background: "#f6f6f6", padding: 20 }}>
        <Container style={{ background: "#ffffff", padding: 30, maxWidth: 700 }}>
          <table width="100%">
            <tr>
              <td>
                <Heading>{t.title}</Heading>
              </td>
              <td align="right">
                <Text><strong>ID:</strong> {payment.orderID}</Text>
                <Text>{today}</Text>
              </td>
            </tr>
          </table>

          <Hr />

          <Section>
            <Heading as="h3">{t.client}</Heading>
            <Text>{leader.nombre} {leader.apellido}</Text>
            <Text>{leader.email}</Text>
            <Text>{leader.phone}</Text>
            <Text>{leader.countryName}</Text>
          </Section>

          <Hr />

          <Section>
            <Heading as="h3">{t.reservation}</Heading>

            <table width="100%">
              <tr>
                <td>{t.tour}</td>
                <td align="right"><strong>{form.tourData.title}</strong></td>
              </tr>
              <tr>
                <td>{t.travelers}</td>
                <td align="right"><strong>{form.viajeros}</strong></td>
              </tr>
              <tr>
                <td>{t.service}</td>
                <td align="right"><strong>{form.servicio}</strong></td>
              </tr>
              <tr>
                <td>Fecha</td>
                <td align="right">
                  <strong>{new Date(form.fechaInicio).toLocaleDateString()}</strong>
                </td>
              </tr>
            </table>
          </Section>

          <Hr />

          <Section>
            <Heading as="h3">{t.details}</Heading>

            <table width="100%" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#9A9A9A", fontSize: "12px" }}>
                  <th align="left">Servicios</th>
                  <th align="left">Cantidad</th>
                  <th align="left">Precio unitario</th>
                  <th align="right">Precio</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{form.tourData.title}</td>
                  <td>{form.viajeros}</td>
                  <td>$ {form.tourData.price}</td>
                  <td align="right">$ {totalTour}</td>
                </tr>

                {form.donationActive && (
                  <tr>
                    <td>{t.donation}</td>
                    <td>{form.viajeros}</td>
                    <td>$ {form.donationAmount}</td>
                    <td align="right">$ {totalDonacion}</td>
                  </tr>
                )}

                <tr>
                  <td colSpan={3} style={{ paddingTop: 10 }}>
                    <strong>{t.total}</strong>
                  </td>
                  <td align="right" style={{ paddingTop: 10 }}>
                    <strong>$ {total}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr />

          <Section>
            <Heading as="h3">{t.balance}</Heading>

            <table width="100%">
              <tr>
                <td>
                  {form.paymentType === "half"
                    ? "Depósito 50%"
                    : "Pago total"}
                </td>
                <td align="right" style={{ color: "#961AA4", fontWeight: "bold" }}>
                  {t.paid} $ {pago}
                </td>
              </tr>

              {restante > 0 && (
                <tr>
                  <td>Restante</td>
                  <td align="right" style={{ color: "#EE5E3F", fontWeight: "bold" }}>
                    {t.pending} $ {restante}
                  </td>
                </tr>
              )}
            </table>
          </Section>

          <Hr />

          <Text
            style={{
              fontSize: "11px",
              color: "#999",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            https://andes.travel | andesdestinos@gmail.com | +51 900 111 114
          </Text>
        </Container>
      </Body>
    </Html>
  );
}