import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import PlanningEmail from "@/emails/PlanningEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lang = body.lang || "en";
    const response = await resend.emails.send({
      from: "Andes Travel <noreply@andes.travel>",
      to: ["andesdestinos@gmail.com", body.email],
      subject: body.lang === "en" ? "Travel Plan Request" : "Solicitud de viaje",
      react: <PlanningEmail data={body} lang={lang} />,
    });
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error al guardar plan de viaje" });
  }
}