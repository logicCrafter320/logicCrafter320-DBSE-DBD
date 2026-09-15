import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Shield, Settings, HelpCircle, Bell } from 'lucide-react';

export default function Account() {
  const navigate = useNavigate();

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch {}

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div className="p-6 pt-14 pb-24">
      <h1 className="text-2xl font-black">Account</h1>

      {/* User Card */}
      <div className="mt-4 p-5 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl shrink-0">
          {user.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-base truncate">{user.name || 'User'}</h2>
          <p className="text-xs text-gray-400 truncate">{user.email || 'user@example.com'}</p>
          <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            Role: {user.role || 'buyer'}
          </span>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="mt-6 space-y-2">
        <button onClick={() => navigate('/personal-details')} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 flex items-center justify-between font-bold text-xs">
          <span className="flex items-center gap-3"><User size={16} /> Personal Details</span>
        </button>
        <button onClick={() => navigate('/notifications')} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 flex items-center justify-between font-bold text-xs">
          <span className="flex items-center gap-3"><Bell size={16} /> Notifications</span>
        </button>
        <button onClick={() => navigate('/security')} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 flex items-center justify-between font-bold text-xs">
          <span className="flex items-center gap-3"><Shield size={16} /> Security</span>
        </button>
        <button onClick={() => navigate('/app-settings')} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 flex items-center justify-between font-bold text-xs">
          <span className="flex items-center gap-3"><Settings size={16} /> App Settings</span>
        </button>
        <button onClick={() => navigate('/help')} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 flex items-center justify-between font-bold text-xs">
          <span className="flex items-center gap-3"><HelpCircle size={16} /> Help & Support</span>
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 p-4 rounded-2xl bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
      >
        <LogOut size={16} /> Log Out
      </button>
    </div>
  );
}