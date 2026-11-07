import React, { useState } from 'react';
import { Hotel, BrandSettings } from '../types';
import { Calendar, MapPin, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  hotels: Hotel[];
  settings: BrandSettings;
  onQuickBook: (params: { hotelId: string; checkIn: string; checkOut: string; adults: number }) => void;
  onExploreHotels: () => void;
}

export const Hero: React.FC<HeroProps> = ({ hotels, settings, onQuickBook, onExploreHotels }) => {
  const { t } = useLanguage();
  // Today's date + 7 days
  const today = new Date();
  const defaultCheckIn = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultCheckOut = new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [selectedHotelId, setSelectedHotelId] = useState<string>(hotels[0]?.id || 'le-grand-hotel-cayre');
  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [adults, setAdults] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({
      hotelId: selectedHotelId,
      checkIn,
      checkOut,
      adults
    });
  };

  return (
    <section id="hero" className="relative bg-[#1A1715] text-[#FBF9F5] overflow-hidden min-h-[85vh] flex flex-col justify-between">
      {/* Background Image with luxury editorial gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_miirovelle_paris_1793926422274.jpg"
          alt="Le Grand Hôtel Cayré by Miirovelle on Boulevard Raspail Paris"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim for 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1715] via-[#1A1715]/60 to-[#1A1715]/40" />
      </div>

      {/* Top Banner Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Unboxed natural editorial kicker */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-widest uppercase text-[#DDD5C7] font-medium">
            <span className="whitespace-nowrap">{t.hero.kickerPrefix} · {settings.brandName || 'Miirovelle'}</span>
            {t.hero.kickerCities.map((city) => (
              <React.Fragment key={city}>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span className="whitespace-nowrap">{city}</span>
              </React.Fragment>
            ))}
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
            {t.hero.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#DDD5C7] font-light leading-relaxed max-w-2xl">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreHotels}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white hover:text-[#C86D51] transition-colors py-2 border-b border-white/40 hover:border-[#C86D51] cursor-pointer"
            >
              <span>{t.hero.exploreHotels}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Booking Strip with Real-Time Database Sync Check */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-[#FBF9F5] text-[#1A1715] rounded-xl shadow-2xl p-4 sm:p-6 border border-[#E8E2D9]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Hotel Destination */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#736B63] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
                {t.hero.form.destination}
              </label>
              <select
                value={selectedHotelId}
                onChange={(e) => setSelectedHotelId(e.target.value)}
                className="w-full bg-[#EFE9E0]/60 border border-[#DDD5C7] rounded-md px-3.5 py-2.5 text-sm font-medium text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
              >
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} — {h.city} ({h.neighborhood})
                  </option>
                ))}
              </select>
            </div>

            {/* Check In */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#736B63] font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
                {t.hero.form.checkIn}
              </label>
              <input
                type="date"
                value={checkIn}
                min={today.toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full bg-[#EFE9E0]/60 border border-[#DDD5C7] rounded-md px-3 py-2.5 text-sm font-medium text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
              />
            </div>

            {/* Check Out */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#736B63] font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
                {t.hero.form.checkOut}
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || today.toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full bg-[#EFE9E0]/60 border border-[#DDD5C7] rounded-md px-3 py-2.5 text-sm font-medium text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
              />
            </div>

            {/* Action CTA */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#1A1715] hover:bg-[#C86D51] text-white py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.hero.form.submitBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Sync guarantee footer */}
          <div className="mt-3 pt-3 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between text-xs text-[#736B63] gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.hero.form.bestRate} · {t.hero.form.instantSync}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>{t.hero.form.directBooking}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
