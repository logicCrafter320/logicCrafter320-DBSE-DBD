import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function PersonalDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <div className="h-full bg-white pt-12 px-5 font-sans">
      <button onClick={() => navigate('/account')} className="mb-4"><ChevronLeft size={24} /></button>
      <h1 className="text-2xl font-bold mb-6">Personal details</h1>
      <div className="space-y-4 text-sm">
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase">Full name</p>
          <p className="font-semibold mt-1">{user?.name || '—'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase">Email</p>
          <p className="font-semibold mt-1">{user?.email || '—'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase">Role</p>
          <p className="font-semibold mt-1 capitalize">{user?.role || 'buyer'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 text-xs font-bold uppercase">Phone</p>
          <p className="font-semibold mt-1">{user?.phone || 'Not set'}</p>
        </div>
      </div>
    </div>
  );
}
