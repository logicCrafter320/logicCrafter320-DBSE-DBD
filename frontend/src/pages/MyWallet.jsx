import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Settings, QrCode, Plus, ArrowDown, MoreHorizontal,
  Download, Wallet, X, MinusCircle
} from 'lucide-react';

export default function MyWallet() {
  const navigate = useNavigate();
  const [showWallets, setShowWallets] = useState(false);
  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem('ef_wallets');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'My Wallet', address: 'UPI · primary', color: 'from-purple-500 to-fuchsia-500', balance: 0 },
      { id: '2', name: 'EMI Reserve', address: 'Bank · ****1280', color: 'from-sky-400 to-blue-600', balance: 0 },
    ];
  });
  const [activeId, setActiveId] = useState(wallets[0]?.id);

  const active = useMemo(
    () => wallets.find((w) => w.id === activeId) || wallets[0],
    [wallets, activeId]
  );

  const persist = (next) => {
    setWallets(next);
    localStorage.setItem('ef_wallets', JSON.stringify(next));
  };

  const createWallet = () => {
    const id = String(Date.now());
    const next = [
      ...wallets,
      {
        id,
        name: `Wallet ${wallets.length}`,
        address: `UPI · ${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        color: 'from-indigo-500 to-violet-600',
        balance: 0,
      },
    ];
    persist(next);
    setActiveId(id);
  };

  const importWallet = () => {
    const label = prompt('Enter UPI ID or Account label (e.g. name@oksbi)');
    if (!label) return;
    const id = String(Date.now());
    const next = [
      ...wallets,
      {
        id,
        name: 'Imported',
        address: label,
        color: 'from-emerald-400 to-teal-600',
        balance: 0,
      },
    ];
    persist(next);
    setActiveId(id);
  };

  const removeWallet = (id) => {
    if (wallets.length <= 1) return alert('Keep at least one wallet');
    const next = wallets.filter((w) => w.id !== id);
    persist(next);
    if (activeId === id) setActiveId(next[0].id);
  };

  return (
    <div className="h-full bg-[#ececef] text-black flex flex-col pt-10 font-sans relative overflow-hidden">
      {/* Top */}
      <div className="flex items-center justify-between px-5 py-2">
        <button onClick={() => navigate('/account')} className="p-1">
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
            <QrCode size={16} />
          </button>
          <button
            onClick={() => navigate('/app-settings')}
            className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Hero wallet */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${active?.color || 'from-purple-500 to-pink-500'} flex items-center justify-center shadow-lg mb-3`}>
          <Wallet className="text-white" size={28} />
        </div>

        <button
          onClick={() => setShowWallets(true)}
          className="flex items-center gap-1 text-lg font-bold"
        >
          {active?.name || 'My Wallet'} <span className="text-gray-400 text-sm">▾</span>
        </button>
        <p className="text-2xl font-semibold text-gray-400 mt-1">
          ₹{Number(active?.balance || 0).toLocaleString('en-IN')}
        </p>
        <p className="text-[11px] text-gray-400 mt-2">Payment method</p>
        <p className="text-xs font-semibold text-gray-600">{active?.address}</p>

        <div className="flex gap-6 mt-5">
          {[
            { icon: Plus, label: 'Pay', action: () => navigate('/emi') },
            { icon: ArrowDown, label: 'Receive', action: () => alert('Share UPI / account to receive token amount') },
            { icon: MoreHorizontal, label: 'More', action: () => setShowWallets(true) },
          ].map((a) => (
            <button key={a.label} onClick={a.action} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <a.icon size={18} className="text-gray-700" />
              </div>
              <span className="text-[10px] font-semibold text-gray-600">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6 mb-3">
        Welcome! Let’s get you started ✨
      </p>

      {/* Promo cards */}
      <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-4">
        <div className="min-w-[200px] rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white relative">
          <button className="absolute top-3 right-3 text-white/70"><X size={14} /></button>
          <p className="font-bold text-sm leading-snug mt-4">Link UPI for<br />token payments</p>
        </div>
        <div className="min-w-[200px] rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 p-4 text-white relative">
          <button className="absolute top-3 right-3 text-white/70"><X size={14} /></button>
          <p className="font-bold text-sm leading-snug mt-4">Pay EMI / booking<br />amount with card</p>
        </div>
      </div>

      {/* Wallets bottom sheet */}
      <AnimatePresence>
        {showWallets && (
          <div className="absolute inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowWallets(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-sm bg-white rounded-t-[28px] p-5 pb-8"
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold">Wallets</h3>
                <button onClick={() => setShowWallets(false)} className="text-sm font-bold text-gray-700">
                  Done
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {wallets.map((w) => (
                  <div
                    key={w.id}
                    className="flex items-center gap-3 py-2"
                  >
                    <button
                      onClick={() => {
                        setActiveId(w.id);
                        setShowWallets(false);
                      }}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${w.color} flex items-center justify-center`}>
                        <Wallet size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{w.name}</p>
                        <p className="text-[11px] text-gray-400">{w.address}</p>
                      </div>
                    </button>
                    <button onClick={() => removeWallet(w.id)} className="text-red-500">
                      <MinusCircle size={22} className="fill-red-500 text-white" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={createWallet}
                className="w-full flex items-center gap-3 py-3.5 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <span className="font-semibold text-sm">Create New Wallet</span>
              </button>

              <button
                onClick={importWallet}
                className="w-full flex items-center gap-3 py-3.5 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Download size={18} />
                </div>
                <span className="font-semibold text-sm">Import Wallet (UPI / Bank)</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
