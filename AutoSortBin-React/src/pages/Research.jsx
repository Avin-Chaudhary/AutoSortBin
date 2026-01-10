import imgjournal from "../assets/Journal.png";

export default function Research() {
  return (
    <section className="section research-page">
      {/* ===============================
          PAGE TITLE
         =============================== */}
      <h2
        className="section-title"
        style={{
          fontSize: "2.8rem",
          marginBottom: "35px",
          animation: "fadeUp 0.7s ease-out",
        }}
      >
        Research Paper
      </h2>

      {/* ===============================
          RESEARCH HIGHLIGHT TEXT + IMAGE
         =============================== */}
      <div
        style={{
          maxWidth: "1200px",
          marginBottom: "70px",
          display: "grid",
          gridTemplateColumns: "1.8fr 0.5fr", // ✅ more space to text
          gap: "4rem",
          alignItems: "center",
          animation: "fadeUp 0.9s ease-out",
        }}
      >
        {/* TEXT */}
        <div>
          <p
            className="section-text"
            style={{
              fontSize: "1.4rem",
              lineHeight: "1.9",
            }}
          >
            The research paper titled{" "}
            <strong style={{ color: "#000000ff" }}>
              “AutoSortBin: Integrating CPS and IoT with Densely Connected
              Convolutional Networks for Sustainable Waste Management”
            </strong>{" "}
            has been published in the{" "}
            <span style={{ color: "#38bdf8", fontWeight: "600" }}>
              Springer Journal of Transformative Technologies and Sustainable
              Development
            </span>{" "}
            on 19th December 2025.
          </p>

          <p
            className="section-text"
            style={{
              fontSize: "1.35rem",
              lineHeight: "1.85",
              marginTop: "25px",
            }}
          >
            The manuscript was submitted from the{" "}
            <span style={{ color: "#38bdf8", fontWeight: "600" }}>
              5th International Conference on Computing Analytics and Networks
              (ICAN 2025)
            </span>
            , held at{" "}
            <span style={{ color: "#000000ff", fontWeight: "600" }}>
              Chitkara University, Himachal Pradesh
            </span>
            .
          </p>
        </div>

        {/* IMAGE */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end", // ✅ pushes image right
          }}
        >
          <img
            src={imgjournal}
            alt="Research publication visual"
            style={{
              width: "100%",
              maxWidth: "210px",
              borderRadius: "14px",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
            }}
          />
        </div>
      </div>

      {/* ===============================
          PUBLICATION LINK (ENHANCED)
         =============================== */}
      <div
        className="glass"
        style={{
          maxWidth: "920px",
          margin: "0 auto 90px",
          padding: "3.2rem 3.6rem",
          textAlign: "center",
          animation: "fadeUp 1.1s ease-out",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 30px 60px rgba(56, 189, 248, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <p
          className="section-text"
          style={{
            fontSize: "1.05rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "18px",
            color: "#64748b",
          }}
        >
          Official Publication
        </p>

        <a
          href="https://link.springer.com/article/10.1007/s41314-025-00088-z"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "1.35rem",
            fontWeight: "700",
            color: "#38bdf8",
            textDecoration: "none",
            paddingBottom: "4px",
            borderBottom: "2px solid rgba(56, 189, 248, 0.5)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0ea5e9";
            e.currentTarget.style.borderBottomColor = "#0ea5e9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#38bdf8";
            e.currentTarget.style.borderBottomColor = "rgba(56, 189, 248, 0.5)";
          }}
        >
          View on Springer
          <span style={{ fontSize: "1.4rem", transform: "translateY(1px)" }}>
            ↗
          </span>
        </a>

        <p
          className="section-text"
          style={{
            marginTop: "22px",
            fontSize: "1.05rem",
            color: "#64748b",
          }}
        >
          Springer Journal of Transformative Technologies and Sustainable
          Development
        </p>
      </div>

      {/* ===============================
          PDF VIEWER
         =============================== */}
      <div
        className="glass"
        style={{
          height: "85vh",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          animation: "fadeUp 1.3s ease-out",
        }}
      >
        <iframe
          src="/ASB.pdf"
          title="AutoSortBin Springer Research Paper"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>

      {/* ===============================
          LOCAL ANIMATIONS
         =============================== */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .research-page > div:first-of-type {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}
