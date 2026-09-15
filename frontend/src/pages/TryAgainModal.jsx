import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function TryAgainModal({ open, title = 'Try again', message, onClose, onRetry }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-sm bg-white rounded-t-[32px] px-6 pt-5 pb-8 text-center shadow-2xl font-sans"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>

            {/* 3D-Style Exclamation Warning Graphic from Wise/Mobbin */}
            <div className="mx-auto mt-4 mb-5 w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg transform rotate-[-8deg]">
              <span className="text-white text-5xl font-black leading-none">!</span>
            </div>

            <h2 className="text-xl font-black text-gray-900 mb-1.5">{title}</h2>
            {message && (
              <p className="text-xs text-gray-500 mb-6 px-2 leading-relaxed font-medium">{message}</p>
            )}

            <button
              onClick={onRetry || onClose}
              className="w-full py-4 rounded-full bg-[#b8f566] text-black font-extrabold text-sm shadow-md active:scale-[0.98] transition hover:bg-[#a6eb52]"
            >
              Try again
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
