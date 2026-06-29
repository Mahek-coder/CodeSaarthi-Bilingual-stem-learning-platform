import React from 'react';
import { 
  Sparkles, Play, Flame, Trophy, Clock, Code2, AlertCircle, Calendar, ChevronRight, BookOpen, ArrowRight
} from 'lucide-react';

export default function StudentDashboard({
  currentLanguage = 'en',
  studentName = "Mahek Patil",
  setCurrentPage
}) {
  const isHindi = currentLanguage === 'hi';

  const stats = {
    dailyStreak: 12,
    xpPoints: 2450,
    completedLessons: 8,
    globalRank: 42,
  };

  const currentCourse = {
    title: isHindi ? 'बुनियादी पायथन और कोडिंग लॉजिक' : 'Fundamentals of Python & Coding Logic',
    module: isHindi ? 'मॉड्यूल ३: लूप्स और रिपिटिशन' : 'Module 3: Loops & Repetition',
    progress: 72,
    nextLesson: isHindi ? 'फॉर-लूप्स (For-Loops) के साथ कोडिंग' : 'Coding with For-Loops',
    durationLeft: '15 mins',
  };

  const recommendations = [
    {
      id: 1,
      title: isHindi ? 'गेम कोडिंग: पायथन के साथ पायीगेम' : 'Game Coding: Pygame with Python',
      difficulty: isHindi ? 'मध्यम' : 'Intermediate',
      lessonsCount: 14,
      xp: 400,
    },
    {
      id: 2,
      title: isHindi ? 'स्मार्ट वेब ऐप्स: एचटीएमएल और सीएसएस' : 'Smart Web Apps: HTML & CSS',
      difficulty: isHindi ? 'शुरुआती' : 'Beginner',
      lessonsCount: 10,
      xp: 250,
    },
    {
      id: 3,
      title: isHindi ? 'रोबोटिक्स और एआई का परिचय' : 'Intro to Robotics & AI Logic',
      difficulty: isHindi ? 'कठिन' : 'Advanced',
      lessonsCount: 18,
      xp: 600,
    }
  ];

  const recentActivity = [
    { id: 1, text: isHindi ? 'प्रश्नोत्तरी "इफ-एल्स कंडीशन्स" पूरी की' : 'Completed Quiz "If-Else Conditions"', time: '2 hours ago', score: '90%' },
    { id: 2, text: isHindi ? '"वैरिएबल प्रयोगशाला" सिमुलेशन पूरा किया' : 'Completed "Variable Laboratory" simulation', time: '1 day ago' },
    { id: 3, text: isHindi ? 'सारथी AI के साथ लूप्स पर शंका का समाधान किया' : 'Resolved doubts about Loops with Saarthi AI', time: '2 days ago' }
  ];

  const upcomingQuiz = {
    title: isHindi ? 'सीबीएसई राष्ट्रीय कोडिंग परीक्षा मॉक ३' : 'CBSE National Coding Exam Mock 3',
    date: isHindi ? '३० जून, २०२६ - दोपहर २:०० बजे' : 'June 30, 2026 - 2:00 PM',
    duration: '30 mins',
    questions: 15,
  };

  const badges = [
    { id: 1, name: isHindi ? 'सक्रिय साधक' : 'Active Learner', desc: isHindi ? 'लगातार १० दिन कोडिंग' : '10 Day Streak', icon: '🔥' },
    { id: 2, name: isHindi ? 'लूप मास्टर' : 'Loop Master', desc: isHindi ? 'लूप सिमुलेटर पूरा किया' : 'Completed Loop Labs', icon: '🔄' },
    { id: 3, name: isHindi ? 'एआई कोडर' : 'AI Companion', desc: isHindi ? 'एआई सारथी से बातचीत' : 'Asked 5+ Doubts', icon: '🤖' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans" id="student-dashboard-root">
      
      {/* Dynamic Sync Alert Header */}
      <div className="bg-blue-50 border-b border-blue-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-blue-900 leading-relaxed">
              {isHindi 
                ? 'सीबीएसई राष्ट्रीय पाठ्यक्रम दिशानिर्देशों के तहत आपका कोडिंग प्रोग्रेस सिंक किया गया है।' 
                : 'Your coding progress has been fully synced under CBSE National Curriculum guidelines.'}
            </p>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-extrabold font-mono text-blue-600 bg-white border border-blue-200 px-2.5 py-0.5 rounded-lg shadow-sm">
            SYNC STATUS: ACTIVE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        
        {/* Welcome Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Welcome Card - Solid, clean, deep slate background with crisp outline and no blur */}
          <div className="lg:col-span-8 bg-slate-900 text-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                <span>{isHindi ? 'सारथी छात्र डैशबोर्ड' : 'Saarthi Student Space'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
                {isHindi ? `स्वागत है, ${studentName}! 👋` : `Welcome back, ${studentName}! 👋`}
              </h1>
              <p className="text-slate-300 text-sm max-w-xl font-semibold">
                {isHindi 
                  ? 'आपने अपनी कोडिंग यात्रा का ७०% पूरा कर लिया है। आज हम पायथन में "लूप्स" का उपयोग करके सुंदर चित्र बनाना सीखेंगे।' 
                  : 'You have conquered 70% of your python logic syllabus. Today, we will learn how to write Loops to draw awesome patterns!'}
              </p>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap gap-4 relative z-10 border-t border-slate-800 mt-6">
              <button 
                onClick={() => setCurrentPage?.('home')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all flex items-center space-x-2 text-sm cursor-pointer shadow-lg shadow-blue-900/20"
              >
                <span>{isHindi ? 'प्रायोगिक अभ्यास शुरू करें' : 'Launch Variable Lab'}</span>
                <Play className="h-3.5 w-3.5 fill-current" />
              </button>
              <button 
                onClick={() => setCurrentPage?.('aitutor')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-extrabold rounded-xl transition-all text-sm cursor-pointer"
              >
                {isHindi ? 'एआई सारथी से बात करें' : 'Talk with AI Saarthi'}
              </button>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[28px] p-6 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                {isHindi ? 'आपकी प्रगति' : 'Streak & Rank Insights'}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Streak */}
                <div className="bg-orange-50 border border-orange-150 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Flame className="h-7 w-7 text-orange-600 fill-orange-500" />
                  <span className="text-2xl font-black text-slate-900 mt-1">{stats.dailyStreak}</span>
                  <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wide">
                    {isHindi ? 'दिन की स्ट्रीक' : 'Days Streak'}
                  </span>
                </div>

                {/* XP Points */}
                <div className="bg-blue-50 border border-blue-150 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Trophy className="h-7 w-7 text-blue-600 fill-blue-100" />
                  <span className="text-2xl font-black text-slate-900 mt-1">{stats.xpPoints}</span>
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide">
                    XP Points
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-4 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>{isHindi ? 'क्लास रैंक:' : 'Class Rank:'}</span>
                <span className="text-blue-600 font-extrabold font-mono">#{stats.globalRank}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>{isHindi ? 'पाठ पूरे किए:' : 'Lessons Finished:'}</span>
                <span className="text-indigo-600 font-extrabold font-mono">{stats.completedLessons}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Continue Learning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Active course tracker */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[28px] p-6 shadow-md space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight font-sans">
                  {isHindi ? 'सीखना जारी रखें' : 'Continue Learning'}
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400 font-mono">ACTIVE MODULE</span>
            </div>

            <div className="space-y-4 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                    {currentCourse.module}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-950 mt-1 leading-snug">
                    {currentCourse.title}
                  </h4>
                </div>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-blue-200">
                  {currentCourse.progress}% Done
                </span>
              </div>

              {/* Custom high contrast progress bar */}
              <div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${currentCourse.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 text-xs font-bold text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <Code2 className="h-4 w-4 text-slate-400" />
                  <span>{isHindi ? `अगला विषय: ${currentCourse.nextLesson}` : `Next up: ${currentCourse.nextLesson}`}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400 font-mono text-[10px]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{currentCourse.durationLeft}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage?.('courses')}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center space-x-2 text-xs font-black text-slate-700 transition-all cursor-pointer"
            >
              <span>{isHindi ? 'सभी पाठ्यक्रम देखें' : 'View Full Coding Curriculum'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* AI Tutor shortcut */}
          <div className="lg:col-span-4 bg-blue-600 text-white rounded-[28px] p-6 shadow-lg flex flex-col justify-between border border-blue-700">
            <div className="space-y-3">
              <div className="h-10 w-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center shadow-sm">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">Saarthi 24/7 Doubt Buddy</h3>
                <p className="text-blue-50 text-xs font-semibold leading-relaxed mt-1.5">
                  {isHindi 
                    ? 'अपनी कोडिंग समस्याओं, त्रुटियों या पाठ्यपुस्तक की शंकाओं को अपनी स्थानीय भाषा में तुरंत हल करें।' 
                    : 'Get real-time feedback on syntax errors or STEM homework questions in Hindi, English, Marathi, or Telugu.'}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setCurrentPage?.('aitutor')}
                className="w-full py-3 bg-white text-blue-700 hover:bg-slate-50 font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>{isHindi ? 'तुरंत शंका समाधान' : 'Ask Saarthi Now'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bento Grid layout for track recommendations & upcoming quizzes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Track Recommendations */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[28px] p-6 shadow-md space-y-4">
            <h3 className="text-base font-extrabold text-slate-950 font-sans border-b border-slate-100 pb-2">
              {isHindi ? 'अनुशंसित कोडिंग ट्रैक' : 'Recommended Coding Tracks'}
            </h3>
            
            <div className="space-y-3">
              {recommendations.map((course) => (
                <div 
                  key={course.id} 
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all flex items-center justify-between cursor-pointer"
                  onClick={() => alert(`Enrolling in ${course.title}...`)}
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                      {course.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-[10px] font-bold font-mono">
                      <span className="text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">
                        {course.difficulty}
                      </span>
                      <span className="text-slate-500">{course.lessonsCount} lessons</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-emerald-700 text-xs font-black block">+{course.xp} XP</span>
                    <span className="text-[9px] font-bold text-slate-400 font-mono">POTENTIAL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Upcoming Mock Quiz card */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-xl self-start w-max">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {isHindi ? 'आगामी टेस्ट' : 'Quiz Scheduled'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-slate-500 font-mono uppercase tracking-wider">
                    {upcomingQuiz.date}
                  </h4>
                  <h3 className="text-sm font-extrabold text-slate-950 leading-tight">
                    {upcomingQuiz.title}
                  </h3>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500">{upcomingQuiz.duration} • {upcomingQuiz.questions} MCQs</span>
                <button 
                  onClick={() => setCurrentPage?.('quiz')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm border border-blue-700"
                >
                  {isHindi ? 'मॉक टेस्ट शुरू करें' : 'Start Mock Test'}
                </button>
              </div>
            </div>

            {/* Achievement badges */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-md space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                {isHindi ? 'प्राप्त मेडल और बैज' : 'Achievement Badges'}
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className="p-2 bg-slate-50 border border-slate-150 rounded-xl text-center flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
                    title={badge.desc}
                    onClick={() => alert(`Badge "${badge.name}": ${badge.desc}`)}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-[9px] font-black text-slate-800 leading-none truncate w-full">{badge.name}</span>
                    <span className="text-[8px] font-semibold text-slate-500 truncate w-full font-sans mt-0.5">{badge.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Recent logs */}
        <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-md space-y-4">
          <h3 className="text-base font-extrabold text-slate-950 font-sans border-b border-slate-100 pb-2">
            {isHindi ? 'हाल ही की कोडिंग गतिविधि' : 'Recent Lab Activity & Logs'}
          </h3>

          <div className="divide-y divide-slate-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                <div className="flex items-center space-x-2.5">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-ping"></div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">{activity.text}</span>
                </div>
                <div className="flex items-center space-x-2 text-right shrink-0">
                  {activity.score && (
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-200 font-mono">
                      {activity.score}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-slate-400 font-mono">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
