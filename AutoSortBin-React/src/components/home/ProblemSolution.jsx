import img2 from "../../assets/2.jpeg";
import img3 from "../../assets/3.jpeg";

export default function ProblemSolution() {
  return (
    <section className="section">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "8rem",
        }}
      >
        {/* ===============================
            PROBLEM (TEXT LEFT, IMAGE RIGHT)
           =============================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* TEXT */}
          <div>
            <h3 className="section-title">Problem Statement</h3>

            <p className="section-text problem-text">
              Inefficient waste segregation is a major challenge in
              modern waste management. Manual sorting is slow,
              inconsistent, and often neglected, leading to poor
              recycling rates and increased landfill usage.
            </p>
          </div>

          {/* IMAGE */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={img2}
              alt="Problem of manual waste segregation"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "14px",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        </div>

        {/* ===============================
            SOLUTION (IMAGE LEFT, TEXT RIGHT)
           =============================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* IMAGE */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={img3}
              alt="Automated waste segregation using AutoSortBin"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "14px",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="section-title">Proposed Solution</h3>

            <p className="section-text problem-text">
              AutoSortBin automates waste segregation using deep
              learning and IoT. The system classifies waste images
              in real time and physically actuates the correct bin,
              ensuring accurate segregation at source without any human involvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
