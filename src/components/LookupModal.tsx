import React, { useState } from 'react';
import { Reservation } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Clock,
  Printer,
  XCircle
} from 'lucide-react';

interface LookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const LookupModal: React.FC<LookupModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const { t } = useLanguage();

  const [reference, setReference] = useState('');
  const [email, setEmail] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setIsSearching(true);
    setErrorMsg(null);
    setReservation(null);
    setCancelSuccessMsg(null);

    try {
      const found = await api.getReservationByReference(reference.trim(), email.trim() || undefined);
      setReservation(found);
    } catch (err: any) {
      setErrorMsg(err.message || t.lookupModal.notFound);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancelReservation = async () => {
    if (!reservation) return;
    if (!confirm('Are you sure you want to cancel this booking? Room inventory will be restored in our local database.')) {
      return;
    }
    try {
      const updated = await api.updateReservationStatus(reservation.id, 'Cancelled');
      setReservation(updated);
      setCancelSuccessMsg(t.lookupModal.cancelSuccess);
    } catch (err: any) {
      alert('Failed to cancel reservation: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#736B63] font-medium">
              {t.topBanner.dbLive}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1A1715]">
              {t.lookupModal.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B63] hover:text-[#1A1715] hover:bg-[#EFE9E0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Lookup Form */}
          <form onSubmit={handleSearch} className="space-y-4 p-4 bg-white rounded-xl border border-[#E8E2D9]">
            <p className="text-xs text-[#59524A]">
              {t.lookupModal.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#736B63] font-medium">
                  {t.lookupModal.refLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.lookupModal.refPlaceholder}
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-xs font-mono font-bold text-[#1A1715] uppercase focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#736B63] font-medium">
                  {t.lookupModal.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={t.lookupModal.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-xs text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isSearching ? t.lookupModal.searching : t.lookupModal.searchBtn}</span>
            </button>
          </form>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{errorMsg}</p>
                <p className="mt-1 text-[11px] text-red-600">
                  Tip: Seeded reference <span className="font-mono font-bold">MRV-88219</span> or <span className="font-mono font-bold">MRV-49120</span>.
                </p>
              </div>
            </div>
          )}

          {cancelSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{cancelSuccessMsg}</span>
            </div>
          )}

          {/* Result Card */}
          {reservation && (
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#736B63]">
                    {t.lookupModal.foundTitle}
                  </span>
                  <div className="font-mono text-xl font-bold text-[#C86D51]">
                    {reservation.bookingReference}
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    reservation.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : reservation.status === 'Checked-In'
                      ? 'bg-sky-100 text-sky-800'
                      : reservation.status === 'Completed'
                      ? 'bg-neutral-100 text-neutral-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {reservation.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#59524A]">
                <div className="flex justify-between">
                  <span className="text-[#736B63]">{t.bookingModal.fullName}:</span>
                  <span className="font-semibold text-[#1A1715]">{reservation.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">{t.lookupModal.hotel}:</span>
                  <span className="font-semibold text-[#1A1715]">{reservation.hotelName} ({reservation.hotelCity})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">{t.lookupModal.room}:</span>
                  <span className="font-semibold text-[#1A1715]">{reservation.roomName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">{t.lookupModal.stayDates}:</span>
                  <span className="font-mono text-[#1A1715]">{reservation.checkIn} to {reservation.checkOut} ({reservation.nights} {t.common.nights})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">{t.lookupModal.totalPaid}:</span>
                  <span className="font-mono font-bold text-[#1A1715]">
                    {reservation.currency === 'GBP' ? '£' : reservation.currency === 'CHF' ? 'CHF ' : '€'}{reservation.totalPrice}
                  </span>
                </div>
                {reservation.addOns.length > 0 && (
                  <div className="pt-2 border-t border-[#E8E2D9]">
                    <span className="text-[#736B63] block mb-1">Add-ons:</span>
                    <div className="flex flex-wrap gap-1">
                      {reservation.addOns.map((add) => (
                        <span key={add} className="px-2 py-0.5 bg-[#F4EFEB] rounded text-[11px] text-[#1A1715]">
                          {add}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs text-[#4A443E] hover:text-[#1A1715] bg-[#EFE9E0] hover:bg-[#E5DDCF] rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.lookupModal.printVoucher}</span>
                </button>

                {reservation.status === 'Confirmed' && (
                  <button
                    onClick={handleCancelReservation}
                    className="px-3 py-1.5 text-xs text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{t.lookupModal.cancelBooking}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
