import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Award, 
  BrainCircuit, 
  Code, 
  Globe, 
  User, 
  Sparkles, 
  BookOpenCheck,
  LayoutGrid,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const DUMMY_COURSES = [
  {
    id: 'scratch-bilingual',
    title: {
      en: 'Scratch Coding Adventure for Kids',
      hi: 'बच्चों के लिए स्क्रैच कोडिंग एडवेंचर'
    },
    description: {
      en: 'Build games, animations, and interactive stories while learning foundational computational concepts with bilingual visual blocks.',
      hi: 'बूट-कैंप शैली में द्विभाषी विजुअल ब्लॉक्स का उपयोग करके गेम, एनिमेशन और कहानियां बनाना सीखें।'
    },
    category: 'Programming',
    difficulty: 'Beginner',
    language: 'Hindi',
    duration: '8 Hours • 16 Lectures',
    rating: 4.8,
    instructor: 'Sneha Patil (IIT Delhi Alumna)',
    progress: 45,
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'python-basics',
    title: {
      en: 'Python Programming for Young Inventors',
      hi: 'युवा आविष्कारकों के लिए पायथन प्रोग्रामिंग'
    },
    description: {
      en: 'Learn Python syntax, variables, conditions, and loops with engaging real-world projects customized for Indian school standards.',
      hi: 'भारतीय स्कूल मानकों के अनुकूल कोडिंग प्रोजेक्ट्स के माध्यम से पायथन सिंटैक्स, वैरिएबल और लूप्स सीखें।'
    },
    category: 'Programming',
    difficulty: 'Beginner',
    language: 'English',
    duration: '12 Hours • 24 Lectures',
    rating: 4.9,
    instructor: 'Rohan Sharma (Coding Guru)',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'bilingual-ai',
    title: {
      en: 'AI & Machine Learning: Bilingual Saarthi',
      hi: 'एआई और मशीन लर्निंग: द्विभाषी सारथी'
    },
    description: {
      en: 'Demystify neural networks and AI models with interactive code snippets and simplified explanations in English and Hindi.',
      hi: 'न्यूरल नेटवर्क और एआई मॉडलों को सरल कोडिंग अभ्यास और हिंदी-अंग्रेजी माध्यम में विस्तृत व्याख्या के साथ समझें।'
    },
    category: 'AI',
    difficulty: 'Intermediate',
    language: 'Hindi',
    duration: '15 Hours • 30 Lectures',
    rating: 4.9,
    instructor: 'Dr. Amit Verma (AI Research Scientist)',
    progress: 10,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'web-dev-basics',
    title: {
      en: 'Responsive Web Design (HTML, CSS & JS)',
      hi: 'रिस्पॉन्सिव वेब डिजाइनिंग (HTML, CSS और JS)'
    },
    description: {
      en: 'Construct premium web portfolios from scratch and host your live CBSE projects online using standard developer tools.',
      hi: 'शुरुआती स्तर से आकर्षक वेब पोर्टफोलियो बनाएं और अपने लाइव सीबीएसई प्रोजेक्ट्स को इंटरनेट पर होस्ट करें।'
    },
    category: 'Web Development',
    difficulty: 'Beginner',
    language: 'Marathi',
    duration: '10 Hours • 18 Lectures',
    rating: 4.7,
    instructor: 'Priya Joshi',
    progress: 80,
    thumbnail: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'ds-algo',
    title: {
      en: 'Data Structures for Competitive Coding',
      hi: 'प्रतियोगी कोडिंग के लिए डेटा स्ट्रक्चर'
    },
    description: {
      en: 'Master arrays, stacks, queues, trees, and searching algorithms specially formulated for STEM Olympiads & CBSE.',
      hi: 'स्टेम ओलंपियाड और सीबीएसई परीक्षाओं के लिए विशेष रूप से तैयार सरणियों, पेड़, और सर्चिंग एल्गोरिदम में महारत हासिल करें।'
    },
    category: 'Data Structures',
    difficulty: 'Advanced',
    language: 'English',
    duration: '20 Hours • 45 Lectures',
    rating: 5.0,
    instructor: 'Vikram Malhotra (Senior Architect)',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'geometry-art',
    title: {
      en: 'Visual Mathematics & Coding Geometry',
      hi: 'विजुअल गणित और कोडिंग ज्योमेट्री'
    },
    description: {
      en: 'Unify mathematics with creative coding by building fractal designs and recursive geometric artwork visually.',
      hi: 'क्रिएटिव कोडिंग के साथ गणित को एकीकृत करें और विजुअल फ्रैक्टर डिजाइन और रिकर्सिव ज्योमेट्री चित्र बनाना सीखें।'
    },
    category: 'Mathematics',
    difficulty: 'Intermediate',
    language: 'Tamil',
    duration: '6 Hours • 12 Lectures',
    rating: 4.6,
    instructor: 'Ananya Iyer',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'iot-arduino',
    title: {
      en: 'Robotics & IoT Basics with Arduino',
      hi: 'रोबोटिक्स और IoT मूल बातें: अरडूइनो'
    },
    description: {
      en: 'Step into hardware programming. Write scripts to control LEDs, sensors, and servo motors in simulated circuits.',
      hi: 'हार्डवेयर प्रोग्रामिंग में कदम रखें। सिमुलेटेड सर्किट में एलईडी, सेंसर और सर्वो मोटर्स को नियंत्रित करने के लिए स्क्रिप्ट लिखें।'
    },
    category: 'Science',
    difficulty: 'Intermediate',
    language: 'Hindi',
    duration: '14 Hours • 28 Lectures',
    rating: 4.8,
    instructor: 'Prof. S.K. Bose (IIT Delhi Advisor)',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'ai-chatbot',
    title: {
      en: 'Build Your First Intelligent Chatbot',
      hi: 'अपना पहला बुद्धिमान चैटबॉट बनाएं'
    },
    description: {
      en: 'Harness the power of AI APIs to build conversational interfaces, fine-tuning response rules for STEM challenges.',
      hi: 'एआई एपीआई की शक्ति का उपयोग करके संवादात्मक इंटरफ़ेस बनाएं, और स्टेम चुनौतियों के लिए प्रतिक्रिया नियमों को ठीक करें।'
    },
    category: 'AI',
    difficulty: 'Advanced',
    language: 'English',
    duration: '9 Hours • 15 Lectures',
    rating: 4.9,
    instructor: 'Gaurav Sen',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=600&auto=format&fit=crop',
    featured: false
  }
];

