import type { Metadata } from "next";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import SiteAmbient from "@/components/SiteAmbient";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-merriweather-sans",
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
    <html
      lang="it"
      className={`${merriweather.variable} ${merriweatherSans.variable}`}
    >
      <body>
        <SiteAmbient />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
