import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const GOOGLE_CLIENT_ID = "504693817457-2vgl5v5u836ut0r3pf9o0migfv2jqfst.apps.googleusercontent.com";

export default function GoogleAuthButton({ role = 'buyer', label }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Dynamically load Google GSI script if not loaded
    if (window.google?.accounts?.oauth2) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleGoogleSignIn = () => {
    /* global google */
    if (!window.google?.accounts?.oauth2) {
      alert("Google Services are loading. Please click again in a second.");
      return;
    }

    setLoading(true);

    // 2. Initialize real Google OAuth2 Token Client (opens Google popup on button click)
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          console.error("Google Auth Popup Error:", tokenResponse.error);
          setLoading(false);
          return;
        }

        try {
          // 3. Fetch user profile directly from Google API using access_token
          const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
          });
          const googleUser = await userInfoRes.json();

          // 4. Send verified Google profile + selected role to backend
          const res = await api.post('/auth/google', {
            email: googleUser.email,
            name: googleUser.name,
            role: role // 'seller' or 'buyer'
          });

          const userData = {
            ...res.data.user,
            role: role || res.data.user.role || 'buyer'
          };

          // 5. Store session and navigate
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(userData));

          navigate('/how-it-works', { replace: true });
        } catch (err) {
          console.error("Backend login sync error:", err);
          alert("Failed to sign in with backend. Make sure server is running.");
        } finally {
          setLoading(false);
        }
      },
    });

    // Request Access Token -> Opens Real Google Popup Window!
    tokenClient.requestAccessToken();
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-black dark:text-white font-bold py-3.5 rounded-full text-[13px] flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition shadow-sm active:scale-[0.98] disabled:opacity-50"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
      <span>
        {loading ? 'Opening Google...' : (label || `Continue as ${role === 'seller' ? 'Seller' : 'Buyer'} with Google`)}
      </span>
    </button>
  );
}