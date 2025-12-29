import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import FooterSection from '../components/FooterSection';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

// Flattened source data
const rawImages = [
    // Haircut
    '/portfolio/haircut-1.jpg',
    '/portfolio/haircut-2.jpg',
    '/portfolio/haircut-3.jpg',
    '/portfolio/haircut-4.jpg',
    // Haircut & Beard
    '/portfolio/haircut-beard-1.jpg',
    '/portfolio/haircut-beard-2.jpg',
    '/portfolio/haircut-beard-3.jpg',
    '/portfolio/haircut-beard-4.jpg',
    // Kids
    '/portfolio/kids-haircut-1.jpg',
    '/portfolio/kids-haircut-2.jpg',
    '/portfolio/kids-haircut-3.jpg',
    '/portfolio/kids-haircut-4.jpg',
    // Lineup
    '/portfolio/lineup-1.jpg',
    '/portfolio/lineup-2.jpg',
    '/portfolio/lineup-3.jpg',
    '/portfolio/lineup-4.jpg',
    // Lineup & Beard
    '/portfolio/lineup-beard-1.jpg',
    '/portfolio/lineup-beard-2.jpg',
    '/portfolio/lineup-beard-3.jpg',
    '/portfolio/lineup-beard-4.jpg',
    // New Additions
    '/portfolio/new-1.png',
    '/portfolio/new-2.jpg',
    '/portfolio/new-3.jpg',
    '/portfolio/new-4.jpg',
    '/portfolio/new-5.jpg',
];

export default function PortfolioPage() {
    const { t } = useLanguage();
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);

    useEffect(() => {
        // Randomize images on mount
        const shuffled = [...rawImages]
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        setShuffledImages(shuffled);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-black text-white"
        >
            <SEO
                title="Portfolio - Prestige Barbershop"
                description="View our gallery of haircuts, including fades, lineups,beard trims, and designs performed by the team at Prestige Barbershop in Everett, MA."
                keywords="haircut portfolio, fades gallery, beard styles, best barber photos Everett"
            />
            {/* Hero Banner */}
            <div className="relative h-[50vh] w-full overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[#1a1a1a]">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-12 px-4">
                    <div className="flex flex-col items-center w-fit max-w-full">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 prestige-title tracking-widest text-center">
                            {t('portfolio.title')}
                        </h1>
                        <div className="w-full h-1 bg-[#d4af37] rounded-full" />
                    </div>

                    <a
                        href="https://booksy.com/en-us/1309419_prestige-barbershop_barber-shop_22262_everett#ba_s=seo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-white font-bold text-xl uppercase tracking-widest hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] border border-[#D4AF37]/30"
                    >
                        <Calendar size={24} />
                        {t('portfolio.bookBtn')}
                    </a>
                </div>

                <Link
                    to="/#services"
                    className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-[#d4af37] transition-colors duration-300 z-10"
                >
                    <ArrowLeft size={20} />
                    <span className="uppercase tracking-widest text-sm font-bold">{t('portfolio.backToServices')}</span>
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 pb-24">
                {/* Unified Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {shuffledImages.length > 0 ? (
                        shuffledImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                                className="aspect-[4/5] bg-[#1a1a1a] rounded-sm relative group overflow-hidden"
                            >
                                <img
                                    src={image}
                                    alt={`Fade haircut by Prestige Barbershop Everett - style ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </motion.div>
                        ))
                    ) : (
                        // Loading state or fallback
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-[#1a1a1a] animate-pulse rounded-sm" />
                        ))
                    )}
                </div>
            </div>

            <FooterSection />
        </motion.div>
    );
}
