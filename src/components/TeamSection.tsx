import { motion } from 'framer-motion';
import { User, Scissors } from 'lucide-react';
import { useEffect, useRef, useMemo } from 'react';

// Custom Icons
const StraightRazor = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 20l-7-13-2 1 6 13z" /> {/* Handle */}
        <path d="M13 8L3 3l2-1 9 5" /> {/* Blade */}
    </svg>
);

const ElectricTrimmer = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="7" y="9" width="10" height="13" rx="2" />
        <path d="M7 9V5h10v4" />
        <path d="M9 5V3" />
        <path d="M12 5V3" />
        <path d="M15 5V3" />
    </svg>
);

const icons = [Scissors, StraightRazor, ElectricTrimmer];

function TeamBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate static random data for icons to avoid re-renders
    const iconData = useMemo(() => {
        const columns = 6;
        const rows = 4;
        const cellWidth = 100 / columns;
        const cellHeight = 100 / rows;
        const items = [];

        for (let i = 0; i < columns * rows; i++) {
            const col = i % columns;
            const row = Math.floor(i / columns);

            // Randomly select an icon for better variation
            const Icon = icons[Math.floor(Math.random() * icons.length)];

            // Random offset within the cell (keeping 10% padding from edges)
            const offsetX = Math.random() * (cellWidth * 0.6) + (cellWidth * 0.2);
            const offsetY = Math.random() * (cellHeight * 0.6) + (cellHeight * 0.2);

            items.push({
                id: i,
                Icon,
                top: (row * cellHeight) + offsetY,
                left: (col * cellWidth) + offsetX,
                size: 32 + Math.random() * 24, // 32px - 56px
                speed: 0.2 + Math.random() * 0.8,
                direction: Math.random() > 0.5 ? 1 : -1,
                rotation: Math.random() * 360,
            });
        }
        return items;
    }, []);

    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            if (containerRef.current) {
                // Update CSS variable for scroll position
                containerRef.current.style.setProperty('--scrollY', `${window.scrollY}`);
            }
            rafId = requestAnimationFrame(handleScroll);
        };

        // Start loop
        rafId = requestAnimationFrame(handleScroll);

        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            style={{ '--scrollY': '0' } as React.CSSProperties}
        >
            {iconData.map((item, index) => (
                <div
                    key={item.id}
                    // Using text-gray-400 for slightly darker visibility
                    // Hidden on mobile for every other item to reduce clutter
                    className={`absolute text-gray-400 will-change-transform ${index % 2 !== 0 ? 'hidden md:block' : ''}`}
                    style={{
                        top: `${item.top}%`,
                        left: `${item.left}%`,
                        width: item.size,
                        height: item.size,
                        // Rotation logic: Initial rotation + (ScrollY * Speed * Direction)
                        transform: `rotate(calc(${item.rotation}deg + (var(--scrollY) * ${item.speed} * ${item.direction} * 0.5deg)))`,
                    } as React.CSSProperties}
                >
                    <item.Icon className="w-full h-full" />
                </div>
            ))}
        </div>
    );
}

const team = [
    {
        id: 'deefades',
        name: 'DeeFades',
        role: 'Master Barber',
        image: '/team/deefades.png',
        bookingUrl: 'https://booksy.com/en-us/144068_deefades_barber-shop_22262_everett#ba_s=sh_1'
    },
    {
        id: 'rafa',
        name: 'Rafa',
        role: 'Master Barber',
        image: null, // Placeholder
        bookingUrl: 'https://booksy.com/en-us/1185083_rafa-the-barber_barber-shop_22262_everett'
    },
    {
        id: 'clos',
        name: 'C-Los',
        role: 'Master Barber',
        image: '/team/clos.png',
        bookingUrl: 'https://booksy.com/en-us/537133_c-los-da-barber_barber-shop_22262_everett'
    }
];

export default function TeamSection() {
    return (
        <section id="team" className="relative py-24 px-4 md:px-8 bg-white text-black overflow-hidden scroll-mt-20">
            <TeamBackground />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 prestige-title tracking-widest">
                        THE BARBERS
                    </h2>
                    <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Image Container */}
                            <div className="relative w-[250px] h-[250px] mb-8 rounded-full border-[3px] border-[#d4af37] overflow-hidden shadow-xl">
                                {member.image ? (
                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                ) : (
                                    <motion.div
                                        className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <User size={100} strokeWidth={1} />
                                    </motion.div>
                                )}
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2 font-serif">
                                {member.name}
                            </h3>
                            <p className="text-[#d4af37] font-medium tracking-widest text-sm uppercase mb-6">
                                {member.role}
                            </p>

                            {/* Booking Button */}
                            <motion.a
                                href={member.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 25px rgba(245, 158, 11, 0.6)",
                                    transition: { duration: 0.1 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-amber-400/30"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                View Portfolio
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
