"use client";

import { useEffect, useRef } from "react";
import styles from "./SiteAmbient.module.css";

/* ==========================================================================
   Ambiente visivo del sito, ripreso dalla home:
   – un alone rosso che segue il puntatore (`.cursor-spotlight`)
   – una lavata di gradienti in deriva dietro la prima schermata

   L'alone si muove scrivendo direttamente il transform sul nodo, una volta
   per frame: nessuno stato React, quindi nessun re-render durante il
   movimento del mouse. Si anima solo transform, che resta sul compositor.
   ========================================================================== */

/** metà del lato dell'alone: serve a centrarlo sul puntatore */
const HALF = 120;

export default function SiteAmbient() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    /* Su touch non esiste un puntatore da seguire, e con motion ridotto
       l'inseguimento è proprio ciò che va evitato: in entrambi i casi non
       registriamo nulla e l'alone resta invisibile. */
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${x - HALF}px, ${y - HALF}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (el.dataset.visible !== "true") el.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    /* uscendo dalla finestra l'alone sfuma invece di restare appeso */
    const onLeave = () => {
      el.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <>
      <div className={styles.wash} aria-hidden="true" />
      <div ref={spotRef} className={styles.spotlight} aria-hidden="true" />
    </>
  );
}
