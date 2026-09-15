import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Smartphone,
  Mail,
  Lock,
  Monitor,
  AlertCircle,
  Info,
  Check,
} from 'lucide-react';

export default function Security() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [passwordEnabled, setPasswordEnabled] = useState(true);
  const [passkeysEnabled, setPasskeysEnabled] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setUser(u);
        if (u.email) setEmailEnabled(true);
        if (u.phone) setPhoneEnabled(true);
      } catch {}
    }
    // restore toggles
    setPasskeysEnabled(localStorage.getItem('sec_passkeys') === '1');
    setPhoneEnabled(localStorage.getItem('sec_phone') === '1' || !!JSON.parse(localStorage.getItem('user') || '{}').phone);
    setPasswordEnabled(localStorage.getItem('sec_password') !== '0');
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const measuresDone = [passkeysEnabled, phoneEnabled, emailEnabled, passwordEnabled].filter(Boolean).length;
  const level = measuresDone >= 3 ? 'High' : measuresDone >= 2 ? 'Medium' : 'Low';
  const levelColor = level === 'High' ? 'text-green-600' : level === 'Medium' ? 'text-amber-600' : 'text-red-500';

  const toggle = (key, value, setter, label) => {
    setter(value);
    localStorage.setItem(key, value ? '1' : '0');
    showToast(value ? `${label} enabled` : `${label} disabled`);
  };

  const authMethods = [
    {
      icon: KeyRound,
      label: 'Passkeys',
      status: passkeysEnabled ? 'Enabled' : 'Not enabled',
      enabled: passkeysEnabled,
      onClick: () =>
        toggle('sec_passkeys', !passkeysEnabled, setPasskeysEnabled, 'Passkeys'),
    },
    // Authenticator app intentionally REMOVED
    {
      icon: Smartphone,
      label: 'Phone',
      status: phoneEnabled ? 'Enabled' : 'Not set up',
      enabled: phoneEnabled,
      onClick: () => {
        if (!phoneEnabled) {
          const phone = prompt('Enter phone number to verify (e.g. +91 9876543210)');
          if (phone && phone.replace(/\D/g, '').length >= 10) {
            toggle('sec_phone', true, setPhoneEnabled, 'Phone');
            const u = { ...(user || {}), phone };
            localStorage.setItem('user', JSON.stringify(u));
            setUser(u);
          }
        } else {
          toggle('sec_phone', false, setPhoneEnabled, 'Phone');
        }
      },
    },
    {
      icon: Mail,
      label: 'Email',
      status: user?.email || 'Add email',
      enabled: emailEnabled,
      onClick: () => {
        showToast(user?.email ? `Verified: ${user.email}` : 'Email comes from your account');
      },
    },
    {
      icon: Lock,
      label: 'Login password',
      status: passwordEnabled ? 'Enabled' : 'Not enabled',
      enabled: passwordEnabled,
      onClick: () =>
        toggle('sec_password', !passwordEnabled, setPasswordEnabled, 'Login password'),
    },
  ];

  return (
    <div className="h-full bg-white text-black flex flex-col pt-10 font-sans overflow-y-auto no-scrollbar pb-10">
      {/* Header */}
      <div className="flex items-center px-4 py-3 relative">
        <button onClick={() => navigate('/account')} className="p-1 z-10">
          <ChevronLeft size={24} strokeWidth={2.2} />
        </button>
        <h1 className="absolute left-0 right-0 text-center text-base font-bold">Security center</h1>
      </div>

      <div className="px-5 pt-2 pb-4">
        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
          Security level <span className={`font-bold ${levelColor}`}>{level}</span>
          <Info size={12} className="text-gray-400" />
        </p>

        {/* Vulnerable card */}
        <div className="mt-3 border border-gray-200 rounded-2xl p-4">
          <div className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              !
            </div>
            <div>
              <p className="text-sm font-bold text-black">
                {level === 'High' ? 'Your account looks secure' : 'Your account is vulnerable'}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Set up these <b>4 measures</b> on the security checklist to protect your EstateFind account
              </p>
              {/* Progress */}
              <div className="flex gap-1.5 mt-3 mb-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i < measuresDone ? 'bg-red-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => showToast('Scroll down and enable Phone / Passkeys / Password')}
                className="text-sm font-bold text-black mt-1"
              >
                Set up →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication methods */}
      <div className="px-5 pt-2">
        <h2 className="text-base font-bold text-black mb-2">Authentication methods</h2>

        <div className="divide-y divide-gray-100">
          {authMethods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.label}
                onClick={m.onClick}
                className="w-full flex items-center gap-3 py-4 text-left hover:bg-gray-50 transition"
              >
                <Icon size={22} strokeWidth={1.7} className="text-black" />
                <span className="flex-1 text-[15px] font-medium text-black">{m.label}</span>
                <span className={`text-xs font-medium ${m.enabled ? 'text-green-600' : 'text-gray-400'}`}>
                  {m.status}
                </span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100 mx-5 my-2" />

      {/* Advanced security */}
      <div className="px-5 pt-2 pb-6">
        <h2 className="text-base font-bold text-black mb-1">Advanced security</h2>
        <button
          onClick={() => navigate('/devices')}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <div>
            <p className="text-[15px] font-medium text-black">Device management</p>
            <p className="text-xs text-gray-400 mt-0.5">Verify EstateFind account activity</p>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-2">
          <Check size={14} /> {toast}
        </div>
      )}
    </div>
  );
}
