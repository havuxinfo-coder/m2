import React, { useState, useEffect } from 'react';
import { Hotel, Room, Reservation, AvailabilityResult } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Calendar,
  Users,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  BedDouble,
  Receipt,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
  initialHotelId?: string;
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  onReservationCreated: (reservation: Reservation) => void;
  onOpenManagement: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  hotels,
  initialHotelId,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  onReservationCreated,
  onOpenManagement
}) => {
  const { t } = useLanguage();

  const today = new Date();
  const defaultIn = initialCheckIn || new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultOut = initialCheckOut || new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [hotelId, setHotelId] = useState<string>(initialHotelId || hotels[0]?.id || 'le-grand-hotel-cayre');
  const [checkIn, setCheckIn] = useState<string>(defaultIn);
  const [checkOut, setCheckOut] = useState<string>(defaultOut);
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(0);
  const [roomId, setRoomId] = useState<string>(initialRoomId || '');
  
  // Selected add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Guest Info
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Status & states
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, AvailabilityResult>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const selectedHotel = hotels.find((h) => h.id === hotelId) || hotels[0];
  const selectedRoom = selectedHotel?.rooms.find((r) => r.id === roomId) || selectedHotel?.rooms[0];

  // Auto-select first room if roomId not set or not in current hotel
  useEffect(() => {
    if (!isOpen) return;
    if (selectedHotel && (!roomId || !selectedHotel.rooms.some((r) => r.id === roomId))) {
      setRoomId(selectedHotel.rooms[0]?.id || '');
    }
  }, [isOpen, hotelId, selectedHotel, roomId]);

  // Check live availability from the local database whenever hotel, checkIn, or checkOut changes
  useEffect(() => {
    if (!isOpen || !selectedHotel || !checkIn || !checkOut) return;
    let isCancelled = false;
    setIsCheckingAvailability(true);

    const checkAllRooms = async () => {
      const results: Record<string, AvailabilityResult> = {};
      try {
        await Promise.all(
          selectedHotel.rooms.map(async (rm) => {
            const avail = await api.checkAvailability(selectedHotel.id, rm.id, checkIn, checkOut);
            results[rm.id] = avail;
          })
        );
        if (!isCancelled) {
          setAvailabilityMap(results);
        }
      } catch (err) {
        console.error('Failed to check availability:', err);
      } finally {
        if (!isCancelled) setIsCheckingAvailability(false);
      }
    };

    checkAllRooms();
    return () => {
      isCancelled = true;
    };
  }, [isOpen, hotelId, checkIn, checkOut, selectedHotel]);

  // Calculate nights
  const nights = Math.max(
    1,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  );

  // Available add-on options with localized titles
  const addOnOptions = [
    {
      id: 'Artisan French Breakfast Daily',
      label: t.bookingModal.addOnItems.breakfast.title,
      desc: t.bookingModal.addOnItems.breakfast.desc,
      price: 28 * nights * adults,
      displayPrice: t.bookingModal.addOnItems.breakfast.price
    },
    {
      id: 'Guaranteed 2:00 PM Late Departure',
      label: t.bookingModal.addOnItems.lateCheckout.title,
      desc: t.bookingModal.addOnItems.lateCheckout.desc,
      price: 45,
      displayPrice: t.bookingModal.addOnItems.lateCheckout.price
    },
    {
      id: 'Chauffeur Airport Transfer',
      label: t.bookingModal.addOnItems.airportTransfer.title,
      desc: t.bookingModal.addOnItems.airportTransfer.desc,
      price: 95,
      displayPrice: t.bookingModal.addOnItems.airportTransfer.price
    },
    {
      id: 'Signature Sleep Botanical Wellness Box',
      label: t.bookingModal.addOnItems.wellnessKit.title,
      desc: t.bookingModal.addOnItems.wellnessKit.desc,
      price: 35,
      displayPrice: t.bookingModal.addOnItems.wellnessKit.price
    }
  ];

  const roomSubtotal = (selectedRoom?.pricePerNight || 0) * nights;
  const addOnsTotal = selectedAddOns.reduce((sum, title) => {
    const opt = addOnOptions.find((o) => o.id === title);
    return sum + (opt ? opt.price : 0);
  }, 0);
  const grandTotal = roomSubtotal + addOnsTotal;
  const currencySymbol = selectedRoom?.currency === 'GBP' ? '£' : selectedRoom?.currency === 'CHF' ? 'CHF ' : '€';

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      setErrorMessage('Please provide your full name and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.createReservation({
        hotelId: selectedHotel.id,
        roomId: selectedRoom.id,
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        nights,
        adults,
        children,
        roomsCount: 1,
        addOns: selectedAddOns,
        specialRequests
      });

      setConfirmedReservation(res.reservation);
      onReservationCreated(res.reservation);
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to sync reservation with local database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#736B63] font-medium">
              {t.bookingModal.title} · {t.topBanner.dbLive}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
              {step === 4 ? t.bookingModal.confirmation : `${t.bookingModal.title} — ${selectedHotel?.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736B63] hover:text-[#1A1715] hover:bg-[#EFE9E0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (Steps 1 to 3) */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-[#EFE9E0]/60 border-b border-[#E8E2D9] flex items-center justify-between text-xs text-[#736B63]">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-[#1A1715] text-white' : 'bg-[#DDD5C7] text-[#59524A]'}`}>
                1
              </span>
              <span className={step === 1 ? 'font-semibold text-[#1A1715]' : ''}>{t.bookingModal.step1}</span>
            </div>
            <span className="text-[#DDD5C7]">→</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-[#1A1715] text-white' : 'bg-[#DDD5C7] text-[#59524A]'}`}>
                2
              </span>
              <span className={step === 2 ? 'font-semibold text-[#1A1715]' : ''}>{t.bookingModal.addOnsTitle}</span>
            </div>
            <span className="text-[#DDD5C7]">→</span>
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 3 ? 'bg-[#1A1715] text-white' : 'bg-[#DDD5C7] text-[#59524A]'}`}>
                3
              </span>
              <span className={step === 3 ? 'font-semibold text-[#1A1715]' : ''}>{t.bookingModal.step3}</span>
            </div>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Hotel, Dates, Room Selection */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Hotel & Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F4EFEB] rounded-xl border border-[#E8E2D9]">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#736B63] font-medium block mb-1">
                    Hotel Property
                  </label>
                  <select
                    value={hotelId}
                    onChange={(e) => setHotelId(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-2.5 py-2 text-xs font-semibold text-[#1A1715]"
                  >
                    {hotels.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#736B63] font-medium block mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={today.toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-2.5 py-1.5 text-xs font-semibold text-[#1A1715]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#736B63] font-medium block mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-2.5 py-1.5 text-xs font-semibold text-[#1A1715]"
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#E8E2D9] text-xs">
                <span className="text-[#59524A] font-medium">Guests traveling:</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#736B63]">Adults:</span>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="bg-[#EFE9E0] border border-[#DDD5C7] rounded px-2 py-1 font-semibold"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#736B63]">Children:</span>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="bg-[#EFE9E0] border border-[#DDD5C7] rounded px-2 py-1 font-semibold"
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                  </div>
                  <span className="text-[#736B63] font-mono">({nights} nights)</span>
                </div>
              </div>

              {/* Room Selection with Live Database Availability */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#1A1715]">
                    Select Room Category
                  </h3>
                  {isCheckingAvailability && (
                    <span className="text-xs text-[#C86D51] font-mono animate-pulse">
                      Syncing database inventory...
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {selectedHotel.rooms.map((room) => {
                    const isSelected = room.id === roomId;
                    const avail = availabilityMap[room.id];
                    const isSoldOut = avail && avail.availableRooms <= 0;

                    return (
                      <div
                        key={room.id}
                        onClick={() => {
                          if (!isSoldOut) setRoomId(room.id);
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#F4EFEB] border-[#C86D51] shadow-xs'
                            : isSoldOut
                            ? 'bg-neutral-100 opacity-60 border-neutral-200 cursor-not-allowed'
                            : 'bg-white border-[#E8E2D9] hover:border-[#DDD5C7]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-base font-bold text-[#1A1715]">
                              {room.name}
                            </h4>
                            {isSelected && (
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] bg-[#C86D51]/10 px-2 py-0.5 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#736B63]">
                            <span>{room.sizeM2} m²</span>
                            <span aria-hidden="true">·</span>
                            <span>{room.bedType}</span>
                            <span aria-hidden="true">·</span>
                            <span>{room.view}</span>
                          </div>
                          <div className="text-[11px] text-emerald-700 font-medium">
                            {isSoldOut ? (
                              <span className="text-red-600 font-semibold">Sold out for selected dates in database</span>
                            ) : avail ? (
                              `✓ ${avail.availableRooms} of ${avail.totalInventory} rooms available in local DB`
                            ) : (
                              `✓ ${room.totalInventory} rooms in DB`
                            )}
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0">
                          <div className="font-mono text-lg font-bold text-[#1A1715] tabular-nums">
                            {currencySymbol}{room.pricePerNight * nights}
                          </div>
                          <div className="text-[11px] text-[#736B63]">
                            {currencySymbol}{room.pricePerNight} / nt · {nights} nights
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Bespoke Add-ons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                  Enhance Your Stay
                </h3>
                <p className="text-xs text-[#59524A] mt-1">
                  Curated touches to make your stay in {selectedHotel.city} unforgettable.
                </p>
              </div>

              <div className="space-y-3">
                {addOnOptions.map((opt) => {
                  const isChecked = selectedAddOns.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleAddOn(opt.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isChecked
                          ? 'bg-[#F4EFEB] border-[#C86D51]'
                          : 'bg-white border-[#E8E2D9] hover:border-[#DDD5C7]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 h-4 w-4 rounded text-[#C86D51] focus:ring-[#C86D51]"
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-serif text-base font-bold text-[#1A1715]">
                            {opt.label}
                          </h4>
                          <p className="text-xs text-[#59524A]">{opt.desc}</p>
                        </div>
                      </div>

                      <div className="font-mono text-sm font-semibold text-[#1A1715] shrink-0 text-right">
                        {opt.displayPrice}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown Summary */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E2D9] space-y-2 text-xs">
                <div className="flex justify-between text-[#59524A]">
                  <span>{selectedRoom?.name} ({nights} nights):</span>
                  <span className="font-mono tabular-nums">{currencySymbol}{roomSubtotal}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-[#59524A]">
                    <span>Curated Add-ons:</span>
                    <span className="font-mono tabular-nums">+{currencySymbol}{addOnsTotal}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E8E2D9] flex justify-between font-bold text-sm text-[#1A1715]">
                  <span>Total Amount (All Taxes & Fees Included):</span>
                  <span className="font-mono text-base tabular-nums">{currencySymbol}{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Contact Details */}
          {step === 3 && (
            <form id="guest-form" onSubmit={handleConfirmReservation} className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                  Guest Contact Information
                </h3>
                <p className="text-xs text-[#59524A] mt-1">
                  Your reservation confirmation and door key access will be delivered directly to this contact.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1715]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne Westwood"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1715]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vivienne@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1715]">
                    Mobile / WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +33 6 12 34 56 78"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1715]">
                    Estimated Arrival Time
                  </label>
                  <select
                    className="w-full bg-white border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                  >
                    <option>Standard Check-in (15:00 onwards)</option>
                    <option>Early Arrival Request (12:00 – 14:00)</option>
                    <option>Late Evening Arrival (after 21:00)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715]">
                  Special Requests or Dietary Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. High floor quiet room, feather-free pillows, celebrating a birthday..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-white border border-[#DDD5C7] rounded-md p-3 text-xs text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 bg-[#F4EFEB] rounded-xl border border-[#E8E2D9] space-y-2 text-xs">
                <div className="font-semibold text-[#1A1715]">
                  Stay Itinerary: {selectedHotel.name}
                </div>
                <div className="text-[#59524A] flex flex-wrap gap-x-3 gap-y-1">
                  <span>Room: {selectedRoom?.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>Dates: {checkIn} to {checkOut} ({nights} nights)</span>
                  <span aria-hidden="true">·</span>
                  <span>Guests: {adults} adult(s)</span>
                </div>
                <div className="pt-2 border-t border-[#DDD5C7] flex justify-between font-bold text-sm text-[#1A1715]">
                  <span>Total Due at Stay:</span>
                  <span className="font-mono text-base">{currencySymbol}{grandTotal}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation & Local Database Sync Confirmation */}
          {step === 4 && confirmedReservation && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                  Reservation Confirmed & Synced
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1A1715]">
                  We look forward to welcoming you, {confirmedReservation.guestName}
                </h3>
                <p className="text-xs text-[#59524A]">
                  A confirmation voucher has been synchronized with our local database.
                </p>
              </div>

              {/* Booking Voucher Card */}
              <div className="p-6 bg-white border border-[#E8E2D9] rounded-2xl shadow-sm text-left max-w-lg mx-auto space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#736B63]">
                      Booking Reference
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#C86D51] tracking-wide">
                      {confirmedReservation.bookingReference}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded">
                    {confirmedReservation.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#59524A]">
                  <div className="flex justify-between">
                    <span className="text-[#736B63]">Hotel:</span>
                    <span className="font-semibold text-[#1A1715]">{confirmedReservation.hotelName} ({confirmedReservation.hotelCity})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#736B63]">Room Category:</span>
                    <span className="font-semibold text-[#1A1715]">{confirmedReservation.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#736B63]">Dates:</span>
                    <span className="font-mono text-[#1A1715]">{confirmedReservation.checkIn} to {confirmedReservation.checkOut} ({confirmedReservation.nights} nights)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#736B63]">Total Price:</span>
                    <span className="font-mono font-bold text-[#1A1715]">{confirmedReservation.currency === 'GBP' ? '£' : confirmedReservation.currency === 'CHF' ? 'CHF ' : '€'}{confirmedReservation.totalPrice}</span>
                  </div>
                  {confirmedReservation.addOns.length > 0 && (
                    <div className="pt-2 border-t border-[#E8E2D9]">
                      <span className="text-[#736B63] block mb-1">Add-ons:</span>
                      <div className="flex flex-wrap gap-1">
                        {confirmedReservation.addOns.map((add) => (
                          <span key={add} className="px-2 py-0.5 bg-[#F4EFEB] rounded text-[11px] text-[#1A1715]">
                            {add}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#736B63]">
                  <span>Local DB Record ID:</span>
                  <span className="font-mono text-[11px]">{confirmedReservation.id}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold text-[#1A1715] bg-[#EFE9E0] hover:bg-[#E5DDCF] rounded-md flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print Voucher</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenManagement();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors cursor-pointer"
                >
                  View in Local Database Console
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 3) */}
        {step < 4 && (
          <div className="sticky bottom-0 bg-[#FBF9F5] px-6 py-4 border-t border-[#E8E2D9] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 text-xs font-medium text-[#4A443E] hover:text-[#1A1715] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as any)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to {step === 1 ? 'Add-ons' : 'Guest Details'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="guest-form"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C86D51] hover:bg-[#B55F45] rounded-md transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Syncing with Database...</span>
                ) : (
                  <>
                    <span>Confirm & Book ({currencySymbol}{grandTotal})</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
