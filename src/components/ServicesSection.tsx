import { motion, useScroll, useTransform } from 'framer-motion';
import { Scissors, PenTool, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const services = [
    {
        id: 'haircut',
        title: 'Haircut',
        price: '$40',
        icon: Scissors,
        description: 'Precision cut tailored to your style.',
        image: '/services/haircut.jpg'
    },
    {
        id: 'haircut-beard',
        title: 'Haircut & Beard',
        price: '$50',
        icon: Sparkles, // Using Sparkles as a placeholder for combo
        description: 'Complete grooming package.',
        image: '/services/haircut-beard.jpg'
    },
    {
        id: 'kids-haircut',
        title: 'Kids Haircut',
        price: '$30',
        icon: User,
        description: 'Style for the young ones.',
        image: '/services/kids-haircut.jpg'
    },
    {
        id: 'lineup',
        title: 'Lineup',
        price: '$20',
        icon: PenTool, // Placeholder for straight razor
        description: 'Sharp, clean edges.',
        image: '/services/lineup.jpg'
    },
    {
        id: 'lineup-beard',
        title: 'Lineup & Beard',
        price: '$30',
        icon: PenTool,
        description: 'Detailed beard sculpting.',
        image: '/services/lineup-beard.jpg'
    },
];

function HexagonPattern() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <motion.div
            style={{ y }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
            <svg className="w-full h-[120%] opacity-5 md:opacity-7" width="100%" height="100%">
                <defs>
                    <pattern id="hexagons" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(1) rotate(0)">
                        {/* Responsive scaling via CSS/JS is tricky in patternTransform, so we use a fixed base and scale the container or use media queries to swap patterns if needed. 
                            However, user asked for 60px mobile -> 100px desktop. 
                            We can use a viewBox or just let the pattern repeat. 
                            To achieve responsive sizing, we can use a mask or just simple CSS scaling on the SVG, but that scales stroke too.
                            Better approach: Define the path for a single hexagon tile.
                        */}
                        <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
                        {/* We need a seamless tile. A single hex doesn't tile rectangularly easily without offset.
                            Standard hex grid tile:
                            Width: sqrt(3) * size
                            Height: 2 * size (or 1.5 * size for spacing)
                        */}
                    </pattern>
                    {/* Let's use a simpler path that tiles perfectly. 
                        A common technique for hex grids in SVG patterns:
                    */}
                    <pattern id="hex-grid" width="100" height="174" patternUnits="userSpaceOnUse" patternTransform="scale(0.6)">
                        <path d="M50 0 L100 29 L100 87 L50 116 L0 87 L0 29 Z" fill="none" stroke="#d4af37" strokeWidth="2" />
                        <path d="M50 116 L50 174" fill="none" stroke="#d4af37" strokeWidth="2" />
                        <path d="M0 87 L-50 116" fill="none" stroke="#d4af37" strokeWidth="2" />
                        <path d="M100 87 L150 116" fill="none" stroke="#d4af37" strokeWidth="2" />
                    </pattern>
                </defs>
                {/* We will use a rect to fill, and use media queries to change the scale if possible, 
                    or just use a responsive scale in the patternTransform if we make it a state.
                    For simplicity and performance, let's use a fixed scale that looks good, or two patterns.
                */}
                <rect width="100%" height="100%" fill="url(#hex-grid)" />
            </svg>
        </motion.div>
    );
}

// Improved Responsive Hexagon Pattern
function ResponsiveHexagonPattern() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

    return (
        <div ref={ref} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y }} className="w-full h-[140%]">
                <svg className="w-full h-full opacity-15 md:opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* Mobile Pattern (60px width approx) */}
                        <pattern id="hex-mobile" width="52" height="90" patternUnits="userSpaceOnUse">
                            <path d="M26 0 L52 15 L52 45 L26 60 L0 45 L0 15 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
                            <path d="M26 60 L26 90" fill="none" stroke="#d4af37" strokeWidth="1" />
                            <path d="M52 45 L78 60" fill="none" stroke="#d4af37" strokeWidth="1" />
                            <path d="M0 45 L-26 60" fill="none" stroke="#d4af37" strokeWidth="1" />
                        </pattern>

                        {/* Desktop Pattern (100px width approx) */}
                        <pattern id="hex-desktop" width="86" height="150" patternUnits="userSpaceOnUse">
                            <path d="M43 0 L86 25 L86 75 L43 100 L0 75 L0 25 Z" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                            <path d="M43 100 L43 150" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                            <path d="M86 75 L129 100" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                            <path d="M0 75 L-43 100" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                        </pattern>
                    </defs>

                    {/* Use CSS to switch patterns based on screen size */}
                    <rect width="100%" height="100%" className="fill-[url(#hex-mobile)] md:fill-[url(#hex-desktop)]" />
                </svg>
            </motion.div>
        </div>
    );
}

export default function ServicesSection() {
    return (
        <section id="services" className="relative py-24 px-4 md:px-8 bg-[#0a0a0a] overflow-hidden scroll-mt-20">
            <ResponsiveHexagonPattern />

            {/* Decorative Divider */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30 z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 prestige-title tracking-widest">
                        OUR SERVICES
                    </h2>
                    <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6">
                    {services.map((service, index) => (
                        <Link
                            key={service.id}
                            to={`/portfolio/${service.id}`}
                            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(20%-20px)]"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative h-[550px] sm:h-[400px] bg-[#1a1a1a] border border-white/20 hover:border-[#d4af37] transition-colors duration-300 overflow-hidden rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[#d4af37]/20"
                            >
                                {/* Image Area */}
                                <div className="h-[75%] sm:h-[65%] relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    {/* Dark Overlay for text contrast if needed, or just style */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-transparent pt-12">
                                    <h3 className="text-xl font-bold text-white mb-1 font-serif tracking-wide">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#d4af37] font-bold text-lg mb-4">{service.price}</p>

                                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <span className="text-xs font-bold text-white uppercase tracking-[0.2em] border-b border-[#d4af37] pb-1">
                                            View Portfolio
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
