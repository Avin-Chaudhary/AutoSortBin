import { useEffect, useRef, useState } from "react";

export default function PerformanceMetrics() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Trigger animation on scroll into view */
  useEffect(() => {
    // MOBILE FALLBACK (FIXES DISAPPEARING NUMBERS)
    if (window.innerWidth <= 768) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" ref={sectionRef}>
      <h3 className="section-title">Model Performance Metrics</h3>

      <p
        className="section-text"
        style={{
          maxWidth: "840px",
          marginBottom: "90px",
        }}
      >
        The performance of the AutoSortBin framework was evaluated on a
        validation dataset using standard classification metrics.
        The DenseNet-121 model demonstrates consistently high performance
        across all metrics, validating its suitability for real-time
        CPS and IoT-based waste segregation.
      </p>

      {/* METRICS ROW */}
      <div
        className="metrics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "4.5rem",
        }}
      >
        <Metric active={visible} label="Accuracy" value={94.63}
          description="Overall correctness of waste classification across all categories."
        />
        <Metric active={visible} label="Precision" value={95.2}
          description="Measures how many predicted waste labels were correct."
        />
        <Metric active={visible} label="Recall" value={93.7}
          description="Indicates how effectively the model identifies actual waste types."
        />
        <Metric active={visible} label="F1-Score" value={94.44}
          description="Harmonic balance between precision and recall."
        />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .metric {
          opacity: 0;
          transform: translateY(28px);
        }

        .metric.visible {
          animation: fadeInUp 1s ease-out forwards;
        }

        .rail {
          position: relative;
          height: 1px;
          background: rgba(2, 6, 23, 0.3);
          margin: 22px 0 18px;
        }

        .rail::before,
        .rail::after {
          content: "";
          position: absolute;
          top: -4px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #020617;
        }

        .rail::before { left: 0; }
        .rail::after { right: 0; }

        /* ================= MOBILE RESPONSIVENESS ================= */
        @media (max-width: 768px) {
          .metrics-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 3rem !important;
            align-items: center;
            text-align: center;
          }

          .metric p {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ===============================
   METRIC COMPONENT
   =============================== */
function Metric({ label, value, description, active }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 5000;
    const startTime = performance.now();

    function animate(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue((value * eased).toFixed(2));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [active, value]);

  return (
    <div className={`metric ${active ? "visible" : ""}`}>
      <div
        style={{
          fontSize: "3.4rem",
          fontWeight: "700",
          color: "#020617",
          letterSpacing: "-0.025em",
        }}
      >
        {displayValue}%
      </div>

      <div className="rail" />

      <h4
        style={{
          fontSize: "1.3rem",
          fontWeight: "600",
          marginBottom: "12px",
        }}
      >
        {label}
      </h4>

      <p className="section-text" style={{ maxWidth: "260px" }}>
        {description}
      </p>
    </div>
  );
}
