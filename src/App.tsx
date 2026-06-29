import React, { useState, useEffect } from 'react';
import { Sparkles, X, Check, Award, GraduationCap, ShieldCheck } from 'lucide-react';
// @ts-ignore
import Navbar from './components/layout/Navbar';
// @ts-ignore
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup/Signup';
import StudentDashboard from './pages/Dashboard/Dashboard';
// @ts-ignore
import Courses from './pages/Courses/Courses';
// @ts-ignore
import AIChat from './pages/AIChat/AIChat';
// @ts-ignore
import Quiz from './pages/Quiz/Quiz';
// @ts-ignore
import Profile from './pages/Profile/Profile';
import { Language } from './types';
import { translations } from './data/translations';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [studentName, setStudentName] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showFirestoreSetupTip, setShowFirestoreSetupTip] = useState(false);

  const activeTranslations = translations[currentLanguage];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user document from Firestore to restore accurate student name
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setStudentName(data.fullName || user.displayName || 'Learner');
          } else {
            setStudentName(user.displayName || 'Learner');
          }
        } catch (err: any) {
          console.warn("Error fetching user profile from Firestore (handled fallback):", err);
          setStudentName(user.displayName || 'Learner');
          if (err?.code === 'permission-denied' || err?.message?.toLowerCase().includes('permission') || err?.message?.toLowerCase().includes('insufficient')) {
            setShowFirestoreSetupTip(true);
          }
        }
      } else {
        setStudentName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (name: string) => {
    setStudentName(name);
    setCurrentPage('dashboard');
    setShowNotification(true);
    // Auto-hide welcome notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4500);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setStudentName(null);
      setCurrentPage('home');
      setShowNotification(false);
    } catch (err) {
      console.error("Logout Error: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-800">
      
      {/* Dynamic Welcome Toast Notification */}
      {showNotification && studentName && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-4 animate-bounce-slow flex items-start space-x-3">
          <div className="bg-emerald-500 p-2 rounded-xl text-white">
            <Check className="h-5 w-5 stroke-[3px]" />
          </div>
          <div className="flex-1">
            <span className="block text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">Success / सफलता!</span>
            <span className="block text-sm font-semibold font-sans">
              {currentLanguage === 'hi' 
                ? `स्वागत है, ${studentName}! आपने लॉग इन कर लिया है।` 
                : `Welcome, ${studentName}! You have logged in successfully.`}
            </span>
            <p className="text-[10px] text-slate-400 mt-1 font-sans">
              CodeSaarthi dashboard and course curriculum unlocked!
            </p>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Firestore Setup Warning Banner for Manual Firebase Integration */}
      {showFirestoreSetupTip && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-3.5 text-xs sm:text-sm font-sans relative z-50 animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-start space-x-2.5">
              <span className="bg-amber-500 text-white font-black text-[9px] px-2 py-0.5 rounded-md uppercase shrink-0 mt-0.5 font-mono tracking-wider">
                Action Required / क्रिया आवश्यक
              </span>
              <div>
                <p className="font-bold text-amber-950">
                  {currentLanguage === 'hi'
                    ? '🔒 आपके फायरबेस कंसोल में फायरस्टोर सुरक्षा नियम (Firestore Security Rules) सेटअप करना आवश्यक है।'
                    : '🔒 Firestore Security Rules setup is required in your Firebase Console.'}
                </p>
                <p className="text-amber-800 mt-1 text-xs leading-relaxed font-semibold">
                  {currentLanguage === 'hi'
                    ? 'चूंकि आप अपने स्वयं के फायरबेस प्रोजेक्ट (codesaarthi-e85cb) का उपयोग कर रहे हैं, इसलिए आपको इस प्रोजेक्ट के रूट में मौजूद "firestore.rules" फ़ाइल की सामग्री को कॉपी करना होगा और उसे अपने फायरबेस कंसोल के "Firestore Database > Rules" टैब में पेस्ट करना होगा ताकि सभी डेटाबेस कार्य सुरक्षित रूप से काम कर सकें।'
                    : 'Since you are using your own manual Firebase project (codesaarthi-e85cb), you must copy the contents of the local "firestore.rules" file from the root of this workspace and paste them under the "Firestore Database > Rules" tab in your Firebase Console to authorize read/write operations.'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={() => setShowFirestoreSetupTip(false)}
                className="bg-amber-100 hover:bg-amber-200 text-amber-950 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer text-xs shadow-xs"
              >
                {currentLanguage === 'hi' ? 'समझ गया (Dismiss)' : 'Dismiss'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Campaign Bar (Very Indian Education Focused: CBSE, STEM, etc.) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white text-[11px] font-sans py-2.5 px-4 text-center flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3 border-b border-indigo-900 relative z-50">
        <span className="bg-indigo-600 font-mono font-extrabold text-[9px] px-2 py-0.5 rounded-full border border-indigo-500 flex items-center shrink-0">
          <Award className="h-3 w-3 mr-1 text-amber-300" /> HACKATHON 2026 SPECIAL
        </span>
        <span className="font-medium">
          {currentLanguage === 'hi'
            ? '🚀 कोडसारथी AI अब सीबीएसई (CBSE) राष्ट्रीय पाठ्यक्रम के अनुरूप तैयार किया गया है।'
            : '🚀 CodeSaarthi AI is now optimized for CBSE and National STEM Curriculum benchmarks.'}
        </span>
        {studentName && (
          <div className="flex items-center space-x-2 sm:border-l sm:border-indigo-600 sm:pl-3">
            <span className="font-semibold text-emerald-300">👋 {studentName}</span>
            <button
              onClick={handleLogout}
              className="underline text-indigo-300 hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-900/40 px-2 py-0.5 rounded-md border border-indigo-700 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Shared Header Navigation */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        translations={activeTranslations}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        studentName={studentName}
        handleLogout={handleLogout}
      />

      {/* Main Page Content Container */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home
            currentLanguage={currentLanguage}
            translations={activeTranslations}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'login' && (
          <Login
            currentLanguage={currentLanguage}
            translations={activeTranslations}
            setCurrentPage={setCurrentPage}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentPage === 'signup' && (
          <Signup
            currentLanguage={currentLanguage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'dashboard' && (
          <StudentDashboard
            currentLanguage={currentLanguage}
            studentName={studentName || "Mahek Patil"}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'courses' && (
          <Courses
            currentLanguage={currentLanguage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'aitutor' && (
          <AIChat
            currentLanguage={currentLanguage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'quiz' && (
          <Quiz
            currentLanguage={currentLanguage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'profile' && (
          <Profile
            currentLanguage={currentLanguage}
            setCurrentPage={setCurrentPage}
            studentName={studentName || "Mahek Patil"}
            setStudentName={setStudentName}
            handleLogout={handleLogout}
          />
        )}
      </main>

      {/* Shared Footer component */}
      <Footer currentLanguage={currentLanguage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
