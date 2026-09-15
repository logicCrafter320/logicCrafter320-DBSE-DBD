import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Search, SlidersHorizontal, X, Navigation,
  HelpCircle, MessageSquare, Heart, ChevronDown, Check, Play
} from 'lucide-react';
import api from '../../services/api';
import SellerProfileSheet from '../../components/SellerProfileSheet';
import { isFavorite, toggleFavorite } from '../../services/favorites';

// Inline Black & White Estate Loader
function EstateLoader({ text = 'Querying Database...' }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center select-none font-sans">
      <div className="bg-black dark:bg-neutral-900 border border-neutral-800 p-6 rounded-[28px] shadow-2xl flex flex-col items-center justify-center gap-3">
        <div className="bg-white text-black px-5 py-2.5 rounded-[18px] font-black text-base tracking-tighter shadow-md">
          ESTATEFIND
        </div>
        <div className="flex items-center gap-2 pt-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: index * 0.18,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-white"
            />
          ))}
        </div>
      </div>
      <p className="text-[11px] font-extrabold text-slate-400 dark:text-neutral-500 mt-3 uppercase tracking-wider">
        {text}
      </p>
    </div>
  );
}

const CITIES = ['All Cities', 'Hyderabad', 'Vijayawada', 'Guntur', 'Visakhapatnam', 'Bangalore', 'Chennai'];

