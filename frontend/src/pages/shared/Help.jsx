import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Phone } from 'lucide-react';

export default function Help() {
  const navigate = useNavigate();
  return (
    <div className="h-full bg-white pt-12 px-5 font-sans">
      <button onClick={() => navigate('/account')} className="mb-4"><ChevronLeft size={24} /></button>
      <h1 className="text-2xl font-bold mb-2">Get help</h1>
      <p className="text-sm text-gray-500 mb-6">Support for buyers & sellers on EstateFind</p>

      <a href="mailto:support@estatefind.app" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-3">
        <Mail size={18} /> <span className="font-semibold text-sm">support@estatefind.app</span>
      </a>
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-6">
        <Phone size={18} /> <span className="font-semibold text-sm">+91 1800-ESTATE</span>
      </div>

      <h2 className="font-bold mb-2">Quick links</h2>
      <button onClick={() => navigate('/how-it-works')} className="block text-sm text-blue-600 font-semibold mb-2">FAQs / How it works</button>
      <button onClick={() => navigate('/security')} className="block text-sm text-blue-600 font-semibold mb-2">Privacy & security</button>
      <button onClick={() => navigate('/emi')} className="block text-sm text-blue-600 font-semibold">Fees · EMI calculator</button>
    </div>
  );
}
