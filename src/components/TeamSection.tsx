import { motion } from 'framer-motion';
import { User } from 'lucide-react';

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
        <section className="relative py-24 px-4 md:px-8 bg-white text-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
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
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 25px rgba(245, 158, 11, 0.6)",
                                    transition: { duration: 0.1 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-amber-400/30"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Book a Cut
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
