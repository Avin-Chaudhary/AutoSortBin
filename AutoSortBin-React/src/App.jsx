import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Implementation from "./pages/Implementation";
import ScrollToTop from "./components/ScrollToTop";
import API_BASE_URL from "./config/api";

export default function App() {
  useEffect(() => {
    fetch(`${API_BASE_URL}/health`).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/implementation" element={<Implementation />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
