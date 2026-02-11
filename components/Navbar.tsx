
import React from 'react';
import { ViewState, UserRole, Theme, Language } from '../types';
import { LayoutDashboard, UserPlus, LogIn, Award, TrendingUp, Sun, Moon, Globe } from 'lucide-react';
import { useTranslation } from '../services/translations';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isAuthenticated: boolean;
  userRole: UserRole;
  onLogout: () => void;
  theme: Theme;
  onThemeToggle: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, onViewChange, isAuthenticated, userRole, onLogout, 
  theme, onThemeToggle, language, onLanguageChange 
}) => {
  const t = useTranslation(language);

  return (
    <nav className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => onViewChange(ViewState.FORM)}>
              <span className="font-serif text-2xl font-bold text-white tracking-wide italic">PROAGO WORLD</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 mr-2">
              {(['en', 'fr', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 text-[10px] font-black uppercase rounded-md transition-all ${
                    language === lang ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors mr-2"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {userRole !== 'WORKER' && userRole !== 'MANAGER' && (
                <button
                onClick={() => onViewChange(ViewState.FORM)}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                    currentView === ViewState.FORM
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                >
                <UserPlus className="h-4 w-4 mr-2" />
                {t.nav.apply}
                </button>
            )}
            
            {isAuthenticated ? (
                <>
                {userRole === 'RECRUITER' && (
                    <button
                        onClick={() => onViewChange(ViewState.DASHBOARD)}
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                        currentView === ViewState.DASHBOARD
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        {t.nav.recruitment}
                    </button>
                )}

                {userRole === 'MANAGER' && (
                    <button
                        onClick={() => onViewChange(ViewState.MANAGER_DASHBOARD)}
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                        currentView === ViewState.MANAGER_DASHBOARD
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {t.nav.manager}
                    </button>
                )}
                
                {userRole === 'WORKER' && (
                    <button
                        onClick={() => onViewChange(ViewState.WORKER_DASHBOARD)}
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                        currentView === ViewState.WORKER_DASHBOARD
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <Award className="h-4 w-4 mr-2" />
                        {t.nav.performance}
                    </button>
                )}

                <div className="h-6 w-px bg-slate-700 mx-2"></div>

                <button
                    onClick={onLogout}
                    className="text-slate-400 hover:text-white text-xs font-medium px-2"
                >
                    {t.nav.signOut}
                </button>
                </>
            ) : (
               <button
                onClick={() => onViewChange(ViewState.LOGIN)}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                  currentView === ViewState.LOGIN
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t.nav.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
