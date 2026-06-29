import React from 'react';
import { GraduationCap, Heart, Mail, Shield, BookOpen, Sparkles } from 'lucide-react';
import { TranslationSet } from '../types';

interface FooterProps {
  translations: TranslationSet;
}

export default function Footer({ translations }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-sans font-bold text-lg text-white">
                CodeSaarthi
              </span>
            </div>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Empowering students in India to conquer STEM & Computer Science in English and their native regional languages using localized AI guidance.
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-mono">
              <Sparkles className="h-3 w-3" />
              <span>Made for Hackathon 2026</span>
            </div>
          </div>

          {/* Quick Modules */}
          <div>
            <h4 className="text-white font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Modules
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#demo" className="hover:text-blue-400 transition-colors">
                  Interactive Sandbox
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors">
                  Bilingual Video Labs
                </a>
              </li>
              <li>
                <a href="#live-demo" className="hover:text-blue-400 transition-colors">
                  STEM Variable Lab
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-blue-400 transition-colors">
                  Impact & Stats
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Languages */}
          <div>
            <h4 className="text-white font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Supported Languages
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 font-sans">
              <span className="flex items-center space-x-1.5">
                <span>🇬🇧</span> <span className="hover:text-white transition-colors">English</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span>🇮🇳</span> <span className="hover:text-white transition-colors">हिन्दी (Hindi)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span>🇮🇳</span> <span className="hover:text-white transition-colors">मराठी (Marathi)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span>🇮🇳</span> <span className="hover:text-white transition-colors">తెలుగు (Telugu)</span>
              </span>
            </div>
          </div>

          {/* Subscribe Mock */}
          <div className="space-y-4">
            <h4 className="text-white font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Updates & Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay updated with new bilingual courses and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email / ईमेल दर्ज करें"
                className="bg-slate-800 border border-slate-700 text-white rounded-l-xl px-3 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => alert("Thank you for subscribing to CodeSaarthi!")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-r-xl transition-all cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} CodeSaarthi Learning Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Shield className="h-3.5 w-3.5" />
              <span>COPPA Compliant (Safe for Kids)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
              <span>for regional education</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
