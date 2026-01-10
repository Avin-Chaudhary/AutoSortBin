import { Link } from "react-router-dom";

export default function Footer() {
  function scrollTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      id="footer"
      style={{
        background:
          "linear-gradient(180deg, rgba(2,6,23,0.98), rgba(15,23,42,0.96))",
        color: "#e5e7eb",
        padding: "7vh 6%",
        borderTop: "1px solid rgba(56,189,248,0.25)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "3.5rem",
        }}
      >
        {/* TOP ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* BRAND */}
          <h2
            style={{
              fontSize: "1.9rem",
              fontWeight: "700",
              color: "#38bdf8",
              margin: 0,
            }}
          >
            AutoSortBin
          </h2>

          {/* NAV LINKS */}
          <nav
            style={{
              display: "flex",
              gap: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/research"
              style={{
                color: "#e5e7eb",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Research
            </Link>

            <Link
              to="/implementation"
              style={{
                color: "#e5e7eb",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Implementation
            </Link>

           <a
            href="https://link.springer.com/article/10.1007/s41314-025-00088-z"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#e5e7eb",
              textDecoration: "none",
              fontWeight: "500",
           }}
          >
           Official Publication
          </a>


            <a
              href="#"
              onClick={scrollTop}
              style={{
                color: "#e5e7eb",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Privacy & Terms
            </a>
          </nav>
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "2.5rem",
          }}
        >
          {/* EMAIL */}
          <a
            href="mailto:autosortbin.project@gmail.com"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            autosortbin.project@gmail.com
          </a>

          {/* COPYRIGHT */}
          <p
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: "#9ca3af",
            }}
          >
            © {new Date().getFullYear()} AutoSortBin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
