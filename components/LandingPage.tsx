
import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, TrendingUp, Globe, Users, Target, Zap, 
  ChevronDown, Crown, Award, TrendingUp as TrendingUpIcon, Flame
} from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../services/translations';

interface LandingPageProps {
  onAction: () => void;
  language: Language;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAction, language }) => {
  const t = useTranslation(language);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: t.landing.powerStats.partners, value: '1200+', icon: Users },
    { label: t.landing.powerStats.countries, value: '18', icon: Globe },
    { label: t.landing.powerStats.success, value: '96%', icon: TrendingUp },
  ];

  const scrollToPower = () => {
    document.getElementById('power-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-white dark:bg-phoenix-black min-h-screen transition-colors duration-500">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-phoenix-red/5 dark:bg-phoenix-red/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-phoenix-orange/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-12 overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
           <div className="absolute h-full w-full opacity-20 dark:opacity-30">
             {[...Array(30)].map((_, i) => (
               <div 
                key={i} 
                className="absolute bg-phoenix-red rounded-full blur-xl animate-float"
                style={{
                  width: Math.random() * 4 + 'px',
                  height: Math.random() * 4 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 10 + 's',
                  animationDuration: Math.random() * 5 + 5 + 's'
                }}
               />
             ))}
           </div>
        </div>

        <div className="w-full max-w-[1440px] space-y-12">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full backdrop-blur-md mb-4 shadow-sm dark:shadow-2xl">
              <Flame className="w-4 h-4 text-phoenix-red animate-fire" />
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-slate-600 dark:text-slate-400">{t.landing.era}</span>
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.85] italic py-4">
            <div className="relative">
               <div className="animate-fade-in-up pb-2" style={{ animationDelay: '0.3s' }}>{t.landing.heroTitle1}</div>
            </div>
            <div className="relative">
               <div className="animate-fade-in-up phoenix-gradient-text" style={{ animationDelay: '0.5s' }}>{t.landing.heroTitle2}</div>
            </div>
          </h1>

          <p className="text-lg md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto font-medium tracking-tight animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.7s' }}>
            {t.landing.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <button 
              onClick={onAction}
              className="px-12 py-6 bg-phoenix-red text-white text-[14px] font-black uppercase tracking-[0.25em] rounded-2xl shadow-xl dark:shadow-[0_0_40px_rgba(255,42,42,0.4)] hover:bg-phoenix-orange transition-all hover:scale-110 active:scale-95 group flex items-center justify-center italic"
            >
              {t.landing.heroCTA} <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </button>
            <button 
              onClick={scrollToPower}
              className="px-12 py-6 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[14px] font-black uppercase tracking-[0.25em] rounded-2xl backdrop-blur-md hover:bg-slate-200 dark:hover:bg-white/10 transition-all italic"
            >
              {t.landing.heroSecondary}
            </button>
          </div>
        </div>

        <button 
          onClick={scrollToPower}
          className="absolute bottom-12 animate-bounce opacity-40 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Scroll to details"
        >
          <ChevronDown className="w-10 h-10 text-slate-400 dark:text-slate-600" />
        </button>
      </section>

      {/* Power Section */}
      <section id="power-section" className="py-32 px-4 relative z-10 bg-slate-50 dark:bg-phoenix-charcoal/50 border-y border-slate-100 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">
                {t.landing.powerTitle1} <br />
                <span className="text-phoenix-red">{t.landing.powerTitle2}</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t.landing.powerDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-4">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <stat.icon className="w-8 h-8 text-phoenix-orange mb-3" />
                    <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic">{stat.value}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-phoenix-red/20 to-phoenix-orange/20 rounded-[60px] blur-[80px] opacity-40 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative aspect-square rounded-[60px] bg-white dark:bg-phoenix-black/80 border-2 border-slate-100 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                 <div className="absolute h-[150%] w-[150%] bg-[radial-gradient(circle,#ff2a2a0a_0%,transparent_70%)] animate-pulse-slow"></div>
                 <Flame className="w-64 h-64 text-phoenix-red animate-fire drop-shadow-[0_0_40px_rgba(255,42,42,0.6)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-40 px-4 relative z-10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <h3 className="text-xs font-black text-phoenix-orange uppercase tracking-[0.6em]">{t.landing.mastery}</h3>
            <h2 className="text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">{t.landing.dominance}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.landing.services.map((service, i) => {
              const icons = [Zap, Target, Globe];
              const Icon = icons[i] || Zap;
              return (
                <div key={i} className="glass-card p-16 rounded-[50px] phoenix-card-hover transition-all duration-700 group shadow-lg dark:shadow-none">
                  <div className="h-20 w-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-phoenix-red transition-all duration-500 group-hover:rotate-12">
                    <Icon className="w-10 h-10 text-slate-900 dark:text-white group-hover:text-white" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-6">{service.title}</h4>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-40 px-4 relative z-10 bg-gradient-to-b from-white to-slate-50 dark:from-phoenix-black dark:to-phoenix-charcoal transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
              <div className="inline-block px-4 py-1.5 bg-phoenix-red/10 dark:bg-phoenix-red/20 text-phoenix-red text-[11px] font-black uppercase tracking-widest rounded-full border border-phoenix-red/20 dark:border-phoenix-red/30">{t.landing.careers}</div>
              <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-none">
                {t.landing.boldTitle}
              </h2>
              <ul className="space-y-8">
                {t.landing.boldPoints.map((point, i) => {
                  const icons = [Crown, Zap, Globe, Award];
                  const Icon = icons[i] || Crown;
                  return (
                    <li key={i} className="flex items-center gap-8 group">
                      <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 group-hover:border-phoenix-red transition-all duration-500 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-phoenix-orange" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-phoenix-red transition-colors duration-300 italic">{point}</span>
                    </li>
                  );
                })}
              </ul>
              <button 
                onClick={onAction}
                className="mt-12 px-14 py-7 bg-slate-900 dark:bg-white text-white dark:text-phoenix-black text-[14px] font-black uppercase tracking-[0.3em] rounded-3xl hover:bg-phoenix-red dark:hover:bg-phoenix-red hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl italic"
              >
                {t.landing.startRise} 🔥
              </button>
            </div>
            
            <div className="flex-1 w-full max-w-2xl aspect-video glass-card rounded-[60px] p-12 border border-slate-100 dark:border-white/5 flex flex-col justify-center shadow-2xl dark:shadow-none transition-transform duration-1000 hover:scale-[1.01]">
               <div className="space-y-12">
                  <div className="flex justify-between items-center pb-10 border-b border-slate-100 dark:border-white/5">
                     <span className="text-[14px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.landing.careerArc}</span>
                     <TrendingUpIcon className="w-7 h-7 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="relative h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full">
                     <div className="absolute top-0 left-0 h-full w-2/3 bg-phoenix-red rounded-full shadow-[0_0_20px_rgba(255,42,42,0.4)] dark:shadow-[0_0_30px_rgba(255,42,42,0.8)] animate-pulse"></div>
                     <div className="absolute top-[-8px] left-[66%] h-8 w-8 bg-white border-4 border-phoenix-red rounded-full shadow-2xl transform hover:scale-125 transition-transform cursor-pointer"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                     {['Trainee', 'Ambassador', 'Leader', 'Global Manager'].map((lvl, i) => (
                       <div key={i} className="text-center">
                          <p className={`text-[10px] font-black uppercase tracking-tight italic ${i === 2 ? 'text-phoenix-red' : 'text-slate-400 dark:text-slate-500'}`}>{lvl}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 px-4 relative z-10 text-center overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,#ff2a2a0a_0%,transparent_60%)] animate-pulse-slow"></div>
        </div>
        <div className="relative z-10 space-y-16 animate-fade-in">
           <Flame className="w-24 h-24 text-phoenix-red mx-auto animate-fire" />
           <h2 className="text-7xl md:text-[12rem] font-black text-slate-900 dark:text-white italic tracking-tighter uppercase leading-[0.75] max-w-6xl mx-auto py-8">
             {t.landing.finalTitle1} <br />
             <span className="phoenix-gradient-text">{t.landing.finalTitle2}</span>
           </h2>
           <button 
             onClick={onAction}
             className="px-16 py-8 bg-phoenix-red text-white text-[16px] font-black uppercase tracking-[0.4em] rounded-[40px] shadow-2xl dark:shadow-[0_0_60px_rgba(255,42,42,0.6)] hover:bg-slate-900 dark:hover:bg-white dark:hover:text-phoenix-black transition-all hover:scale-110 italic"
           >
             🔥 {t.landing.heroCTA}
           </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
