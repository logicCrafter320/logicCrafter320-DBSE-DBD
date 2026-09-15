import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import IOSStatusBar from './components/IOSStatusBar';
import BottomNav from './components/BottomNav';
import SplashOverlay from './components/SplashOverlay';
import FCMPushNotification from './components/FCMPushNotification';

// Auth Pages (Now in /auth/)
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OTPVerify from './pages/auth/OTPVerify';

// Buyer Pages (Now in /buyer/)
import BuyerHome from './pages/buyer/BuyerHome';
import Favorites from './pages/buyer/Favorites';

// Seller Pages (Now in /seller/)
import SellerHome from './pages/seller/SellerHome';
import UploadProperty from './pages/seller/UploadProperty';

// Shared Pages (Now in /shared/)
import Account from './pages/shared/Account';
import EmiCalc from './pages/shared/EmiCalc';
import HowItWorks from './pages/shared/HowItWorks';
import Security from './pages/shared/Security';
import PersonalDetails from './pages/shared/PersonalDetails';
import AppSettings from './pages/shared/AppSettings';
import Help from './pages/shared/Help';
import Devices from './pages/shared/Devices';
import ManageWallet from './pages/shared/ManageWallet';
import Notifications from './pages/shared/Notifications';

function getRole() {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}').role || 'buyer';
  } catch {
    return 'buyer';
  }
}

function HomeRedirect() {
  const role = getRole();
  return <Navigate to={role === 'seller' ? '/seller-home' : '/home'} replace />;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (localStorage.getItem('set_dark') === '1') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex justify-center items-center p-0 sm:p-4 font-sans">
        <div className="w-full max-w-sm bg-white dark:bg-neutral-950 h-[840px] sm:rounded-[52px] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden relative border-0 sm:border-[10px] sm:border-neutral-900 flex flex-col">

          <FCMPushNotification />

          <AnimatePresence>
            {showSplash && (
              <SplashOverlay onComplete={() => setShowSplash(false)} />
            )}
          </AnimatePresence>

          <div className="absolute top-0 left-0 right-0 z-20">
            <IOSStatusBar />
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-neutral-950 text-slate-900 dark:text-slate-100">
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? <HomeRedirect /> : <Navigate to="/login" replace />
                }
              />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otp" element={<OTPVerify />} />
              <Route path="/how-it-works" element={<HowItWorks />} />

              {/* Buyer */}
              <Route path="/home" element={<BuyerHome />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* Seller */}
              <Route path="/seller-home" element={<SellerHome />} />
              <Route path="/upload" element={<UploadProperty />} />
              <Route path="/add" element={<UploadProperty />} />

              {/* Shared */}
              <Route path="/emi" element={<EmiCalc />} />
              <Route path="/account" element={<Account />} />
              <Route path="/personal-details" element={<PersonalDetails />} />
              <Route path="/app-settings" element={<AppSettings />} />
              <Route path="/security" element={<Security />} />
              <Route path="/help" element={<Help />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/manage-wallet" element={<ManageWallet />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>

          <BottomNav />
        </div>
      </div>
    </Router>
  );
}