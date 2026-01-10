export default function Workflow() {
  return (
    <section className="section">
      {/* CENTERED TITLE */}
      <h3
        className="section-title"
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        System Workflow
      </h3>

      <div
        className="workflow-override"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {/* ROW 1 : 1 → 2 */}
        <Row>
          <Step delay="0s" icon={<CameraIcon />} title="Image Acquisition">
            A camera captures an image of the waste item at the point
            of disposal and forwards it to the classification model.
          </Step>

          <ArrowRight />

          <Step delay="0.3s" icon={<BrainIcon />} title="Waste Classification">
            The DenseNet-121 deep learning model classifies the input
            image into one of six waste categories.
          </Step>
        </Row>

        {/* DOWN ARROW (2 → 3) */}
        <Row>
          <Spacer />
          <Spacer />
          <ArrowDown />
        </Row>

        {/* ROW 2 : 4 ← 3 */}
        <Row>
          <Step delay="0.6s" icon={<ChipIcon />} title="IoT Actuation">
            The ESP32 microcontroller processes the received data
            and actuates the corresponding bin lid using servo motors.
          </Step>

          <ArrowLeft />

          <Step delay="0.9s" icon={<CloudIcon />} title="Cloud Communication">
            The predicted class label is transmitted to the IoT system
            through the ThingSpeak cloud platform.
          </Step>
        </Row>

        {/* DOWN ARROW (4 → 5) */}
        <Row>
          <ArrowDown />
          <Spacer />
          <Spacer />
        </Row>

        {/* ROW 3 : 5 → 6 */}
        <Row>
          <Step delay="1.2s" icon={<SensorIcon />} title="Bin Monitoring">
            Ultrasonic sensors continuously monitor bin fill levels
            to prevent overflow and ensure safety.
          </Step>

          <ArrowRight />

          <Step delay="1.5s" icon={<AlertIcon />} title="Alerts & Feedback">
            When a bin reaches capacity, automated email alerts
            are triggered to notify responsible authorities.
          </Step>
        </Row>
      </div>

      {/* LOCAL OVERRIDES + ANIMATION */}
      <style>
        {`
          @keyframes reveal {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* FORCE light-blue cards */
          .workflow-override .step.glass {
            background: #c8e5f2ff !important;
            backdrop-filter: none !important;
            border: none;
            color: #020617;
          }

          .workflow-override .step h4,
          .workflow-override .step p {
            color: #020617;
          }

          .workflow-override .step svg {
            stroke: #020617;
          }

          .step {
            animation: reveal 0.8s ease-out both;
          }
            /* ================= MOBILE RESPONSIVENESS ================= */
@media (max-width: 768px) {

  /* Stack each Row vertically */
  .workflow-override > div {
    display: flex !important;
    flex-direction: column !important;
    align-items: center;
    text-align: center;
  }

  /* Space items nicely when stacked */
  .workflow-override > div > * {
    margin-bottom: 1.5rem;
  }

  /* Remove empty spacer gaps (keep elements, just no height) */
  .workflow-override > div > div:empty {
    margin: 0;
    padding: 0;
    height: 0;
  }
}

        `}
      </style>
    </section>
  );
}

/* ===============================
   LAYOUT HELPERS
   =============================== */
function Row({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      {children}
    </div>
  );
}

function Spacer() {
  return <div />;
}

/* ===============================
   STEP CARD
   =============================== */
function Step({ icon, title, children, delay }) {
  return (
    <div className="glass card step" style={{ animationDelay: delay }}>
      <h4 className="workflow-title">
        {icon}
        {title}
      </h4>
      <p className="section-text workflow-text">{children}</p>
    </div>
  );
}

/* ===============================
   ARROWS
   =============================== */
function ArrowRight() {
  return <Arrow path="M4 16h56 M48 6l12 10-12 10" />;
}

function ArrowLeft() {
  return <Arrow path="M60 16H4 M16 6L4 16l12 10" />;
}

function ArrowDown() {
  return (
    <svg
      width="30"
      height="60"
      viewBox="0 0 30 60"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ margin: "0 auto" }}
    >
      <path d="M15 4v40" />
      <path d="M6 38l9 14 9-14" />
    </svg>
  );
}

function Arrow({ path }) {
  return (
    <svg
      width="64"
      height="32"
      viewBox="0 0 64 32"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

/* ===============================
   ICONS
   =============================== */
const iconStyle = {
  width: "1.6rem",
  height: "1.6rem",
  marginRight: "0.6rem",
};

function CameraIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <circle cx="12" cy="14" r="4" />
      <path d="M7 7l2-3h6l2 3" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3" />
      <path d="M15 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3" />
      <path d="M9 8h6M9 12h6M9 16h6" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 10a4 4 0 0 0-8-2 4 4 0 0 0-2 8h10a3 3 0 0 0 0-6z" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="7" y="7" width="10" height="10" />
      <path d="M3 9h4M3 15h4M17 9h4M17 15h4M9 3v4M15 3v4M9 17v4M15 17v4" />
    </svg>
  );
}

function SensorIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2" />
      <path d="M2 12c2.5-4 6-6 10-6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10 3h4l6 18H4L10 3z" />
    </svg>
  );
}
