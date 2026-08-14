import React, { useState } from 'react';
import { 
  Radio, Users, MessageSquare, Send, ThumbsUp, Hand, Monitor, 
  Clock, Calendar, Bell, CheckCircle, Sparkles, Pin, ShieldCheck
} from 'lucide-react';

export default function LiveStreamView({ liveClasses, activeClassLevel }) {
  const activeStream = liveClasses.find(l => l.status === "LIVE NOW") || liveClasses[0];

  // Interactive Live Chat State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "CA Saiyam Gupta", role: "Faculty", text: "Welcome students! Today we master Cash Flow Operating Activities.", pinned: true },
    { id: 2, sender: "Aarav Sharma", role: "Student", text: "Good evening Sir! Ready with notebooks." },
    { id: 3, sender: "Kabir Mehta", role: "Student", text: "Sir, will non-cash depreciation be added back to Net Profit?" },
    { id: 4, sender: "CA Saiyam Gupta", role: "Faculty", text: "Yes Kabir! Depreciation is a non-cash expense, so it gets added back in Operating Activities." }
  ]);
  const [inputChat, setInputChat] = useState('');
  const [handRaised, setHandRaised] = useState(false);

  // Live Poll State
  const [pollSelectedOption, setPollSelectedOption] = useState(null);
  const [pollVotes, setPollVotes] = useState({ 0: 42, 1: 185, 2: 12, 3: 5 });

  const pollQuestion = {
    question: "Q: In Cash Flow Statement (AS-3), Dividend Received by a Financing Company is classified under which activity?",
    options: [
      "Investing Activities",
      "Operating Activities",
      "Financing Activities",
      "Extraordinary Items"
    ],
    correctIndex: 1
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "You (Student)",
      role: "Student",
      text: inputChat.trim()
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInputChat('');

    // Auto simulated faculty reply after 1.5 seconds
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "CA Saiyam Gupta",
          role: "Faculty",
          text: "Excellent query! Check slide #4 for step-by-step breakdown."
        }
      ]);
    }, 1500);
  };

  const handleVotePoll = (idx) => {
    if (pollSelectedOption !== null) return;
    setPollSelectedOption(idx);
    setPollVotes(prev => ({ ...prev, [idx]: prev[idx] + 1 }));
  };

  const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-red-600 text-white rounded-full live-badge-pulse flex items-center space-x-1">
              <Radio className="w-3 h-3" />
              <span>LIVE INTERACTIVE STREAMING</span>
            </span>
            <span className="text-xs font-bold text-amber-400">Class 11 & 12 Virtual Classroom</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
            Saiyam Classes Live Studio
          </h1>
        </div>

        <div className="flex items-center space-x-3 text-xs bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800">
          <Users className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-medium">Active Viewers:</span>
          <span className="font-extrabold text-emerald-400">{activeStream.viewerCount + (chatMessages.length * 3)}</span>
        </div>
      </div>

      {/* Main Studio Grid: Stream Player + Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Video Frame & Live Poll */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Video Frame */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <div className="aspect-video bg-slate-950 relative flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/live_stream?channel=saiyamclasses"
                title={activeStream.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Stream Meta bar */}
            <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {activeStream.subject} • Class {activeStream.classLevel}
                </span>
                <h2 className="font-bold text-base text-slate-100">{activeStream.title}</h2>
                <p className="text-xs text-slate-400">Faculty: <strong className="text-slate-200">{activeStream.instructor}</strong></p>
              </div>

              {/* Classroom Interactive Toolbar */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setHandRaised(!handRaised)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                    handRaised 
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Hand className="w-4 h-4" />
                  <span>{handRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Interactive Live Poll Widget */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-slate-100 font-heading">
                  Live Classroom Poll • Instant Quiz
                </h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                {totalPollVotes} Votes
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-200">{pollQuestion.question}</p>

            <div className="space-y-2">
              {pollQuestion.options.map((option, idx) => {
                const votes = pollVotes[idx] || 0;
                const percentage = totalPollVotes > 0 ? Math.round((votes / totalPollVotes) * 100) : 0;
                const isSelected = pollSelectedOption === idx;

                return (
                  <button
                    key={idx}
                    disabled={pollSelectedOption !== null}
                    onClick={() => handleVotePoll(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition relative overflow-hidden flex items-center justify-between ${
                      isSelected 
                        ? 'border-amber-400 bg-amber-500/10 font-bold text-amber-300' 
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {/* Percentage fill bar background */}
                    {pollSelectedOption !== null && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-amber-500/20 transition-all duration-700" 
                        style={{ width: `${percentage}%` }} 
                      />
                    )}

                    <span className="relative z-10 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold flex items-center justify-center text-slate-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </span>

                    {pollSelectedOption !== null && (
                      <span className="relative z-10 font-mono font-bold text-amber-400">
                        {percentage}% ({votes})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Live Chat Box */}
        <div className="lg:col-span-4 glass-panel rounded-3xl border border-slate-800 flex flex-col h-[650px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs text-slate-100">Live Classroom Chat</h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Slow Mode: Off
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {chatMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`p-3 rounded-2xl text-xs space-y-1 ${
                  msg.pinned 
                    ? 'bg-amber-500/15 border border-amber-500/40' 
                    : msg.role === 'Faculty' 
                      ? 'bg-emerald-950/40 border border-emerald-500/30' 
                      : 'bg-slate-900/80 border border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    {msg.pinned && <Pin className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    <span className={`font-bold text-[11px] ${
                      msg.role === 'Faculty' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {msg.sender}
                    </span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-semibold">
                      {msg.role}
                    </span>
                  </div>
                </div>
                <p className="text-slate-200 font-normal leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask CA Saiyam Gupta a doubt live..."
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow transition"
            >
              <Send className="w-4 h-4 fill-slate-950" />
            </button>
          </form>
        </div>
      </div>

      {/* Upcoming Live Classes Timetable */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-lg font-heading text-slate-100 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          <span>Upcoming Live Stream Schedule (Class 11 & 12)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.filter(l => l.status === "UPCOMING").map(stream => (
            <div key={stream.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {stream.subject} • Class {stream.classLevel}
                </span>
                <h4 className="font-bold text-sm text-slate-100">{stream.title}</h4>
                <p className="text-xs text-slate-400">Faculty: {stream.instructor} • {stream.startTime}</p>
              </div>

              <button className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition flex-shrink-0">
                <Bell className="w-3.5 h-3.5" />
                <span>Remind Me</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
