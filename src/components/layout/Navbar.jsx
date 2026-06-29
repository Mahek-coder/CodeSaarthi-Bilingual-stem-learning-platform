import React, { useState } from 'react';
import { Menu, X, Sparkles, Globe, Sun, Moon, GraduationCap } from 'lucide-react';

export default function PremiumNavbar({
  currentLanguage = 'en',
  onLanguageChange,
  currentPage = 'home',
  setCurrentPage,
  studentName = null,
  translations = null,
  handleLogout
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    alert("Dark Mode simulation toggled.");
  };

  const handleNavClick = (page) => {
    if (page === 'home') {
      setCurrentPage?.('home');
    } else if (page === 'dashboard') {
      if (studentName) {
        setCurrentPage?.('dashboard');
      } else {
        alert(currentLanguage === 'hi' 
          ? "डैशबोर्ड का उपयोग करने के लिए कृपया पहले लॉग इन या साइन अप करें!" 
          : "Please login or sign up first to access your personalized student dashboard!");
        setCurrentPage?.('login');
      }
    } else if (page === 'courses') {
      setCurrentPage?.('courses');
    } else if (page === 'profile') {
      if (studentName) {
        setCurrentPage?.('profile');
      } else {
        setCurrentPage?.('login');
      }
    } else if (page === 'aitutor') {
      setCurrentPage?.('aitutor');
    } else if (page === 'quiz') {
      setCurrentPage?.('quiz');
    }
  };

  const navItems = [
    { label: currentLanguage === 'hi' ? 'मुख्य पृष्ठ' : 'Home', page: 'home' },
    { label: currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard', page: 'dashboard' },
    { label: currentLanguage === 'hi' ? 'पाठ्यक्रम' : 'Courses', page: 'courses' },
    { label: currentLanguage === 'hi' ? 'एआई सारथी' : 'AI Tutor', page: 'aitutor' },
    { label: currentLanguage === 'hi' ? 'प्रश्नोत्तरी' : 'Quiz', page: 'quiz' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm" id="premium-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          {/* Left Side: Brand Logo */}
          <div className="flex items-center">
            <div 
              onClick={() => setCurrentPage?.('home')}
              className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
            >
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-all">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-slate-950 font-sans tracking-tight leading-none">CodeSaarthi</span>
                <span className="text-[9px] font-bold text-blue-600 font-mono tracking-wider uppercase">AI STEM Academy</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:ml-8 lg:space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-sans tracking-wide transition-all cursor-pointer ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {/* Language switch */}
            <button
              onClick={() => onLanguageChange?.(currentLanguage === 'en' ? 'hi' : 'en')}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="h-4 w-4 text-slate-500" />
              <span className="font-mono">{currentLanguage === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 transition-all cursor-pointer"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-500" />}
            </button>

            {/* Account Action or Name */}
            {studentName ? (
              <div className="flex items-center space-x-2">
                <div 
                  onClick={() => setCurrentPage?.('profile')}
                  className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-150 px-3.5 py-2 rounded-xl cursor-pointer transition-all hover:scale-102"
                  title="View Profile"
                >
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800">{studentName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-slate-900 text-white hover:bg-slate-800 border border-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md hover:scale-102 flex items-center space-x-1"
                >
                  <span>{currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-2">
                <button
                  onClick={() => setCurrentPage?.('login')}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 transition-all cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'लॉग इन' : 'Login'}
                </button>
                <button
                  onClick={() => setCurrentPage?.('signup')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-100"
                >
                  {currentLanguage === 'hi' ? 'साइन अप' : 'Sign Up'}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => onLanguageChange?.(currentLanguage === 'en' ? 'hi' : 'en')}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs flex items-center space-x-1"
            >
              <Globe className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-mono font-bold">{currentLanguage === 'en' ? 'HI' : 'EN'}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="p-2.5 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Clean, solid white instead of heavy blurs) */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg py-4 px-4 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                handleNavClick(item.page);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold font-sans transition-all ${
                currentPage === item.page
                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Actions & Theme Toggles */}
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3 px-2">
            <button
              onClick={() => {
                toggleDarkMode();
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 py-2 text-sm font-bold text-slate-600"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-500" />}
              <span>{currentLanguage === 'hi' ? 'डार्क मोड स्विच करें' : 'Toggle Theme'}</span>
            </button>

            {studentName ? (
              <div className="flex flex-col space-y-2">
                <div 
                  onClick={() => {
                    setCurrentPage?.('profile');
                    setIsOpen(false);
                  }}
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-150 p-3 rounded-xl flex items-center space-x-2 cursor-pointer transition-all"
                >
                  <GraduationCap className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-800">{studentName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout?.();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm text-center rounded-xl border border-slate-950 shadow-md cursor-pointer transition-all"
                >
                  {currentLanguage === 'hi' ? 'लॉग आउट (Logout)' : 'Logout'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    setCurrentPage?.('login');
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'लॉग इन' : 'Login'}
                </button>
                <button
                  onClick={() => {
                    setCurrentPage?.('signup');
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center rounded-xl shadow-md cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'साइन अप' : 'Sign Up'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
