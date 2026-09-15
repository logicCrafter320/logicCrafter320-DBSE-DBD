import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { triggerFCMNotification } from '../../components/FCMPushNotification';

export default function AddProperty() {
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('Flat');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      await api.post('/properties', {
        title,
        property_type: propertyType,
        price,
        city,
        whatsapp_number: whatsapp, // New!
        video_url: videoUrl,       // New!
        description,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
        seller_id: user.id || null
      });

      // TRIGGER FCM PUSH NOTIFICATION
      triggerFCMNotification(
        'FCM: New Listing Published! 🏠',
        `Your property "${title}" in ${city} is now live with WhatsApp contact.`
      );

      setStatus('✅ Property published to MySQL!');
      setTimeout(() => navigate('/home'), 1200);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to publish property. Check server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 space-y-4 pb-24 font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <div className="pt-2">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">List Your Property</h2>
        <p className="text-xs font-semibold text-slate-400 dark:text-neutral-500">
          Upload details, video tour, and WhatsApp contact.
        </p>
      </div>

      {status && (
        <div className="p-3 text-xs font-bold rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-5 rounded-[28px] border border-slate-100 dark:border-neutral-800 shadow-sm space-y-3">
        <div>
          <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Title</label>
          <input type="text" placeholder="e.g. 3BHK Flat near Benz Circle" value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" required />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Type</label>
            <select value={propertyType} onChange={e=>setPropertyType(e.target.value)} className="w-full px-3 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none transition">
              <option>Flat</option><option>Apartment</option><option>Plot</option><option>Land</option><option>Villa</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Price (₹)</label>
            <input type="number" placeholder="8500000" value={price} onChange={e=>setPrice(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">City / Location</label>
            <input type="text" placeholder="e.g. Vijayawada" value={city} onChange={e=>setCity(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" required />
          </div>
          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">WhatsApp Number</label>
            <input type="tel" placeholder="+91 9876543210" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" required />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Video Tour URL (Optional)</label>
          <input type="url" placeholder="https://youtube.com/watch?v=..." value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" />
        </div>

        <div>
          <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Cover Image URL</label>
          <input type="url" placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={e=>setImageUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" />
        </div>

        <div>
          <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Description</label>
          <textarea rows="3" placeholder="Key property features..." value={description} onChange={e=>setDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-neutral-800 text-slate-800 dark:text-white rounded-2xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-slate-900 transition" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black font-extrabold text-xs rounded-2xl shadow-lg disabled:opacity-50 transition active:scale-[0.98]">
          {loading ? 'Publishing...' : 'Publish Listing & Media'}
        </button>
      </form>
    </div>
  );
}
