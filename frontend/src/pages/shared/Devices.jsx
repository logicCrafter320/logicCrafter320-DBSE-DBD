import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Monitor, Smartphone } from 'lucide-react';

export default function Devices() {
  const navigate = useNavigate();
  const devices = [
    { icon: Smartphone, name: 'This browser', meta: 'Active now · Local device' },
    { icon: Monitor, name: 'Windows PC', meta: 'Last active recently' },
  ];
  return (
    <div className="h-full bg-white pt-12 px-5 font-sans">
      <button onClick={() => navigate('/security')} className="mb-4"><ChevronLeft size={24} /></button>
      <h1 className="text-2xl font-bold mb-2">Device management</h1>
      <p className="text-xs text-gray-500 mb-6">Verify EstateFind account activity on your devices</p>
      {devices.map((d) => {
        const Icon = d.icon;
        return (
          <div key={d.name} className="flex items-center gap-3 py-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-sm">{d.name}</p>
              <p className="text-xs text-gray-400">{d.meta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
