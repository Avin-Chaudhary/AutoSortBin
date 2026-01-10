import { Link } from "react-router-dom";
import img1 from "../../assets/1.jpeg";

export default function Hero() {
  return (
    <section
      className="hero"
      style={{
        paddingTop: "18vh",
        paddingBottom: "12vh",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        {/* LEFT: TEXT */}
        <div className="hero-text">
          <h2
            style={{
              fontSize: "3.4rem",
              lineHeight: "1.15",
              marginBottom: "2rem",
            }}
          >
            AutoSortBin
            <br />
            Intelligent Waste Segregation
          </h2>

          <p
            style={{
              fontSize: "1.35rem",
              lineHeight: "1.8",
              maxWidth: "600px",
            }}
          >
            AutoSortBin is an AI-driven Cyber Physical System (CPS)
            that automates waste segregation using deep learning
            and IoT integration. The framework classifies waste into
            six categories using a DenseNet-121 model and actuates
            the corresponding bin lid in real time, enabling
            efficient and sustainable waste management.
          </p>

          {/* CTA BUTTONS */}
          <div
            className="hero-buttons"
            style={{
              marginTop: "3rem",
            }}
          >
            <Link to="/implementation" className="btn btn-dark">
              See How it Works!
            </Link>

            <Link to="/research" className="btn btn-light">
              Research Paper
            </Link>
          </div>
        </div>

       {/* RIGHT: IMAGE */}
<div
  className="hero-image"
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
  <img
    src={img1}
    alt="AutoSortBin System Illustration"
    style={{
      width: "120%",
      maxWidth: "550px",
      borderRadius: "14px",
      boxShadow: "0 35px 70px rgba(0, 0, 0, 0.35)",
    }}
  />
</div>

      </div>
    </section>
  );
}
