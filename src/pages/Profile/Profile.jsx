import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Languages, 
  GraduationCap, 
  Award, 
  Trophy, 
  Flame, 
  Edit3, 
  LogOut, 
  Check, 
  BookOpen, 
  Sparkles, 
  Code, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Camera,
  X
} from 'lucide-react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../../lib/firebase';

const BADGES = [
  {
    id: 'logic_warrior',
    name: { en: 'Logic Warrior 🧠', hi: 'लॉजिक वॉरियर 🧠' },
    desc: { en: 'Mastered variable declarations and conditionals.', hi: 'वैरिएबल और कंडीशन्स पर पूर्ण महारत।' },
    color: 'bg-amber-50 border-amber-200 text-amber-700'
  },
  {
    id: 'code_captain',
    name: { en: 'Code Captain 🚀', hi: 'कोड कैप्टन 🚀' },
    desc: { en: 'Created 5+ customized bilingual programs.', hi: '५+ सफल द्विभाषी प्रोग्राम बनाए।' },
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: 'syntax_master',
    name: { en: 'Syntax Master 📦', hi: 'सिंटैक्स मास्टर 📦' },
    desc: { en: 'Solved all standard loop nesting challenge questions.', hi: 'लूप्स के सभी कठिन प्रश्नों को हल किया।' },
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700'
  },
  {
    id: 'olympiad_pro',
    name: { en: 'Olympiad Expert 🏆', hi: 'ओलंपियाड एक्सपर्ट 🏆' },
    desc: { en: 'Completed CBSE Mock Test with top score.', hi: 'सीबीएसई मॉक टेस्ट में उत्कृष्ट प्रदर्शन।' },
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
  }
];

const COMPLETED_COURSES = [
  {
    id: 'py_basics',
    title: { en: 'Python Basics & Turtle Graphics', hi: 'पायथन बेसिक्स और टर्टल ग्राफिक्स' },
    duration: '4 weeks',
    grade: 'A+',
    lessons: 12,
    icon: Code,
    color: 'border-blue-100 bg-blue-50/40'
  },
  {
    id: 'web_intro',
    title: { en: 'Introduction to HTML & CSS Styles', hi: 'HTML और CSS वेब डिजाइनिंग' },
    duration: '3 weeks',
    grade: 'A',
    lessons: 8,
    icon: BookOpen,
    color: 'border-indigo-100 bg-indigo-50/40'
  }
];

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
];

