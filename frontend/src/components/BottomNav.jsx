import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, UploadCloud, Calculator, User, Heart } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  // Hide nav on login, signup, otp, walkthrough screens
  const hideOnRoutes = ['/', '/login', '/signup', '/otp', '/how-it-works'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch {}

  const isSeller = user.role === 'seller';
  const explorePath = isSeller ? '/seller-home' : '/home';

  // Build nav items dynamically based on role
  const items = [
    { path: explorePath, icon: Compass, label: 'Explore' },
    { path: '/favorites', icon: Heart, label: 'Saved' },
    // ONLY show Upload for Sellers
    ...(isSeller
      ? [{ path: '/upload', icon: UploadCloud, label: 'Upload' }]
      : []),
    { path: '/emi', icon: Calculator, label: 'EMI' },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-neutral-800 py-2.5 px-4 flex justify-around items-center z-40 rounded-t-[28px] shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          location.pathname === item.path ||
          (item.path === explorePath &&
            (location.pathname === '/home' || location.pathname === '/seller-home')) ||
          (item.path === '/upload' && location.pathname === '/add');

        return (
          <Link
            key={item.path + item.label}
            to={item.path}
            className={`flex flex-col items-center py-0.5 w-14 transition-all ${
              active
                ? 'text-black dark:text-white font-extrabold scale-105'
                : 'text-gray-400 dark:text-neutral-500'
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            <span className="text-[9px] mt-1 font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}