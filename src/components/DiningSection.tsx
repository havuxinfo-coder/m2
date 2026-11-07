import React, { useState } from 'react';
import { Utensils, Wine, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DiningSection: React.FC = () => {
  const { t } = useLanguage();
  const venues = [
    {
      id: 'annette',
      name: 'Annette Bar & Brasserie',
      hotel: 'Le Grand Hôtel Cayré',
      city: 'Paris · Saint-Germain-des-Prés',
      type: 'French Bistro & Speakeasy Bar',
      image: '/src/assets/images/dining_annette_bar_1793926424811.jpg',
      hours: '07:30 – 01:00 Daily',
      description: 'Named after the spirited bohemian muse of 1920s Paris, Annette unites Parisian bistro classics with modern cocktail alchemy. Linger over roasted sole meunière, house vermouth concoctions, and hand-cut tartares in plush velvet banquettes.',
      specialties: ['Artisan French Vermouth Cocktails', 'Truffled Croque Monsieur', 'Café Crème & Fresh Pastries', 'Grand Cru Champagne by the Glass']
    },
    {
      id: 'volta',
      name: 'Volta Restaurant & Courtyard',
      hotel: 'Borneta',
      city: 'Barcelona · El Born',
      type: 'Catalan Open-Fire Grill',
      image: '/src/assets/images/hotel_borneta_barcelona_1793926422956.jpg',
      hours: '12:30 – 23:30 Daily',
      description: 'Centered around an open hearth in our terracotta sunlit courtyard, Volta serves hyper-seasonal Catalan plates, fire-roasted Mediterranean octopus, and small-batch biodynamic Priorat wines under arched brick vaults.',
      specialties: ['Wood-Fired Wild Sea Bass', 'Heirloom Tomato & Stracciatella', 'Charcoal Paella de Marisco', 'Natural Catalan Orange Wine']
    },
    {
      id: 'orangery',
      name: 'The Orangery',
      hotel: 'Templeton Garden',
      city: 'London · Kensington',
      type: 'Botanical Glasshouse & Gin Parlour',
      image: '/src/assets/images/hotel_templeton_london_1793926423211.jpg',
      hours: '08:00 – 23:00 Daily',
      description: 'Overlooking a private one-acre English garden, The Orangery is bathed in natural daylight. Enjoy leisurely British botanical breakfasts, floral-infused gin tastings, and bespoke afternoon tea with house-baked scones.',
      specialties: ['Garden Herbal Infusion Teas', 'English Sparkling Wine', 'Scottish Smoked Salmon Scramble', 'House-Distilled Botanical Gin']
    },
    {
      id: 'mansard-alpine',
      name: 'The Mansard Alpine Lounge',
      hotel: 'The Mansard',
      city: 'Gstaad · Switzerland',
      type: 'Swiss Mountain Brasserie & Hearth Bar',
      image: '/src/assets/images/hotel_mansard_gstaad_1793988153499.jpg',
      hours: '11:00 – 00:00 Daily',
      description: 'At the foot of the snow-covered Bernese peaks, The Mansard Alpine Lounge pairs artisanal Swiss raclette, truffle fondue, and herbal spirits with a roaring open stone fireplace.',
      specialties: ['Truffled Gruyère Fondue', 'Swiss Alpine Herbal Vermouth', 'Dry-Aged Simmental Beef', 'Artisan Valais Natural Wines']
    },
    {
      id: 'rudolf-salon',
      name: 'Rudolf Imperial Salon',
      hotel: 'Palais Rudolf',
      city: 'Vienna · Ringstraße',
      type: 'Modern Viennese Grand Café & Bar',
      image: '/src/assets/images/hotel_palais_rudolf_1793988153526.jpg',
      hours: '07:30 – 01:00 Daily',
      description: 'Under 19th-century stucco ceilings and gilded chandeliers, Rudolf Imperial Salon elevates classic Viennese grand café culture with contemporary patisserie, Tafelspitz croquettes, and reserve Austrian Riesling.',
      specialties: ['Bespoke Melange Coffee', 'Golden Imperial Schnitzel', 'Grand Reserve Austrian Sekt', 'Hand-Laminated Sachertorte']
    }
  ];

  const [activeVenue, setActiveVenue] = useState(venues[0]);
  const [tableReserved, setTableReserved] = useState(false);

  return (
    <section id="dining" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 max-w-2xl mb-12">
        <div className="text-xs uppercase tracking-widest text-[#736B63] font-medium">
          {t.dining.kicker}
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1715] tracking-tight">
          {t.dining.headline}
        </h2>
        <p className="text-[#59524A] text-base leading-relaxed">
          {t.dining.description}
        </p>
      </div>

      {/* Featured Venue Layout */}
      <div className="bg-[#FBF9F5] border border-[#E8E2D9] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-sm">
        {/* Left: Venue Image with Scrim */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] bg-[#1A1715]">
          <img
            src={activeVenue.image}
            alt={activeVenue.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#DDD5C7]">
              {activeVenue.city}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              {activeVenue.name}
            </h3>
            <p className="text-xs text-[#DDD5C7]">{activeVenue.hotel}</p>
          </div>
        </div>

        {/* Right: Venue Details & Selector */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Selector tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9E0] rounded-lg">
              {venues.map((v) => {
                const shortLabel =
                  v.id === 'annette'
                    ? 'Paris · Annette'
                    : v.id === 'volta'
                    ? 'Barcelona · Volta'
                    : v.id === 'orangery'
                    ? 'London · Orangery'
                    : v.id === 'mansard-alpine'
                    ? 'Gstaad · Mansard'
                    : 'Vienna · Rudolf';
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setActiveVenue(v);
                      setTableReserved(false);
                    }}
                    className={`py-1.5 px-2.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      activeVenue.id === v.id
                        ? 'bg-white text-[#1A1715] shadow-xs font-semibold'
                        : 'text-[#736B63] hover:text-[#1A1715]'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-[#736B63]">
                <div className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>{activeVenue.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>{activeVenue.hours}</span>
                </div>
              </div>

              <p className="text-sm text-[#59524A] leading-relaxed">
                {activeVenue.description}
              </p>
            </div>

            {/* Signature Specialties */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1A1715]">
                {t.dining.signatureDish}:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeVenue.specialties.map((item) => (
                  <div
                    key={item}
                    className="p-2.5 bg-[#F4EFEB] rounded-md text-xs text-[#4A443E] font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table reservation request status */}
          <div className="pt-4 border-t border-[#E8E2D9]">
            {tableReserved ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
                <span>✓ Table request submitted to {activeVenue.name} host team.</span>
                <button
                  onClick={() => setTableReserved(false)}
                  className="font-semibold underline ml-2 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            ) : (
              <button
                onClick={() => setTableReserved(true)}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.dining.reserveTable} · {activeVenue.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
