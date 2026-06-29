import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Terminal, 
  Languages, 
  MessageSquare, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Volume2, 
  Tv, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Code,
  Sliders,
  ChevronRight,
  RefreshCw,
  Boxes,
  GraduationCap
} from 'lucide-react';
import { Language, TranslationSet } from '../types';

interface HomeProps {
  currentLanguage: Language;
  translations: TranslationSet;
  setCurrentPage: (page: string) => void;
}

export default function Home({ currentLanguage, translations, setCurrentPage }: HomeProps) {
  // Playground state
  const [playgroundLang, setPlaygroundLang] = useState<Language>(currentLanguage);
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // Interactive Variable Lab state
  const [applesCount, setApplesCount] = useState<number>(3);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // Quick Chat Demo state
  const [chatStep, setChatStep] = useState(0);

  // Synchronize playground language when global language changes
  React.useEffect(() => {
    setPlaygroundLang(currentLanguage);
  }, [currentLanguage]);

  // Code Playground snippets and explanations based on selected language
  const codeSnippet = `// CodeSaarthi Bilingual Playground
// Try changing the language to see AI comments change!

let apples = ${applesCount};
let bananaPrice = 10;
let totalCost = apples * bananaPrice;

print("Total Cost: " + totalCost);`;

  const playgroundExplanations: Record<Language, { lines: string[]; analogy: string }> = {
    en: {
      lines: [
        '1. We create a variable named "apples" and put the value inside it.',
        '2. We create another variable named "bananaPrice" and assign the value 10.',
        '3. We multiply them to compute "totalCost" dynamically.',
        '4. Finally, we display the result on the screen.'
      ],
      analogy: 'Think of variables as named Tupperware containers in the kitchen. "apples" holds fruit count, and "bananaPrice" holds money!'
    },
    hi: {
      lines: [
        '1. हम "apples" (सेब) नाम का एक वेरिएबल बनाते हैं और उसमें वैल्यू डालते हैं।',
        '2. हम "bananaPrice" (केले की कीमत) नाम का एक और वेरिएबल बनाते हैं और उसमें 10 वैल्यू देते हैं।',
        '3. हम "totalCost" (कुल लागत) को प्राप्त करने के लिए दोनों को गुणा करते हैं।',
        '4. अंत में, हम स्क्रीन पर परिणाम प्रदर्शित करते हैं।'
      ],
      analogy: 'वेरिएबल को अपनी रसोई के लेबल लगे बक्से (डिब्बे) की तरह समझें। "apples" डिब्बा सेब की संख्या रखता है, और "bananaPrice" पैसों का हिसाब रखता है!'
    },
    mr: {
      lines: [
        '1. आपण "apples" (सफरचंद) नावाचा एक व्हेरिएबल बनवतो आणि त्यात मूल्य ठेवतो.',
        '2. आपण "bananaPrice" (केळ्याची किंमत) नावाचा दुसरा व्हेरिएबल तयार करतो आणि त्याला १० मूल्य देतो.',
        '3. आपण "totalCost" (एकूण किंमत) मिळवण्यासाठी दोघांचा गुणाकार करतो.', '4. शेवटी, आपण स्क्रीनवर परिणाम प्रदर्शित करतो.'], analogy: 'व्हेरिएबल्सना स्वयंपाकघरातील वेगवेगळ्या लेबल असलेल्या डब्यांसारखे समजा. "apples" मध्ये फळांची संख्या आहे, आणि "bananaPrice" मध्ये पैसे आहेत!' }, te: { lines: ['1. మనం "apples" అనే పేరుతో ఒక వేరియబుల్ సృష్టించి, దానిలో విలువను ఉంచుతాము.', '2. మనం "bananaPrice" అనే పేరుతో మరో వేరియబుల్ సృష్టించి, దానికి 10 విలువను ఇస్తాము.', '3. మనం "totalCost" ను లెక్కించడానికి రెండింటినీ గుణిస్తాము.', '4. చివరగా, ఫలితాన్ని స్క్రీన్‌పై ప్రదర్శిస్తాము.'], analogy: 'వేరియబుల్స్ అంటే వంటగదిలోని పేరు గల డబ్బాలు లాంటివి అని అనుకోండి. "apples" పెట్టెలో పండ్ల సంఖ్య ఉంటుంది, మరియు "bananaPrice" లో డబ్బు ఉంటుంది!' } }; const handleRunCode = () => {
    setIsCodeRunning(true);
    setConsoleLogs(['🔄 Compiling CodeSaarthi Sandbox...', '🚀 Running JavaScript Engine...']);
    
    setTimeout(() => {
      setConsoleLogs(prev => [
        ...prev,
        `[Console] apples initialized to: ${applesCount}`,
        `[Console] bananaPrice initialized to: 10`,
        `[Console] Total Cost computed: ${applesCount * 10}`,
        `✨ Success! Output: Total Cost is ${applesCount * 10}`
      ]);
      setIsCodeRunning(false);
    }, 1000);
  };

  const handleQuizSubmit = () => {
    if (!selectedAnswer) return;
    setQuizSubmitted(true);
    const correct = selectedAnswer === 'A';
    setIsAnswerCorrect(correct);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(false);
  };

  const aiChatDemo = [
    {
      sender: 'student',
      en: 'Hey Saarthi! What is a loop? It sounds confusing in my English textbook.',
      hi: 'नमस्ते सारथी! यह लूप (Loop) क्या होता है? मेरी अंग्रेजी किताब में बहुत कठिन लग रहा है।',
      mr: 'नमस्ते सारथी! लूप (Loop) म्हणजे नक्की काय? इंग्रजी पुस्तकातून मला समजत नाहीये.',
      te: 'హలో సారథి! లూప్ (Loop) అంటే ఏమిటి? నా ఇంగ్లీష్ పుస్తకం చదివితే చాలా కష్టంగా ఉంది.'
    },
    {
      sender: 'saarthi',
      en: 'No worries! Imagine doing 10 sit-ups. Instead of writing "do sit-up" 10 times, you just say "repeat this action 10 times". That constant repetition in programming is called a loop! 🔄',
      hi: 'कोई बात नहीं! कल्पना कीजिए कि आपको उठक-बैठक (sit-ups) करनी है। बार-बार "उठक-बैठक करो" लिखने के बजाय, हम कहते हैं "इसे 10 बार दोहराएं"। इसी बार-बार दोहराने की प्रक्रिया को प्रोग्रामिंग में लूप कहते हैं! 🔄',
      mr: 'काही काळजी करू नकोस! समजा तुला १० उठाबशा काढायच्या आहेत. प्रत्येक वेळी "उठाबशा काढा" असे १० वेळा लिहिण्याऐवजी, आपण सांगतो "ही क्रिया १० वेळा पुन्हा करा". प्रोग्रामिंगमध्ये याच क्रियेला लूप म्हणतात! 🔄',
      te: 'ఏం పర్లేదు! నువ్వు ఒక 10 సార్లు గుంజీలు తీయాలనుకో. ప్రతిసారి "గుంజీలు తీయి" అని 10 సార్లు రాసేకంటే, "ఈ పనిని 10 సార్లు చేయి" అని చెప్పడమే లూప్! 🔄'
    }
  ];

  return (
    <div className="bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 min-h-screen font-sans relative overflow-hidden" id="home-page-container">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Hero Section */}
      <header className="relative pt-10 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Hero Left Content - Styled as a Prominent White Bento Card */}
            <div className="lg:col-span-7 bg-white border border-slate-200 shadow-xl shadow-blue-900/5 rounded-[32px] p-6 sm:p-10 space-y-6 text-left relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
              
              {/* Badge */}
              <div className="inline-flex self-start items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                <Sparkles className="h-4 w-4 animate-pulse text-yellow-500" />
                <span>{translations.heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {translations.heroTitlePrefix}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent underline decoration-indigo-400 decoration-wavy decoration-2">
                  {translations.heroTitleHighlight}
                </span>
                {translations.heroTitleSuffix}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl">
                {translations.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-xl shadow-blue-100 transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-base"
                  id="hero-cta-start"
                >
                  <span>{translations.ctaGetStarted}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href="#sandbox"
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border border-slate-200 shadow-sm transition-all text-center flex items-center justify-center space-x-2 text-base"
                >
                  <span>{translations.ctaExploreCourses}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </a>
              </div>

              {/* Trust Indicator */}
              <p className="text-xs text-slate-400 font-medium pt-2 flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{translations.studentTrust}</span>
              </p>
            </div>

            {/* Hero Right: Interactive Chat Simulator Mockup - Styled as a Solid Premium Bento Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 shadow-xl shadow-blue-900/5 rounded-[32px] p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
              
              <div className="flex flex-col h-full justify-between">
                {/* Simulated App Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1.5 rounded-lg text-white">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-800">Saarthi AI Assistant</h3>
                      <span className="text-[10px] text-emerald-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1"></span>
                        Active in English & Regional
                      </span>
                    </div>
                  </div>
                  {/* Language Toggle */}
                  <div className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold">
                    BILINGUAL MODE
                  </div>
                </div>

                {/* Simulated Chat Bubble Feed */}
                <div className="py-6 space-y-4 flex-grow">
                  {/* Student Bubble */}
                  <div className="flex flex-col items-end space-y-1">
                    <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tr-none px-4 py-3 text-xs max-w-[85%] leading-relaxed font-sans font-medium">
                      {aiChatDemo[0][currentLanguage]}
                    </div>
                    <span className="text-[9px] text-slate-400 px-1 font-mono">You (student)</span>
                  </div>

                  {/* Saarthi Response */}
                  <div className="flex flex-col items-start space-y-1">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tl-none px-4 py-3 text-xs max-w-[85%] leading-relaxed font-sans shadow-md">
                      {aiChatDemo[1][currentLanguage]}
                    </div>
                    <span className="text-[9px] text-blue-500 px-1 font-mono font-semibold flex items-center">
                      <Sparkles className="h-2.5 w-2.5 mr-1 text-amber-300" />
                      Saarthi AI Guide
                    </span>
                  </div>
                </div>

                {/* Simulated Voice Message Controller */}
                <div className="bg-blue-50 rounded-2xl p-3 flex items-center justify-between border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => {
                        const audioText = {
                          en: "No worries! Imagine doing 10 sit-ups. That repetition is a loop.",
                          hi: "कोई बात नहीं! उठक-बैठक बार बार दोहराने की क्रिया ही लूप है।",
                          mr: "काही काळजी करू नकोस! उठाबशा पुन्हा पुन्हा काढणे म्हणजेच लूप होय.",
                          te: "ఏం పర్లేదు! గుంజీలు పది సార్లు తీయడమే లూప్."
                        }[currentLanguage];
                        alert(`🔊 [Voice Synthesis Simulation]\nPlaying regional audio instruction:\n"${audioText}"`);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <div>
                      <span className="block text-xs font-bold text-blue-800">Regional Voice-Over</span>
                      <span className="text-[10px] text-blue-500">Listen to lesson in your native accent</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-white/60 px-2 py-0.5 rounded-lg border border-blue-100">
                    {currentLanguage.toUpperCase()} AUDIO
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-slate-100" id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-4">
              <span className="block text-3xl sm:text-4xl font-bold text-blue-600">12K+</span>
              <span className="text-xs sm:text-sm font-medium text-slate-500">{translations.statStudents}</span>
            </div>
            <div className="text-center p-4">
              <span className="block text-3xl sm:text-4xl font-bold text-blue-600">4+</span>
              <span className="text-xs sm:text-sm font-medium text-slate-500">{translations.statLanguages}</span>
            </div>
            <div className="text-center p-4">
              <span className="block text-3xl sm:text-4xl font-bold text-blue-600">45+</span>
              <span className="text-xs sm:text-sm font-medium text-slate-500">{translations.statCourses}</span>
            </div>
            <div className="text-center p-4">
              <span className="block text-3xl sm:text-4xl font-bold text-blue-600">4.9/5 ★</span>
              <span className="text-xs sm:text-sm font-medium text-slate-500">{translations.statRating}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bilingual Interactive Sandbox Section */}
      <section className="py-20 bg-slate-50" id="sandbox">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {translations.sandboxTitle}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              {translations.sandboxSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive Code Editor Interface */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col flex-1 border border-slate-800">
                {/* Editor Header Tab */}
                <div className="bg-slate-950 px-6 py-3.5 flex justify-between items-center border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <span className="w-3 h-3 bg-rose-500 rounded-full inline-block"></span>
                      <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
                      <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
                    </div>
                    <span className="text-slate-400 font-mono text-xs pl-2 flex items-center">
                      <Terminal className="h-3.5 w-3.5 mr-1 text-slate-500" />
                      saarthi_playground.js
                    </span>
                  </div>
                  
                  {/* Slider to interactively update editor variables */}
                  <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1 rounded-xl">
                    <span className="text-[10px] font-mono text-blue-400">apples: {applesCount}</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={applesCount}
                      onChange={(e) => {
                        setApplesCount(parseInt(e.target.value));
                        setConsoleLogs([]); // Clear logs on change to encourage re-run
                      }}
                      className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Editor Body */}
                <div className="p-6 flex-1 font-mono text-sm leading-relaxed text-slate-300 relative">
                  <pre className="whitespace-pre-wrap select-none text-xs sm:text-sm">
                    {codeSnippet}
                  </pre>
                  
                  {/* Accent Badge */}
                  <span className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-600 bg-slate-950 border border-slate-800 px-2 py-1 rounded-md">
                    JavaScript Environment
                  </span>
                </div>

                {/* Execution Bar */}
                <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center">
                  <div className="text-slate-400 text-xs font-mono">
                    Editable variable: <span className="text-indigo-400">apples</span>
                  </div>
                  <button
                    onClick={handleRunCode}
                    disabled={isCodeRunning}
                    className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-md disabled:bg-slate-800"
                    id="run-code-btn"
                  >
                    {isCodeRunning ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Play className="h-3.5 w-3.5 fill-white" />
                    )}
                    <span>{translations.sandboxRunBtn}</span>
                  </button>
                </div>

                {/* Terminal Console Output */}
                <div className="bg-slate-950/90 border-t border-slate-800 p-4 font-mono text-xs text-slate-400 space-y-1 min-h-[100px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">
                    {translations.sandboxOutputLabel}
                  </div>
                  {consoleLogs.length === 0 ? (
                    <div className="text-slate-600 italic">Click "Execute Code" above to run this program...</div>
                  ) : (
                    consoleLogs.map((log, index) => (
                      <div key={index} className={log.startsWith('✨') ? 'text-emerald-400 font-bold' : ''}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: AI Explainer Block */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xl flex flex-col flex-1">
                {/* Language selection inside Sandbox */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {translations.sandboxLangLabel}
                  </h3>
                  <div className="flex space-x-1">
                    {(['en', 'hi', 'mr', 'te'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setPlaygroundLang(lang)}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase cursor-pointer transition-colors ${
                          playgroundLang === lang
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanation steps */}
                <div className="py-6 flex-1 space-y-5">
                  <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
                    <span className="text-xs font-bold text-blue-700 block mb-1">
                      {translations.sandboxExplanationTitle}
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                      {playgroundExplanations[playgroundLang].lines.map((line, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Analogy Card */}
                  <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 flex items-start space-x-3">
                    <div className="bg-amber-100 p-2 rounded-xl text-amber-700 shrink-0">
                      <Sparkles className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-amber-800 mb-1">
                        🎯 Saarthi AI analogy
                      </span>
                      <p className="text-xs text-amber-700 leading-relaxed font-sans font-medium">
                        {playgroundExplanations[playgroundLang].analogy}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Helper callout */}
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <p className="text-xs text-slate-500">
                    Interact with the variable slider in the code header and see values update instantly in English and your language!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STEM Interactive Variable Lab & Quiz */}
      <section className="py-20 bg-white border-y border-slate-100" id="live-demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Boxes className="h-3 w-3" />
              <span>Interactive Visual Science Lab</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {translations.demoTitle}
            </h2>
            <p className="text-slate-500 text-sm">
              {translations.demoSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side: Visual variable Box simulation */}
            <div className="bg-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100">
              <h3 className="font-sans font-bold text-lg text-slate-800 mb-2 flex items-center">
                <Code className="h-5 w-5 mr-1.5 text-blue-600" />
                {translations.demoConceptTitle}
              </h3>
              <p className="text-sm text-slate-600 mb-8">
                {translations.demoConceptText}
              </p>

              {/* Box Animation Scene */}
              <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm flex flex-col items-center justify-center min-h-[220px] relative">
                
                {/* Labeled Cardboard Box Visual */}
                <div className="w-40 h-40 relative flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  {/* Cardboard Box SVG */}
                  <svg className="w-full h-full text-amber-600/80 filter drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 9v10l10 3v-10L2 9zm20 0l-10 3v10l10-3V9z"/>
                  </svg>
                  
                  {/* Box Name Label */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 bg-slate-900 text-white font-mono text-xs font-bold px-3 py-1 rounded-md shadow-md">
                    let apples =
                  </div>

                  {/* Value count inside box */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-100 border-2 border-blue-500 text-blue-800 font-sans font-bold text-xl px-4 py-1.5 rounded-full shadow-lg">
                    {applesCount} 🍎
                  </div>
                </div>

                {/* Slider interface */}
                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Change Variable Value / वैल्यू बदलें</span>
                    <span className="font-mono text-blue-600">{applesCount} Apples</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={applesCount}
                    onChange={(e) => setApplesCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Quiz Interactive block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-700">
                  <HelpCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Concept Check Quiz</h4>
                  <span className="text-xs text-slate-400">Score rewards and build your profile streak</span>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {translations.demoQuestion}
              </p>

              {/* Answer options */}
              <div className="space-y-3">
                {[
                  { key: 'A', text: translations.demoA, isCorrect: true },
                  { key: 'B', text: translations.demoB, isCorrect: false },
                  { key: 'C', text: translations.demoC, isCorrect: false },
                  { key: 'D', text: translations.demoD, isCorrect: false },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      if (!quizSubmitted) setSelectedAnswer(opt.key);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      selectedAnswer === opt.key
                        ? 'border-2 border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border border-slate-200 hover:border-slate-300 hover:bg-slate-50/40 text-slate-700'
                    } ${
                      quizSubmitted && opt.key === 'A'
                        ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900'
                        : ''
                    } ${
                      quizSubmitted && selectedAnswer === opt.key && opt.key !== 'A'
                        ? 'border-2 border-rose-500 bg-rose-50 text-rose-900'
                        : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold ${
                        selectedAnswer === opt.key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                    {quizSubmitted && opt.key === 'A' && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Action and feedback */}
              <div className="pt-2">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!selectedAnswer}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-100 transition-all cursor-pointer disabled:bg-slate-200 disabled:shadow-none"
                  >
                    {translations.demoSubmit}
                  </button>
                ) : (
                  <div className="space-y-4">
                    {isAnswerCorrect ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs leading-relaxed">
                        {translations.demoCorrectMsg}
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs leading-relaxed flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>Not quite right! Remember, in programming, the container name is always on the left, followed by "=" and then the value. Let's try again!</span>
                      </div>
                    )}
                    
                    <button
                      onClick={resetQuiz}
                      className="w-full py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Reset Quiz
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Why CodeSaarthi? Bento Grid Section */}
      <section className="py-20 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {translations.featuresTitle}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              {translations.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Bilingual */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Languages className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">{translations.featBilingualTitle}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{translations.featBilingualDesc}</p>
            </div>

            {/* Card 2: AI Saarthi */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">{translations.featAiSaarthiTitle}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{translations.featAiSaarthiDesc}</p>
            </div>

            {/* Card 3: Interactive Visuals */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-sky-100 text-sky-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Sliders className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">{translations.featInteractiveTitle}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{translations.featInteractiveDesc}</p>
            </div>

            {/* Card 4: Audio Narratives */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Volume2 className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">{translations.featVoiceTitle}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{translations.featVoiceDesc}</p>
            </div>

          </div>
        </div>
      </section>

      {/* About CodeSaarthi Section */}
      <section className="py-20 bg-white border-t border-slate-200/80" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Mission & Branding */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-150 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>{currentLanguage === 'hi' ? 'हमारे बारे में' : 'About CodeSaarthi'}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {currentLanguage === 'hi' 
                  ? 'भारत के बच्चों के लिए कोडिंग और स्टेम (STEM) शिक्षा का नया सारथी'
                  : "Empowering India's Next Gen with Bilingual STEM Education"}
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {currentLanguage === 'hi'
                  ? 'कोडसारथी (CodeSaarthi) भारत का पहला और सर्वश्रेष्ठ द्विभाषी कोडिंग शिक्षा मंच है, जो के-12 और सीबीएसई (CBSE) छात्रों के लिए आईआईटी दिल्ली सिनर्जी एकेडमिक सेंटर के मार्गदर्शन में विकसित किया गया है। हम भाषा की बाधाओं को तोड़ते हैं ताकि हर बच्चा अपनी मातृभाषा में तकनीक और प्रोग्रामिंग सीख सके।'
                  : "CodeSaarthi is India’s premium bilingual coding and STEM academy, conceptualized and developed under the synergy program of IIT Delhi. We believe language should never be a barrier to technological creativity. By blending mother-tongue instructions with standard syntax, we help K-12 and CBSE students master modern programming easily."}
              </p>

              <div className="border-l-4 border-blue-600 pl-4 py-1.5 bg-slate-50 rounded-r-xl">
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">
                  {currentLanguage === 'hi' ? 'हमारा मिशन (Our Mission):' : 'Our Mission:'}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-1 font-medium">
                  {currentLanguage === 'hi'
                    ? 'कंप्यूटर विज्ञान और लॉजिक को सुलभ, व्यावहारिक और द्विभाषी बनाकर भारत के हर कोने में युवा वैज्ञानिकों और इंजीनियरों को सशक्त बनाना।'
                    : 'To democratize computer science and logical reasoning for every student across India, fostering a new generation of creators through bilingual, accessible, and high-impact STEM education.'}
                </p>
              </div>

              <div>
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-100 hover:shadow-blue-200"
                >
                  <span>{currentLanguage === 'hi' ? 'सीखना शुरू करें' : 'Start Learning'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Side: Key Features Grid */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center">
                <GraduationCap className="h-5.5 w-5.5 text-blue-600 mr-2 shrink-0" />
                {currentLanguage === 'hi' ? 'मंच की मुख्य विशेषताएं' : 'Platform Pillars'}
              </h3>

              <div className="space-y-4">
                {/* Pillar 1 */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start space-x-4 shadow-xs hover:shadow-sm transition-all">
                  <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-600 shrink-0">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">
                      {currentLanguage === 'hi' ? 'एआई सारथी ट्यूटर (AI Tutor)' : 'AI Saarthi Tutor'}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 font-medium">
                      {currentLanguage === 'hi'
                        ? 'चैट और संवादात्मक प्रश्नों के माध्यम से 24/7 शंका समाधान और सरल कोडिंग व्याख्या।'
                        : 'Instant bilingual simplified concept-cracking and standard python coding mentorship anytime.'}
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start space-x-4 shadow-xs hover:shadow-sm transition-all">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-600 shrink-0">
                    <Languages className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">
                      {currentLanguage === 'hi' ? 'द्विभाषी शिक्षा (Bilingual Learning)' : 'Bilingual Learning'}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 font-medium">
                      {currentLanguage === 'hi'
                        ? 'हिंदी और अन्य क्षेत्रीय भाषाओं में अनुकूलित पाठ जो समझने में आसान हों।'
                        : 'Lessons natively formatted in Hindi, Marathi, and regional tongues alongside standard English syntaxes.'}
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start space-x-4 shadow-xs hover:shadow-sm transition-all">
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-600 shrink-0">
                    <Award className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">
                      {currentLanguage === 'hi' ? 'इंटरैक्टिव क्विज़ (Interactive Quizzes)' : 'Interactive Quizzes'}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 font-medium">
                      {currentLanguage === 'hi'
                        ? 'सीबीएसई राष्ट्रीय कोडिंग मानकों पर आधारित मॉक टेस्ट और तुरंत परिणाम व्याख्या।'
                        : 'Dynamic STEM challenge questions matching CBSE guidelines with interactive explanations.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Final Call to Action banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="text-blue-200 font-mono text-xs uppercase tracking-wider font-bold">Empowering the future engineers</span>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">Ready to break the code in your own language?</h3>
              <p className="text-sm text-blue-100/90 leading-relaxed">
                Join thousands of students learning to express their scientific ideas without being held back by a language barrier. Start your bilingual STEM adventure today.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Create Your Free Student Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
