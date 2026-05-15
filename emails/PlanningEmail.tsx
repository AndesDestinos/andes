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

export default function PlanningEmail({ data, lang }: any) {

  const t = {
    greeting: lang === "en" ? "Hello" : "Hola",
    message:
      lang === "en"
        ? "Thank you for your travel request. We will design a personalized experience for you."
        : "Gracias por tu solicitud de viaje. Diseñaremos una experiencia personalizada para ti.",

    personal: lang === "en" ? "PERSONAL INFORMATION" : "INFORMACIÓN PERSONAL",
    trip: lang === "en" ? "TRIP DETAILS" : "DETALLES DEL VIAJE",
    preferences: lang === "en" ? "TRAVEL PREFERENCES" : "PREFERENCIAS DE VIAJE",

    name: lang === "en" ? "Name" : "Nombre",
    email: "Email",
    phone: lang === "en" ? "Phone" : "Teléfono",
    country: lang === "en" ? "Country" : "País",

    destinations: lang === "en" ? "Destinations" : "Destinos",
    service: lang === "en" ? "Service" : "Servicio",
    date: lang === "en" ? "Date" : "Fecha",
    travelers: lang === "en" ? "Travelers" : "Viajeros",
    hotel: lang === "en" ? "Hotel included" : "Hotel incluido",
    stars: lang === "en" ? "Hotel category" : "Categoría de hotel",
    contact: lang === "en" ? "Contact method" : "Método de contacto",
    observation: lang === "en" ? "Observation" : "Observación",
  };

  const label = { width: "160px", color: "#666", fontSize: "13px" };
  const value = { fontSize: "13px", color: "#333" };

  return (
    <Html>
      <Body style={{ backgroundColor: "#f5f5f5", fontFamily: "Arial" }}>
        <Container style={{ backgroundColor: "#fff", padding: "40px", maxWidth: "600px" }}>
          <Heading style={{ fontSize: "22px" }}>
            WANDERUP TRAVEL
          </Heading>

          <Text>
            {t.greeting} {data.name},
          </Text>

          <Text style={{ marginBottom: "20px", color: "#555" }}>
            {t.message}
          </Text>

          <Section style={{ marginBottom: "25px" }}>
            <Text style={{ fontSize: "12px", color: "#888" }}>
              {t.personal}
            </Text>

            <Section style={{ border: "1px solid #eee", padding: "15px" }}>
              <Row>
                <Column style={label}>{t.name}</Column>
                <Column style={value}>{data.name}</Column>
              </Row>

              <Row>
                <Column style={label}>{t.email}</Column>
                <Column style={value}>{data.email}</Column>
              </Row>

              <Row>
                <Column style={label}>{t.phone}</Column>
                <Column style={value}>{data.phone}</Column>
              </Row>

              <Row>
                <Column style={label}>{t.country}</Column>
                <Column style={value}>{data.country}</Column>
              </Row>
            </Section>
          </Section>

          <Section style={{ marginBottom: "25px" }}>
            <Text style={{ fontSize: "12px", color: "#888" }}>
              {t.trip}
            </Text>

            <Section style={{ border: "1px solid #eee", padding: "15px" }}>
              <Row>
                <Column style={label}>{t.destinations}</Column>
                <Column style={value}>
                  {data.destinations?.join(", ") || "-"}
                </Column>
              </Row>

              <Row>
                <Column style={label}>{t.service}</Column>
                <Column style={value}>{data.service || "-"}</Column>
              </Row>

              <Row>
                <Column style={label}>{t.date}</Column>
                <Column style={value}>
                  {data.month} {data.year || ""}
                </Column>
              </Row>

              <Row>
                <Column style={label}>{t.travelers}</Column>
                <Column style={value}>{data.travelers}</Column>
              </Row>

              <Row>
                <Column style={label}>{t.hotel}</Column>
                <Column style={value}>
                  {data.includeHotel ? "Yes" : "No"}
                </Column>
              </Row>

              <Row>
                <Column style={label}>{t.stars}</Column>
                <Column style={value}>{data.stars} ★</Column>
              </Row>

              <Row>
                <Column style={label}>{t.contact}</Column>
                <Column style={value}>{data.contact}</Column>
              </Row>

              <Row>
                <Column style={label}>{t.observation}</Column>
                <Column style={value}>{data.message}</Column>
              </Row>
            </Section>
          </Section>

          <Text style={{ fontSize: "13px", color: "#555" }}>
            {lang === "en"
              ? "We will contact you soon with your personalized trip."
              : "Te contactaremos pronto con tu viaje personalizado."}
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