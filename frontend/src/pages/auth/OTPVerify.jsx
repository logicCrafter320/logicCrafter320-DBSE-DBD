import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export default function OTPVerify() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const purpose = location.state?.purpose || 'signup'; // 'signup' | 'reset'
  const selectedRole = location.state?.role || 'buyer';

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await api.post('/auth/verify-otp', {
        email,
        otp: otp.trim(),
        purpose
      });

      if (purpose === 'reset') {
        // Password reset verified — send user back to login with success
        setSuccessMsg('Code verified! You can log in with a new password next (or contact support).');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);
        return;
      }

      // Normal signup / login OTP
      localStorage.setItem('token', res.data.token);
      const userData = {
        ...res.data.user,
        role: selectedRole || res.data.user.role
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/how-it-works', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Invalid or expired OTP'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      if (purpose === 'reset') {
        await api.post('/auth/forgot-password', { email });
      } else {
        await api.post('/auth/send-otp', { email });
      }
      setSuccessMsg('New code sent — check the backend terminal.');
    } catch (err) {
      setError('Could not resend code.');
    }
  };

  return (
    <div className="p-6 pt-16 flex flex-col justify-between min-h-full bg-white dark:bg-neutral-950">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-black mt-4">
          {purpose === 'reset' ? 'Reset Password' : 'Verification Code'}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {purpose === 'reset'
            ? 'Enter the 6-digit code sent for password reset to '
            : 'We sent a code to '}
          <span className="font-bold text-black dark:text-white">{email || 'your email'}</span>
        </p>
        <p className="text-[10px] text-gray-400 mt-2 font-semibold">
          Look at your backend terminal window for the real OTP code.
        </p>

        {error && (
          <div className="p-3 mt-4 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 mt-4 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-8 space-y-4">
          <input
            type="text"
            required
            maxLength={6}
            inputMode="numeric"
            className="w-full p-4 text-center tracking-[0.5em] text-2xl font-black rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          />

          <button
            type="submit"
            disabled={loading || otp.length < 4}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-sm shadow-xl transition disabled:opacity-50"
          >
            {loading
              ? 'Verifying...'
              : purpose === 'reset'
              ? 'Verify Reset Code'
              : 'Confirm & Continue'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          className="w-full mt-4 text-xs font-bold text-[#009dff] hover:underline"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}