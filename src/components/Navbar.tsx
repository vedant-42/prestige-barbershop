import { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId: string) => {
        // If not on home page, navigate to home with hash
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
            return;
        }

        // If on home page, scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleHomeClick = () => {
        navigate('/');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#d4af37]/20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="relative flex items-center justify-between h-20">
                    {/* Left: Home Icon */}
                    <div className="flex items-center z-10">
                        <button
                            onClick={handleHomeClick}
                            className="text-[#d4af37] hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
                            aria-label="Home"
                        >
                            <Home className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Center: Brand Name - Absolutely positioned for perfect centering */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-lg md:text-xl font-bold font-serif tracking-wider text-white whitespace-nowrap">
                            PRESTIGE <span className="text-[#d4af37]">BARBERSHOP</span>
                        </h1>
                    </div>

                    {/* Right: Desktop Navigation (hidden on mobile/tablet) */}
                    <div className="hidden lg:flex items-center gap-4 z-10">
                        <button
                            onClick={() => scrollToSection('services')}
                            className="px-3 md:px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors uppercase tracking-wide"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => scrollToSection('team')}
                            className="px-3 md:px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors uppercase tracking-wide"
                        >
                            Team
                        </button>

                        <Link
                            to="/portfolio"
                            className="px-3 md:px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors uppercase tracking-wide"
                        >
                            Portfolio
                        </Link>
                    </div>

                    {/* Hamburger Menu (visible on mobile/tablet) */}
                    <div className="lg:hidden flex items-center z-10">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="text-[#d4af37] hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
                            aria-label="Menu"
                        >
                            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-[#d4af37]/20 bg-black/95 backdrop-blur-md">
                        <div className="py-2">
                            <button
                                onClick={() => {
                                    scrollToSection('services');
                                    setShowMobileMenu(false);
                                }}
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-[#d4af37] hover:bg-white/5 transition-colors uppercase tracking-wide"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection('team');
                                    setShowMobileMenu(false);
                                }}
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-[#d4af37] hover:bg-white/5 transition-colors uppercase tracking-wide"
                            >
                                Team
                            </button>

                            <Link
                                to="/portfolio"
                                onClick={() => setShowMobileMenu(false)}
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-[#d4af37] hover:bg-white/5 transition-colors uppercase tracking-wide"
                            >
                                Portfolio
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav >
    );
}
