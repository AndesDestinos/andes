import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Row,
  Column,
} from "@react-email/components";

export default function ContactEmail({ data, lang }: any) {
  const t = {
    title: lang === "en" ? "Contact Confirmation" : "Confirmación de Contacto",
    greeting: lang === "en" ? "Hello" : "Hola",
    message:
      lang === "en"
        ? "Thank you for contacting Andes Travel. We have received your message and will respond shortly."
        : "Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.",
    personalData: lang === "en" ? "PERSONAL INFORMATION" : "DATOS PERSONALES",
    name: lang === "en" ? "Name" : "Nombre",
    email: lang === "en" ? "Email" : "Correo Electrónico",
    phone: lang === "en" ? "Phone" : "Celular",
    country: lang === "en" ? "Country" : "País",
    userMessage: lang === "en" ? "Message" : "Mensaje",
  };

  return (
    <Html>
      <Body style={{ backgroundColor: "#f5f5f5", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px 30px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Heading
            style={{
              fontSize: "22px",
              letterSpacing: "2px",
              marginBottom: "25px",
            }}
          >
            WANDERUP TRAVEL
          </Heading>

          <Text style={{ marginBottom: "10px" }}>
            {t.greeting} {data.name},
          </Text>

          <Text style={{ marginBottom: "25px", color: "#555" }}>
            {t.message}
          </Text>

          <Section style={{ marginBottom: "25px" }}>
            <Text
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "10px",
                color: "#888",
              }}
            >
              {t.personalData}
            </Text>

            <Section
              style={{
                border: "1px solid #e5e5e5",
                padding: "15px",
              }}
            >
              <Row style={{ marginBottom: "8px" }}>
                <Column style={{ width: "150px", color: "#666" }}>
                  {t.name}:
                </Column>
                <Column>
                  {data.name}
                </Column>
              </Row>

              <Row style={{ marginBottom: "8px" }}>
                <Column style={{ width: "150px", color: "#666" }}>
                  {t.email}:
                </Column>
                <Column>{data.email}</Column>
              </Row>

              <Row style={{ marginBottom: "8px" }}>
                <Column style={{ width: "150px", color: "#666" }}>
                  {t.phone}:
                </Column>
                <Column>{data.phone}</Column>
              </Row>

              <Row>
                <Column style={{ width: "150px", color: "#666" }}>
                  {t.country}:
                </Column>
                <Column>{data.country}</Column>
              </Row>
            </Section>
          </Section>

          <Section style={{ marginBottom: "25px" }}>
            <Text
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "10px",
                color: "#888",
              }}
            >
              {t.userMessage}
            </Text>

            <Section
              style={{
                border: "1px solid #e5e5e5",
                padding: "15px",
              }}
            >
              <Text style={{ color: "#333" }}>
                {data.message}
              </Text>
            </Section>
          </Section>

          <Text style={{ fontSize: "13px", color: "#555", marginTop: "20px" }}>
            {lang === "en"
              ? "We will contact you shortly."
              : "Nos pondremos en contacto contigo pronto."}
          </Text>

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