const CATEGORIES = ['All', 'Programming', 'AI', 'Web Development', 'Data Structures', 'Mathematics', 'Science'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Marathi', 'Tamil'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses({ currentLanguage = 'en', setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [enrollmentStatus, setEnrollmentStatus] = useState({});

  const t = {
    title: currentLanguage === 'hi' ? 'सीखें बेहतरीन कोडिंग पाठ्यक्रम' : 'Explore STEM Courses',
    subtitle: currentLanguage === 'hi' 
      ? 'भारत का पहला और सर्वश्रेष्ठ द्विभाषी कोडिंग शिक्षा मंच - अपनी भाषा में महारत हासिल करें!' 
      : 'India’s Premium Bilingual Coding Hub. Learn step-by-step in your preferred regional language!',
    searchPlaceholder: currentLanguage === 'hi' ? 'कोर्स, शिक्षक या तकनीक खोजें...' : 'Search for courses, instructors or skills...',
    categoryLabel: currentLanguage === 'hi' ? 'श्रेणी' : 'Category',
    languageLabel: currentLanguage === 'hi' ? 'भाषा' : 'Language',
    difficultyLabel: currentLanguage === 'hi' ? 'स्तर' : 'Difficulty',
    beginner: currentLanguage === 'hi' ? 'शुरुआती' : 'Beginner',
    intermediate: currentLanguage === 'hi' ? 'मध्यम' : 'Intermediate',
    advanced: currentLanguage === 'hi' ? 'उन्नत' : 'Advanced',
    startLearning: currentLanguage === 'hi' ? 'कोर्स शुरू करें' : 'Start Learning',
    continueLearning: currentLanguage === 'hi' ? 'सीखना जारी रखें' : 'Continue Learning',
    enrolledSuccessfully: currentLanguage === 'hi' ? 'सफलतापूर्वक नामांकित!' : 'Successfully Enrolled!',
    instructor: currentLanguage === 'hi' ? 'प्रशिक्षक' : 'Instructor',
    duration: currentLanguage === 'hi' ? 'अवधि' : 'Duration',
    rating: currentLanguage === 'hi' ? 'रेटिंग' : 'Rating',
    progress: currentLanguage === 'hi' ? 'आपकी प्रगति' : 'Your Progress',
    noCourses: currentLanguage === 'hi' ? 'कोई कोर्स नहीं मिला। कृपया अपने फ़िल्टर बदलें।' : 'No courses found. Try modifying your filters.',
    clearFilters: currentLanguage === 'hi' ? 'फ़िल्टर साफ़ करें' : 'Clear All Filters',
    enrolledAlert: currentLanguage === 'hi' 
      ? 'बधाई हो! आप इस प्रीमियम कोर्स में नामांकित हो गए हैं। छात्र डैशबोर्ड से इसे शुरू करें!' 
      : 'Congratulations! You have enrolled. Access and track this course on your student dashboard now!',
    studentBestsellers: currentLanguage === 'hi' ? '⭐ सीबीएसई और ओलंपियाड हेतु सर्वश्रेष्ठ चयन' : '⭐ Top Rated CBSE & STEM Picks'
  };

  const handleEnroll = (courseId, courseTitle) => {
    setEnrollmentStatus(prev => ({ ...prev, [courseId]: true }));
    alert(t.enrolledAlert);
  };

  // Filter & Search Logic
  const filteredCourses = useMemo(() => {
    return DUMMY_COURSES.filter(course => {
      const matchSearch = 
        course.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchLanguage = selectedLanguage === 'All' || course.language === selectedLanguage;
      const matchDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

      return matchSearch && matchCategory && matchLanguage && matchDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedLanguage, selectedDifficulty]);

  return (
    <div className="bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 min-h-screen pb-24 font-sans relative overflow-hidden text-slate-800">
      
      {/* Dynamic Background subtle shapes (High contrast, no blur) */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-20"></div>
      <div className="absolute top-48 right-12 w-6 h-6 bg-indigo-500 rounded-full opacity-20"></div>

      {/* Hero Section */}
      <header className="relative pt-12 pb-8 border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="h-4.5 w-4.5 text-amber-500" />
            <span>{t.studentBestsellers}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-sans text-slate-900 tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            {t.subtitle}
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-sm"
              id="courses-search-bar"
            />
          </div>
        </div>
      </header>

      {/* Filter and Courses Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">
                {currentLanguage === 'hi' ? 'पाठ्यक्रम खोज परिष्कृत करें' : 'Filter & Refine'}
              </h3>
            </div>
            {(selectedCategory !== 'All' || selectedLanguage !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLanguage('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer underline"
              >
                {t.clearFilters}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t.categoryLabel}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-700 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? (currentLanguage === 'hi' ? 'सभी श्रेणियां' : 'All Categories') : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t.languageLabel}
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-700 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === 'All' ? (currentLanguage === 'hi' ? 'सभी भाषाएं' : 'All Languages') : lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t.difficultyLabel}
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-700 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
              >
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>
                    {diff === 'All' 
                      ? (currentLanguage === 'hi' ? 'सभी कठिनाई स्तर' : 'All Difficulties') 
                      : (diff === 'Beginner' ? t.beginner : diff === 'Intermediate' ? t.intermediate : t.advanced)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Card Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isEnrolled = enrollmentStatus[course.id] || course.progress > 0;
              const hasStarted = course.progress > 0;
              const titleText = currentLanguage === 'hi' ? course.title.hi : course.title.en;
              const descText = currentLanguage === 'hi' ? course.description.hi : course.description.en;

              return (
                <div 
                  key={course.id}
                  className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-md shadow-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={titleText}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                    
                    {/* Badge Pill Header */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <span className="bg-white/95 backdrop-blur-xs text-indigo-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
                        {course.category}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm text-white ${
                        course.difficulty === 'Beginner' ? 'bg-emerald-600' :
                        course.difficulty === 'Intermediate' ? 'bg-indigo-600' : 'bg-rose-600'
                      }`}>
                        {course.difficulty === 'Beginner' ? t.beginner :
                         course.difficulty === 'Intermediate' ? t.intermediate : t.advanced}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      {/* Languages Badge and Ratings */}
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                        <div className="flex items-center space-x-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          <Globe className="h-3.5 w-3.5" />
                          <span>{course.language}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star className="h-4 w-4 fill-amber-500" />
                          <span className="font-bold text-slate-800">{course.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-black text-slate-900 leading-snug tracking-tight hover:text-indigo-600 transition-colors">
                        {titleText}
                      </h4>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed mt-2.5 line-clamp-3">
                        {descText}
                      </p>
                    </div>

                    {/* Meta stats like Instructor & Duration */}
                    <div className="pt-3.5 border-t border-slate-100 space-y-2">
                      <div className="flex items-center text-xs text-slate-500">
                        <User className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                        <span className="truncate">
                          <strong>{t.instructor}:</strong> {course.instructor}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500">
                        <Clock className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                        <span>
                          <strong>{t.duration}:</strong> {course.duration}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {(isEnrolled || hasStarted) && (
                      <div className="pt-3 space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{t.progress}</span>
                          <span>{isEnrolled && !hasStarted ? '10%' : `${course.progress}%`}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                          <div 
                            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${isEnrolled && !hasStarted ? 10 : course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Button Footer */}
                  <div className="px-6 pb-6 pt-1">
                    {isEnrolled ? (
                      <button
                        onClick={() => {
                          setCurrentPage('dashboard');
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer border border-slate-800"
                      >
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                        <span>{t.continueLearning}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id, titleText)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-indigo-100 hover:shadow-indigo-200 border border-indigo-700"
                      >
                        <BookOpenCheck className="h-4.5 w-4.5" />
                        <span>{t.startLearning}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-[28px] p-12 text-center max-w-lg mx-auto shadow-sm">
            <BookOpen className="h-14 w-14 text-indigo-300 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              {currentLanguage === 'hi' ? 'कोई मिलान नहीं मिला' : 'No matches found'}
            </h4>
            <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
              {t.noCourses}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLanguage('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
