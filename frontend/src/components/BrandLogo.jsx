import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles } from 'lucide-react';

export default function BrandLogo() {
  return (
    <div className="relative flex justify-center items-center py-6 my-2 select-none">
      
      {/* Ambient Neon Backlight Glow */}
      <div className="absolute w-44 h-20 bg-gradient-to-r from-indigo-500/20 via-amber-500/20 to-rose-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Interactive Floating Badge Group */}
      <motion.div 
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative flex items-center justify-center"
      >
        {/* White Back Card: "ESTATE" */}
        <motion.div 
          animate={{ rotate: [-3, -5, -3], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="bg-white border-[2.5px] border-black rounded-2xl px-5 py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5 z-10"
        >
          <div className="w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center shadow-inner">
            <Building2 size={16} strokeWidth={2.5} />
          </div>
          <span className="font-black text-2xl tracking-tight text-black font-sans">
            ESTATE
          </span>
        </motion.div>

        {/* Overlapping Front Pill Badge: "FIND" */}
        <motion.div 
          animate={{ rotate: [5, 7, 5], y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }}
          className="absolute right-[-28px] bottom-[-16px] bg-black text-white border-2 border-white rounded-xl px-4 py-1.5 shadow-[4px_4px_16px_rgba(0,0,0,0.35)] z-20 flex items-center gap-1.5"
        >
          <Sparkles size={13} className="text-amber-400 fill-amber-400 animate-pulse" />
          <span className="font-black text-base tracking-widest text-white uppercase">
            FIND
          </span>
        </motion.div>
      </motion.div>

    </div>
  );
}