import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/image.png)',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider prestige-title">
            PRESTIGE
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }}
            className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-4 md:my-6"
          />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest prestige-subtitle">
            BARBERSHOP
          </h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
