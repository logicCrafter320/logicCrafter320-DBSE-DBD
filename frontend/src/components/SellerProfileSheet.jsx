import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Heart, Ban, Palette, User, Building2, MoreHorizontal } from 'lucide-react';

export default function SellerProfileSheet({ open, onClose, seller }) {
  const [showOptions, setShowOptions] = useState(false);
  const [muted, setMuted] = useState(false);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={() => { setShowOptions(false); onClose?.(); }}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="relative w-full max-w-sm bg-[#e9e9eb] rounded-t-[28px] pt-3 pb-8 px-5 font-sans"
          >
            <div className="flex justify-between items-center mb-4">
              <button onClick={onClose} className="p-1 text-gray-600">✕</button>
              <button onClick={() => setShowOptions(true)} className="p-2 text-gray-600"><MoreHorizontal size={20} /></button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center mb-2">
                <Building2 className="text-slate-600" size={28} />
              </div>
              <h2 className="text-base font-bold text-gray-900">{seller?.name || 'Property Owner'}</h2>
              <p className="text-xs text-gray-500">{seller?.email || 'seller@estatefind.app'}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}