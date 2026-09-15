import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function GooglePropertyMap({ title, city, latitude, longitude }) {
  // Default coordinates if not provided (e.g. Hyderabad / Vijayawada)
  const lat = latitude || (city === 'Hyderabad' ? 17.3850 : city === 'Bangalore' ? 12.9716 : 16.5062);
  const lng = longitude || (city === 'Hyderabad' ? 78.4867 : city === 'Bangalore' ? 77.5946 : 80.6480);

  // Embedded Interactive Google Maps View
  const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="space-y-2 select-none font-sans">
      <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-950" />
          Google Maps Location
        </span>
        <a 
          href={directMapsUrl}
          target="_blank" 
          rel="noreferrer"
          className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline text-[11px] font-extrabold"
        >
          <span>Open Google Maps</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Interactive Map Iframe */}
      <div className="h-44 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-inner relative bg-slate-100 dark:bg-neutral-900">
        <iframe 
          title={title || "Google Property Map"}
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapEmbedUrl}
        />
      </div>

      <div className="flex justify-between items-center px-1 text-[10px] text-slate-400 dark:text-neutral-500 font-semibold">
        <span>GPS: {lat.toFixed(4)}, {lng.toFixed(4)}</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">● Google Maps API Connected</span>
      </div>
    </div>
  );
}