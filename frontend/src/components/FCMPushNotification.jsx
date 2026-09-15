import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Building2 } from 'lucide-react';

export default function FCMPushNotification() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handlePush = (e) => {
      setNotification(e.detail);
      setTimeout(() => setNotification(null), 4500);
    };

    window.addEventListener('fcm_push_notification', handlePush);
    return () => window.removeEventListener('fcm_push_notification', handlePush);
  }, []);

  if (!notification) return null;

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute top-10 left-3 right-3 z-[120] bg-black/90 dark:bg-white/95 text-white dark:text-black backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-white/20 dark:border-black/20 font-sans cursor-pointer"
          onClick={() => setNotification(null)}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Building2 size={18} />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-600 flex items-center gap-1">
                  <Bell size={10} /> FCM Push Alert
                </span>
                <span className="text-[9px] text-gray-400 font-semibold">Just now</span>
              </div>
              <h4 className="text-xs font-black truncate">{notification.title}</h4>
              <p className="text-[11px] text-gray-300 dark:text-gray-600 leading-tight mt-0.5 line-clamp-2">
                {notification.body}
              </p>
            </div>

            <button onClick={() => setNotification(null)} className="text-gray-400 p-0.5">
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function triggerFCMNotification(title, body) {
  const event = new CustomEvent('fcm_push_notification', {
    detail: { title, body },
  });
  window.dispatchEvent(event);
  
  // Save notification history locally
  const history = JSON.parse(localStorage.getItem('fcm_history') || '[]');
  localStorage.setItem('fcm_history', JSON.stringify([
    { id: Date.now(), title, body, time: 'Just now' },
    ...history
  ]));
}