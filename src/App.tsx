import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import SmokeOverlay from './components/SmokeOverlay';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioPage from './pages/PortfolioPage';
import TeamSection from './components/TeamSection';
import FooterSection from './components/FooterSection';

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
          element.scrollIntoView({ behavior: 'smooth' });
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
    <Router>
      <InitialHashCleaner />
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
