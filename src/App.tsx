import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmokeOverlay from './components/SmokeOverlay';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioPage from './pages/PortfolioPage';
import { AboutSection, ContactSection, BookingSection } from './components/PlaceholderSections';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage({ contentReady }: { contentReady: boolean }) {
  return (
    <>
      {contentReady && (
        <main className="smooth-scroll">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
          <BookingSection />
        </main>
      )}
    </>
  );
}

function App() {
  const [showSmoke, setShowSmoke] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // Smoke animation logic - runs once on mount
  useEffect(() => {
    setShowSmoke(true);
    setContentReady(false);
  }, []);

  const handleSmokeComplete = () => {
    setShowSmoke(false);
    setContentReady(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-black min-h-screen">
        {showSmoke && <SmokeOverlay onComplete={handleSmokeComplete} />}

        <Routes>
          <Route path="/" element={<HomePage contentReady={contentReady} />} />
          <Route path="/portfolio/:id" element={<PortfolioPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
