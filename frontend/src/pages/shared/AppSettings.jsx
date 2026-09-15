import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Moon, Bell, Building2, Calculator } from 'lucide-react';

export default function AppSettings() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(localStorage.getItem('set_notifs') !== '0');
  const [dark, setDark] = useState(localStorage.getItem('set_dark') === '1');

  // Initialize Dark Mode state on load
  useEffect(() => {
    const isDark = localStorage.getItem('set_dark') === '1';
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = (val) => {
    setDark(val);
    localStorage.setItem('set_dark', val ? '1' : '0');
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleNotifs = (val) => {
    setNotifs(val);
    localStorage.setItem('set_notifs', val ? '1' : '0');
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100 pt-12 px-5 font-sans transition-colors duration-300 select-none pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/account')} className="p-1 -ml-1 text-slate-900 dark:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">App settings</h1>
      </div>

      {/* Toggles List */}
      <div className="space-y-4">
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-neutral-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <Moon size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Dark mode preference</p>
              <p className="text-xs text-slate-400 dark:text-neutral-500 font-medium">Flips entire app theme</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleDarkMode(!dark)}
            className={`w-12 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${
              dark ? 'bg-indigo-600 justify-end' : 'bg-gray-200 dark:bg-neutral-800 justify-start'
            }`}
          >
            <div className="w-5 h-5 bg-white rounded-full shadow-md" />
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-neutral-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <Bell size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Push notifications</p>
              <p className="text-xs text-slate-400 dark:text-neutral-500 font-medium">Price drops & site alerts</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleNotifs(!notifs)}
            className={`w-12 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${
              notifs ? 'bg-indigo-600 justify-end' : 'bg-gray-200 dark:bg-neutral-800 justify-start'
            }`}
          >
            <div className="w-5 h-5 bg-white rounded-full shadow-md" />
          </button>
        </div>

      </div>

      {/* Quick Action Shortcuts */}
      <div className="pt-8 space-y-3">
        <button 
          onClick={() => navigate('/emi')} 
          className="w-full py-4 bg-slate-100 dark:bg-neutral-900 text-slate-800 dark:text-slate-200 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-neutral-800 transition"
        >
          <Calculator size={16} /> Open EMI Calculator
        </button>

        <button 
          onClick={() => navigate('/how-it-works')} 
          className="w-full py-4 bg-slate-100 dark:bg-neutral-900 text-slate-800 dark:text-slate-200 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-neutral-800 transition"
        >
          <Building2 size={16} /> How EstateFind Works
        </button>
      </div>

    </div>
  );
}
