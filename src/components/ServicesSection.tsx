import { motion } from 'framer-motion';
import { Scissors, PenTool, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        id: 'haircut',
        title: 'Haircut',
        price: '$40',
        icon: Scissors,
        description: 'Precision cut tailored to your style.',
    },
    {
        id: 'haircut-beard',
        title: 'Haircut & Beard',
        price: '$55',
        icon: Sparkles, // Using Sparkles as a placeholder for combo
        description: 'Complete grooming package.',
    },
    {
        id: 'kids-haircut',
        title: 'Kids Haircut',
        price: '$30',
        icon: User,
        description: 'Style for the young ones.',
    },
    {
        id: 'lineup',
        title: 'Lineup',
        price: '$20',
        icon: PenTool, // Placeholder for straight razor
        description: 'Sharp, clean edges.',
    },
    {
        id: 'lineup-beard',
        title: 'Lineup & Beard',
        price: '$35',
        icon: PenTool,
        description: 'Detailed beard sculpting.',
    },
];

export default function ServicesSection() {
    return (
        <section className="relative py-24 px-4 md:px-8 bg-[#111]">
            {/* Decorative Divider */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30" />

            <div className="max-w-7xl mx-auto">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {services.map((service, index) => (
                        <Link key={service.id} to={`/portfolio/${service.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative h-[400px] bg-[#1a1a1a] border border-white/20 hover:border-[#d4af37] transition-colors duration-300 overflow-hidden rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[#d4af37]/20"
                            >
                                {/* Placeholder Image Area */}
                                <div className="h-[65%] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <div className="absolute inset-0 flex items-center justify-center text-[#d4af37]/20 group-hover:text-[#d4af37]/40 transition-colors duration-300">
                                        <service.icon size={64} strokeWidth={1} />
                                    </div>
                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
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
