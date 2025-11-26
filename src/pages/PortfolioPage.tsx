import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';

const portfolioData: Record<string, { title: string; description: string }> = {
    'haircut': {
        title: 'Haircut',
        description: 'Experience a precision cut tailored to your unique style and face shape. Our master barbers use a combination of classic techniques and modern trends to deliver the perfect look.',
    },
    'haircut-beard': {
        title: 'Haircut & Beard',
        description: 'The ultimate grooming package. Get a sharp haircut paired with a meticulously sculpted beard trim, finished with a hot towel treatment.',
    },
    'kids-haircut': {
        title: 'Kids Haircut',
        description: 'Patient and professional service for the young gentlemen. We ensure a comfortable experience and a stylish cut for kids 12 and under.',
    },
    'lineup': {
        title: 'Lineup',
        description: 'Keep it fresh between cuts. We clean up the edges, hairline, and neck for a sharp, crisp appearance.',
    },
    'lineup-beard': {
        title: 'Line Up & Beard',
        description: 'Focusing on the details. A precise lineup for your hair combined with expert beard grooming.',
    },
};

export default function PortfolioPage() {
    const { id } = useParams();
    const service = portfolioData[id || ''] || { title: 'Service Not Found', description: '' };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-black text-white"
        >
            {/* Hero Banner */}
            <div className="relative h-[40vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#1a1a1a]">
                    {/* Placeholder for Hero Image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 prestige-title tracking-widest text-center">
                        {service.title.toUpperCase()}
                    </h1>
                    <div className="w-24 h-1 bg-[#d4af37] rounded-full" />
                </div>

                <Link
                    to="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-[#d4af37] transition-colors duration-300 z-10"
                >
                    <ArrowLeft size={20} />
                    <span className="uppercase tracking-widest text-sm font-bold">Back to Services</span>
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Description & Booking */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#d4af37] mb-4 font-serif">About This Service</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {service.description}
                            </p>
                        </div>

                        <a
                            href="https://booksy.com/en-us/144068_deefades_barber-shop_22262_everett#ba_s=sh_1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-sm w-full justify-center"
                        >
                            <Calendar size={20} />
                            Book This Service
                        </a>
                    </div>

                    {/* Gallery Grid */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-6 font-serif border-b border-white/10 pb-4">
                            Portfolio Gallery
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Placeholders for Gallery Images */}
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="aspect-[4/5] bg-[#1a1a1a] rounded-sm relative group overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-white/10 text-4xl font-serif">
                                        {item}
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
