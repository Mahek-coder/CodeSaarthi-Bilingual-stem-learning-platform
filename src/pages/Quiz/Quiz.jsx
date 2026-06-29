import React, { useState, useMemo } from 'react';
import { 
  Award, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  BrainCircuit, 
  Clock, 
  ArrowRight, 
  MessageSquare, 
  Trophy,
  AlertCircle
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    course: {
      en: 'Python Programming Basics',
      hi: 'पायथन प्रोग्रामिंग की मूल बातें'
    },
    question: {
      en: 'What will be the output of the following Python code?\nprint(2 ** 3)',
      hi: 'निम्नलिखित पायथन कोड का आउटपुट क्या होगा?\nprint(2 ** 3)'
    },
    codeBlock: 'print(2 ** 3)',
    options: {
      en: ['6', '8', '9', '5'],
      hi: ['6', '8', '9', '5']
    },
    correctAnswerIdx: 1,
    explanation: {
      en: 'In Python, "**" is the exponentiation operator. So, 2 ** 3 means 2 raised to the power of 3, which is 2 * 2 * 2 = 8.',
      hi: 'पायथन में, "**" घातांक (exponentiation) ऑपरेटर है। इसलिए, 2 ** 3 का अर्थ है 2 की घात 3, जो 2 * 2 * 2 = 8 है।'
    }
  },
  {
    id: 2,
    course: {
      en: 'Bilingual Web Development',
      hi: 'वेब डेवलपमेंट और डिजाइनिंग'
    },
    question: {
      en: 'Which HTML tag is used to create a hyperlink to another webpage?',
      hi: 'दूसरे वेबपेज पर हाइपरलिंक बनाने के लिए किस HTML टैग का उपयोग किया जाता है?'
    },
    codeBlock: null,
    options: {
      en: ['<link>', '<a>', '<href>', '<url>'],
      hi: ['<link>', '<a>', '<href>', '<url>']
    },
    correctAnswerIdx: 1,
    explanation: {
      en: 'The <a> (anchor) tag is used to define a hyperlink, and its "href" attribute specifies the URL of the page.',
      hi: '<a> (एंकर) टैग का उपयोग हाइपरलिंक को परिभाषित करने के लिए किया जाता है, और इसका "href" एट्रिब्यूट पेज का URL निर्दिष्ट करता है।'
    }
  },
  {
    id: 3,
    course: {
      en: 'Introduction to AI & Logic',
      hi: 'कृत्रिम बुद्धिमत्ता और लॉजिक'
    },
    question: {
      en: 'What is the default starting index of an element in a Python list?',
      hi: 'पायथन लिस्ट (List) में किसी तत्व का डिफ़ॉल्ट शुरुआती इंडेक्स क्या होता है?'
    },
    codeBlock: 'my_list = ["Python", "HTML", "AI"]\n# What index is "Python"?',
    options: {
      en: ['1', '-1', '0', 'None of these'],
      hi: ['1', '-1', '0', 'इनमें से कोई नहीं']
    },
    correctAnswerIdx: 2,
    explanation: {
      en: 'Like most modern programming languages, Python lists use 0-based indexing. The first element is always at index 0.',
      hi: 'अधिकांश आधुनिक प्रोग्रामिंग भाषाओं की तरह, पायथन सूचियां 0-आधारित अनुक्रमण (indexing) का उपयोग करती हैं। पहला तत्व हमेशा इंडेक्स 0 पर होता है।'
    }
  },
  {
    id: 4,
    course: {
      en: 'Python Programming Basics',
      hi: 'पायथन प्रोग्रामिंग की मूल बातें'
    },
    question: {
      en: 'Which of the following is an INVALID variable name in Python?',
      hi: 'पायथन में निम्नलिखित में से कौन सा वैरिएबल नाम अमान्य (INVALID) है?'
    },
    codeBlock: null,
    options: {
      en: ['my_variable', '_value123', '2saarthi_score', 'studentName'],
      hi: ['my_variable', '_value123', '2saarthi_score', 'studentName']
    },
    correctAnswerIdx: 2,
    explanation: {
      en: 'A variable name in Python cannot start with a number. Therefore, "2saarthi_score" is invalid.',
      hi: 'पायथन में एक वैरिएबल का नाम किसी संख्या से शुरू नहीं हो सकता है। इसलिए, "2saarthi_score" अमान्य है।'
    }
  },
  {
    id: 5,
    course: {
      en: 'STEM & Robotics Basics',
      hi: 'स्टेम और रोबोटिक्स'
    },
    question: {
      en: 'Which component acts as the "brain" of a computer/microcontroller, executing instruction codes?',
      hi: 'कौन सा घटक कंप्यूटर/माइक्रोकंट्रोलर के "मस्तिष्क" के रूप में कार्य करता है, जो निर्देश कोड निष्पादित करता है?'
    },
    codeBlock: null,
    options: {
      en: ['RAM', 'CPU (Central Processing Unit)', 'Hard Disk Drive', 'Power Supply Unit'],
      hi: ['रैम (RAM)', 'सीपीयू (Central Processing Unit)', 'हार्ड डिस्क ड्राइव', 'पावर सप्लाई यूनिट']
    },
    correctAnswerIdx: 1,
    explanation: {
      en: 'The CPU (Central Processing Unit) handles all primary calculations and processes, acting as the brain of the computer.',
      hi: 'सीपीयू (Central Processing Unit) सभी प्राथमिक गणनाओं और प्रक्रियाओं को संभालता है, जो कंप्यूटर के मस्तिष्क के रूप में कार्य करता है।'
    }
  }
];

