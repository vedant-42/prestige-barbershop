import { useState, useEffect } from 'react';
import SmokeOverlay from './components/SmokeOverlay';
import HeroSection from './components/HeroSection';
import { ServicesSection, AboutSection, ContactSection, BookingSection } from './components/PlaceholderSections';

function App() {
  const [showSmoke, setShowSmoke] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('prestigeAnimationSeen');
    if (hasSeenAnimation) {
      setShowSmoke(false);
      setContentReady(true);
    }
  }, []);

  const handleSmokeComplete = () => {
    setShowSmoke(false);
    setContentReady(true);
    sessionStorage.setItem('prestigeAnimationSeen', 'true');
  };

  return (
    <div className="bg-black">
      {showSmoke && <SmokeOverlay onComplete={handleSmokeComplete} />}

      {contentReady && (
        <main className="smooth-scroll">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
          <BookingSection />
        </main>
      )}
    </div>
  );
}

export default App;
