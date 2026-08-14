import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, BookOpen, HelpCircle, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { generateAIResponse } from '../services/aiAgent';

export default function AIAgentView({ activeClassLevel }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      title: "SaiyamAI Commerce & Mathematics Tutor",
      content: `Hello! I am **SaiyamAI**, your dedicated AI Assistant for **Class 11 & Class 12** Commerce and Mathematics.

I can help you with:
* 📊 **Accountancy:** Journal entries, Revaluation A/c, Goodwill valuation, Cash Flow AS-3, Issue of Shares.
* 📐 **Mathematics:** Calculus step-by-step solutions, Definite Integration, Matrices, Vectors, 3D Geometry.
* 💼 **Business Studies:** Case study keyword identification, Fayol/Taylor principles, Marketing mix.
* 📈 **Economics:** National Income aggregate conversions, Foreign Exchange, Inflation/Deflation graphs.
* 📅 **Board Exam Study Plans & Practice Drills.**

Select a sample query below or type your custom doubt!`
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Accounts');
  const [isTyping, setIsTyping] = useState(false);

  const presets = [
    { label: "📊 Goodwill Valuation Step-by-Step", prompt: "Explain goodwill valuation under super profit method with numerical step by step" },
    { label: "📐 Class 12 Calculus Definite Integration", prompt: "Solve definite integration property P4 NCERT exercise 7.11 step by step" },
    { label: "💼 BST Case Study 3-Step Trick", prompt: "How to solve Business Studies case study for board exams?" },
    { label: "📈 National Income Conversion Formulae", prompt: "Give macroeconomics national income conversion rules" },
    { label: "📅 Board Exam 95%+ Study Schedule", prompt: "Create a 4-week board exam study plan for Class 12 Commerce" }
  ];

  const handleSend = (textToSend) => {
    const queryText = textToSend || inputPrompt;
    if (!queryText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      content: queryText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = generateAIResponse(queryText, selectedSubject, activeClassLevel);
      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        title: responseObj.title,
        content: responseObj.content
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white font-heading">SaiyamAI Tutor Engine</h1>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                Active 24/7
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Personalized AI Doubt Resolution for Class 11 & Class 12 (Accounts, Maths, BST & Eco)
            </p>
          </div>
        </div>

        {/* Subject Context Selector */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold px-2">Focus:</span>
          {['Accounts', 'Maths', 'BST', 'Eco'].map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                selectedSubject === subj ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Quick Prompts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-bold mr-1 flex items-center space-x-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Prompts:</span>
        </span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset.prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-300 hover:text-amber-400 transition"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Chat Interface */}
      <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[550px] overflow-hidden shadow-2xl">
        {/* Messages Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/60">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl p-5 rounded-3xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none shadow-lg'
                    : 'glass-panel border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
                }`}
              >
                {msg.title && (
                  <h4 className="font-extrabold text-amber-400 font-heading text-sm border-b border-slate-800/80 pb-2">
                    {msg.title}
                  </h4>
                )}

                <div className="whitespace-pre-wrap leading-relaxed font-sans">
                  {msg.content}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold animate-pulse">
              <Bot className="w-4 h-4" />
              <span>SaiyamAI is formulating step-by-step answer...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder={`Ask SaiyamAI any Class ${activeClassLevel === 'All' ? '11/12' : activeClassLevel} ${selectedSubject} doubt or formula...`}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg hover:brightness-110 transition flex items-center space-x-2"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4 fill-slate-950" />
          </button>
        </form>
      </div>
    </div>
  );
}
