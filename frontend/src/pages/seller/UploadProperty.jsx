import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export default function UploadProperty() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    bedrooms: '3',
    bathrooms: '2',
    area_sqft: '1200',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/properties', formData);
      navigate('/seller-home');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Failed to list property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-14 pb-24">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-black">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black">List New Property</h1>
      </div>

      {error && <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Title</label>
          <input
            type="text"
            required
            placeholder="Luxury Villa in Indiranagar"
            className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Price (₹)</label>
          <input
            type="number"
            required
            placeholder="12500000"
            className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Location</label>
          <input
            type="text"
            required
            placeholder="Bangalore, Karnataka"
            className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Beds</label>
            <input
              type="number"
              className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Baths</label>
            <input
              type="number"
              className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Sq Ft</label>
            <input
              type="number"
              className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
              value={formData.area_sqft}
              onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Image URL</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            className="w-full mt-1 p-3 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 outline-none"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-xs shadow-xl transition disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Property Listing'}
        </button>
      </form>
    </div>
  );
}