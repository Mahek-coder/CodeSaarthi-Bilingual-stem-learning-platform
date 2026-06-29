import React, { useState } from 'react';
import { GraduationCap, Languages, Menu, X, Award, MessageSquareCode, LogIn } from 'lucide-react';
import { Language, TranslationSet } from '../types';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  translations: TranslationSet;
  currentPage: 'home' | 'login' | 'signup' | 'dashboard';
  setCurrentPage: (page: 'home' | 'login' | 'signup' | 'dashboard') => void;
}

export default function Navbar({
  currentLanguage,
  onLanguageChange,
  translations,
  currentPage,
  setCurrentPage,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  ];

  const activeLang = languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-left cursor-pointer focus:outline-none"
              id="nav-logo"
            >
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl text-white shadow-md shadow-blue-200">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CodeSaarthi
                </span>
                <span className="block text-[9px] text-blue-500 font-mono tracking-wider font-semibold -mt-1 uppercase">
                  AI STEM Mentor
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-sans font-medium text-sm transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
              }`}
              id="nav-home"
            >
              {translations.homeLink}
            </button>
            <button
              onClick={() => {
                alert("Courses module is previewing in Home Page demos! Complete courses releasing soon.");
              }}
              className="font-sans font-medium text-sm text-slate-600 hover:text-blue-500 transition-colors cursor-pointer"
              id="nav-courses"
            >
              {translations.coursesLink}
            </button>
            <button
              onClick={() => {
                alert("AI Chat Saarthi assistant demo is available on the Home Page interactive playground!");
              }}
              className="font-sans font-medium text-sm text-slate-600 hover:text-blue-500 transition-colors cursor-pointer"
              id="nav-chat"
            >
              {translations.chatLink}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-medium text-xs transition-all cursor-pointer focus:outline-none"
                id="lang-dropdown-btn"
              >
                <Languages className="h-4 w-4" />
                <span>{activeLang.flag} {activeLang.label}</span>
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-1 border border-slate-100 divide-y divide-slate-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authentication Button */}
            {currentPage === 'home' ? (
              <button
                onClick={() => setCurrentPage('login')}
                className="flex items-center space-x-1 px-5 py-2 rounded-full font-sans font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-200 hover:-translate-y-0.5"
                id="nav-login-btn"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{translations.loginButton}</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('home')}
                className="px-5 py-2 rounded-full font-sans font-semibold text-xs text-blue-600 border border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
                id="nav-back-home"
              >
                {translations.homeLink}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Quick Language Toggle icon for Mobile */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="p-1.5 rounded-lg border border-blue-100 bg-blue-50/50 text-blue-600"
                id="mobile-lang-btn"
              >
                <Languages className="h-4 w-4" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-1 border border-slate-100 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-3 py-1.5 text-left text-xs font-medium rounded-lg transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              setCurrentPage('home');
              setIsOpen(false);
            }}
            className="w-full text-left block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
          >
            {translations.homeLink}
          </button>
          <button
            onClick={() => {
              alert("Courses module is previewing in Home Page demos! Complete courses releasing soon.");
              setIsOpen(false);
            }}
            className="w-full text-left block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
          >
            {translations.coursesLink}
          </button>
          <button
            onClick={() => {
              alert("AI Chat Saarthi assistant demo is available on the Home Page interactive playground!");
              setIsOpen(false);
            }}
            className="w-full text-left block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
          >
            {translations.chatLink}
          </button>

          <div className="pt-2 border-t border-slate-100">
            {currentPage === 'home' ? (
              <button
                onClick={() => {
                  setCurrentPage('login');
                  setIsOpen(false);
                }}
                className="w-full flex justify-center items-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md"
              >
                <LogIn className="h-4 w-4" />
                <span>{translations.loginButton}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsOpen(false);
                }}
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50"
              >
                <span>{translations.homeLink}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
