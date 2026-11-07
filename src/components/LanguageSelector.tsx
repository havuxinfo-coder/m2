import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'segmented' | 'minimal';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { language, setLanguage, languages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex items-center p-0.5 bg-[#EFE9E0] rounded-md border border-[#DDD5C7] text-xs ${className}`}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLanguage(l.code)}
            className={`px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
              language === l.code
                ? 'bg-[#1A1715] text-[#FBF9F5] font-semibold shadow-xs'
                : 'text-[#59524A] hover:text-[#1A1715]'
            }`}
            title={l.name}
          >
            <span className="mr-1">{l.flag}</span>
            <span className="uppercase">{l.code}</span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-xs ${className}`}>
        <Globe className="w-3.5 h-3.5 text-[#736B63]" />
        {languages.map((l, index) => (
          <React.Fragment key={l.code}>
            <button
              onClick={() => setLanguage(l.code)}
              className={`hover:underline cursor-pointer uppercase font-mono ${
                language === l.code ? 'font-bold text-[#1A1715]' : 'text-[#736B63]'
              }`}
            >
              {l.code}
            </button>
            {index < languages.length - 1 && <span className="text-[#DDD5C7]">·</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Default: Dropdown
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] font-medium text-[#4A443E] bg-[#EFE9E0]/80 hover:bg-[#E5DDCF] border border-[#DDD5C7] rounded-md transition-all cursor-pointer focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Select Language"
      >
        <span className="text-xs leading-none">{currentLanguageOption.flag}</span>
        <span className="font-mono font-semibold uppercase tracking-wider text-[10px] text-[#1A1715]">
          {currentLanguageOption.code}
        </span>
        <ChevronDown className={`w-2.5 h-2.5 text-[#736B63] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-lg bg-[#FBF9F5] shadow-xl border border-[#DDD5C7] py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono text-[#736B63] border-b border-[#E8E2D9]">
            Select Language
          </div>
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#EFE9E0] text-[#1A1715] font-semibold'
                    : 'text-[#4A443E] hover:bg-[#F4EFEB] hover:text-[#1A1715]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{l.flag}</span>
                  <div>
                    <span className="block leading-tight">{l.nativeName}</span>
                    <span className="text-[10px] text-[#736B63] font-mono uppercase">{l.code}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C86D51]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
