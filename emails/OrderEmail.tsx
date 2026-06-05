import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Row,
  Column,
  Hr,
} from "@react-email/components";

export default function OrderEmail({ data, lang }: any) {
  const { customer, products, payment } = data;
  const total = products.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  return (
    <Html>
      <Body style={{ fontFamily: "Arial", background: "#f6f6f6" }}>
        <Container style={{ background: "#fff", padding: 30 }}>
          <Heading>🧾 {lang === 'es' ? 'Confirmación de Pedido' : 'Order Confirmation'}</Heading>
          <Text>{lang === 'es' ? 'Orden ID' : 'ID Order'}: {payment.orderID}</Text>
          <Text>{lang === 'es' ? 'Estado' : 'Status'}: {payment.status}</Text>

          <Hr />

          <Section>
            <Heading as="h3">👤 {lang === 'es' ? 'Datos del Cliente' : 'Customer Data'}</Heading>
            <Text>
              {customer.firstName} {customer.lastName}
            </Text>
            <Text>Email: {customer.email}</Text>
            <Text>{lang === 'es' ? 'Teléfono' : 'Phone'}: {customer.phone}</Text>
          </Section>

          <Hr />

          <Section>
            <Heading as="h3">📍 {lang === 'es' ? 'Dirección de Envío' : 'Mailing address'}</Heading>
            <Text>{customer.address}</Text>
            <Text>
              {customer.city}, {customer.countryName}
            </Text>
          </Section>

          <Hr />

          <Section>
            <Heading as="h3">💳 {lang === 'es' ? 'Información de Pago' : 'Payment Information'}</Heading>
            <Text>Email PayPal: {payment.email}</Text>
            <Text>{lang === 'es' ? 'Pagador' : 'Payer'}: {payment.name}</Text>
            <Text>{lang === 'es' ? 'Monto' : 'Amount'}: ${payment.amount}</Text>
          </Section>

          <Hr />

          <Section>
            <Heading as="h3">🛍️ {lang === 'es' ? 'Productos' : 'Products'}</Heading>

            {products.map((item: any, i: number) => (
              <Row key={i}>
                <Column>
                  {item.name?.es || item.name?.en}
                </Column>
                <Column>x{item.quantity}</Column>
                <Column>
                  ${item.price} c/u
                </Column>
                <Column>
                  ${item.price * item.quantity}
                </Column>
              </Row>
            ))}
          </Section>

          <Hr />

          <Section>
            <Heading>Total: ${total}</Heading>
          </Section>

          <Text
            style={{
              fontSize: "11px",
              color: "#999",
              marginTop: "30px",
            }}
          >
            https://andes.travel | andesdestinos@gmail.com | +51 900 111 114
          </Text>
        </Container>
      </Body>
    </Html>
  );
}