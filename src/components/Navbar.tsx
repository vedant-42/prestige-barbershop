import { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const services = [
    { id: 'haircut', title: 'Haircut' },
    { id: 'haircut-beard', title: 'Haircut & Beard' },
    { id: 'lineup', title: 'Lineup' },
    { id: 'lineup-beard', title: 'Lineup & Beard' },
    { id: 'kids-haircut', title: 'Kids Haircut' },
];

export default function Navbar() {
    const [showPortfolioDropdown, setShowPortfolioDropdown] = useState(false);
    const navigate = useNavigate();

    const scrollToSection = (sectionId: string) => {
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
                <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 gap-4">
                    {/* Left: Home Icon */}
                    <div className="flex justify-start">
                        <button
                            onClick={handleHomeClick}
                            className="text-[#d4af37] hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
                            aria-label="Home"
                        >
                            <Home className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Center: Brand Name */}
                    <div className="flex justify-center">
                        <h1 className="text-lg md:text-xl font-bold font-serif tracking-wider text-white">
                            PRESTIGE <span className="text-[#d4af37]">BARBERSHOP</span>
                        </h1>
                    </div>

                    {/* Right: Navigation Buttons */}
                    <div className="flex items-center justify-end gap-2 md:gap-4">
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

                        {/* Portfolio Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowPortfolioDropdown(!showPortfolioDropdown)}
                                className="flex items-center gap-1 px-3 md:px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors uppercase tracking-wide"
                            >
                                Portfolio
                                <ChevronDown className={`w-4 h-4 transition-transform ${showPortfolioDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showPortfolioDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-md border border-[#d4af37]/20 rounded shadow-lg">
                                    {services.map((service) => (
                                        <Link
                                            key={service.id}
                                            to={`/portfolio/${service.id}`}
                                            onClick={() => setShowPortfolioDropdown(false)}
                                            className="block px-4 py-3 text-sm text-gray-300 hover:text-[#d4af37] hover:bg-white/5 transition-colors border-b border-[#d4af37]/10 last:border-b-0"
                                        >
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
