import React, { useState } from 'react';
import { BrandSettings } from '../types';
import { Database, Sliders, Calendar, Search, Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  settings: BrandSettings;
  onOpenBooking: (hotelId?: string) => void;
  onOpenManagement: () => void;
  onOpenSettings: () => void;
  onOpenLookup: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeReservationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenBooking,
  onOpenManagement,
  onOpenSettings,
  onOpenLookup,
  onNavigateSection,
  activeReservationsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
        {/* Zone 1: Brand Wordmark / Custom Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none"
          >
            {settings.logoType === 'custom_image' && settings.logoImageUrl ? (
              <img
                src={settings.logoImageUrl}
                alt={settings.brandName}
                className="h-8 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1A1715] text-[#FBF9F5] flex items-center justify-center font-serif text-lg sm:text-xl font-bold tracking-wider shadow-sm transition-transform group-hover:scale-105 shrink-0">
                {settings.monogramText || 'M'}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1A1715] whitespace-nowrap">
                {settings.brandName || 'Miirovelle'}
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-[#736B63] -mt-1 font-sans">
                {t.nav.hotelsAndStays}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm font-medium text-[#4A443E]">
          <button
            onClick={() => onNavigateSection('hotels')}
            className="hover:text-[#1A1715] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#1A1715] cursor-pointer"
          >
            {t.nav.ourHotels}
          </button>
          <button
            onClick={() => onNavigateSection('philosophy')}
            className="hover:text-[#1A1715] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#1A1715] cursor-pointer"
          >
            {t.nav.philosophy}
          </button>
          <button
            onClick={() => onNavigateSection('dining')}
            className="hover:text-[#1A1715] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#1A1715] cursor-pointer"
          >
            {t.nav.dining}
          </button>
          <button
            onClick={() => onNavigateSection('neighbourhoods')}
            className="hover:text-[#1A1715] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#1A1715] cursor-pointer"
          >
            {t.nav.neighbourhoods}
          </button>
          <button
            onClick={onOpenLookup}
            className="flex items-center gap-1.5 hover:text-[#1A1715] transition-colors whitespace-nowrap py-1 text-[#736B63] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.nav.findBooking}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action + Language Selector + Database / Branding Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Language Selector Dropdown (EN, DE, ES, FR) */}
          <LanguageSelector variant="dropdown" />

          {/* Quick Database Portal Button */}
          <button
            onClick={onOpenManagement}
            title="Local Database & Reservation Management"
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-medium text-[#4A443E] bg-[#EFE9E0] hover:bg-[#E5DDCF] border border-[#DDD5C7] rounded-md transition-all whitespace-nowrap cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-[#C86D51]" />
            <span className="hidden xl:inline">{t.nav.dbConsole}</span>
            {activeReservationsCount > 0 && (
              <span className="font-mono text-[10px] font-semibold text-[#1A1715] px-1 py-0.2 bg-[#FBF9F5] rounded">
                {activeReservationsCount}
              </span>
            )}
          </button>

          {/* Custom Logo & Contact Settings Button */}
          <button
            onClick={onOpenSettings}
            title="Customize Logo, Contact & Brand Info"
            className="inline-flex items-center justify-center p-1 sm:p-1.5 text-[#736B63] hover:text-[#1A1715] hover:bg-[#EFE9E0] rounded-md transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="px-2 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#2F2B28] rounded-md shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer relative z-10 flex items-center justify-center min-w-[48px] sm:min-w-0"
            title={t.nav.bookStay}
          >
            <span className="sm:hidden font-mono tracking-normal text-[10px]">
              {language === 'de' ? 'Buchen' : language === 'es' ? 'Reservar' : language === 'fr' ? 'Réserver' : 'Book'}
            </span>
            <span className="hidden sm:inline">
              {t.nav.bookStay}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 text-[#1A1715] hover:bg-[#EFE9E0] rounded-md focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FBF9F5] border-b border-[#E8E2D9] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Language Selector */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
            <span className="text-xs uppercase tracking-wider font-mono text-[#736B63]">
              {t.nav.language}
            </span>
            <LanguageSelector variant="segmented" />
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-[#4A443E]">
            <button
              onClick={() => {
                onNavigateSection('hotels');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] cursor-pointer"
            >
              {t.nav.ourHotels}
            </button>
            <button
              onClick={() => {
                onNavigateSection('philosophy');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] cursor-pointer"
            >
              {t.nav.philosophy}
            </button>
            <button
              onClick={() => {
                onNavigateSection('dining');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] cursor-pointer"
            >
              {t.nav.dining}
            </button>
            <button
              onClick={() => {
                onNavigateSection('neighbourhoods');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] cursor-pointer"
            >
              {t.nav.neighbourhoods}
            </button>
            <button
              onClick={() => {
                onOpenLookup();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              {t.nav.findBooking}
            </button>
            <button
              onClick={() => {
                onOpenManagement();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] flex items-center gap-2 text-[#C86D51] font-semibold cursor-pointer"
            >
              <Database className="w-4 h-4" />
              {t.nav.dbConsole} ({activeReservationsCount})
            </button>
            <button
              onClick={() => {
                onOpenSettings();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded hover:bg-[#EFE9E0] flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              {t.topBanner.settingsLink}
            </button>
          </div>
          <div className="pt-2 border-t border-[#E8E2D9] text-xs text-[#736B63] flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{t.nav.concierge}: {settings.conciergePhone}</span>
          </div>
        </div>
      )}
    </header>
  );
};
