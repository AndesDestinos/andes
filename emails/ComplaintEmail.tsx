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

export default function ComplaintEmail({ data, lang }: any) {
  const t = {
    greeting: lang === "en" ? "Hello" : "Hola",

    intro:
      lang === "en"
        ? "We have received your complaint. Below is the summary of your request."
        : "Hemos recibido tu reclamo. A continuación el resumen de tu solicitud.",

    personal: lang === "en" ? "CONSUMER INFORMATION" : "DATOS DEL CONSUMIDOR",
    complaint: lang === "en" ? "CLAIM DETAILS" : "DETALLE DEL RECLAMO",

    name: lang === "en" ? "Name" : "Nombre",
    address: lang === "en" ? "Address" : "Dirección",
    email: lang === "en" ? "Email" : "Correo Electrónico",
    phone: lang === "en" ? "Phone" : "Celular",
    document: lang === "en" ? "Document" : "Documento",
    country: lang === "en" ? "Country" : "País",

    typeService: lang === "en" ? "Complaint" : "Queja",
    date: lang === "en" ? "Date" : "Fecha",
    type: lang === "en" ? "Type" : "Tipo",
    message: lang === "en" ? "Observations" : "Observaciones",

    accepted:
      lang === "en"
        ? "The user declared that the information provided is accurate."
        : "El usuario declaró que la información proporcionada es correcta.",
  };

  const fullName = (data.name + ' ' + data.lastname) || "-";

  const labelStyle = {
    width: "160px",
    color: "#666",
    fontSize: "13px",
    verticalAlign: "top" as const,
  };

  const valueStyle = {
    fontSize: "13px",
    color: "#333",
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
          <Heading style={{ fontSize: "22px", letterSpacing: "2px", marginBottom: "25px" }}>
            ANDES TRAVEL
          </Heading>

          <Text>
            {t.greeting} {fullName},
          </Text>

          <Text style={{ marginBottom: "25px", color: "#555" }}>
            {t.intro}
          </Text>

          <Section style={{ marginBottom: "25px" }}>
            <Text style={{ fontSize: "12px", letterSpacing: "2px", color: "#888", marginBottom: "10px" }}>
              {t.personal}
            </Text>

            <Section style={{ border: "1px solid #e5e5e5", padding: "15px" }}>
              <Row style={{ marginBottom: "8px" }}>
                <Column style={labelStyle}>{t.name}:</Column>
                <Column style={valueStyle}>{fullName}</Column>
              </Row>

              <Row style={{ marginBottom: "8px" }}>
                <Column style={labelStyle}>{data.typeDocument || "DNI"}:</Column>
                <Column style={valueStyle}>{data.documentNumber || "-"}</Column>
              </Row>

              <Row style={{ marginBottom: "8px" }}>
                <Column style={labelStyle}>{t.address}:</Column>
                <Column style={valueStyle}>{data.address || "-"}</Column>
              </Row>

              <Row style={{ marginBottom: "8px" }}>
                <Column style={labelStyle}>{t.email}:</Column>
                <Column style={valueStyle}>{data.email || "-"}</Column>
              </Row>

              <Row>
                <Column style={labelStyle}>{t.phone}:</Column>
                <Column style={valueStyle}>{data.phone || "-"}</Column>
              </Row>
            </Section>
          </Section>

          <Section style={{ marginBottom: "25px" }}>
            <Text style={{ fontSize: "12px", letterSpacing: "2px", color: "#888", marginBottom: "10px" }}>
              {t.complaint}
            </Text>

            <Section style={{ border: "1px solid #e5e5e5", padding: "15px" }}>
              <Row style={{ marginBottom: "8px" }}>
                <Column style={labelStyle}>{data.typeService || t.typeService}:</Column>
                <Column style={valueStyle}>{data.service || "-"}</Column>
              </Row>

              <Row style={{ marginBottom: "8px" }}>
                <Column style={labelStyle}>{t.date}:</Column>
                <Column style={valueStyle}>{data.date || "-"}</Column>
              </Row>

              <Row>
                <Column style={labelStyle}>{t.message}:</Column>
                <Column style={valueStyle}>{data.message || "-"}</Column>
              </Row>
            </Section>
          </Section>

          <Text style={{ fontSize: "13px", color: "#555" }}>
            {data.acepta ? "✔ " + t.accepted : "-"}
          </Text>

          <Text style={{ fontSize: "11px", color: "#999", marginTop: "30px" }}>
            https://andes.travel | andesdestinos@gmail.com | +51 900 111 114
          </Text>
        </Container>
      </Body>
    </Html>
  );
}