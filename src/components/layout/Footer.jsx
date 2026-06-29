import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function PremiumFooter({ currentLanguage = 'en', setCurrentPage }) {
  const isHindi = currentLanguage === 'hi';

  const sections = {
    aboutText: isHindi 
      ? 'कोडसारथी (CodeSaarthi) भारत का पहला इंटरएक्टिव एआई कोडिंग शिक्षा मंच है, जो स्कूल के छात्रों के लिए उनकी क्षेत्रीय भाषा में बनाया गया है।' 
      : 'CodeSaarthi is India’s first bilingual interactive STEM platform, designed to teach computer programming to K-12 students with AI guidance.',
    quickLinks: isHindi ? 'त्वरित लिंक' : 'Quick Links',
    contact: isHindi ? 'संपर्क करें' : 'Contact Us',
    privacy: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy',
    terms: isHindi ? 'नियम और शर्तें' : 'Terms & Conditions',
    copyright: isHindi 
      ? `© ${new Date().getFullYear()} कोडसारथी। सर्वाधिकार सुरक्षित।` 
      : `© ${new Date().getFullYear()} CodeSaarthi. All rights reserved.`
  };

  const links = [
    { label: isHindi ? 'मुख्य पृष्ठ' : 'Home', page: 'home' },
    { label: isHindi ? 'लॉग इन' : 'Login', page: 'login' },
    { label: isHindi ? 'साइन अप' : 'Sign Up', page: 'signup' },
    { label: isHindi ? 'पाठ्यक्रम' : 'Courses', page: 'courses' },
    { label: isHindi ? 'एआई सारथी' : 'AI Tutor', page: 'aitutor' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 font-sans mt-auto" id="premium-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand/About Block */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">CodeSaarthi</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-semibold">
              {sections.aboutText}
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("Twitter/X clicked."); }}
                className="h-10 w-10 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-blue-500 border border-slate-200 rounded-xl flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("GitHub clicked."); }}
                className="h-10 w-10 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-xl flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("LinkedIn clicked."); }}
                className="h-10 w-10 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-blue-700 border border-slate-200 rounded-xl flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">{sections.quickLinks}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage?.(link.page)}
                    className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-all text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">{sections.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5 text-sm font-semibold text-slate-600">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>IIT Delhi Synergy Academic Center, New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm font-semibold text-slate-600">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                <a href="mailto:support@codesaarthi.org" className="hover:text-blue-600 transition-all">support@codesaarthi.org</a>
              </li>
              <li className="flex items-center space-x-2.5 text-sm font-semibold text-slate-600">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                <span>+91 11 4059 9382</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-extrabold text-slate-500 text-center sm:text-left">
            {sections.copyright}
          </p>
          
          <div className="flex space-x-6 text-xs font-extrabold text-slate-500">
            <button 
              onClick={() => alert("COPPA & DPDP Act India Compliant Policy.")}
              className="hover:text-slate-900 cursor-pointer"
            >
              {sections.privacy}
            </button>
            <button 
              onClick={() => alert("Standard Terms of Service for K-12 educational access.")}
              className="hover:text-slate-900 cursor-pointer"
            >
              {sections.terms}
            </button>
          </div>
        </div>

        {/* Built with love banner */}
        <div className="mt-6 text-center text-[10px] font-bold text-slate-400 flex items-center justify-center space-x-1.5">
          <span>Made for K-12 Indian Schools with</span>
          <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
          <span>to democratize coding</span>
        </div>
      </div>
    </footer>
  );
}
