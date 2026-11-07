import React, { useState, useEffect } from 'react';
import { Reservation, Hotel, DbStats } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Database,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Upload,
  RotateCcw,
  Plus,
  BedDouble,
  User,
  Calendar,
  Eye,
  Trash2
} from 'lucide-react';

interface ManagementPortalProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
  onReservationUpdated?: () => void;
  onOpenBooking: () => void;
}

export const ManagementPortal: React.FC<ManagementPortalProps> = ({
  isOpen,
  onClose,
  hotels,
  onReservationUpdated,
  onOpenBooking
}) => {
  const { t } = useLanguage();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState<DbStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedHotelFilter, setSelectedHotelFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingReservation, setViewingReservation] = useState<Reservation | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const fetchReservationsAndStats = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const [resList, dbStats] = await Promise.all([
        api.getReservations({
          hotelId: selectedHotelFilter,
          status: selectedStatusFilter,
          search: searchQuery
        }),
        api.getDbStats()
      ]);
      setReservations(resList);
      setStats(dbStats);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    } finally {
      setIsLoading(false);
      if (showRefreshIndicator) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchReservationsAndStats();
    }
  }, [isOpen, selectedHotelFilter, selectedStatusFilter, searchQuery]);

  const handleStatusChange = async (id: string, newStatus: Reservation['status']) => {
    try {
      await api.updateReservationStatus(id, newStatus);
      setActionSuccessMsg(`Reservation status updated to ${newStatus}`);
      setTimeout(() => setActionSuccessMsg(null), 3500);
      fetchReservationsAndStats();
      if (onReservationUpdated) onReservationUpdated();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this reservation record from the local database?')) {
      return;
    }
    try {
      await api.deleteReservation(id);
      setActionSuccessMsg('Reservation removed from local database');
      setTimeout(() => setActionSuccessMsg(null), 3500);
      fetchReservationsAndStats();
      if (onReservationUpdated) onReservationUpdated();
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleExportDatabase = () => {
    window.location.href = '/api/database/export';
  };

  const handleResetDatabase = async () => {
    if (!confirm('Reset local database to initial factory seed with default hotels and reservations?')) {
      return;
    }
    try {
      await api.resetDatabase();
      setActionSuccessMsg('Local database reset to defaults');
      setTimeout(() => setActionSuccessMsg(null), 3500);
      fetchReservationsAndStats();
      if (onReservationUpdated) onReservationUpdated();
    } catch (err: any) {
      alert('Failed to reset: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-4 max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#1A1715] text-[#FBF9F5] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C86D51] text-white flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold tracking-tight">
                  {t.management.title}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded">
                  {t.topBanner.dbLive}
                </span>
              </div>
              <p className="text-xs text-[#DDD5C7]/80">
                {t.management.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchReservationsAndStats(true)}
              className="px-3 py-1.5 text-xs text-[#DDD5C7] hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh DB</span>
            </button>
            <button
              onClick={handleExportDatabase}
              className="px-3 py-1.5 text-xs text-[#DDD5C7] hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.management.exportCsv}</span>
            </button>
            <a
              href="/api/project/download-zip"
              download="miirovelle-hotels-project.zip"
              className="px-3 py-1.5 text-xs text-white bg-[#C86D51] hover:bg-[#b55f45] rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-medium shadow-xs"
              title="Download entire project codebase as a zip archive"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Project (.zip)</span>
            </a>
            <button
              onClick={handleResetDatabase}
              className="px-3 py-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-950/60 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Seed</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#DDD5C7] hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {actionSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 flex items-center justify-between">
            <span className="font-medium">✓ {actionSuccessMsg}</span>
            <button onClick={() => setActionSuccessMsg(null)} className="underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* Database Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F4EFEB] border-b border-[#E8E2D9]">
            <div className="bg-white p-3 rounded-xl border border-[#E8E2D9]">
              <div className="text-[11px] text-[#736B63] uppercase tracking-wider">
                {t.management.totalBookings}
              </div>
              <div className="font-mono text-xl font-bold text-[#1A1715] tabular-nums mt-0.5">
                {stats.reservationsCount}
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#E8E2D9]">
              <div className="text-[11px] text-emerald-700 uppercase tracking-wider font-medium">
                {t.management.confirmed}
              </div>
              <div className="font-mono text-xl font-bold text-emerald-700 tabular-nums mt-0.5">
                {stats.confirmedCount}
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#E8E2D9]">
              <div className="text-[11px] text-sky-700 uppercase tracking-wider font-medium">
                {t.management.checkedIn}
              </div>
              <div className="font-mono text-xl font-bold text-sky-700 tabular-nums mt-0.5">
                {stats.checkedInCount}
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#E8E2D9]">
              <div className="text-[11px] text-rose-700 uppercase tracking-wider font-medium">
                {t.management.cancelled}
              </div>
              <div className="font-mono text-xl font-bold text-rose-700 tabular-nums mt-0.5">
                {stats.cancelledCount}
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white border-b border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#736B63]" />
              <input
                type="text"
                placeholder={t.management.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FBF9F5] border border-[#DDD5C7] rounded-md text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
              />
            </div>

            {/* Hotel Filter */}
            <select
              value={selectedHotelFilter}
              onChange={(e) => setSelectedHotelFilter(e.target.value)}
              className="text-xs bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-2.5 py-1.5 font-medium text-[#1A1715]"
            >
              <option value="all">{t.hotels.filterAll}</option>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.city})
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="text-xs bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-2.5 py-1.5 font-medium text-[#1A1715]"
            >
              <option value="all">{t.management.filterAll}</option>
              <option value="Confirmed">{t.management.confirmed}</option>
              <option value="Checked-In">{t.management.checkedIn}</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">{t.management.cancelled}</option>
            </select>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.management.newBookingBtn}</span>
          </button>
        </div>

        {/* Reservations Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FBF9F5]">
          {isLoading ? (
            <div className="text-center py-16 text-xs text-[#736B63]">
              {t.common.loading}
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-16 space-y-2 bg-white rounded-xl border border-dashed border-[#DDD5C7]">
              <Database className="w-8 h-8 text-[#DDD5C7] mx-auto" />
              <p className="font-serif text-lg text-[#1A1715]">{t.management.noBookingsFound}</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl border border-[#E8E2D9] shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4EFEB] text-[#736B63] border-b border-[#E8E2D9] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">{t.management.tableHeaders.ref}</th>
                    <th className="py-3 px-4">{t.management.tableHeaders.guest}</th>
                    <th className="py-3 px-4">{t.management.tableHeaders.hotel}</th>
                    <th className="py-3 px-4">{t.management.tableHeaders.dates}</th>
                    <th className="py-3 px-4">{t.management.tableHeaders.total}</th>
                    <th className="py-3 px-4">{t.management.tableHeaders.status}</th>
                    <th className="py-3 px-4 text-right">{t.management.tableHeaders.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D9]">
                  {reservations.map((res) => {
                    const curr = res.currency === 'GBP' ? '£' : '€';
                    return (
                      <tr key={res.id} className="hover:bg-[#FBF9F5] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#C86D51]">
                          {res.bookingReference}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#1A1715]">{res.guestName}</div>
                          <div className="text-[11px] text-[#736B63]">{res.guestEmail}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-medium text-[#1A1715]">{res.hotelName}</div>
                          <div className="text-[11px] text-[#736B63]">{res.roomName}</div>
                        </td>

                        <td className="py-3.5 px-4 font-mono tabular-nums text-[11px] text-[#4A443E]">
                          <div>{res.checkIn} → {res.checkOut}</div>
                          <div className="text-[10px] text-[#736B63]">{res.nights} nights · {res.adults} adults</div>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-[#1A1715] tabular-nums">
                          {curr}{res.totalPrice}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                              res.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : res.status === 'Checked-In'
                                ? 'bg-sky-100 text-sky-800'
                                : res.status === 'Completed'
                                ? 'bg-neutral-100 text-neutral-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                          {/* Quick Status Changers */}
                          {res.status === 'Confirmed' && (
                            <button
                              onClick={() => handleStatusChange(res.id, 'Checked-In')}
                              className="px-2 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded text-[11px] font-medium cursor-pointer"
                              title="Check-in guest"
                            >
                              Check-In
                            </button>
                          )}
                          {res.status === 'Checked-In' && (
                            <button
                              onClick={() => handleStatusChange(res.id, 'Completed')}
                              className="px-2 py-1 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 rounded text-[11px] font-medium cursor-pointer"
                              title="Check-out / Complete stay"
                            >
                              Check-Out
                            </button>
                          )}
                          {res.status !== 'Cancelled' && (
                            <button
                              onClick={() => handleStatusChange(res.id, 'Cancelled')}
                              className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[11px] font-medium cursor-pointer"
                              title="Cancel reservation"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => setViewingReservation(res)}
                            className="p-1 text-[#736B63] hover:text-[#1A1715] rounded hover:bg-[#EFE9E0] cursor-pointer"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(res.id)}
                            className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: View Single Reservation Detail */}
        {viewingReservation && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-xl border border-[#E8E2D9] max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#736B63]">
                    Reservation Details
                  </span>
                  <h3 className="font-mono text-xl font-bold text-[#C86D51]">
                    {viewingReservation.bookingReference}
                  </h3>
                </div>
                <button
                  onClick={() => setViewingReservation(null)}
                  className="p-1 text-[#736B63] hover:text-[#1A1715]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-[#59524A]">
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Guest Name:</span>
                  <span className="font-semibold text-[#1A1715]">{viewingReservation.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Guest Email:</span>
                  <span className="text-[#1A1715]">{viewingReservation.guestEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Guest Phone:</span>
                  <span className="text-[#1A1715]">{viewingReservation.guestPhone || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Hotel:</span>
                  <span className="font-semibold text-[#1A1715]">{viewingReservation.hotelName} ({viewingReservation.hotelCity})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Room:</span>
                  <span className="font-semibold text-[#1A1715]">{viewingReservation.roomName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Dates:</span>
                  <span className="font-mono">{viewingReservation.checkIn} to {viewingReservation.checkOut} ({viewingReservation.nights} nights)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B63]">Total Paid / Due:</span>
                  <span className="font-mono font-bold text-[#1A1715]">
                    {viewingReservation.currency === 'GBP' ? '£' : '€'}{viewingReservation.totalPrice}
                  </span>
                </div>
                {viewingReservation.specialRequests && (
                  <div className="pt-2 border-t border-[#E8E2D9]">
                    <span className="text-[#736B63] block mb-1">Special Requests:</span>
                    <p className="p-2 bg-[#FBF9F5] rounded text-[11px] text-[#1A1715]">
                      {viewingReservation.specialRequests}
                    </p>
                  </div>
                )}
                {viewingReservation.addOns.length > 0 && (
                  <div className="pt-2 border-t border-[#E8E2D9]">
                    <span className="text-[#736B63] block mb-1">Selected Add-ons:</span>
                    <div className="flex flex-wrap gap-1">
                      {viewingReservation.addOns.map((a) => (
                        <span key={a} className="px-2 py-0.5 bg-[#F4EFEB] rounded text-[11px]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E8E2D9] text-[10px] text-[#736B63] flex justify-between">
                  <span>Created: {new Date(viewingReservation.createdAt).toLocaleString()}</span>
                  <span>Database ID: {viewingReservation.id}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setViewingReservation(null)}
                  className="px-4 py-1.5 text-xs font-semibold bg-[#1A1715] text-white rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
