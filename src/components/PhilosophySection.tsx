import React from 'react';
import { Compass, Moon, GlassWater, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PhilosophySection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Compass, Moon, GlassWater, Sparkles];

  return (
    <section id="philosophy" className="py-24 bg-[#F4EFEB] border-y border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#736B63] font-medium">
            {t.philosophy.kicker}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1715] tracking-tight">
            {t.philosophy.headline}
          </h2>
          <p className="text-[#59524A] text-base sm:text-lg leading-relaxed">
            {t.philosophy.subheadline}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {t.philosophy.pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={pillar.number}
                className="bg-[#FBF9F5] p-6 rounded-xl border border-[#E8E2D9] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-[#C86D51]">
                      {pillar.number}.
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center text-[#1A1715]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1A1715]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59524A] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