export default function Home() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [city, setCity] = useState(() => localStorage.getItem('ef_city') || 'All Cities');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sellerSheetOpen, setSellerSheetOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [favVersion, setFavVersion] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch {}
    }
  }, []);

  const getUserInitials = () => {
    if (!user?.name) return 'EF';
    const n = user.name.trim().split(' ');
    return n.length >= 2 ? `${n[0][0]}${n[1][0]}`.toUpperCase() : user.name.substring(0, 2).toUpperCase();
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await api.get('/properties', {
        params: { category: selectedCat, search: search || undefined, city: city || undefined },
      });
      setProperties(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setProperties([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [selectedCat, search, city]);

  const selectCity = (c) => {
    setCity(c);
    localStorage.setItem('ef_city', c);
    setShowCityPicker(false);
  };

  return (
    <div className="p-5 space-y-4 pb-24 relative bg-slate-50 dark:bg-neutral-950 min-h-full font-sans transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-neutral-500">
              Search Region
            </span>
            <button
              onClick={() => navigate('/how-it-works')}
              className="inline-flex items-center gap-1 text-[9px] font-bold text-black dark:text-white bg-white dark:bg-neutral-900 px-2 py-0.5 rounded-full border border-gray-200 dark:border-neutral-800 transition"
            >
              <HelpCircle size={10} /> How it works
            </button>
          </div>

          <button
            onClick={() => setShowCityPicker(true)}
            className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1 mt-0.5"
          >
            <MapPin size={12} className="text-indigo-600 fill-indigo-100 dark:fill-indigo-950" />
            <span>{city}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>

        <button
          onClick={() => navigate('/account')}
          className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-neutral-800 text-white flex items-center justify-center font-black text-xs shadow-md border border-slate-800 dark:border-neutral-700"
        >
          {getUserInitials()}
        </button>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <div className="flex-1 bg-white dark:bg-neutral-900 flex items-center px-3.5 py-2.5 rounded-2xl border border-slate-200/80 dark:border-neutral-800 shadow-sm transition">
          <Search size={14} className="text-slate-400 dark:text-neutral-500 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Vijayawada, Hyderabad, 3BHK..."
            className="w-full text-xs font-semibold text-slate-800 dark:text-slate-100 outline-none bg-transparent placeholder:text-slate-400 dark:placeholder:text-neutral-500"
          />
        </div>
        <button className="p-2.5 bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 rounded-2xl border border-slate-200/80 dark:border-neutral-800 shadow-sm">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {['All', 'Flat', 'Apartment', 'Plot', 'Land', 'Villa'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all ${
              selectedCat === cat 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow' 
                : 'bg-white dark:bg-neutral-900 text-slate-500 dark:text-neutral-400 border border-slate-200/80 dark:border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Property Cards Feed */}
      {loading ? (
        <EstateLoader text="Fetching properties from MySQL..." />
      ) : properties.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl text-center border border-slate-100 dark:border-neutral-800 shadow-sm my-6">
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">No listings found</p>
          <p className="text-[10px] text-slate-400 dark:text-neutral-500 mt-1">
            Try switching location to "All Cities" or choosing another category.
          </p>
          <button
            onClick={() => selectCity('All Cities')}
            className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-full shadow"
          >
            Show All Cities
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {properties.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProperty(item)}
              className="bg-white dark:bg-neutral-900 rounded-[24px] overflow-hidden shadow-sm border border-slate-100 dark:border-neutral-800 cursor-pointer transition-all relative"
            >
              <div className="relative h-44 bg-slate-100 dark:bg-neutral-800">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'}
                  className="w-full h-full object-cover"
                  alt={item.title}
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {item.property_type}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                    setFavVersion((v) => v + 1);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-full shadow-sm z-10"
                >
                  <Heart
                    size={15}
                    className={isFavorite(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-neutral-300'}
                  />
                </button>

                <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white dark:border-neutral-800 shadow-sm">
                  <p className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="p-3.5">
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-neutral-400 mt-1 flex items-center gap-1">
                  <MapPin size={10} /> {item.city}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* City Picker Drawer */}
      <AnimatePresence>
        {showCityPicker && (
          <div className="fixed inset-0 z-[70] flex items-end justify-center">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCityPicker(false)} />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="relative w-full max-w-sm bg-white dark:bg-neutral-900 rounded-t-[32px] p-5 pb-8 shadow-2xl z-10 text-slate-900 dark:text-white"
            >
              <div className="w-10 h-1 bg-gray-300 dark:bg-neutral-700 rounded-full mx-auto mb-4" />
              <h3 className="text-base font-extrabold mb-3">Select Location</h3>
              <div className="space-y-1 max-h-72 overflow-y-auto no-scrollbar">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => selectCity(c)}
                    className="w-full flex items-center justify-between px-3.5 py-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-neutral-800 transition text-left"
                  >
                    <span className="flex items-center gap-2.5 text-xs font-bold">
                      <MapPin size={16} className="text-indigo-600 dark:text-indigo-400" /> {c}
                    </span>
                    {city === c && <Check size={18} className="text-emerald-600 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Property Details Sheet Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center">
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="bg-white dark:bg-neutral-900 rounded-t-[36px] p-5 w-full max-w-sm space-y-3.5 shadow-2xl max-h-[88vh] overflow-y-auto no-scrollbar text-slate-900 dark:text-white"
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-neutral-800 pb-2">
                <h3 className="text-xs font-black line-clamp-1">{selectedProperty.title}</h3>
                <button onClick={() => setSelectedProperty(null)} className="p-1 text-slate-400 dark:text-neutral-500">
                  <X size={18} />
                </button>
              </div>

              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img src={selectedProperty.image_url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'} className="w-full h-full object-cover" alt="" />
                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase">
                  {selectedProperty.property_type}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-400">{selectedProperty.city}, IN</p>
                <h2 className="text-base font-black">{selectedProperty.title}</h2>
                <h1 className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                  ₹{Number(selectedProperty.price).toLocaleString('en-IN')}
                </h1>
                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed pt-1">{selectedProperty.description}</p>
              </div>

              {/* Maps Location Trigger */}
              <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-2xl border border-slate-100 dark:border-neutral-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-[11px] font-bold">Site Coordinates</p>
                    <p className="text-[9px] text-slate-400 dark:text-neutral-400 font-semibold">{selectedProperty.city} Region</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedProperty.city} ${selectedProperty.title}`)}`}
                  target="_blank" rel="noreferrer"
                  className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm"
                >
                  <Navigation size={10} /> Open Maps
                </a>
              </div>

              {/* Watch Video Tour Button (If video URL exists) */}
              {selectedProperty.video_url && (
                <a
                  href={selectedProperty.video_url}
                  target="_blank" rel="noreferrer"
                  className="w-full py-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs rounded-2xl border border-red-200 dark:border-red-900 flex items-center justify-center gap-2 hover:bg-red-100 transition"
                >
                  <Play size={14} className="fill-current" />
                  <span>Watch Video Tour</span>
                </a>
              )}

              {/* WhatsApp Direct Chat Button */}
              <a
                href={`https://wa.me/${(selectedProperty.whatsapp_number || '919876543210').replace(/\D/g, '')}?text=${encodeURIComponent(`Hi! I saw your property "${selectedProperty.title}" in ${selectedProperty.city} on EstateFind. Is it still available?`)}`}
                target="_blank" rel="noreferrer"
                className="w-full py-3.5 bg-[#25D366] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition active:scale-[0.98]"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Save to Favorites CTA */}
              <button
                type="button"
                onClick={() => {
                  toggleFavorite(selectedProperty);
                  setFavVersion((v) => v + 1);
                }}
                className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition ${
                  isFavorite(selectedProperty.id)
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400'
                    : 'bg-white dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Heart size={16} className={isFavorite(selectedProperty.id) ? 'fill-red-500 text-red-500' : ''} />
                <span>{isFavorite(selectedProperty.id) ? 'Saved to Favorites' : 'Save to Favorites'}</span>
              </button>

              {/* Contact Seller Options Sheet */}
              <button
                type="button"
                onClick={() => setSellerSheetOpen(true)}
                className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Seller Profile & Options</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SellerProfileSheet
        open={sellerSheetOpen}
        onClose={() => setSellerSheetOpen(false)}
        seller={{
          name: selectedProperty?.seller_name || 'Property Owner',
          email: selectedProperty?.seller_email || 'owner@estatefind.app',
          id: selectedProperty?.seller_id || selectedProperty?.id,
        }}
        property={selectedProperty}
      />
    </div>
  );
}
