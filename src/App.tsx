/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Hotel, BrandSettings, Reservation, DbStats } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HotelsSection } from './components/HotelsSection';
import { PhilosophySection } from './components/PhilosophySection';
import { DiningSection } from './components/DiningSection';
import { HotelDetailModal } from './components/HotelDetailModal';
import { BookingModal } from './components/BookingModal';
import { ManagementPortal } from './components/ManagementPortal';
import { BrandingSettingsModal } from './components/BrandingSettingsModal';
import { LookupModal } from './components/LookupModal';
import { Footer } from './components/Footer';
import { LanguageSelector } from './components/LanguageSelector';
import { useLanguage } from './context/LanguageContext';
import { Database, ShieldCheck, MapPin, Sparkles, Check, ArrowRight, Download } from 'lucide-react';

export default function App() {
  const { t } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [settings, setSettings] = useState<BrandSettings>({
    brandName: 'Miirovelle',
    tagline: 'Brilliantly Considered European Boutique Stays',
    logoType: 'text_with_monogram',
    logoImageUrl: '',
    monogramText: 'M',
    conciergePhone: '+1 307 998 1342',
    reservationEmail: 'reservations@miirovelle.com',
    corporateAddress: '4 Boulevard Raspail, 75007 Paris, France',
    whatsappNumber: '+1 307 998 1342',
    instagram: '@miirovellehotels',
    linkedin: 'linkedin.com/company/miirovelle',
    receptionHours: '24/7 Guest Relations & Multilingual Concierge',
    customFooterNote: 'A bespoke collection of neighborhood European hotels, brilliantly considered for curious travelers.'
  });
  const [stats, setStats] = useState<DbStats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    hotelId?: string;
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
  }>({});

  const [activeHotelDetail, setActiveHotelDetail] = useState<Hotel | null>(null);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Sync notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadInitialData = async () => {
    try {
      const [hotelsData, settingsData, reservationsData, statsData] = await Promise.all([
        api.getHotels(),
        api.getSettings(),
        api.getReservations(),
        api.getDbStats()
      ]);
      setHotels(hotelsData);
      setSettings(settingsData);
      setReservations(reservationsData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();

    // Periodic sync poll every 10 seconds to keep tabs synchronized with local database
    const interval = setInterval(async () => {
      try {
        const [resList, dbStats, curSettings] = await Promise.all([
          api.getReservations(),
          api.getDbStats(),
          api.getSettings()
        ]);
        setReservations(resList);
        setStats(dbStats);
        setSettings(curSettings);
      } catch (e) {
        // quiet poll
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenBooking = (hotelId?: string, roomId?: string) => {
    setBookingPrefill({ hotelId, roomId });
    setIsBookingOpen(true);
  };

  const handleQuickBook = (params: { hotelId: string; checkIn: string; checkOut: string; adults: number }) => {
    setBookingPrefill(params);
    setIsBookingOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationCreated = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    showToast(`✓ Booking ${newRes.bookingReference} confirmed and synced to local DB!`);
    api.getDbStats().then(setStats);
  };

  const handleSettingsSaved = (newSettings: BrandSettings) => {
    setSettings(newSettings);
    showToast(`✓ Brand identity and contact details saved to local DB!`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1A1715] flex flex-col font-sans selection:bg-[#C86D51] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1715] text-[#FBF9F5] px-4 py-3 rounded-lg shadow-xl border border-[#C86D51] text-xs font-medium flex items-center gap-2 animate-bounce">
          <Database className="w-4 h-4 text-[#C86D51]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Notice: Local DB Synced */}
      <div className="bg-[#1A1715] text-[#DDD5C7] text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-semibold shrink-0">
              {t.topBanner.dbLive}
            </span>
            <span className="hidden sm:inline text-white/70 truncate">
              {t.topBanner.dbNotice(reservations.length)}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Language Toggle in Top Banner */}
            <div className="hidden md:flex items-center gap-1.5 pr-2 border-r border-white/15">
              <LanguageSelector variant="minimal" className="text-white/80 hover:text-white" />
            </div>

            <a
              href="/api/project/download-zip"
              download="miirovelle-hotels-project.zip"
              className="hidden sm:inline-flex items-center gap-1 text-[#DDD5C7] hover:text-white transition-colors text-[11px]"
              title="Download standalone project ZIP"
            >
              <Download className="w-3 h-3 text-[#C86D51]" />
              <span>Project .ZIP</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-[#DDD5C7] hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {t.topBanner.settingsLink}
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setIsManagementOpen(true)}
              className="text-[#C86D51] hover:text-[#e08367] font-semibold transition-colors cursor-pointer text-[11px]"
            >
              {t.topBanner.consoleLink}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation conforming to Top Bar Contract */}
      <Navbar
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
        onOpenManagement={() => setIsManagementOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeReservationsCount={reservations.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          hotels={hotels}
          settings={settings}
          onQuickBook={handleQuickBook}
          onExploreHotels={() => handleNavigateSection('hotels')}
        />

        {/* Hotels Collection Grid */}
        <HotelsSection
          hotels={hotels}
          onSelectHotel={(h) => setActiveHotelDetail(h)}
          onBookHotel={(hId) => handleOpenBooking(hId)}
        />

        {/* The Miirovelle Philosophy */}
        <PhilosophySection />

        {/* Restaurants & Neighborhood Bars */}
        <DiningSection />

        {/* Neighbourhoods Showcase */}
        <section id="neighbourhoods" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-widest text-[#736B63] font-medium">
              {t.neighbourhoods.kicker}
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1715] tracking-tight">
              {t.neighbourhoods.headline}
            </h2>
            <p className="text-[#59524A] text-base leading-relaxed">
              {t.neighbourhoods.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.neighbourhoods.items.map((item) => (
              <div key={item.id} className="bg-[#FBF9F5] p-6 rounded-xl border border-[#E8E2D9] space-y-3">
                <span className="text-xs uppercase tracking-wider font-mono text-[#C86D51]">
                  {item.tag}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#59524A] leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[11px] text-[#736B63] font-medium pt-2 border-t border-[#E8E2D9]">
                  {item.homeTo}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer with custom contact info */}
      <Footer
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
        onOpenManagement={() => setIsManagementOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modals */}
      {activeHotelDetail && (
        <HotelDetailModal
          hotel={activeHotelDetail}
          onClose={() => setActiveHotelDetail(null)}
          onSelectRoomToBook={(hId, rId) => handleOpenBooking(hId, rId)}
        />
      )}

      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          hotels={hotels}
          initialHotelId={bookingPrefill.hotelId}
          initialRoomId={bookingPrefill.roomId}
          initialCheckIn={bookingPrefill.checkIn}
          initialCheckOut={bookingPrefill.checkOut}
          initialAdults={bookingPrefill.adults}
          onReservationCreated={handleReservationCreated}
          onOpenManagement={() => setIsManagementOpen(true)}
        />
      )}

      {isManagementOpen && (
        <ManagementPortal
          isOpen={isManagementOpen}
          onClose={() => setIsManagementOpen(false)}
          hotels={hotels}
          onReservationUpdated={loadInitialData}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {isSettingsOpen && (
        <BrandingSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentSettings={settings}
          onSettingsSaved={handleSettingsSaved}
        />
      )}

      {isLookupOpen && (
        <LookupModal
          isOpen={isLookupOpen}
          onClose={() => setIsLookupOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}
    </div>
  );
}
