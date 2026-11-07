import React, { useState, useEffect } from 'react';
import { BrandSettings } from '../types';
import { api } from '../services/api';
import {
  X,
  Sliders,
  Image,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Instagram,
  Linkedin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw
} from 'lucide-react';

interface BrandingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: BrandSettings;
  onSettingsSaved: (newSettings: BrandSettings) => void;
}

export const BrandingSettingsModal: React.FC<BrandingSettingsModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSettingsSaved
}) => {
  const [form, setForm] = useState<BrandSettings>({ ...currentSettings });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setForm({ ...currentSettings });
  }, [currentSettings]);

  const handleChange = (field: keyof BrandSettings, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const saved = await api.updateSettings(form);
      onSettingsSaved(saved);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1400);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save settings to local database');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setForm({
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C86D51] text-white flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1715]">
                Custom Logo & Contact Information
              </h2>
              <p className="text-xs text-[#736B63]">
                Changes sync directly to your local database and update across all screens
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B63] hover:text-[#1A1715] hover:bg-[#EFE9E0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form id="settings-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Branding and contact settings saved successfully to local database!</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Logo & Brand Identity */}
          <div className="space-y-4 p-4 bg-white rounded-xl border border-[#E8E2D9]">
            <h3 className="font-serif text-base font-bold text-[#1A1715] flex items-center gap-2">
              <Image className="w-4 h-4 text-[#C86D51]" />
              <span>Brand Identity & Logo Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715]">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.brandName}
                  onChange={(e) => handleChange('brandName', e.target.value)}
                  placeholder="e.g. Miirovelle"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86D51]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715]">
                  Logo Style Mode
                </label>
                <select
                  value={form.logoType}
                  onChange={(e) => handleChange('logoType', e.target.value as any)}
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                >
                  <option value="text_with_monogram">Text Wordmark + Circle Monogram</option>
                  <option value="custom_image">Custom Image URL</option>
                  <option value="monogram_only">Monogram Seal Only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715]">
                  Monogram Seal Letter
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={form.monogramText}
                  onChange={(e) => handleChange('monogramText', e.target.value)}
                  placeholder="M"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715] font-serif text-center font-bold"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#1A1715]">
                  Custom Logo Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.logoImageUrl}
                  onChange={(e) => handleChange('logoImageUrl', e.target.value)}
                  placeholder="https://example.com/my-custom-logo.svg"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-xs text-[#1A1715]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1A1715]">
                Brand Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="Brilliantly Considered European Boutique Stays"
                className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
              />
            </div>

            {/* Live Preview Box */}
            <div className="p-3 bg-[#F4EFEB] rounded-lg flex items-center justify-between">
              <span className="text-xs text-[#736B63]">Live Navbar Preview:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1A1715] text-white flex items-center justify-center font-serif font-bold text-sm">
                  {form.monogramText || 'M'}
                </div>
                <div className="font-serif font-bold text-lg text-[#1A1715]">
                  {form.brandName || 'Miirovelle'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4 p-4 bg-white rounded-xl border border-[#E8E2D9]">
            <h3 className="font-serif text-base font-bold text-[#1A1715] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C86D51]" />
              <span>Contact Information & Concierge</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#736B63]" />
                  <span>Concierge Direct Phone</span>
                </label>
                <input
                  type="text"
                  value={form.conciergePhone}
                  onChange={(e) => handleChange('conciergePhone', e.target.value)}
                  placeholder="+33 1 89 20 44 00"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#736B63]" />
                  <span>Reservation Email</span>
                </label>
                <input
                  type="email"
                  value={form.reservationEmail}
                  onChange={(e) => handleChange('reservationEmail', e.target.value)}
                  placeholder="reservations@miirovelle.com"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Concierge Line</span>
                </label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="+33 6 42 18 90 22"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#736B63]" />
                  <span>Reception & Desk Hours</span>
                </label>
                <input
                  type="text"
                  value={form.receptionHours}
                  onChange={(e) => handleChange('receptionHours', e.target.value)}
                  placeholder="24/7 Guest Relations"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#736B63]" />
                <span>Headquarters / Central Office Address</span>
              </label>
              <input
                type="text"
                value={form.corporateAddress}
                onChange={(e) => handleChange('corporateAddress', e.target.value)}
                placeholder="4 Boulevard Raspail, 75007 Paris, France"
                className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-[#736B63]" />
                  <span>Instagram Handle</span>
                </label>
                <input
                  type="text"
                  value={form.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  placeholder="@miirovellehotels"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#736B63]" />
                  <span>LinkedIn Link</span>
                </label>
                <input
                  type="text"
                  value={form.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/company/miirovelle"
                  className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md px-3 py-2 text-sm text-[#1A1715]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1A1715]">
                Custom Footer Notice
              </label>
              <textarea
                rows={2}
                value={form.customFooterNote}
                onChange={(e) => handleChange('customFooterNote', e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#DDD5C7] rounded-md p-2.5 text-xs text-[#1A1715]"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-[#FBF9F5] px-6 py-4 border-t border-[#E8E2D9] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-medium text-[#736B63] hover:text-[#1A1715] flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Miirovelle Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#4A443E] hover:text-[#1A1715] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="settings-form"
              disabled={isSaving}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1715] hover:bg-[#C86D51] rounded-md transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving to DB...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
