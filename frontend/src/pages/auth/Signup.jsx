import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Building2 } from 'lucide-react';
import api from '../../services/api';
import GoogleAuthButton from '../../components/GoogleAuthButton';

export default function Signup() {
  const [role, setRole] = useState('buyer');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/signup', {
        ...formData,
        email: formData.email.trim(),
        role
      });

      navigate('/otp', { state: { email: formData.email.trim(), role } });
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Signup failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-black flex flex-col pt-12 font-sans">
      <div className="h-12 w-full shrink-0" />

      <div className="bg-white flex-1 rounded-t-[28px] flex flex-col relative px-6 pt-5 pb-8 overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <Link to="/login" className="text-gray-400 hover:text-black transition">
            <X strokeWidth={2.5} size={24} />
          </Link>
          <h2 className="text-base font-bold text-black absolute left-1/2 -translate-x-1/2">
            Create Account
          </h2>
          <div className="w-6" />
        </div>

        {/* Torn Logo Banner */}
        <div className="relative h-20 flex justify-center items-center mb-3">
          <div className="absolute -rotate-6 bg-white border border-gray-200 shadow-md px-4 py-1.5 font-black text-xl text-black z-10 flex items-center gap-2">
            <Building2 size={20} /> Estate
          </div>
          <div className="absolute rotate-6 translate-x-6 translate-y-5 bg-black text-white px-3 py-1 font-black text-lg rounded-md border-2 border-white z-20">
            Join
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-xs font-bold text-center mb-3 bg-red-50 py-2.5 rounded-lg">
            {error}
          </div>
        )}

        {/* Role Switcher */}
        <div className="flex bg-[#f4f4f5] p-1 rounded-full text-xs font-bold mb-4 w-full max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 py-2 rounded-full transition ${role === 'buyer' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`flex-1 py-2 rounded-full transition ${role === 'seller' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
          >
            Seller
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-3 w-full max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#f4f4f5] px-4 py-3 rounded-2xl text-[13px] font-semibold text-black outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#f4f4f5] px-4 py-3 rounded-2xl text-[13px] font-semibold text-black outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-[#f4f4f5] px-4 py-3 rounded-2xl text-[13px] font-semibold text-black outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-[#f4f4f5] px-4 py-3 rounded-2xl text-[13px] font-semibold text-black outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-full text-[14px] hover:bg-black transition mt-1 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : `Register as ${role === 'buyer' ? 'Buyer' : 'Seller'}`}
          </button>
        </form>

        <div className="my-3 flex items-center gap-3 w-full max-w-sm mx-auto">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs font-bold text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <GoogleAuthButton role={role} label={`Sign up as ${role === 'buyer' ? 'Buyer' : 'Seller'} with Google`} />
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs font-bold text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#009dff] hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}