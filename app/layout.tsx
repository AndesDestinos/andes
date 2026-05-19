import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const metropolis = localFont({
  src: [
    {
      path: "../public/fonts/metropolis/Metropolis-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis/Metropolis-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis/Metropolis-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/metropolis/Metropolis-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-metropolis",
});

const bodoni = localFont({
  src: [
    {
      path: "../public/fonts/bodoni_moda/BodoniModa_28pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bodoni_moda/BodoniModa_28pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/bodoni_moda/BodoniModa_28pt-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-bodoni",
});

export const metadata: Metadata = {
  title: "Andes Travel",
  description: "Sistema de empresa de turismo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${metropolis.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}