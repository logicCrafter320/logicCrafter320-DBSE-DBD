import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, Plus, ChevronDown, X, Check, RefreshCw } from 'lucide-react';
import api from '../../services/api';
import PropertyDetailsModal from '../../components/PropertyDetailsModal';

const CITIES = ['All Locations', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune'];

const cityAreaMap = {
  'bangalore': ['bangalore', 'bengaluru', 'indiranagar', 'koramangala', 'whitefield', 'hsr', 'jp nagar', 'mg road'],
  'mumbai': ['mumbai', 'andheri', 'bandra', 'juhu', 'powai', 'worli', 'thane', 'navi mumbai'],
  'delhi': ['delhi', 'noida', 'gurgaon', 'gurugram', 'faridabad', 'dwarka'],
  'hyderabad': ['hyderabad', 'banjara', 'jubilee', 'hitech', 'gachibowli', 'secunderabad', 'kukatpally'],
  'chennai': ['chennai', 'coimbatore', 'race course', 'anna nagar', 'adyar', 'velachery', 'omr'],
  'pune': ['pune', 'viman nagar', 'baner', 'hinjewadi', 'koregaon', 'wakad']
};

function matchesLocation(propLocation, selectedCity) {
  if (!selectedCity || selectedCity === 'All Locations') return true;
  if (!propLocation) return false;

  const loc = propLocation.toLowerCase();
  const targetCity = selectedCity.toLowerCase();

  if (loc.includes(targetCity)) return true;
  const keywords = cityAreaMap[targetCity] || [];
  return keywords.some(key => loc.includes(key));
}

export default function SellerHome() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/properties')
      .then((res) => setProperties(res.data))
      .catch(console.error);
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesLoc = matchesLocation(prop.location || prop.title, selectedLocation);
    const matchesSearch = searchQuery
      ? (prop.title + ' ' + prop.location).toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesLoc && matchesSearch;
  });

  const myActiveListings = filteredProperties.slice(0, 2); 
  const marketTrends = filteredProperties.slice(2);

  return (
    <div className="p-4 pt-12 pb-24 bg-white dark:bg-neutral-950 min-h-screen font-sans relative">
      
      {/* Location Selector Pill */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setShowLocationSheet(true)}
          className="flex items-center gap-1.5 bg-gray-100 dark:bg-neutral-900 pl-3 pr-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition active:scale-95 shadow-sm"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <MapPin size={12} />
          </div>
          <span className="text-xs font-black text-black dark:text-white">{selectedLocation}</span>
          <ChevronDown size={14} className="text-gray-500 ml-1" />
        </button>
      </div>

      {/* Top Search Bar & Notification Bell */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search market trends..."
            className="w-full bg-gray-100 dark:bg-neutral-900 rounded-full py-3.5 pl-11 pr-4 text-[13px] font-semibold outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-gray-500 text-black dark:text-white"
          />
        </div>
        <button
          onClick={() => navigate('/notifications')}
          className="w-12 h-12 shrink-0 rounded-full bg-gray-100 dark:bg-neutral-900 flex items-center justify-center relative hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
        >
          <Bell size={20} className="text-black dark:text-white" />
          <span className="absolute top-3 right-3.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-gray-100 dark:border-neutral-900"></span>
        </button>
      </div>

      {/* Section 1: My Active Portfolio */}
      <div className="flex justify-between items-end mb-3">
        <h2 className="text-lg font-black text-black dark:text-white">My Portfolio</h2>
        <button onClick={() => navigate('/upload')} className="text-[#009dff] text-xs font-bold flex items-center gap-1">
          <Plus size={14} /> Add New
        </button>
      </div>

      <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar snap-x">
        {myActiveListings.length === 0 ? (
          <div onClick={() => navigate('/upload')} className="w-[140px] h-32 rounded-2xl border-2 border-dashed border-gray-200 dark:border-neutral-800 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-900 transition shrink-0 snap-start">
            <Plus size={24} className="mb-1" />
            <span className="text-[11px] font-bold text-center">List Property</span>
          </div>
        ) : (
          myActiveListings.map((prop) => (
            <div
              key={prop.id}
              onClick={() => setSelectedProperty(prop)}
              className="min-w-[140px] max-w-[140px] shrink-0 snap-start cursor-pointer group"
            >
              <div className="w-full h-32 rounded-2xl bg-gray-100 dark:bg-neutral-900 overflow-hidden relative mb-2">
                <img
                  src={prop.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-0 left-0 bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded-br-xl">
                  Active
                </span>
              </div>
              <h3 className="text-xs text-gray-500 dark:text-gray-400 truncate">{prop.title}</h3>
              <p className="text-[14px] font-black mt-0.5 text-black dark:text-white">
                ₹{Number(prop.price).toLocaleString('en-IN')}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Section 2: Market Trends */}
      <h2 className="text-lg font-black mb-3 mt-4 text-black dark:text-white">
        Market Trends in {selectedLocation === 'All Locations' ? 'Everywhere' : selectedLocation}
      </h2>

      {filteredProperties.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-neutral-900 rounded-3xl border border-dashed border-gray-200 dark:border-neutral-800 my-4">
          <MapPin size={32} className="mx-auto text-gray-400 mb-2 opacity-60" />
          <h3 className="text-sm font-black text-black dark:text-white">No listings in {selectedLocation}</h3>
          <p className="text-xs text-gray-500 mt-1 mb-4">Try selecting another city or view all market listings.</p>
          <button
            onClick={() => setSelectedLocation('All Locations')}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-full font-bold text-xs flex items-center gap-1.5 mx-auto shadow-md"
          >
            <RefreshCw size={14} /> Show All Locations ({properties.length})
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {(marketTrends.length > 0 ? marketTrends : filteredProperties).map((prop) => (
            <div
              key={prop.id}
              onClick={() => setSelectedProperty(prop)}
              className="cursor-pointer group flex flex-col"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-gray-100 dark:bg-neutral-900 overflow-hidden relative mb-2">
                <img
                  src={prop.image_url || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{prop.title}</h3>
              <p className="text-[14px] font-black mt-0.5 leading-none text-black dark:text-white">
                ₹{Number(prop.price).toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-0.5 truncate mt-1">
                <MapPin size={10} /> {prop.location}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Location Bottom Sheet */}
      {showLocationSheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-neutral-950 w-full max-w-sm rounded-t-[32px] sm:rounded-[36px] p-6 pb-10 animate-in slide-in-from-bottom-10 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Select Market City</h3>
              <button onClick={() => setShowLocationSheet(false)} className="p-2 bg-gray-100 dark:bg-neutral-900 rounded-full">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto no-scrollbar">
              {CITIES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationSheet(false);
                  }}
                  className={`w-full flex justify-between items-center p-4 rounded-2xl font-bold text-sm transition ${
                    selectedLocation === loc 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-neutral-900 dark:text-gray-300 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{loc}</span>
                  {selectedLocation === loc && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}