import { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import SmokeOverlay from './components/SmokeOverlay';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioPage from './pages/PortfolioPage';
import TeamSection from './components/TeamSection';
import FooterSection from './components/FooterSection';
import Navbar from './components/Navbar';
import SEO from './components/SEO';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Component to clean hash on initial load to ensure we start at Hero
function InitialHashCleaner() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      navigate(location.pathname, { replace: true });
    }
  }, []); // Run only once on mount

  return null;
}

function HomePage({ contentReady }: { contentReady: boolean }) {
  const { hash } = useLocation();

  useEffect(() => {
    if (contentReady && hash) {
      // Small timeout to ensure DOM is fully painted
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [contentReady, hash]);

  return (
    <>
      {contentReady && (
        <main className="smooth-scroll">
          <HeroSection />
          <ServicesSection />
          <TeamSection />
          <FooterSection />
        </main>
      )}
    </>
  );
}

function App() {
  // Only show smoke animation if we are at the root path
  const isRoot = window.location.pathname === '/';

  const [showSmoke, setShowSmoke] = useState(isRoot);
  const [contentReady, setContentReady] = useState(!isRoot);

  const handleSmokeComplete = () => {
    setShowSmoke(false);
    setContentReady(true);
  };

  return (
    <LanguageProvider>
      <Router>
        <SEO
          title="Home - Prestige Barbershop"
          description="Prestige Barbershop in Everett, MA offers fades, lineups, beard trims, and more. Book an appointment today."
          keywords="barbershop Everett, best barbershop MA, mens haircuts, fades, beard trim, Prestige Barbershop"
          canonical="https://prestigebarbershopllc.com/"
        />
        <InitialHashCleaner />
        <ScrollToTop />
        <Navbar />
        <div className="bg-black min-h-screen pt-20">
          {showSmoke && <SmokeOverlay onComplete={handleSmokeComplete} />}

          <Routes>
            <Route path="/" element={<HomePage contentReady={contentReady} />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
      <Analytics />
    </LanguageProvider>
  );
}

export default App;
