export default function TechOverview() {
  return (
    <section className="section">
      <h3 className="section-title" style={{ marginBottom: "4rem" }}>
        Technology Overview
      </h3>

      <div className="grid grid-3 tech-override">
        {/* AI & ML */}
        <div className="glass card tech-card">
          <h4 className="tech-title">
            <span className="tech-icon">
              <BrainIcon />
            </span>
            AI & Machine Learning Layer
          </h4>

          <p className="section-text tech-text">
            The waste classification module is implemented using a
            DenseNet-121 transfer learning model trained on six
            waste categories to achieve high accuracy in real-time
            inference scenarios.
          </p>
        </div>

        {/* CPS */}
        <div className="glass card tech-card">
          <h4 className="tech-title">
            <span className="tech-icon">
              <GearIcon />
            </span>
            Cyber Physical System (CPS)
          </h4>

          <p className="section-text tech-text">
            The framework follows a CPS architecture where AI-driven
            decisions directly control physical components such as
            servo motors and sensors, forming a closed feedback loop.
          </p>
        </div>

        {/* CLOUD */}
        <div className="glass card tech-card">
          <h4 className="tech-title">
            <span className="tech-icon">
              <CloudChipIcon />
            </span>
            Cloud, IoT & Simulation
          </h4>

          <p className="section-text tech-text">
            ThingSpeak enables cloud-based communication between
            the AI model and IoT hardware, while Wokwi provides a
            safe simulation environment for ESP32-based validation.
          </p>
        </div>
      </div>

      {/* 🔥 LOCAL VARIABLE OVERRIDE (THIS FIXES IT) */}
      <style>
        {`
          .tech-override .glass {
            --glass-bg: #195792ff;
            --text-main: #ffffff;
            --text-muted: #e5e7eb;
            --glass-border: rgba(255,255,255,0.12);
          }

          .tech-override .tech-title,
          .tech-override .section-text {
            color: #ffffff;
          }

          .tech-override svg {
            stroke: #ffffff;
          }
        `}
      </style>
    </section>
  );
}

const iconStyle = {
  width: "1.6rem",
  height: "1.6rem",
  marginRight: "0.6rem",
};

/* AI / Brain */
function BrainIcon() {
  return (
    <svg
      style={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3" />
      <path d="M15 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3" />
      <path d="M9 8h6M9 12h6M9 16h6" />
    </svg>
  );
}

/* CPS */
function GearIcon() {
  return (
    <svg
      style={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

/* Cloud */
function CloudChipIcon() {
  return (
    <svg
      style={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 10a4 4 0 0 0-8-2 4 4 0 0 0-2 8h6" />
      <rect x="13" y="13" width="7" height="7" />
    </svg>
  );
}
