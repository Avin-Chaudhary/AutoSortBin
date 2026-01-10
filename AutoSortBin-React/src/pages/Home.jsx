import Hero from "../components/home/Hero";
import ProblemSolution from "../components/home/ProblemSolution";
import TechOverview from "../components/home/TechOverview";
import Workflow from "../components/home/Workflow";
import PerformanceMetrics from "../components/home/PerformanceMetrics";

export default function Home() {
  return (
    <main className="home-container">
      <section className="home-section">
        <Hero />
      </section>

      <section className="home-section">
        <ProblemSolution />
      </section>

      <section className="home-section">
        <TechOverview />
      </section>

      <section className="home-section">
        <Workflow />
      </section>

      <section className="home-section">
        <PerformanceMetrics />
      </section>
    </main>
  );
}
