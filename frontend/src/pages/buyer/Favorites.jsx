import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import { getFavorites, toggleFavorite } from '../../services/favorites';
import PropertyDetailsModal from '../../components/PropertyDetailsModal';

export default function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites());
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const syncFavs = () => setFavorites(getFavorites());
    window.addEventListener('ef_favorites_updated', syncFavs);
    return () => window.removeEventListener('ef_favorites_updated', syncFavs);
  }, []);

  const handleRemove = (e, prop) => {
    e.stopPropagation();
    toggleFavorite(prop);
  };

  return (
    <div className="p-6 pt-14 pb-24 bg-white dark:bg-neutral-950 min-h-screen">
      <h1 className="text-2xl font-black text-black dark:text-white">Saved Properties</h1>
      <p className="text-xs text-gray-500 mt-1">Your shortlisted listings ({favorites.length})</p>

      {favorites.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <Heart size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-bold">No saved properties yet</p>
          <p className="text-xs mt-1">Tap the heart icon on any property to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6">
          {favorites.map((prop) => (
            <div
              key={prop.id}
              onClick={() => setSelectedProperty(prop)}
              className="p-3 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              <img
                src={prop.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                className="w-20 h-20 rounded-xl object-cover"
                alt={prop.title}
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate text-black dark:text-white">
                  {prop.title}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin size={12} /> {prop.location || prop.city}
                </p>
                <p className="text-sm font-extrabold mt-2 text-black dark:text-white">
                  ₹{Number(prop.price).toLocaleString('en-IN')}
                </p>
              </div>

              <button
                onClick={(e) => handleRemove(e, prop)}
                className="self-start p-2 rounded-full bg-red-50 dark:bg-red-950/50 text-red-500 hover:bg-red-100 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}