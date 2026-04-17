import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Clans from "./pages/Clans";
import Alliances from "./pages/Alliances";
import Systems from "./pages/Systems";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clans" element={<Clans />} />
          <Route path="/alliances" element={<Alliances />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
