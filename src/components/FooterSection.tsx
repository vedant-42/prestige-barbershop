import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram } from 'lucide-react';

export default function FooterSection() {
    return (
        <footer className="bg-[#111111] text-white border-t-2 border-[#d4af37] relative z-20">
            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

                    {/* Column 1: Branding & Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                        <h2 className="text-3xl font-bold font-serif tracking-wider text-white">
                            PRESTIGE <span className="text-[#d4af37]">BARBERSHOP</span>
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-center md:justify-start gap-3 group">
                                <div className="p-2 rounded-full border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors">
                                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <span className="text-gray-300 font-light tracking-wide">2 Malden St, Everett, 02149</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-3 group">
                                <div className="p-2 rounded-full border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors">
                                    <Phone className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <a href="tel:6172940325" className="text-gray-300 font-light tracking-wide hover:text-[#d4af37] transition-colors">
                                    617-294-0325
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Hours */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <h3 className="text-xl font-bold text-[#d4af37] tracking-[0.2em] uppercase border-b border-[#d4af37]/30 pb-2">
                            Hours
                        </h3>
                        <ul className="space-y-3 text-gray-300 font-light tracking-wide">
                            <li className="flex flex-col">
                                <span className="font-medium text-white">Monday - Sunday</span>
                                <span>9:00 AM - 7:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Booking CTA */}
                    <div className="flex flex-col items-center md:items-end space-y-6">
                        <motion.a
                            href="https://booksy.com/en-us/1309419_prestige-barbershop_barber-shop_22262_everett#ba_s=seo"
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 25px rgba(212, 175, 55, 0.6)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full md:w-auto min-w-[250px] px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-white font-bold text-lg uppercase tracking-widest text-center rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] border border-[#D4AF37]/30 transition-all duration-300"
                        >
                            Book a Cut Now
                        </motion.a>
                        <p className="text-gray-300 text-sm italic max-w-xs text-center md:text-right">
                            Walk-ins welcome, but appointments are highly recommended.
                        </p>
                    </div>
                </div>
            </div>

            {/* Map Integration */}
            <div className="w-full h-[300px] md:h-[400px] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-y border-[#d4af37]/20">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.567364663364!2d-71.05436692346766!3d42.39441693292446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370e2813583bd%3A0x627376092027201!2s2%20Malden%20St%2C%20Everett%2C%20MA%2002149!5e0!3m2!1sen!2sus!4v1716931200000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Prestige Barbershop Location"
                ></iframe>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black border-t border-[#d4af37]/20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col items-center gap-4">
                    <p className="text-gray-300 text-sm font-light tracking-wide text-center">
                        &copy; {new Date().getFullYear()} Prestige Barbershop LLC. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.instagram.com/prestigebarbershop617/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-[#d4af37] transition-colors transform hover:scale-110"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
