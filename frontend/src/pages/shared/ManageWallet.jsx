import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import api from '../../services/api';

export default function ManageWallet() {
  return (
    <div className="p-6 pt-14 pb-24">
      <h1 className="text-2xl font-black">Manage Wallet</h1>
      <p className="text-xs text-gray-500 mt-0.5">Your payment balance & history</p>

      <div className="mt-6 p-6 rounded-3xl bg-black dark:bg-white text-white dark:text-black shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold opacity-70">Total Balance</span>
          <Wallet size={20} />
        </div>
        <div className="text-3xl font-black mt-3">₹ 0.00</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="py-3 px-4 rounded-2xl bg-gray-100 dark:bg-neutral-900 font-bold text-xs flex items-center justify-center gap-1.5">
          <ArrowDownLeft size={16} /> Add Funds
        </button>
        <button className="py-3 px-4 rounded-2xl bg-gray-100 dark:bg-neutral-900 font-bold text-xs flex items-center justify-center gap-1.5">
          <ArrowUpRight size={16} /> Withdraw
        </button>
      </div>
    </div>
  );
}
