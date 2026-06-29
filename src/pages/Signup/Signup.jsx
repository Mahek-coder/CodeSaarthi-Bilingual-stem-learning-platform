import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, Globe, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../../lib/firebase';

export default function Signup({ currentLanguage = 'en', setCurrentPage }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [preferredLang, setPreferredLang] = useState('en');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError(currentLanguage === 'hi' ? 'कृपया सभी फ़ील्ड भरें।' : 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError(currentLanguage === 'hi' ? 'पासवर्ड मेल नहीं खाते।' : 'Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError(currentLanguage === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Save User Profile to Firestore
      const path = `users/${user.uid}`;
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullName: fullName.trim(),
          email: email.trim(),
          role: role,
          preferredLang: preferredLang,
          grade: "CBSE Grade 9",
          xpPoints: 0,
          dailyStreak: 1,
          completedLessons: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (fsErr) {
        console.warn("Firestore error during email signup:", fsErr);
      }

      setSuccess(true);
      setTimeout(() => {
        if (setCurrentPage) setCurrentPage('login');
      }, 2000);
    } catch (authErr) {
      console.error("Signup error:", authErr);
      let msg = authErr.message;
      if (authErr.code === 'auth/email-already-in-use') {
        msg = currentLanguage === 'hi' ? 'यह ईमेल पहले से ही उपयोग में है।' : 'This email is already in use.';
      } else if (authErr.code === 'auth/invalid-email') {
        msg = currentLanguage === 'hi' ? 'अमान्य ईमेल पता।' : 'Invalid email address.';
      } else if (authErr.code === 'auth/weak-password') {
        msg = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.';
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create profile if doesn't exist
      const path = `users/${user.uid}`;
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullName: user.displayName || 'Learner',
          email: user.email || '',
          role: role,
          preferredLang: preferredLang,
          grade: "CBSE Grade 9",
          xpPoints: 0,
          dailyStreak: 1,
          completedLessons: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (fsErr) {
        console.warn("Firestore error during Google signup:", fsErr);
      }

      setSuccess(true);
      setTimeout(() => {
        if (setCurrentPage) setCurrentPage('dashboard');
      }, 1500);
    } catch (authErr) {
      console.error("Google Signup error:", authErr);
      let friendlyMsg = authErr.message;
      if (authErr.code === 'auth/popup-blocked') {
        friendlyMsg = currentLanguage === 'hi'
          ? 'पॉपअप ब्लॉक कर दिया गया है। कृपया ब्राउज़र में पॉपअप की अनुमति दें या ऊपर "नया टैब खोलें" (Open in New Tab) पर क्लिक करके नए टैब में कोशिश करें।'
          : 'Google signup popup was blocked by your browser. Please allow popups or click the "Open in New Tab" link at the top right to register.';
      } else if (authErr.code === 'auth/cancelled-popup-request' || authErr.code === 'auth/popup-closed-by-user') {
        friendlyMsg = currentLanguage === 'hi'
          ? 'पंजीकरण पॉपअप बंद कर दिया गया था। कृपया फिर से कोशिश करें या ऐप को नए टैब में खोलें।'
          : 'Signup popup was closed or cancelled. Please try again or click "Open in New Tab" at the top right of your screen to complete registration in a new tab.';
      } else if (authErr.code === 'auth/internal-error' || authErr.message?.includes('assertion') || authErr.message?.includes('Assertion')) {
        friendlyMsg = currentLanguage === 'hi'
          ? 'Google लॉगिन पूर्वावलोकन iframe के भीतर प्रतिबंधित है। कृपया शीर्ष-दाएं कोने में "नया टैब खोलें" (Open in New Tab) पर क्लिक करके नए टैब में सुरक्षित रूप से पंजीकरण पूरा करें।'
          : 'Google Sign In is restricted inside the preview iframe. Please click the "Open in New Tab" button in the top-right corner to open the app in a full browser tab and register securely.';
      }
      setError(friendlyMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const labels = {
    title: currentLanguage === 'hi' ? 'कोडसारथी से जुड़ें' : 'Join CodeSaarthi',
    subtitle: currentLanguage === 'hi' ? 'भारत का अपना एआई-संचालित कोडिंग साथी' : 'India’s own AI-powered coding companion',
    fullName: currentLanguage === 'hi' ? 'पूरा नाम' : 'Full Name',
    email: currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address',
    password: currentLanguage === 'hi' ? 'पासवर्ड' : 'Password',
    confirmPassword: currentLanguage === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password',
    roleLabel: currentLanguage === 'hi' ? 'अपनी भूमिका चुनें' : 'Choose Your Role',
    student: currentLanguage === 'hi' ? 'छात्र (Student)' : 'Student',
    teacher: currentLanguage === 'hi' ? 'शिक्षक (Teacher)' : 'Teacher',
    langLabel: currentLanguage === 'hi' ? 'पसंदीदा भाषा' : 'Preferred Language',
    signupBtn: currentLanguage === 'hi' ? 'खाता बनाएं' : 'Create Account',
    googleBtn: currentLanguage === 'hi' ? 'गूगल से साइन अप करें' : 'Sign up with Google',
    haveAccount: currentLanguage === 'hi' ? 'पहले से खाता है?' : 'Already have an account?',
    loginLink: currentLanguage === 'hi' ? 'लॉग इन करें' : 'Log in here',
    successMsg: currentLanguage === 'hi' ? 'पंजीकरण सफल! लॉगिन पर रीडायरेक्ट किया जा रहा है...' : 'Registration successful! Redirecting to login...',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="signup-page-container">
      {/* Decorative background grid pattern for depth instead of blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 border border-blue-500/10">
            <Sparkles className="h-7 w-7 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {labels.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-semibold font-sans">
            {labels.subtitle}
          </p>
        </div>

        {/* Crisp Solid White Card with Soft Sharp Border and Definite Dropshadow */}
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 transition-all">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="text-emerald-800 font-bold text-lg font-sans">{labels.successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sans">
                  {labels.fullName}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Mahek Patil"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sans">
                  {labels.email}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sans">
                  {labels.password}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sans">
                  {labels.confirmPassword}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Role & Language Section */}
              <div className="grid grid-cols-2 gap-4">
                {/* Role selection */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sans">
                    {labels.roleLabel}
                  </label>
                  <div className="flex bg-slate-50 p-1 border border-slate-200 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${role === 'student' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span>{currentLanguage === 'hi' ? 'छात्र' : 'Student'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('teacher')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${role === 'teacher' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>{currentLanguage === 'hi' ? 'शिक्षक' : 'Teacher'}</span>
                    </button>
                  </div>
                </div>

                {/* Language selection */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-sans">
                    {labels.langLabel}
                  </label>
                  <div className="flex bg-slate-50 p-1 border border-slate-200 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPreferredLang('en')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${preferredLang === 'en' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredLang('hi')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${preferredLang === 'hi' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>हिन्दी</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-200 flex items-center justify-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{labels.signupBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Divider and Google signup */}
          {!success && (
            <div className="mt-6">
              <div className="relative flex justify-center text-xs uppercase my-4">
                <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">
                  {currentLanguage === 'hi' ? 'अथवा' : 'Or continue with'}
                </span>
                <div className="absolute inset-0 flex items-center -z-10">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
              </div>

              {/* Google signup button */}
              <button
                onClick={handleGoogleSignup}
                className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-all flex items-center justify-center space-x-2 font-bold text-sm cursor-pointer shadow-sm"
              >
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.253-3.133C18.29 1.71 15.42 1 12.24 1 6.01 1 1 6.01 1 12.24s5.01 11.24 11.24 11.24c6.5 0 10.822-4.571 10.822-11.025 0-.742-.08-1.309-.177-1.785H12.24z"
                  />
                </svg>
                <span>{labels.googleBtn}</span>
              </button>

              {/* Link to Login */}
              <p className="mt-6 text-center text-xs text-slate-500 font-bold">
                {labels.haveAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    if (setCurrentPage) setCurrentPage('login');
                  }}
                  className="text-blue-600 hover:text-blue-700 underline font-extrabold"
                >
                  {labels.loginLink}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
