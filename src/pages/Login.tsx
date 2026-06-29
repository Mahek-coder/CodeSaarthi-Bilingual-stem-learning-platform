import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Check, Sparkles, GraduationCap, AlertTriangle } from 'lucide-react';
import { Language, TranslationSet } from '../types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface LoginProps {
  currentLanguage: Language;
  translations: TranslationSet;
  setCurrentPage: (page: 'home' | 'login' | 'signup') => void;
  onLoginSuccess: (studentName: string) => void;
}

export default function Login({
  currentLanguage,
  translations,
  setCurrentPage,
  onLoginSuccess,
}: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (isSignUp && !fullName.trim()) {
      setErrorMessage(currentLanguage === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setErrorMessage(currentLanguage === 'hi' ? 'कृपया ईमेल और पासवर्ड दर्ज करें।' : 'Please enter email and password.');
      return;
    }
    if (isSignUp && !agreeToTerms) {
      setErrorMessage(currentLanguage === 'hi' ? 'कृपया नियमों और शर्तों से सहमत हों।' : 'Please agree to the Terms of Service.');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save User Details to Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            fullName: fullName.trim(),
            email: email.trim(),
            role: "student",
            preferredLang: currentLanguage,
            grade: "CBSE Grade 9",
            xpPoints: 0,
            dailyStreak: 1,
            completedLessons: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } catch (fsErr) {
          console.warn("Firestore save profile error during email signup:", fsErr);
        }

        onLoginSuccess(fullName.trim());
      } else {
        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch User Profile from Firestore to read name
        let profileName = user.displayName || email.split('@')[0];
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            profileName = userDoc.data().fullName || profileName;
          }
        } catch (fsErr) {
          console.warn("Firestore error fetching profile during email login:", fsErr);
        }

        onLoginSuccess(profileName);
      }
    } catch (authErr: any) {
      console.error("Firebase Authentication Error:", authErr);
      let msg = authErr.message;
      if (authErr.code === 'auth/email-already-in-use') {
        msg = currentLanguage === 'hi' ? 'यह ईमेल पहले से ही उपयोग में है।' : 'This email is already in use.';
      } else if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential') {
        msg = currentLanguage === 'hi' ? 'अमान्य ईमेल या पासवर्ड।' : 'Invalid email or password.';
      } else if (authErr.code === 'auth/weak-password') {
        msg = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password should be at least 6 characters.';
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if user exists in Firestore, if not create profile
      let profileName = user.displayName || 'Learner';
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            fullName: profileName,
            email: user.email || '',
            role: "student",
            preferredLang: currentLanguage,
            grade: "CBSE Grade 9",
            xpPoints: 0,
            dailyStreak: 1,
            completedLessons: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } else {
          profileName = userDoc.data().fullName || profileName;
        }
      } catch (fsErr) {
        console.warn("Firestore error during Google login profile sync:", fsErr);
      }

      onLoginSuccess(profileName);
    } catch (authErr: any) {
      console.error("Google Sign In Error:", authErr);
      let friendlyMsg = authErr.message;
      if (authErr.code === 'auth/popup-blocked') {
        friendlyMsg = currentLanguage === 'hi'
          ? 'पॉपअप ब्लॉक कर दिया गया है। कृपया ब्राउज़र में पॉपअप की अनुमति दें या ऊपर "नया टैब खोलें" (Open in New Tab) पर क्लिक करके नए टैब में कोशिश करें।'
          : 'Google login popup was blocked by your browser. Please allow popups or click the "Open in New Tab" link at the top right to sign in.';
      } else if (authErr.code === 'auth/cancelled-popup-request' || authErr.code === 'auth/popup-closed-by-user') {
        friendlyMsg = currentLanguage === 'hi'
          ? 'लॉगिन पॉपअप बंद कर दिया गया था। कृपया फिर से कोशिश करें या ऊपर "नया टैब खोलें" पर क्लिक करें।'
          : 'Login popup was closed or cancelled. Please try again or click "Open in New Tab" at the top right to complete Google Sign In.';
      } else if (authErr.code === 'auth/internal-error' || authErr.message?.includes('assertion') || authErr.message?.includes('Assertion')) {
        friendlyMsg = currentLanguage === 'hi'
          ? 'Google लॉगिन पूर्वावलोकन iframe के भीतर प्रतिबंधित है। कृपया शीर्ष-दाएं कोने में "नया टैब खोलें" (Open in New Tab) पर क्लिक करके नए टैब में सुरक्षित रूप से लॉगिन करें।'
          : 'Google Sign In is restricted inside the preview iframe. Please click the "Open in New Tab" button in the top-right corner to open the app in a full browser tab and sign in securely.';
      }
      setErrorMessage(friendlyMsg);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative" id="login-page-container">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl border border-blue-50 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle accent header line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400"></div>

        {/* Brand / Title section */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center bg-blue-50 text-blue-600 p-3 rounded-2xl mb-1 border border-blue-100">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isSignUp ? (currentLanguage === 'hi' ? 'नया छात्र खाता बनाएं' : 'Create Student Account') : translations.loginTitle}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            {isSignUp ? (currentLanguage === 'hi' ? 'अपनी मातृभाषा में कोडिंग और विज्ञान सीखना शुरू करें' : 'Start your bilingual science & coding journey today') : translations.loginSubtitle}
          </p>
        </div>

        {/* Demo notification banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-6 flex items-start space-x-2 text-[11px] text-amber-800 leading-normal">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 animate-bounce-slow" />
          <span>{translations.demoAccountBanner}</span>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-xl text-xs flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name field (Only for Sign Up) */}
          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                {translations.fullnameLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Address field */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              {translations.emailLabel}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                placeholder="student@codesaarthi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-slate-700">
                {translations.passwordLabel}
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => alert('Demo Reset: A link was sent to your email (simulated).')}
                  className="text-[10px] font-semibold text-blue-600 hover:underline"
                >
                  {translations.forgotPassword}
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Terms checkbox (Only for Sign Up) */}
          {isSignUp && (
            <div className="flex items-start space-x-2 pt-1">
              <input
                type="checkbox"
                id="agree"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="agree" className="text-[10px] text-slate-500 leading-snug">
                {translations.termsAgreement}
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-2xl shadow-lg shadow-blue-100 transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-75"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{isSignUp ? (currentLanguage === 'hi' ? 'रजिस्टर करें' : 'Create Free Account') : translations.loginButton}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Or Continue With Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
            <span className="bg-white px-3">{translations.orContinueWith}</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center space-x-2 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.51 14.99 1 12 1 7.35 1 3.37 3.66 1.34 7.55l3.85 2.99C6.12 7.06 8.84 5.04 12 5.04z"/>
              <path fill="#4285F4" d="M23.45 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.1 2.66-2.33 3.48l3.63 2.82c2.12-1.95 3.35-4.83 3.35-8.45z"/>
              <path fill="#FBBC05" d="M5.19 14.54c-.24-.71-.38-1.47-.38-2.27s.14-1.56.38-2.27L1.34 7.55C.49 9.19 0 11.04 0 13s.49 3.81 1.34 5.45l3.85-2.91z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.63-2.82c-1.1.74-2.51 1.18-4.33 1.18-3.16 0-5.88-2.02-6.84-5.51L1.31 15.86C3.34 19.75 7.32 22.41 12 23z"/>
            </svg>
            <span>Google</span>
          </button>
          
          <button
            type="button"
            onClick={() => alert(currentLanguage === 'hi' ? 'सीबीएसई पोर्टल एकीकरण जल्द ही आ रहा है (सिमुलेटेड)।' : 'CBSE Portal integration is coming soon (simulated).')}
            className="flex items-center justify-center space-x-2 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm">🏫</span>
            <span>CBSE Student</span>
          </button>
        </div>

        {/* Toggle Mode Link */}
        <div className="mt-8 text-center text-xs text-slate-500">
          {isSignUp ? (
            <button
              onClick={() => setIsSignUp(false)}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              {translations.alreadyHaveAccount}
            </button>
          ) : (
            <button
              onClick={() => setIsSignUp(true)}
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              {translations.dontHaveAccount}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
