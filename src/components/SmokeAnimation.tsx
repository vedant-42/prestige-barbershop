import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SmokeAnimationProps {
  onComplete: () => void;
}

export default function SmokeAnimation({ onComplete }: SmokeAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <div className="absolute inset-0 overflow-hidden bg-black">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute smoke-particle"
            style={{
              left: `${(i * 12.5)}%`,
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, rgba(200, 200, 200, ${0.8 - i * 0.1}) 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
            initial={{
              y: '100vh',
              x: 0,
              scale: 0.5,
              opacity: 0
            }}
            animate={{
              y: ['-20vh', '-100vh'],
              x: [0, Math.sin(i) * 100, Math.cos(i) * 50, 0],
              scale: [0.5, 1.5, 2, 1.8],
              opacity: [0, 0.8, 0.6, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.15,
              ease: 'easeOut',
            }}
          />
        ))}

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`smoke-${i}`}
            className="absolute"
            style={{
              left: `${10 + (i * 15)}%`,
              top: '50%',
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, rgba(180, 180, 180, ${0.6 - i * 0.08}) 0%, transparent 60%)`,
              filter: 'blur(60px)',
            }}
            initial={{
              scale: 0.3,
              opacity: 0,
              y: 0
            }}
            animate={{
              scale: [0.3, 2, 2.5],
              opacity: [0, 0.7, 0],
              y: [0, -200, -400],
              x: [0, Math.cos(i * 1.5) * 150],
            }}
            transition={{
              duration: 3.5,
              delay: i * 0.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
