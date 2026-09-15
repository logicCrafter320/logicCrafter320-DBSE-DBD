import React, { useState } from 'react';

export default function EmiCalc() {
  const [amount, setAmount] = useState(5000000); // Default 50 Lakhs
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // EMI Formula (100% Accurate)
  const calculateEmi = () => {
    const p = Number(amount);
    const r = Number(rate) / 12 / 100;
    const n = Number(tenure) * 12;
    if (!p || !r || !n) return 0;
    return Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const emi = calculateEmi();
  const totalMonths = tenure * 12;
  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - amount);

  // Format Lakhs & Crores
  const formatAmount = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  return (
    <div className="p-5 space-y-5 pb-28 font-sans bg-white dark:bg-neutral-950 min-h-screen text-slate-900 dark:text-slate-100">
      <div className="pt-2">
        <h2 className="text-xl font-black">EMI Calculator</h2>
        <p className="text-xs font-semibold text-slate-400">Monthly loan installment & interest estimator</p>
      </div>

      {/* Main EMI Card */}
      <div className="bg-gradient-to-br from-slate-900 to-neutral-800 dark:from-neutral-900 dark:to-neutral-950 p-6 rounded-[32px] text-white text-center shadow-xl border border-neutral-800">
        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Monthly EMI</span>
        <h1 className="text-3xl font-black mt-1 text-white">₹{emi.toLocaleString('en-IN')}</h1>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-neutral-800/80">
          <div className="text-left">
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Principal Loan</span>
            <p className="text-xs font-black text-white">₹{Number(amount).toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Total Interest</span>
            <p className="text-xs font-black text-emerald-400">₹{totalInterest.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Sliders Box */}
      <div className="bg-slate-50 dark:bg-neutral-900 p-5 rounded-[28px] border border-slate-200/60 dark:border-neutral-800 space-y-5">
        
        {/* Amount Slider */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600 dark:text-neutral-400">Loan Amount</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{formatAmount(amount)}</span>
          </div>
          <input 
            type="range" min="500000" max="20000000" step="100000" 
            value={amount} onChange={(e) => setAmount(Number(e.target.value))} 
            className="w-full accent-black dark:accent-white cursor-pointer" 
          />
        </div>

        {/* Interest Rate Slider */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600 dark:text-neutral-400">Interest Rate (P.A)</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{rate}%</span>
          </div>
          <input 
            type="range" min="5" max="15" step="0.1" 
            value={rate} onChange={(e) => setRate(Number(e.target.value))} 
            className="w-full accent-black dark:accent-white cursor-pointer" 
          />
        </div>

        {/* Tenure Slider */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-600 dark:text-neutral-400">Tenure</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{tenure} Years</span>
          </div>
          <input 
            type="range" min="1" max="30" 
            value={tenure} onChange={(e) => setTenure(Number(e.target.value))} 
            className="w-full accent-black dark:accent-white cursor-pointer" 
          />
        </div>

      </div>
    </div>
  );
}