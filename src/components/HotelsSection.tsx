import React, { useState } from 'react';
import { Hotel } from '../types';
import { MapPin, Utensils, Star, ArrowUpRight, BedDouble } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HotelsSectionProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
  onBookHotel: (hotelId: string) => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({ hotels, onSelectHotel, onBookHotel }) => {
  const { t } = useLanguage();
  const [activeCity, setActiveCity] = useState<string>('all');

  const filteredHotels = activeCity === 'all'
    ? hotels
    : hotels.filter((h) => h.city.toLowerCase() === activeCity.toLowerCase());

  const cities = ['all', 'London', 'Paris', 'Barcelona', 'Vienna', 'Gstaad'];

  return (
    <section id="hotels" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & City Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E8E2D9]">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-[#736B63] font-medium">
            {t.hotels.kicker}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1715] tracking-tight">
            {t.hotels.headline}
          </h2>
          <p className="text-[#59524A] text-base leading-relaxed">
            {t.hotels.description}
          </p>
        </div>

        {/* City Filter Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9E0] rounded-lg self-start md:self-auto">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeCity === city
                  ? 'bg-white text-[#1A1715] shadow-xs font-semibold'
                  : 'text-[#59524A] hover:text-[#1A1715]'
              }`}
            >
              {city === 'all' ? t.hotels.filterAll : city}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-12">
        {filteredHotels.map((hotel) => {
          const lowestRate = Math.min(...hotel.rooms.map((r) => r.pricePerNight));
          const currencySymbol = hotel.rooms[0]?.currency === 'GBP' ? '£' : hotel.rooms[0]?.currency === 'CHF' ? 'CHF ' : '€';

          return (
            <div
              key={hotel.id}
              className="group bg-[#FBF9F5] border border-[#E8E2D9] rounded-xl overflow-hidden hover:border-[#C86D51]/50 transition-all duration-300 flex flex-col"
            >
              {/* Hotel Imagery Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9E0]">
                <img
                  src={hotel.image}
                  alt={`${hotel.name} in ${hotel.city}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* City & Rating Header Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-[#1A1715]/80 backdrop-blur-md px-3 py-1 rounded-sm tracking-wider uppercase font-semibold text-[11px]">
                    {hotel.city}, {hotel.country}
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#1A1715]/80 backdrop-blur-md px-2.5 py-1 rounded-sm font-mono text-[11px]">
                    <Star className="w-3.5 h-3.5 fill-[#C48044] text-[#C48044]" />
                    <span>{hotel.rating}</span>
                    <span className="text-[#DDD5C7]/70">({hotel.reviewsCount})</span>
                  </div>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-wider text-[#DDD5C7] font-medium">
                    {hotel.neighborhood}
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">
                    {hotel.name}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-sm text-[#59524A] leading-relaxed line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Dining Highlight */}
                  <div className="flex items-start gap-3 p-3 bg-[#F4EFEB] rounded-lg text-xs text-[#4A443E]">
                    <Utensils className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1A1715]">{hotel.dining.name}:</span>{' '}
                      <span>{hotel.dining.description}</span>
                    </div>
                  </div>

                  {/* Amenities (clean unboxed text with bullet separators) */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#736B63]">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                      <React.Fragment key={amenity}>
                        {idx > 0 && <span aria-hidden="true">·</span>}
                        <span>{amenity}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Footer Strip with Price & Actions */}
                <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#736B63]">
                      {t.hotels.from}
                    </div>
                    <div className="font-mono text-xl font-bold text-[#1A1715] tabular-nums">
                      {currencySymbol}{lowestRate}
                      <span className="text-xs font-sans font-normal text-[#736B63]"> / {t.hotels.night}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectHotel(hotel)}
                      className="px-3.5 py-2 text-xs font-medium text-[#1A1715] hover:bg-[#EFE9E0] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>{t.hotelDetail.roomsTab} ({hotel.rooms.length})</span>
                    </button>
                    <button
                      onClick={() => onBookHotel(hotel.id)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.hotels.bookNow}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
