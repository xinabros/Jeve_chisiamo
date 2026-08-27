import Link from "next/link";

/**
 * Temporary landing page.
 *
 * NOTE FOR THE TEAM: this is only a placeholder home so the project runs.
 * The real Home is owned by another pair. The page implemented in this task
 * is "Chi Siamo" → /chi-siamo
 */
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "0.8rem",
            color: "var(--c-primary)",
            fontWeight: 700,
          }}
        >
          Jeve · placeholder home
        </p>
        <h1 style={{ fontSize: "var(--fs-h2)", margin: "0.5rem 0 1.5rem" }}>
          Progetto sito — work in progress
        </h1>
        <Link
          href="/chi-siamo"
          style={{
            display: "inline-block",
            background: "var(--c-primary)",
            color: "var(--c-white)",
            padding: "0.9rem 1.6rem",
            borderRadius: "999px",
            fontWeight: 600,
            boxShadow: "var(--shadow-red)",
          }}
        >
          Vai alla pagina Chi Siamo →
        </Link>
      </div>
    </main>
  );
}
