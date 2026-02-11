
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import WorkerDashboard from './components/WorkerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import Login from './components/Login';
import { ViewState, UserRole, Theme, Language } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.FORM);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('proago-theme') as Theme) || 'light';
    }
    return 'light';
  });
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('proago-lang') as Language) || 'en';
    }
    return 'en';
  });

  // State for content transition
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('proago-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('proago-lang', language);
    // Trigger transition when language changes
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timeout);
  }, [language]);

  const handleLoginSuccess = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'RECRUITER') {
      setCurrentView(ViewState.DASHBOARD);
    } else if (role === 'WORKER') {
      setCurrentView(ViewState.WORKER_DASHBOARD);
    } else if (role === 'MANAGER') {
      setCurrentView(ViewState.MANAGER_DASHBOARD);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentView(ViewState.LOGIN);
  };

  const handleViewChange = (view: ViewState) => {
    if ((view === ViewState.DASHBOARD || view === ViewState.WORKER_DASHBOARD || view === ViewState.MANAGER_DASHBOARD) && !isAuthenticated) {
      setCurrentView(ViewState.LOGIN);
      return;
    }
    
    if (view === ViewState.DASHBOARD && userRole !== 'RECRUITER') return; 
    if (view === ViewState.WORKER_DASHBOARD && userRole !== 'WORKER') return;
    if (view === ViewState.MANAGER_DASHBOARD && userRole !== 'MANAGER') return;

    // Trigger transition
    setFade(false);
    setTimeout(() => {
      setCurrentView(view);
      setFade(true);
    }, 200);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const content = useMemo(() => {
    switch (currentView) {
      case ViewState.FORM: return <LeadForm language={language} />;
      case ViewState.DASHBOARD: return isAuthenticated && userRole === 'RECRUITER' ? <Dashboard language={language} /> : null;
      case ViewState.WORKER_DASHBOARD: return isAuthenticated && userRole === 'WORKER' ? <WorkerDashboard language={language} /> : null;
      case ViewState.MANAGER_DASHBOARD: return isAuthenticated && userRole === 'MANAGER' ? <ManagerDashboard language={language} /> : null;
      case ViewState.LOGIN: return <Login onLoginSuccess={handleLoginSuccess} language={language} />;
      default: return null;
    }
  }, [currentView, isAuthenticated, userRole, language]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-500">
      <Navbar 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        isAuthenticated={isAuthenticated}
        userRole={userRole!}
        onLogout={handleLogout}
        theme={theme}
        onThemeToggle={toggleTheme}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className={`flex-grow flex flex-col transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {content}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-500">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} PROAGO WORLD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
