import { useState } from "react";
import imgflow from "../assets/Flow.png";
import API_BASE_URL from "../config/api";

export default function Implementation() {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function runPrediction() {
    if (!imageFile || loading) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(`${API_BASE_URL}/predict-and-open-bin`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="section implementation-page"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        background: "transparent",
      }}
    >
      {/* PAGE TITLE */}
      <h2
        className="section-title"
        style={{
          fontSize: "2.8rem",
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        Implementation Demonstration
      </h2>

      {/* CONTROL FLOW */}
      <section style={{ background: "#eaf6ff", padding: "100px 0" }}>
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div>
            <h3 className="section-title">Control Flow of Implementation</h3>

            <p
              className="section-text"
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.75",
                maxWidth: "520px",
              }}
            >
              The implementation begins with capturing an input image, which is
              transmitted to the cloud-hosted DenseNet-121 model for
              classification. The predicted waste category is mapped to a
              predefined bin ID and sent to the ThingSpeak server.
              <br />
              <br />
              The ESP32 microcontroller, simulated using Wokwi, continuously
              polls the ThingSpeak channel. Upon receiving a valid bin ID, the
              corresponding servo motor opens the designated bin lid. Ultrasonic
              sensors monitor bin levels, and alerts are triggered when bins
              reach capacity.
            </p>
          </div>

          <div className="flow-zoom-wrapper">
            <img
              src={imgflow}
              alt="AutoSortBin control flow diagram"
              className="flow-zoom-image"
            />
          </div>
        </div>
      </section>

      {/* LIVE CLASSIFICATION */}
      <section style={{ background: "#ffffff", padding: "120px 0" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 2.5rem",
            textAlign: "center",
          }}
        >
          <h3 className="section-title">Live Waste Classification</h3>

          <p
            className="section-text"
            style={{
              maxWidth: "720px",
              margin: "0 auto 50px",
            }}
          >
            Upload a waste image to trigger the complete AutoSortBin pipeline —
            from deep learning–based classification to real-time bin actuation
            via IoT.
          </p>

          <div
            className="glass"
            style={{
              padding: "3.5rem 3rem",
              borderRadius: "22px",
            }}
          >
            <p
              style={{
                fontWeight: "600",
                marginBottom: "26px",
                color: imageFile ? "#16a34a" : "#64748b",
              }}
            >
              {imageFile
                ? "✓ Image selected and ready for classification"
                : "No image selected"}
            </p>

            <label
              htmlFor="imageUpload"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                marginBottom: "34px",
              }}
            >
              <DustbinIcon />
              <span style={{ fontWeight: "500" }}>Select Waste Image</span>
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <div style={{ marginBottom: "40px" }}>
              <button
                onClick={runPrediction}
                className={`run-btn ${loading ? "loading" : ""}`}
                disabled={!imageFile || loading}
              >
                {loading ? (
                  <span className="btn-spinner" />
                ) : (
                  <>
                    <span>Run Waste Classification</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </div>

            {result && (
              <div style={{ marginTop: "20px" }}>
                <div className="success-check">✓</div>
                <p style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                  {result.predicted_class}
                </p>
                <p style={{ fontSize: "1.2rem", color: "#475569" }}>
                  Confidence: <strong>{result.confidence}%</strong>
                </p>
              </div>
            )}
          </div>
          <h2>Check Wokwi Simulation below.</h2>
        </div>
      </section>

      {/* INSTRUCTIONS */}
      <section style={{ background: "#eaf6ff", padding: "110px 0" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          <h3 className="section-title" style={{ textAlign: "center" }}>
            Instructions for Wokwi
          </h3>

          <ul
            className="section-text"
            style={{
              marginTop: "40px",
              lineHeight: "2",
              fontSize: "1.15rem",
            }}
          >
            <li>Click on green play button to start the Wokwi simulation.</li>
            <li>Wokwi may take a long time to setup and start.</li>
            <li>
              Patiently wait until the Wokwi simulation is active and running.
            </li>
          </ul>
        </div>
      </section>

      {/* WOKWI SIMULATION */}
      <section style={{ background: "#ffffff", padding: "120px 0" }}>
        <div
          className="glass card wokwi-box"
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "0 2.5rem",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)", // ✅ black shadow
          }}
        >
          <h3 className="section-title">Wokwi IoT Simulation</h3>

          <p className="section-text" style={{ marginBottom: "28px" }}>
            The embedded Wokwi simulation below represents the ESP32-based IoT
            circuit responsible for bin actuation, sensor monitoring, and
            communication with ThingSpeak.
          </p>

          <iframe
            title="Wokwi Simulation"
            src="https://wokwi.com/projects/451136710388046849"
            width="100%"
            height="1000"
            style={{
              border: "none",
              borderRadius: "16px",
            }}
          />
        </div>
      </section>

      <style>{`
        /* REMOVE HOVER / GLOW FROM WOKWI BOX ONLY */
        .wokwi-box:hover {
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35) !important;
          transform: none !important;
        }

        .flow-zoom-wrapper {
          overflow: hidden;
          border-radius: 18px;
        }

        .flow-zoom-image {
          width: 100%;
          max-width: 1000px;
          height: auto;
          transition: transform 0.45s ease, box-shadow 0.45s ease;
        }

        .flow-zoom-wrapper:hover .flow-zoom-image {
          transform: scale(1.18);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.25);
        }

        .run-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.6rem;
          font-size: 1.05rem;
          font-weight: 600;
          border-radius: 14px;
          border: none;
          color: white;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          cursor: pointer;
        }

        .run-btn:disabled {
          opacity: 0.55;
          cursor: default;
        }

        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-check {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #22c55e;
          color: white;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
        }
      `}</style>
    </section>
  );
}

function DustbinIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
