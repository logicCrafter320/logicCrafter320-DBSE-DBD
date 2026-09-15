import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, MessageSquare, MapPin, Calculator } from 'lucide-react';

export default function HowItWorks() {
  const navigate = useNavigate();

  const handleGotIt = () => {
    // Navigate straight to Home page
    navigate('/home', { replace: true });
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-950 text-black dark:text-white flex flex-col justify-between p-6 pt-10 font-sans select-none relative overflow-y-auto no-scrollbar pb-10 transition-colors duration-300">
      
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-neutral-800 pb-3">
          <button 
            onClick={handleGotIt} 
            className="p-1 text-black dark:text-white hover:opacity-70 transition -ml-2"
          >
            <ChevronLeft strokeWidth={2.5} size={28} />
          </button>
          <h2 className="text-xs font-black text-black dark:text-white uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
            ESTATEFIND
          </h2>
          <div className="w-6" />
        </div>

        {/* Hero Headline Section */}
        <div className="pt-6 pb-2">
          <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">
            EstateFind.
          </h1>
          <h2 className="text-xl font-bold text-black dark:text-slate-100 mt-1">
            Buy directly, zero commission
          </h2>
          <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400 mt-1">
            4 simple steps to acquire your dream property
          </p>
        </div>

        {/* Vertical Timeline Cluster */}
        <div className="relative pt-4 pb-2 space-y-6">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-[21px] top-8 bottom-8 w-[2px] bg-gray-200 dark:bg-neutral-800 z-0"></div>

          {/* STEP 1 */}
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-700 flex items-center justify-center shrink-0 text-slate-800 dark:text-slate-200 shadow-sm">
              <Search size={20} strokeWidth={2.2} />
            </div>
            <div className="pt-1">
              <p className="text-xs font-semibold text-black dark:text-slate-200 leading-relaxed">
                <span className="font-bold">Explore verified listings</span> filtered by city, price, and property type with offline site caching.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-11 h-11 rounded-full bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-900 flex items-center justify-center shrink-0 text-rose-600 dark:text-rose-400 shadow-sm">
              <MessageSquare size={20} strokeWidth={2.2} />
            </div>
            <div className="pt-1">
              <p className="text-xs font-semibold text-black dark:text-slate-200 leading-relaxed">
                Connect directly with <span className="font-bold">Landowners & Sellers</span> without broker calls or hidden middleman fees.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-11 h-11 rounded-full bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-900 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-sm">
              <MapPin size={20} strokeWidth={2.2} />
            </div>
            <div className="pt-1">
              <p className="text-xs font-semibold text-black dark:text-slate-200 leading-relaxed">
                Inspect plot dimensions on-site using integrated <span className="font-bold">Google Maps navigation</span> and coordinates.
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-11 h-11 rounded-full bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-200 dark:border-sky-900 flex items-center justify-center shrink-0 text-sky-600 dark:text-sky-400 shadow-sm">
              <Calculator size={20} strokeWidth={2.2} />
            </div>
            <div className="pt-1">
              <p className="text-xs font-semibold text-black dark:text-slate-200 leading-relaxed">
                Estimate reducing interest installments using the <span className="font-bold">EMI Calculator</span> and complete direct registration.{' '}
                <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-bold">Learn more</span>
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Text */}
        <p className="text-[10px] text-gray-400 dark:text-neutral-500 font-medium leading-relaxed pt-2">
          See complete self-service terms. All property listings are uploaded directly by verified sellers in compliance with local land authority guidelines.
        </p>
      </div>

      {/* Bottom CTA Section */}
      <div className="pt-4 pb-2">
        <button
          onClick={handleGotIt}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-extrabold py-4 rounded-xl text-xs uppercase tracking-widest hover:opacity-90 transition active:scale-[0.98] shadow-lg"
        >
          GOT IT
        </button>
      </div>

    </div>
  );
}
