import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Building2 } from 'lucide-react';
import api from '../../services/api';
import GoogleAuthButton from '../../components/GoogleAuthButton';

export default function Login() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [role, setRole] = useState('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email: email.trim(),
        password,
        role
      });
      localStorage.setItem('token', res.data.token);
      const userData = { ...res.data.user, role: role || res.data.user.role };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/how-it-works');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email first, then tap Forgot Password.');
      setShowEmailForm(true);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: email.trim() });
      // Go to OTP screen — code will print in backend terminal
      navigate('/otp', {
        state: {
          email: email.trim(),
          purpose: 'reset',
          role
        }
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Could not send reset code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-black flex flex-col pt-12 font-sans">
      <div className="h-12 w-full shrink-0" />

      <div className="bg-white flex-1 rounded-t-[28px] flex flex-col relative px-6 pt-5 pb-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowEmailForm(false)}
            className={`text-gray-400 hover:text-black transition ${!showEmailForm && 'invisible'}`}
          >
            <X strokeWidth={2.5} size={24} />
          </button>
          <h2 className="text-base font-bold text-black absolute left-1/2 -translate-x-1/2">
            Log In
          </h2>
          <div className="w-6" />
        </div>

        <div className="relative h-24 flex justify-center items-center mb-4">
          <div className="absolute -rotate-6 bg-white border border-gray-200 shadow-md px-5 py-2 font-black text-2xl text-black z-10 flex items-center gap-2">
            <Building2 size={24} /> Estate
          </div>
          <div className="absolute rotate-6 translate-x-8 translate-y-6 bg-black text-white px-4 py-1.5 font-black text-xl rounded-md border-2 border-white z-20">
            Find
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-xs font-bold text-center mb-3 bg-red-50 py-2.5 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex bg-[#f4f4f5] p-1 rounded-full text-xs font-bold mb-4 w-full max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 py-2 rounded-full transition ${
              role === 'buyer' ? 'bg-white shadow text-black' : 'text-gray-500'
            }`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('seller')}
            className={`flex-1 py-2 rounded-full transition ${
              role === 'seller' ? 'bg-white shadow text-black' : 'text-gray-500'
            }`}
          >
            Seller
          </button>
        </div>

        {!showEmailForm ? (
          <div className="space-y-4 w-full max-w-sm mx-auto flex-1">
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-full text-[15px] hover:bg-black transition"
            >
              Log In as {role === 'buyer' ? 'Buyer' : 'Seller'} with Email
            </button>

            <div className="flex items-center gap-4 py-1">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs font-bold text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <GoogleAuthButton
              role={role}
              label={`Continue as ${role === 'buyer' ? 'Buyer' : 'Seller'} with Google`}
            />
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3.5 w-full max-w-sm mx-auto flex-1">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f4f4f5] px-5 py-3.5 rounded-2xl text-[14px] font-semibold text-black outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f4f4f5] px-5 py-3.5 rounded-2xl text-[14px] font-semibold text-black outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400"
              required
            />

            {/* Forgot Password */}
            <div className="flex justify-end -mt-1 mb-1">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-xs font-bold text-[#009dff] hover:underline disabled:opacity-50"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-full text-[15px] hover:bg-black transition mt-1 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : `Log In as ${role === 'buyer' ? 'Buyer' : 'Seller'}`}
            </button>
          </form>
        )}

        <div className="mt-auto pt-4 text-center">
          <p className="text-sm font-bold text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#009dff] hover:underline">
              Sign up here
            </Link>
          </p>
          <div className="w-32 h-1.5 bg-gray-200 rounded-full mx-auto mt-4" />
        </div>
      </div>
    </div>
  );
}