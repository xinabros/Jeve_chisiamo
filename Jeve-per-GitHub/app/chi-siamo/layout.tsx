import SiteAmbient from "@/components/SiteAmbient";
import "./override.css";

/* ==========================================================================
   Layout della rotta /chi-siamo.

   Next.js lo rileva automaticamente: serve ad agganciare due cose senza
   dover modificare file già esistenti (in questa sessione non è possibile).

   – `override.css` : correzioni alla sezione Premi e hover del riferimento
   – `SiteAmbient`  : alone rosso che segue il puntatore + lavata di
                      gradienti dietro la prima schermata

   Quando l'accesso in scrittura torna, il contenuto di override.css va
   consolidato in ChiSiamo.module.css e SiteAmbient spostato nel layout
   radice (serve a tutto il sito, non solo a questa pagina): allora questo
   file si può eliminare.
   ========================================================================== */

export default function ChiSiamoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteAmbient />
      {children}
    </>
  );
}
