import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Brain, 
  Languages, 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Check, 
  ArrowLeft,
  Terminal,
  User,
  Volume2
} from 'lucide-react';

// Pre-programmed interactive mock Q&A responses in both English & Hindi
const MOCK_RESPONSES = {
  en: {
    loops: `A **Loop** is a programming tool that repeats a block of code until a specific condition is met. Think of it like walking: you take a step, check if you have reached your destination, and if not, take another step!

**Types of Loops:**
1. **For Loop:** Used when you know *exactly* how many times to repeat (e.g., repeat 10 times).
   \`\`\`python
   for i in range(5):
       print("Step", i)
   \`\`\`
2. **While Loop:** Used when repeating until something changes (e.g., repeat while the game is not over).
   \`\`\`python
   while energy > 0:
       keep_running()
   \`\`\``,
    html: `**HTML (HyperText Markup Language)** is the standard markup language used to create web pages. It is the *skeleton* or structural backbone of any website.

**Key Concepts:**
- **Elements/Tags:** Labels like \`<h1>\` for headings, \`<p>\` for paragraphs, and \`<img>\` for images.
- **Attributes:** Extra settings like \`href\` in links or \`src\` in images.

**Simple Example:**
\`\`\`html
<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome to CodeSaarthi!</h1>
    <p>We make STEM learning bilingual and fun.</p>
  </body>
</html>
\`\`\``,
    variables: `A **Variable** is like a labeled storage box in your computer's memory. It holds data that can be changed or referenced later in your code.

**Analogies:**
- Think of it as a labeled glass jar. The label is the *variable name*, and what is inside (e.g., sugar, salt) is the *value*.

**Example in Python:**
\`\`\`python
# Creating variables
student_name = "Mahek"
coding_score = 95

# Changing variable value
coding_score = coding_score + 5
print(coding_score) # Output will be 100
\`\`\``,
    default: `That's an excellent question! I am your AI Saarthi Tutor, specialized in simplifying computer science and STEM coding for CBSE students. 

To help me explain better, you can ask me to:
- Explain **loops** or **conditions**
- Define **HTML** or **Web development** basics
- Explain how **variables** store data
- Solve simple **Python** puzzles

Try clicking one of the suggested prompts below or ask any coding questions in English or Hindi!`
  },
  hi: {
    loops: `**लूप (Loop)** एक कोडिंग टूल है जो किसी कोड ब्लॉक को तब तक दोहराता है जब तक कि एक निश्चित शर्त (condition) पूरी न हो जाए। इसे चलने की तरह समझें: आप एक कदम बढ़ाते हैं, जांचते हैं कि क्या आप गंतव्य पर पहुंच गए हैं, और यदि नहीं, तो दूसरा कदम उठाते हैं!

**लूप के मुख्य प्रकार:**
1. **For Loop:** तब उपयोग किया जाता है जब आप *सटीक रूप से* जानते हैं कि कितनी बार दोहराना है (जैसे, 10 बार दोहराएं)।
   \`\`\`python
   for i in range(5):
       print("कदम संख्या", i)
   \`\`\`
2. **While Loop:** तब उपयोग किया जाता है जब तक कि कोई स्थिति बदल न जाए (जैसे, जब तक खेल खत्म न हो जाए तब तक दोहराएं)।
   \`\`\`python
   while energy > 0:
       keep_running()
   \`\`\``,
    html: `**HTML (HyperText Markup Language)** वह मानक भाषा है जिसका उपयोग वेब पेज बनाने के लिए किया जाता है। यह किसी भी वेबसाइट का *कंकाल* (skeleton) या संरचनात्मक ढांचा है।

**मुख्य बातें:**
- **तत्व/टैग (Tags):** हेडिंग के लिए \`<h1>\`, पैराग्राफ के लिए \`<p>\`, और छवियों के लिए \`<img>\`।
- **विशेषताएं (Attributes):** अतिरिक्त सेटिंग्स जैसे लिंक में \`href\` या छवियों में \`src\`।

**सरल उदाहरण:**
\`\`\`html
<!DOCTYPE html>
<html>
  <body>
    <h1>कोडसारथी में आपका स्वागत है!</h1>
    <p>हम स्टेम (STEM) शिक्षा को द्विभाषी और आसान बनाते हैं।</p>
  </body>
</html>
\`\`\``,
    variables: `**वैरिएबल (Variable)** आपके कंप्यूटर की मेमोरी में एक लेबल वाले बॉक्स की तरह है। यह उस डेटा को संग्रहीत करता है जिसे बाद में आपके कोड में बदला या संदर्भित किया जा सकता है।

**एक सरल सादृश्य:**
- इसे एक लेबल वाले डिब्बे के रूप में सोचें। लेबल *वैरिएबल का नाम* है, और अंदर की चीज़ (जैसे चीनी, नमक) उसका *मान (Value)* है।

**पायथन में उदाहरण:**
\`\`\`python
# वैरिएबल बनाना
student_name = "महेक"
coding_score = 95

# मान बदलना
coding_score = coding_score + 5
print(coding_score) # उत्तर होगा 100
\`\`\``,
    default: `यह एक बेहतरीन सवाल है! मैं आपका एआई सारथी ट्यूटर हूं, जो सीबीएसई छात्रों के लिए कंप्यूटर विज्ञान और स्टेम कोडिंग को आसान बनाने में माहिर है।

बेहतर ढंग से समझने के लिए, आप मुझसे पूछ सकते हैं:
- **लूप्स (Loops)** या **कंडीशन्स (Conditions)** की व्याख्या
- **HTML** या **वेब डेवलपमेंट** की बुनियादी बातें
- **वैरिएबल (Variables)** कैसे काम करते हैं
- पायथन के सरल कोड उदाहरण

नीचे दिए गए सुझावों पर क्लिक करें या हिंदी/अंग्रेजी में कोई भी कोडिंग प्रश्न पूछें!`
  }
};

