import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="it" className={inter.variable}>
      <head>
        {/* Display serif della home. Stessa fonte usata da homejeve.netlify.app,
            così le due parti del sito combaciano. Vedi nota sulla licenza. */}
        <link
          rel="preconnect"
          href="https://db.onlinewebfonts.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
