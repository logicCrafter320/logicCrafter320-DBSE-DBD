import React from 'react';
import { motion } from 'framer-motion';

export default function EstateLoader({ text = 'Querying Database...' }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center select-none font-sans">
      <div className="bg-black dark:bg-neutral-900 border border-neutral-800 p-6 rounded-[28px] shadow-2xl flex flex-col items-center justify-center gap-3">
        {/* Pure White Pill Badge */}
        <div className="bg-white text-black px-5 py-2.5 rounded-[18px] font-black text-base tracking-tighter shadow-md">
          ESTATEFIND
        </div>

        {/* 3 Bouncing White Dots */}
        <div className="flex items-center gap-2 pt-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: index * 0.18,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-white"
            />
          ))}
        </div>
      </div>

      <p className="text-[11px] font-extrabold text-slate-400 dark:text-neutral-500 mt-3 uppercase tracking-wider">
        {text}
      </p>
    </div>
  );
}