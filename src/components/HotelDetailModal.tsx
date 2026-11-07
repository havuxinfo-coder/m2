import React from 'react';
import { Hotel, Room } from '../types';
import { X, MapPin, Phone, Mail, Users, BedDouble, Maximize, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HotelDetailModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onSelectRoomToBook: (hotelId: string, roomId: string) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  onClose,
  onSelectRoomToBook,
}) => {
  const { t } = useLanguage();
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#736B63] font-medium">
              {hotel.city}, {hotel.country} · {hotel.neighborhood}
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
              {hotel.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736B63] hover:text-[#1A1715] hover:bg-[#EFE9E0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Hero Banner inside modal */}
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-[#1A1715]">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs sm:text-sm text-[#DDD5C7] italic max-w-xl">
                "{hotel.tagline}"
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#DDD5C7]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {hotel.address}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {hotel.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {hotel.email}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#1A1715]">
                {t.hotelDetail.overviewTab}
              </h3>
              <p className="text-sm text-[#59524A] leading-relaxed">
                {hotel.description}
              </p>
            </div>
            <div className="space-y-3 p-4 bg-[#F4EFEB] rounded-xl border border-[#E8E2D9]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1715]">
                {t.hotelDetail.amenitiesTab}
              </h4>
              <ul className="space-y-2 text-xs text-[#59524A]">
                {hotel.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available Rooms Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                {t.hotelDetail.roomsTab}
              </h3>
              <span className="text-xs text-[#736B63]">
                {hotel.rooms.length} {t.common.rooms}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotel.rooms.map((room) => {
                const currencySymbol = room.currency === 'GBP' ? '£' : room.currency === 'CHF' ? 'CHF ' : '€';
                return (
                  <div
                    key={room.id}
                    className="p-4 bg-white border border-[#E8E2D9] rounded-xl hover:border-[#C86D51] transition-all flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-lg font-bold text-[#1A1715]">
                          {room.name}
                        </h4>
                        <span className="font-mono text-base font-bold text-[#1A1715] tabular-nums whitespace-nowrap">
                          {currencySymbol}{room.pricePerNight}
                          <span className="text-xs font-normal text-[#736B63] font-sans"> / {t.hotels.night}</span>
                        </span>
                      </div>

                      {/* Room specs */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#736B63]">
                        <span className="flex items-center gap-1">
                          <Maximize className="w-3.5 h-3.5" />
                          {room.sizeM2} m²
                        </span>
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5" />
                          {room.bedType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {room.maxGuests} {t.common.guests}
                        </span>
                      </div>

                      <div className="text-xs text-[#59524A] italic">
                        {t.hotelDetail.view}: {room.view}
                      </div>

                      {/* Room features */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {room.features.map((feat) => (
                          <span
                            key={feat}
                            className="text-[11px] px-2 py-0.5 bg-[#F4EFEB] text-[#4A443E] rounded"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                      <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        <span>{room.totalInventory} in local database</span>
                      </div>
                      <button
                        onClick={() => {
                          onSelectRoomToBook(hotel.id, room.id);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t.bookingModal.selectThisRoom}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
