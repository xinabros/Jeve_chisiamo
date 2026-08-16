import type { Metadata } from "next";
import ChiSiamo from "./ChiSiamo";

/* `metadata` è ammesso solo in un server component: per questo la pagina
   resta un wrapper e le sezioni vivono in ChiSiamo.tsx. */
export const metadata: Metadata = {
  title: "Chi Siamo · Jeve",
  description:
    "JEVE è la Junior Enterprise di Ca' Foscari Venezia: scopri la storia, il team, il Board, il network delle Junior Enterprise e i premi vinti dal 2020.",
};

export default function ChiSiamoPage() {
  return <ChiSiamo />;
}
