import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeve — Consulenza gestita da studenti",
  description:
    "Jeve è l'associazione studentesca che opera come società di consulenza, collaborando con aziende e organizzazioni su progetti reali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${merriweather.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
