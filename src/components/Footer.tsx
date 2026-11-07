import React from 'react';
import { BrandSettings } from '../types';
import { Phone, Mail, MapPin, MessageSquare, Instagram, Linkedin, Clock, Sliders, Database, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  settings: BrandSettings;
  onOpenBooking: () => void;
  onOpenManagement: () => void;
  onOpenSettings: () => void;
  onOpenLookup: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenBooking,
  onOpenManagement,
  onOpenSettings,
  onOpenLookup,
  onNavigateSection
}) => {
  const { t, language, setLanguage, languages } = useLanguage();

  return (
    <footer id="contact" className="bg-[#1A1715] text-[#FBF9F5] border-t border-[#2F2B28] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Row: Brand & Quick Stay Pitch */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {settings.logoType === 'custom_image' && settings.logoImageUrl ? (
                <img
                  src={settings.logoImageUrl}
                  alt={settings.brandName}
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#C86D51] text-white flex items-center justify-center font-serif text-xl font-bold">
                  {settings.monogramText || 'M'}
                </div>
              )}
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                {settings.brandName || 'Miirovelle'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#DDD5C7] leading-relaxed max-w-sm">
              {settings.customFooterNote || 'A bespoke collection of European boutique hotels, brilliantly considered for curious travelers.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1.5 text-xs text-[#DDD5C7] hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{t.topBanner.settingsLink}</span>
              </button>
              <button
                onClick={onOpenManagement}
                className="inline-flex items-center gap-1.5 text-xs text-[#C86D51] hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                <span>{t.nav.dbConsole}</span>
              </button>
            </div>

            {/* Language Selector in Footer */}
            <div className="pt-4 space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-[#736B63] font-mono flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>{t.nav.language} / Language</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                      language === l.code
                        ? 'bg-[#C86D51] text-white font-medium'
                        : 'bg-white/5 hover:bg-white/10 text-[#DDD5C7]'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
              {t.footer.explore}
            </div>
            <ul className="space-y-2 text-xs text-[#DDD5C7]">
              <li>
                <button
                  onClick={() => onNavigateSection('hotels')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.ourHotels}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('philosophy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.philosophy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('dining')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.dining}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.findBooking}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="hover:text-[#C86D51] font-semibold transition-colors cursor-pointer"
                >
                  {t.nav.bookStay}
                </button>
              </li>
            </ul>
          </div>

          {/* Customizable Contact Information */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
              {t.footer.conciergeAndOffices}
            </div>
            <div className="space-y-2.5 text-xs text-[#DDD5C7]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                <span>{settings.corporateAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C86D51] shrink-0" />
                <a href={`tel:${settings.conciergePhone}`} className="hover:text-white font-mono">
                  {settings.conciergePhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C86D51] shrink-0" />
                <a href={`mailto:${settings.reservationEmail}`} className="hover:text-white">
                  {settings.reservationEmail}
                </a>
              </div>
              {settings.whatsappNumber && (
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp Concierge: <span className="font-mono">{settings.whatsappNumber}</span></span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-[11px] text-[#DDD5C7]/70">
                <Clock className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
                <span>{settings.receptionHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDD5C7]/60 gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} {settings.brandName || 'Miirovelle'} Hotels Ltd.</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">{t.footer.privacy}</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white cursor-pointer">{t.footer.terms}</span>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenSettings} className="text-[#C86D51] hover:underline cursor-pointer">
              {t.topBanner.settingsLink}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
