import React from 'react';
import { X, MapPin, Bed, Bath, Maximize, MessageSquare, ExternalLink } from 'lucide-react';

// Smart City & Area Resolver so Google Maps ALWAYS pins the correct city
function getResolvedAddress(title = '', location = '') {
  const combined = `${location} ${title}`.toLowerCase();

  if (combined.includes('banjara') || combined.includes('hitech') || combined.includes('hyderabad') || combined.includes('jubilee') || combined.includes('gachibowli')) {
    const area = location || 'Banjara Hills';
    return {
      display: area.toLowerCase().includes('hyderabad') ? area : `${area}, Hyderabad`,
      query: `${area}, Hyderabad, Telangana, India`
    };
  }

  if (combined.includes('coimbatore') || combined.includes('race course')) {
    const area = location || 'Race Course';
    return {
      display: area.toLowerCase().includes('coimbatore') ? area : `${area}, Coimbatore`,
      query: `${area}, Coimbatore, Tamil Nadu, India`
    };
  }

  if (combined.includes('andheri') || combined.includes('bandra') || combined.includes('mumbai') || combined.includes('powai') || combined.includes('juhu') || combined.includes('worli')) {
    const area = location || 'Bandra';
    return {
      display: area.toLowerCase().includes('mumbai') ? area : `${area}, Mumbai`,
      query: `${area}, Mumbai, Maharashtra, India`
    };
  }

  if (combined.includes('delhi') || combined.includes('noida') || combined.includes('gurgaon') || combined.includes('gurugram') || combined.includes('dwarka')) {
    const area = location || 'Gurgaon';
    return {
      display: area.toLowerCase().includes('delhi') || area.toLowerCase().includes('gurgaon') ? area : `${area}, Delhi NCR`,
      query: `${area}, Delhi NCR, India`
    };
  }

  if (combined.includes('chennai') || combined.includes('anna nagar') || combined.includes('omr') || combined.includes('adyar')) {
    const area = location || 'Anna Nagar';
    return {
      display: area.toLowerCase().includes('chennai') ? area : `${area}, Chennai`,
      query: `${area}, Chennai, Tamil Nadu, India`
    };
  }

  if (combined.includes('pune') || combined.includes('baner') || combined.includes('hinjewadi') || combined.includes('viman nagar')) {
    const area = location || 'Baner';
    return {
      display: area.toLowerCase().includes('pune') ? area : `${area}, Pune`,
      query: `${area}, Pune, Maharashtra, India`
    };
  }

  if (combined.includes('indiranagar') || combined.includes('koramangala') || combined.includes('whitefield') || combined.includes('bangalore') || combined.includes('bengaluru') || combined.includes('hsr')) {
    const area = location || 'Indiranagar';
    return {
      display: area.toLowerCase().includes('bangalore') || area.toLowerCase().includes('bengaluru') ? area : `${area}, Bangalore`,
      query: `${area}, Bangalore, Karnataka, India`
    };
  }

  // Fallback
  const fallback = location || title || 'India';
  return {
    display: fallback,
    query: `${fallback}, India`
  };
}

export default function PropertyDetailsModal({ property, onClose }) {
  if (!property) return null;

  const { display: displayLocation, query: fullAddress } = getResolvedAddress(property.title, property.location);

  const encodedLocation = encodeURIComponent(fullAddress);
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapAppUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

  const handleWhatsApp = () => {
    const text = `Hi, I am interested in your property listing: "${property.title}" in ${displayLocation} priced at ₹${Number(property.price).toLocaleString('en-IN')}. Is it still available?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white dark:bg-neutral-950 w-full max-w-sm h-[90%] sm:h-[780px] rounded-t-[32px] sm:rounded-[36px] overflow-hidden flex flex-col relative shadow-2xl border border-gray-100 dark:border-neutral-800 animate-in slide-in-from-bottom duration-300">
        
        {/* Header Image */}
        <div className="relative h-60 shrink-0">
          <img
            src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-black text-white backdrop-blur-md rounded-full transition active:scale-95"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-3 left-4 bg-black/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide">
            ₹{Number(property.price).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="p-5 flex-1 overflow-y-auto no-scrollbar space-y-5 text-black dark:text-white">
          <div>
            <h2 className="text-xl font-black leading-snug">{property.title}</h2>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 mt-1.5">
              <MapPin size={14} className="shrink-0" />
              {displayLocation}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 dark:border-neutral-800">
            <div className="p-3 bg-gray-50 dark:bg-neutral-900 rounded-2xl text-center">
              <Bed size={18} className="mx-auto text-blue-500 mb-1" />
              <p className="text-xs font-extrabold">{property.bedrooms || 3} Beds</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-neutral-900 rounded-2xl text-center">
              <Bath size={18} className="mx-auto text-emerald-500 mb-1" />
              <p className="text-xs font-extrabold">{property.bathrooms || 2} Baths</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-neutral-900 rounded-2xl text-center">
              <Maximize size={18} className="mx-auto text-purple-500 mb-1" />
              <p className="text-xs font-extrabold">{property.area_sqft || 1200} sqft</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
              Description
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              {property.description ||
                `Boutique apartment located in prime ${displayLocation} featuring Italian marble flooring, spacious balconies, double basement car parking, and 24/7 security.`}
            </p>
          </div>

          {/* Exact Google Map Embed */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                Location Map ({displayLocation})
              </h3>
              <a
                href={googleMapAppUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-blue-500 flex items-center gap-1 hover:underline"
              >
                Open Google Maps <ExternalLink size={12} />
              </a>
            </div>

            <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900 shadow-inner">
              <iframe
                key={encodedLocation}
                title={`Map of ${displayLocation}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={googleMapEmbedUrl}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 shrink-0">
          <button
            onClick={handleWhatsApp}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98]"
          >
            <MessageSquare size={16} /> Contact Owner on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}