export default function Quiz({ currentLanguage = 'en', setCurrentPage }) {
  const isHindi = currentLanguage === 'hi';
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  // Translations object
  const t = {
    title: isHindi ? 'सीबीएसई ओलंपियाड मॉक टेस्ट' : 'CBSE & STEM Olympiad Mock Test',
    subtitle: isHindi 
      ? 'अपनी कोडिंग और लॉजिक क्षमता का परीक्षण करें। अपनी भाषा में सीखें!' 
      : 'Test your coding, development, and AI skills. Instant bilingual evaluations!',
    questionCounter: isHindi ? 'प्रश्न' : 'Question',
    of: isHindi ? 'में से' : 'of',
    prev: isHindi ? 'पिछला' : 'Previous',
    next: isHindi ? 'अगला' : 'Next',
    submit: isHindi ? 'परीक्षा जमा करें' : 'Submit Exam',
    congrats: isHindi ? 'बधाई हो!' : 'Congratulations!',
    scoreHeader: isHindi ? 'आपका परिणाम' : 'Your Assessment Report',
    correctText: isHindi ? 'सही उत्तर:' : 'Correct Answers:',
    incorrectText: isHindi ? 'गलत उत्तर:' : 'Incorrect Answers:',
    accuracy: isHindi ? 'सटीकता दर:' : 'Accuracy Rate:',
    tryAgain: isHindi ? 'पुनः प्रयास करें' : 'Retake Exam',
    backDashboard: isHindi ? 'डैशबोर्ड' : 'Back to Dashboard',
    askTutor: isHindi ? 'एआई सारथी से पूछें' : 'Consult AI Saarthi',
    explanationLabel: isHindi ? 'स्पष्टीकरण व व्याख्या:' : 'Explanation & Concepts:',
    yourAnswer: isHindi ? 'आपका चयन' : 'Your Pick',
    correctAnswerLabel: isHindi ? 'सही उत्तर' : 'Correct Answer',
    instructionTitle: isHindi ? 'परीक्षा निर्देश' : 'Exam Guidelines',
    rule1: isHindi ? 'प्रत्येक प्रश्न का केवल एक ही सही विकल्प है।' : 'Each question has exactly one correct answer.',
    rule2: isHindi ? 'सभी प्रश्न सीबीएसई और स्टेम ओलंपियाड मानकों पर आधारित हैं।' : 'Aligned with CBSE computer science curriculums.',
    rule3: isHindi ? 'जमा करने के तुरंत बाद विस्तृत रिपोर्ट और एआई स्पष्टीकरण उपलब्ध होंगे।' : 'Instant bilingual detailed progress reporting.',
    mockExamLabel: isHindi ? 'मॉक परीक्षा ३ सक्रिय' : 'CBSE MOCK EXAM 3 ACTIVE',
    totalPoints: isHindi ? 'कुल अंक' : 'Total Points',
    unansweredAlert: isHindi ? 'कृपया परीक्षा सबमिट करने से पहले सभी प्रश्नों का उत्तर दें!' : 'Please pick answers for all questions before submitting!',
    perfectScoreFeedback: isHindi 
      ? 'अद्भुत! आपने शत-प्रतिशत अंक प्राप्त किए हैं। आपकी कोडिंग नींव बेहद मजबूत है।' 
      : 'Exceptional! A perfect score. Your computer science foundation is rock solid!',
    goodScoreFeedback: isHindi 
      ? 'शानदार प्रयास! थोड़ा सा अभ्यास आपको पूरी तरह परिपूर्ण बना देगा।' 
      : 'Great job! You have demonstrated good comprehension. Just a bit more practice!',
    poorScoreFeedback: isHindi 
      ? 'चिंता न करें! हमारे एआई ट्यूटर से सीखें और पुनः प्रयास करें।' 
      : 'No worries! Review with our interactive AI Saarthi and try again to improve.'
  };

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return; // Prevent change after submit
    setSelectedAnswers(prev => ({
      ...prev,
      [QUIZ_QUESTIONS[currentIdx].id]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  // Calculate results
  const score = useMemo(() => {
    let count = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIdx) {
        count++;
      }
    });
    return count;
  }, [selectedAnswers]);

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  const handleSubmit = () => {
    // Check if all answered
    const totalAnswered = Object.keys(selectedAnswers).length;
    if (totalAnswered < QUIZ_QUESTIONS.length) {
      alert(t.unansweredAlert);
      return;
    }
    setIsSubmitted(true);
    setShowScoreModal(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setShowScoreModal(false);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 relative">
      
      {/* Top Banner section */}
      <div className="max-w-5xl mx-auto mb-8 text-center relative">
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <BrainCircuit className="h-4.5 w-4.5 text-blue-600" />
          <span>{t.mockExamLabel}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-3">
          {t.title}
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 font-medium text-xs sm:text-sm">
          {t.subtitle}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 columns: Main Quiz Screen */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Indicator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5">
              <span className="text-indigo-600">
                {t.questionCounter} {currentIdx + 1} {t.of} {QUIZ_QUESTIONS.length}
              </span>
              <span className="flex items-center text-slate-600">
                <Clock className="h-4 w-4 text-slate-400 mr-1 shrink-0" />
                10:00
              </span>
            </div>
            
            {/* Smooth dynamic progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-200 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-md">
            
            {/* Subject Tag */}
            <span className="bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg mb-4 inline-block">
              {isHindi ? currentQuestion.course.hi : currentQuestion.course.en}
            </span>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug tracking-tight mb-5 whitespace-pre-wrap">
              {isHindi ? currentQuestion.question.hi : currentQuestion.question.en}
            </h3>

            {/* Interactive Code Block (if any) */}
            {currentQuestion.codeBlock && (
              <div className="bg-slate-950 text-slate-100 font-mono text-[11px] sm:text-xs p-4 rounded-xl border border-slate-800 mb-6 shadow-inner overflow-x-auto select-all">
                <pre>{currentQuestion.codeBlock}</pre>
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-3.5">
              {(isHindi ? currentQuestion.options.hi : currentQuestion.options.en).map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === oIdx;
                const showCorrect = isSubmitted && oIdx === currentQuestion.correctAnswerIdx;
                const showWrong = isSubmitted && isSelected && oIdx !== currentQuestion.correctAnswerIdx;

                let optionStyles = 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-slate-800';
                if (isSelected) {
                  optionStyles = 'border-blue-600 bg-blue-50/75 text-blue-900 ring-2 ring-blue-100';
                }
                if (showCorrect) {
                  optionStyles = 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-100';
                }
                if (showWrong) {
                  optionStyles = 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-100';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${optionStyles}`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-black shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {/* Interactive Icons */}
                    {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
                    {showWrong && <XCircle className="h-5 w-5 text-rose-600 shrink-0" />}
                    {!isSubmitted && isSelected && (
                      <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box (After submit) */}
            {isSubmitted && (
              <div className="mt-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start space-x-3 text-xs">
                <AlertCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-extrabold text-indigo-900 mb-1">{t.explanationLabel}</h5>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {isHindi ? currentQuestion.explanation.hi : currentQuestion.explanation.en}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`inline-flex items-center space-x-2 border border-slate-200 bg-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 transition-all ${
                currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{t.prev}</span>
            </button>

            {currentIdx === QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 border border-blue-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-150"
              >
                <span>{t.submit}</span>
                <CheckCircle2 className="h-4.5 w-4.5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center space-x-2 border border-slate-200 bg-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <span>{t.next}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>

        {/* Right 1 column: Sidebar instructions */}
        <div className="space-y-6">
          {/* Guidelines info card */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-xs">
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center">
              <Award className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
              {t.instructionTitle}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start text-xs font-medium text-slate-600 leading-relaxed">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full shrink-0 mr-2.5 mt-2"></span>
                <span>{t.rule1}</span>
              </li>
              <li className="flex items-start text-xs font-medium text-slate-600 leading-relaxed">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full shrink-0 mr-2.5 mt-2"></span>
                <span>{t.rule2}</span>
              </li>
              <li className="flex items-start text-xs font-medium text-slate-600 leading-relaxed">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full shrink-0 mr-2.5 mt-2"></span>
                <span>{t.rule3}</span>
              </li>
            </ul>
          </div>

          {/* Quick AI tutor promotion */}
          <div className="bg-gradient-to-br from-indigo-900 to-blue-905 border border-indigo-950 p-6 rounded-[28px] text-white">
            <h4 className="text-sm font-black flex items-center mb-1">
              <Sparkles className="h-4.5 w-4.5 text-amber-300 mr-2 shrink-0 animate-bounce" />
              {isHindi ? 'अटक गए हैं?' : 'Stuck on a question?'}
            </h4>
            <p className="text-[11px] text-indigo-200 leading-relaxed mb-4">
              {isHindi 
                ? 'हमारे बुद्धिमान एआई सारथी ट्यूटर से कोडिंग प्रश्नों को हिंदी-अंग्रेजी में चुटकियों में समझें।' 
                : 'Get instant interactive simplification on lists, loops, & web design with your personal Saarthi.'}
            </p>
            <button 
              onClick={() => setCurrentPage?.('aitutor')}
              className="w-full py-2.5 bg-white text-indigo-900 hover:bg-slate-50 font-black rounded-xl text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-all shadow-sm"
            >
              <span>{t.askTutor}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Assessment Report Dialog Modal / Popup */}
      {showScoreModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-slate-200 rounded-[32px] max-w-lg w-full p-8 text-center shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-200">
            
            {/* Trophy icon */}
            <div className="mx-auto bg-amber-50 border border-amber-200 text-amber-500 p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-4">
              <Trophy className="h-8 w-8 text-amber-500 fill-amber-500" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              {t.congrats}
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              {t.scoreHeader}
            </p>

            {/* Score display ring */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 max-w-[200px] mx-auto mb-6">
              <div className="text-3xl font-black text-blue-600">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">
                {t.totalPoints}
              </div>
            </div>

            {/* Performance comment feedback */}
            <p className="text-slate-600 font-bold text-xs sm:text-sm leading-relaxed mb-6">
              {percentage === 100 ? t.perfectScoreFeedback : percentage >= 60 ? t.goodScoreFeedback : t.poorScoreFeedback}
            </p>

            {/* Details stat panel */}
            <div className="grid grid-cols-3 gap-3 text-left mb-8">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <div className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">{t.correctText}</div>
                <div className="text-base font-black text-emerald-950 mt-0.5">{score}</div>
              </div>
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
                <div className="text-[10px] font-black text-rose-700 uppercase tracking-wider">{t.incorrectText}</div>
                <div className="text-base font-black text-rose-950 mt-0.5">{QUIZ_QUESTIONS.length - score}</div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                <div className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">{t.accuracy}</div>
                <div className="text-base font-black text-indigo-950 mt-0.5">{percentage}%</div>
              </div>
            </div>

            {/* Action Buttons inside Report */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={handleRetake}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-all"
                >
                  <RotateCcw className="h-4 w-4 text-slate-600" />
                  <span>{t.tryAgain}</span>
                </button>
                
                <button
                  onClick={() => setShowScoreModal(false)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer shadow-md shadow-indigo-150 transition-all border border-indigo-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isHindi ? 'उत्तर जांचें' : 'Check Answers'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => {
                    setCurrentPage?.('aitutor');
                    setShowScoreModal(false);
                  }}
                  className="w-full py-3 border-2 border-indigo-250 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-800 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-all"
                >
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                  <span>{t.askTutor}</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage?.('dashboard');
                    setShowScoreModal(false);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-all"
                >
                  <span>{t.backDashboard}</span>
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
