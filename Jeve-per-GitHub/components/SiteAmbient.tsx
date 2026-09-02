"use client";

import { useEffect, useRef } from "react";
import styles from "./SiteAmbient.module.css";

/* ==========================================================================
   Ambiente visivo del sito, ripreso dalla home v2:
   – il cursore custom, anello + punto (`.custom-cursor-*` su v2)
   – una lavata di gradienti in deriva dietro la prima schermata

   Il punto segue il puntatore senza ritardo; l'anello lo rincorre di un
   frame alla volta, recuperando il 19% della distanza a ogni giro — è quel
   ritardo a dare l'inerzia. Entrambi si muovono scrivendo il transform
   direttamente sul nodo: nessuno stato React, quindi nessun re-render
   durante il movimento del mouse, e si anima solo transform, che resta
   sul compositor.
   ========================================================================== */

/** cosa fa espandere l'anello: tutto ciò su cui si può cliccare */
const HOT = "a, button, summary, [role='button'], [data-cursor-expand]";

/** quota della distanza che l'anello recupera a ogni frame */
const EASE = 0.19;

/** metà del lato dell'anello e del punto: servono a centrarli */
const RING_HALF = 28;
const DOT_HALF = 2.5;

export default function SiteAmbient() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    /* Su touch non esiste un puntatore da sostituire, e con motion ridotto
       l'inseguimento è proprio ciò che va evitato: in entrambi i casi non
       registriamo nulla e il cursore di sistema resta quello vero. */
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let frame = 0;

    const follow = () => {
      ringX += (x - ringX) * EASE;
      ringY += (y - ringY) * EASE;
      ring.style.transform = `translate3d(${ringX - RING_HALF}px, ${
        ringY - RING_HALF
      }px, 0)`;
      frame = requestAnimationFrame(follow);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate3d(${x - DOT_HALF}px, ${
        y - DOT_HALF
      }px, 0)`;

      const target = event.target;
      ring.dataset.expanded =
        target instanceof Element && target.closest(HOT) ? "true" : "false";
      ring.dataset.visible = "true";
      dot.dataset.visible = "true";
    };

    /* pointerout senza relatedTarget = il puntatore ha lasciato la finestra,
       non è passato su un altro elemento: solo allora i due nodi sfumano. */
    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      ring.dataset.visible = "false";
      dot.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    frame = requestAnimationFrame(follow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className={styles.wash} aria-hidden="true" />
      <div
        ref={ringRef}
        className={styles.ring}
        data-expanded="false"
        data-visible="false"
        aria-hidden="true"
      >
        <span />
      </div>
      <div
        ref={dotRef}
        className={styles.dot}
        data-visible="false"
        aria-hidden="true"
      />
    </>
  );
}