export default function Profile({ 
  currentLanguage = 'en', 
  setCurrentPage, 
  studentName = 'Mahek Patil', 
  setStudentName,
  handleLogout 
}) {
  const isHindi = currentLanguage === 'hi';

  // Internal states for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(studentName);
  const [editEmail, setEditEmail] = useState('mahekpatil777@gmail.com');
  const [editLevel, setEditLevel] = useState('CBSE Grade 9');
  const [editLang, setEditLang] = useState(currentLanguage === 'hi' ? 'hi' : 'en');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync profile details with authenticated user in Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        setEditEmail(user.email || '');
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.fullName) {
              setEditName(data.fullName);
              setStudentName(data.fullName);
            }
            if (data.grade) setEditLevel(data.grade);
            if (data.preferredLang) setEditLang(data.preferredLang);
          }
        } catch (err) {
          console.warn("Firestore error fetching user profile:", err);
        }
      }
    };
    fetchProfile();
  }, [studentName]);

  // Stats (Static/Mock data matching the scope)
  const quizScore = '4/5 (CBSE Mock Test 3)';
  const streakDays = 7;

  // Language translations map
  const t = {
    headerTitle: isHindi ? 'छात्र प्रोफ़ाइल' : 'Student Profile Control Room',
    headerDesc: isHindi ? 'अपनी कोडिंग यात्रा, उपलब्धियों और प्राथमिकताओं को प्रबंधित करें।' : 'Manage your interactive coding progress, achievements, and account settings.',
    personalDetails: isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Details',
    editProfile: isHindi ? 'प्रोफ़ाइल संपादित करें' : 'Edit Profile',
    saveChanges: isHindi ? 'बदलाव सहेजें' : 'Save Changes',
    cancel: isHindi ? 'रद्द करें' : 'Cancel',
    logout: isHindi ? 'लॉगआउट' : 'Log Out',
    studentNameLabel: isHindi ? 'छात्र का नाम:' : 'Student Name:',
    emailLabel: isHindi ? 'ईमेल पता:' : 'Email Address:',
    learningLevelLabel: isHindi ? 'सीखने का स्तर:' : 'Learning Level:',
    selectedLanguageLabel: isHindi ? 'पसंदीदा भाषा:' : 'Selected Language:',
    completedCoursesLabel: isHindi ? 'पूर्ण किए गए पाठ्यक्रम' : 'Completed Courses',
    quizScoreLabel: isHindi ? 'मॉक टेस्ट स्कोर:' : 'Mock Quiz Score:',
    streakLabel: isHindi ? 'सीखने की निरंतरता (Streak):' : 'Learning Streak:',
    achievementsLabel: isHindi ? 'अर्जित सम्मान और मेडल' : 'Earned Badges & Medals',
    backDashboard: isHindi ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard',
    saveSuccessMsg: isHindi ? 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!' : 'Profile details updated successfully!',
    changeAvatar: isHindi ? 'अवतार बदलें' : 'Change Avatar',
    streakDesc: isHindi ? 'लगातार कोडिंग दिन! इस आग को जलाए रखें।' : 'Bilingual coding days in a row! Keep the fire burning 🔥',
    noBadge: isHindi ? 'अभी तक कोई मेडल नहीं जीता गया।' : 'No badges earned yet.',
    verifiedStudent: isHindi ? 'सत्यापित कोडर' : 'Verified STEM Scholar',
    selectAvatarTitle: isHindi ? 'एक नया अवतार चुनें' : 'Choose a New Avatar',
    lessonsText: isHindi ? 'पाठ' : 'lessons',
    durationText: isHindi ? 'अवधि' : 'duration',
    gradeText: isHindi ? 'ग्रेड' : 'grade'
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) return;

    const user = auth.currentUser;
    if (user) {
      const path = `users/${user.uid}`;
      try {
        await setDoc(doc(db, 'users', user.uid), {
          fullName: editName.trim(),
          email: editEmail.trim(),
          preferredLang: editLang,
          grade: editLevel,
          updatedAt: serverTimestamp()
        }, { merge: true });
        
        setStudentName(editName.trim());
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } catch (err) {
        console.warn("Firestore save profile error:", err);
        // Fallback: save locally in state so user doesn't experience a crash
        setStudentName(editName.trim());
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } else {
      setStudentName(editName);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      
      {/* Top Banner Navigation */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage?.('dashboard')}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors cursor-pointer bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs"
        >
          <ArrowLeft className="h-4 w-4 text-blue-600" />
          <span>{t.backDashboard}</span>
        </button>

        {saveSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs animate-pulse flex items-center space-x-1.5">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
            <span>{t.saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">
          {t.headerTitle}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          {t.headerDesc}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Personal Information */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 shadow-md relative overflow-hidden flex flex-col items-center">
            
            {/* Background Accent Deco */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

            {/* Profile Avatar Frame */}
            <div className="relative mt-8 mb-4">
              <img 
                src={selectedAvatar} 
                alt="Student Avatar" 
                referrerPolicy="no-referrer"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover" 
              />
              <button 
                onClick={() => setShowAvatarSelector(true)}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-105"
                title={t.changeAvatar}
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Verified Student Badge */}
            <span className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>{t.verifiedStudent}</span>
            </span>

            {/* Core details */}
            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none text-center">
              {studentName}
            </h2>
            <p className="text-slate-400 font-bold text-xs mt-1.5 font-mono">
              {editEmail}
            </p>

            {/* Learning Level Badge */}
            <div className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.learningLevelLabel}</span>
              <span className="text-sm font-extrabold text-indigo-700 flex items-center justify-center space-x-1 mt-1">
                <GraduationCap className="h-4.5 w-4.5 text-indigo-600" />
                <span>{editLevel}</span>
              </span>
            </div>

            {/* Actions Block */}
            <div className="mt-6 w-full space-y-2.5 pt-6 border-t border-slate-100">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 border border-blue-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-blue-150 transition-all hover:-translate-y-0.5"
              >
                <Edit3 className="h-4 w-4" />
                <span>{t.editProfile}</span>
              </button>
              
              <button
                onClick={() => {
                  if (confirm(isHindi ? 'क्या आप लॉगआउट करना चाहते हैं?' : 'Are you sure you want to log out of your student control room?')) {
                    handleLogout?.();
                  }
                }}
                className="w-full py-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-700 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>{t.logout}</span>
              </button>
            </div>

          </div>

          {/* Quick Learning Streak Meter */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3.5 rounded-2xl border border-white/15 shadow-inner">
                <Flame className="h-8 w-8 text-amber-200 fill-amber-300 animate-pulse" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-amber-100">{t.streakLabel}</span>
                <span className="text-3xl font-black block mt-0.5">{streakDays} {isHindi ? 'दिन' : 'Days'} 🔥</span>
              </div>
            </div>
            <p className="text-[11px] text-amber-100 font-medium leading-relaxed mt-4 pt-4 border-t border-white/10">
              {t.streakDesc}
            </p>
          </div>

        </div>

        {/* Right 2 Columns: Stats, Completed Courses, Achievements */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Row: Mini stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-600">
                <Trophy className="h-5.5 w-5.5 text-blue-600 fill-blue-100" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.quizScoreLabel}</span>
                <span className="text-sm font-black text-slate-800 block mt-0.5">{quizScore}</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-600">
                <Languages className="h-5.5 w-5.5 text-indigo-600" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.selectedLanguageLabel}</span>
                <span className="text-sm font-black text-indigo-800 block mt-0.5">
                  {currentLanguage === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
                </span>
              </div>
            </div>

          </div>

          {/* Section: Completed Courses Progress List */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center mb-5">
              <BookOpen className="h-5.5 w-5.5 text-blue-600 mr-2" />
              <span>{t.completedCoursesLabel}</span>
              <span className="ml-3.5 bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                {COMPLETED_COURSES.length}
              </span>
            </h3>

            <div className="space-y-4">
              {COMPLETED_COURSES.map((course) => {
                const IconComp = course.icon;
                return (
                  <div 
                    key={course.id}
                    className={`border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-50/50 ${course.color}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs text-slate-700 shrink-0">
                        <IconComp className="h-5.5 w-5.5 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {isHindi ? course.title.hi : course.title.en}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>{course.lessons} {t.lessonsText}</span>
                          <span>•</span>
                          <span>{t.durationText}: {course.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl px-4 py-2 text-center self-end sm:self-auto shrink-0">
                      <span className="block text-[8px] font-black text-emerald-700 uppercase tracking-widest">{t.gradeText}</span>
                      <span className="text-sm font-black text-emerald-800 block mt-0.5">{course.grade}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Achievement Badges & Medals */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center mb-5">
              <Award className="h-5.5 w-5.5 text-blue-600 mr-2" />
              <span>{t.achievementsLabel}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BADGES.map((badge) => (
                <div 
                  key={badge.id}
                  className={`border p-4.5 rounded-2xl flex items-start space-x-3.5 transition-all hover:shadow-xs ${badge.color}`}
                >
                  <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200/10 self-start shrink-0">
                    <Sparkles className="h-5 w-5 text-amber-500 fill-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-tight">
                      {isHindi ? badge.name.hi : badge.name.en}
                    </h4>
                    <p className="text-slate-500 text-[11px] font-semibold mt-1 leading-relaxed">
                      {isHindi ? badge.desc.hi : badge.desc.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Dialog Modal Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-slate-200 rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl transition-all cursor-pointer hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">
              {t.editProfile}
            </h3>
            <p className="text-slate-500 text-xs font-semibold mb-6">
              {isHindi ? 'अपनी कोडिंग प्रोफ़ाइल विवरण को अपडेट करें।' : 'Modify your CodeSaarthi student records here.'}
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  {t.studentNameLabel}
                </label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  {t.emailLabel}
                </label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  {t.learningLevelLabel}
                </label>
                <select 
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm cursor-pointer"
                >
                  <option value="CBSE Grade 6">CBSE Grade 6 (Middle School)</option>
                  <option value="CBSE Grade 7">CBSE Grade 7 (Middle School)</option>
                  <option value="CBSE Grade 8">CBSE Grade 8 (Middle School)</option>
                  <option value="CBSE Grade 9">CBSE Grade 9 (Secondary Level)</option>
                  <option value="CBSE Grade 10">CBSE Grade 10 (Secondary Level)</option>
                </select>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-150 border border-blue-700"
                >
                  {t.saveChanges}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-slate-200 rounded-[32px] max-w-sm w-full p-6 text-center shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-200">
            
            <button 
              onClick={() => setShowAvatarSelector(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl transition-all cursor-pointer hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-5">
              {t.selectAvatarTitle}
            </h3>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {AVATARS.map((avatarUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedAvatar(avatarUrl);
                    setShowAvatarSelector(false);
                  }}
                  className={`relative rounded-full overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 p-0.5 ${
                    selectedAvatar === avatarUrl ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={avatarUrl} alt="Avatar Selection Item" className="w-full h-12 sm:h-14 rounded-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
