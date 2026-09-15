import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2-Second Timer - Plays EVERY TIME on app load / reload
    const timer = setTimeout(() => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        navigate('/home', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full w-full bg-white flex items-center justify-center select-none font-sans relative overflow-hidden">
      
      {/* Central Farfetch-Style Interlocking "EF" Monogram Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center"
      >
        <svg 
          width="110" 
          height="110" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          {/* Outer 'E' Shape */}
          <path 
            d="M20 20 H75 C80 20 85 25 85 30 V32 C85 37 80 42 75 42 H42 V50 H68 C73 50 77 54 77 58 V60 C77 64 73 68 68 68 H42 V78 H78 C83 78 88 82 88 87 V88 H20 V20 Z" 
            fill="black" 
          />
          {/* Overlapping 'F' Interlock */}
          <path 
            d="M48 32 H88 V44 H64 V56 H82 V68 H64 V88 H48 V32 Z" 
            fill="black" 
          />
        </svg>
      </motion.div>

      {/* iOS Home Indicator Line */}
      <div className="absolute bottom-2 w-32 h-1 bg-black rounded-full" />

    </div>
  );
}