const SUGGESTED_PROMPTS = [
  { id: 'loops', label: { en: 'Explain Loops 🔄', hi: 'लूप्स समझाएं 🔄' } },
  { id: 'html', label: { en: 'What is HTML? 🌐', hi: 'HTML क्या है? 🌐' } },
  { id: 'variables', label: { en: 'Teach Variables 📦', hi: 'वैरिएबल सिखाएं 📦' } }
];

export default function AIChat({ currentLanguage: appLanguage = 'en', setCurrentPage }) {
  const [chatLanguage, setChatLanguage] = useState(appLanguage);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Initial messages
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: chatLanguage === 'hi' 
        ? 'नमस्ते कोडर! मैं हूँ आपका एआई सारथी (AI Tutor)। मैं आपके प्रोग्रामिंग और सीबीएसई कंप्यूटर साइंस के सारे संदेहों को हिंदी और अंग्रेजी में चुटकियों में हल कर सकता हूँ। आज आप क्या सीखना चाहते हैं?'
        : 'Hello coder! I am your AI Saarthi (AI Tutor). I am here to simplify programming and resolve all your computer science or CBSE coding doubts in English & Hindi. What would you like to explore today?',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Sync language setting from app level when it loads
  useEffect(() => {
    setChatLanguage(appLanguage);
  }, [appLanguage]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponseText = '';
      const lowercaseText = text.toLowerCase();

      if (lowercaseText.includes('loop') || lowercaseText.includes('लूप')) {
        aiResponseText = MOCK_RESPONSES[chatLanguage].loops;
      } else if (lowercaseText.includes('html') || lowercaseText.includes('एचटीएमएल')) {
        aiResponseText = MOCK_RESPONSES[chatLanguage].html;
      } else if (lowercaseText.includes('variable') || lowercaseText.includes('वैरिएबल') || lowercaseText.includes('वेरिएबल')) {
        aiResponseText = MOCK_RESPONSES[chatLanguage].variables;
      } else {
        aiResponseText = MOCK_RESPONSES[chatLanguage].default;
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClearChat = () => {
    if (confirm(chatLanguage === 'hi' ? 'क्या आप चैट मिटाना चाहते हैं?' : 'Are you sure you want to clear the chat history?')) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'ai',
          text: chatLanguage === 'hi' 
            ? 'चैट रीसेट हो गई है! पूछें अपनी पसंद का कोई भी कोडिंग प्रश्न।'
            : 'Chat cleared! Go ahead and ask me any new coding questions.',
          timestamp: 'Just now'
        }
      ]);
    }
  };

  return (
    <div className="bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Back Link & Brand Navigation */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage?.('dashboard')}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs"
        >
          <ArrowLeft className="h-4 w-4 text-indigo-600" />
          <span>{chatLanguage === 'hi' ? 'डैशबोर्ड' : 'Back to Dashboard'}</span>
        </button>

        {/* Inline Language Switch */}
        <button
          onClick={() => setChatLanguage(prev => prev === 'en' ? 'hi' : 'en')}
          className="inline-flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
        >
          <Languages className="h-4 w-4" />
          <span>{chatLanguage === 'en' ? 'हिन्दी में पूछें' : 'Switch to English'}</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="max-w-4xl mx-auto bg-white border-2 border-slate-200/90 rounded-[32px] shadow-lg shadow-slate-100 overflow-hidden flex flex-col h-[78vh]">
        
        {/* Tutor Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between border-b border-indigo-100 text-white shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="bg-white/10 p-2.5 rounded-2xl border border-white/15 shadow-inner">
              <Brain className="h-7 w-7 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight leading-none">
                  {chatLanguage === 'hi' ? 'एआई सारथी • आपका कोडिंग ट्यूटर' : 'AI Saarthi • Interactive Coding Tutor'}
                </h2>
                <span className="bg-emerald-400/90 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider leading-none">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-indigo-100 font-medium mt-1">
                {chatLanguage === 'hi' ? 'सीबीएसई राष्ट्रीय पाठ्यक्रम और द्विभाषी कोडिंग में सहायक' : 'Bilingual assistant expert in CBSE Python, HTML & STEM concepts'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            title={chatLanguage === 'hi' ? 'चैट साफ़ करें' : 'Clear Chat'}
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>

        {/* Message Panel */}
        <div className="flex-grow p-6 overflow-y-auto bg-slate-50/50 space-y-6">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div 
                key={msg.id}
                className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-start space-x-3`}
              >
                {isAI && (
                  <div className="bg-indigo-600 text-white p-2 rounded-xl shrink-0 border border-indigo-700 shadow-sm">
                    <Sparkles className="h-4.5 w-4.5 text-amber-300" />
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-[24px] px-5 py-4 shadow-sm border ${
                  isAI 
                    ? 'bg-white text-slate-800 border-slate-200/80 rounded-tl-sm' 
                    : 'bg-indigo-600 text-white border-indigo-700 rounded-tr-sm'
                }`}>
                  {/* Message body (renders markdown code correctly) */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {msg.text.split('\n').map((line, idx) => {
                      // Check for styled code blocks
                      if (line.trim().startsWith('```')) {
                        return null; // Skip markdown block lines
                      }
                      if (line.includes('print(') || line.includes('def ') || line.includes('while ') || line.includes('<!DOCTYPE')) {
                        return (
                          <div key={idx} className="bg-slate-950 text-slate-100 font-mono text-[11px] sm:text-xs p-3 rounded-xl border border-slate-800 my-2 shadow-inner overflow-x-auto select-all">
                            {line}
                          </div>
                        );
                      }
                      
                      // Highlight bold elements
                      const boldParts = line.split('**');
                      if (boldParts.length > 1) {
                        return (
                          <p key={idx} className="mb-1">
                            {boldParts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className={isAI ? "text-slate-950 font-black" : "text-white font-black"}>{part}</strong> : part)}
                          </p>
                        );
                      }

                      return <p key={idx} className="mb-1">{line}</p>;
                    })}
                  </div>
                  
                  {/* Timing footer */}
                  <div className={`text-[10px] mt-2.5 font-bold flex items-center justify-between ${
                    isAI ? 'text-slate-400' : 'text-indigo-200'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {isAI && (
                      <div className="flex items-center space-x-1.5 ml-4">
                        <button 
                          className="hover:text-indigo-600 p-0.5 rounded cursor-pointer transition-colors"
                          onClick={() => alert(chatLanguage === 'hi' ? 'पाठ का अनुवाद उपलब्ध है!' : 'Voice read out feature simulated.')}
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isAI && (
                  <div className="bg-slate-200 text-slate-700 p-2 rounded-xl shrink-0 border border-slate-300 shadow-xs">
                    <User className="h-4.5 w-4.5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start items-start space-x-3">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shrink-0 border border-indigo-700">
                <Sparkles className="h-4.5 w-4.5 text-amber-300" />
              </div>
              <div className="bg-white border border-slate-200/80 rounded-[20px] rounded-tl-sm px-5 py-4 shadow-sm flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex flex-wrap gap-2 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 py-1.5 mr-1 flex items-center">
            <HelpCircle className="h-3.5 w-3.5 text-slate-400 mr-1" />
            {chatLanguage === 'hi' ? 'सुझाव:' : 'Ask Saarthi:'}
          </span>
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => handleSendMessage(prompt.label[chatLanguage])}
              className="bg-indigo-550/10 hover:bg-indigo-50 border border-indigo-250 text-indigo-700 font-bold text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs hover:border-indigo-400"
            >
              {prompt.label[chatLanguage]}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              placeholder={chatLanguage === 'hi' ? 'कंप्यूटर कोडिंग के बारे में कुछ भी पूछें...' : 'Ask your AI Saarthi tutor any programming doubts...'}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow bg-white border-2 border-slate-200 text-slate-900 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all placeholder-slate-400 shadow-sm"
              id="ai-tutor-message-input"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className={`p-3.5 rounded-2xl text-white font-black transition-all shadow-md ${
                inputMessage.trim() 
                  ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-indigo-200 hover:-translate-y-0.5 border border-indigo-700' 
                  : 'bg-slate-350 cursor-not-allowed border border-slate-400 opacity-60'
              }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
