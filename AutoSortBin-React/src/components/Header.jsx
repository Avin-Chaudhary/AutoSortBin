import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  /* CLOSE DRAWER ON OUTSIDE CLICK */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* HEADER */}
      <header
        className="header"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.95), rgba(15,23,42,0.9))",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(56,189,248,0.25)",
        }}
      >
        {/* LOGO / TITLE */}
        <h1
          style={{
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#38bdf8",
            }}
            onClick={() => setOpen(false)}
          >
            AutoSortBin
          </Link>
        </h1>

        {/* DESKTOP NAV */}
        <nav className="nav-links">
          {["Home", "Research", "Implementation"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              style={{
                position: "relative",
                padding: "0.4rem 0",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#38bdf8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#e5e7eb";
              }}
            >
              {item}
            </Link>
          ))}

          <a
            href="#footer"
            style={{
              position: "relative",
              padding: "0.4rem 0",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#38bdf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e5e7eb";
            }}
          >
            Contact Us
          </a>
        </nav>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setOpen(true)}
          style={{
            color: "#e5e7eb",
            transition: "color 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#38bdf8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#e5e7eb";
          }}
        >
          ☰
        </div>
      </header>

      {/* SIDE DRAWER */}
      {open && (
        <div className="drawer-overlay">
          <div
            ref={drawerRef}
            className="side-drawer open"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.97), rgba(15,23,42,0.95))",
              backdropFilter: "blur(12px)",
              borderLeft: "1px solid rgba(56,189,248,0.25)",
            }}
          >
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/research" onClick={() => setOpen(false)}>
              Research
            </Link>

            <Link to="/implementation" onClick={() => setOpen(false)}>
              Implementation
            </Link>

            <a href="#footer" onClick={() => setOpen(false)}>
              Contact Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
