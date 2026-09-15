import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashOverlay({ onComplete, duration = 2200 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="absolute inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center select-none font-sans"
    >
      {/* Black & White ESTATEFIND Pill Badge + Bouncing Dots */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col items-center justify-center gap-4"
      >
        {/* Pure White Badge with Solid Black Typography */}
        <div className="bg-white text-black px-6 py-3.5 rounded-[22px] font-black text-2xl tracking-tighter shadow-2xl flex items-center justify-center">
          <span>ESTATEFIND</span>
        </div>

        {/* 3 Bouncing White Dots */}
        <div className="flex items-center gap-2 pt-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: index * 0.18,
                ease: 'easeInOut',
              }}
              className="w-2.5 h-2.5 rounded-full bg-white shadow-sm"
            />
          ))}
        </div>
      </motion.div>

      {/* iOS Home Indicator Line */}
      <div className="absolute bottom-3 w-32 h-1 bg-white/40 rounded-full" />
    </motion.div>
  );
}