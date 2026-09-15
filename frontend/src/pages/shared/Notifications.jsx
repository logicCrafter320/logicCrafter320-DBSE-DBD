import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Price Drop Alert',
      body: 'Luxury 3BHK flat in Vijayawada price updated.',
      time: '10m ago',
    },
    {
      id: 2,
      title: 'New Listing in Hyderabad',
      body: 'Gachibowli 3BHK Apartment is now live and available for viewing.',
      time: '1h ago',
    },
  ];

  return (
    <div className="p-6 pt-14 pb-24 bg-white dark:bg-neutral-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-500 hover:text-black dark:hover:text-white transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800"
          >
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <h3 className="text-xs font-bold flex items-center gap-1.5 text-black dark:text-white">
                <Bell size={14} className="text-blue-500 shrink-0" />
                {item.title}
              </h3>
              <span className="text-[10px] font-semibold text-gray-400 shrink-0">
                {item.time}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium pl-5">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}