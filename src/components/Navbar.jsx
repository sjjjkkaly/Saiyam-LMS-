import React, { useState } from 'react';
import { 
  GraduationCap, Sparkles, BookOpen, Video, Radio, FileText, 
  Award, ShieldCheck, UserCheck, Bell, ChevronDown, CheckCircle2, 
  Menu, X, Wifi
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  activeRole, 
  setActiveRole, 
  activeClassLevel, 
  setActiveClassLevel
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "🔥 CA Saiyam Gupta started LIVE Stream: Cash Flow Statement!", time: "2 mins ago" },
    { id: 2, text: "📝 New Class 12 Calculus Formula Book added to Resources.", time: "1 hour ago" },
    { id: 3, text: "🏆 You scored 95% in Accounts Revaluation Test!", time: "Yesterday" }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 px-4 py-1 text-[11px] font-bold text-slate-950 flex items-center justify-between shadow-inner">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-slate-950 text-amber-400 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border border-amber-400/30">
              Admission Open 2026-27
            </span>
            <span className="truncate font-bold">
              Saiyam Classes • Class 11 & 12 (Accounts, Maths, BST & Eco)
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="hidden sm:flex items-center space-x-1 text-[10px] text-slate-900 bg-white/20 px-2 py-0.5 rounded-full font-bold">
              <Wifi className="w-3 h-3 text-emerald-950 animate-pulse" />
              <span>Firebase Realtime Sync</span>
            </span>

            <button 
              onClick={() => setActiveTab('ai-tutor')}
              className="flex items-center space-x-1 text-slate-950 hover:text-white font-black transition-all bg-white/30 hover:bg-slate-950 px-2.5 py-0.5 rounded-full text-[10px]"
            >
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>SaiyamAI Doubt Solver</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight font-heading gold-gradient-text">
                  SAIYAM CLASSES
                </span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  LMS PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">
                Class 11 & 12 • Commerce & Math
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
              { id: 'courses', label: 'Lectures', icon: Video },
              { id: 'live', label: 'Live Studio', icon: Radio, badge: 'LIVE' },
              { id: 'resources', label: 'Notes', icon: FileText },
              { id: 'quizzes', label: 'Test Series', icon: Award },
              { id: 'ai-tutor', label: 'SaiyamAI', icon: Sparkles, gold: true },
              ...(activeRole === 'Admin' ? [{ id: 'admin', label: 'Admin Panel', icon: ShieldCheck, highlight: true }] : []),
              ...(activeRole === 'Teacher' ? [{ id: 'teacher', label: 'Teacher Desk', icon: UserCheck }] : [])
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    isActive 
                      ? tab.highlight
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                        : tab.gold
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                          : 'bg-slate-800 text-amber-400 shadow'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive && tab.gold ? 'text-slate-950' : isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[8px] font-black bg-red-600 text-white rounded-full live-badge-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Switchers */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Class Picker */}
            <div className="relative">
              <button
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition"
              >
                <span className="hidden sm:inline text-slate-400">Class:</span>
                <span className="font-bold text-amber-400">
                  {activeClassLevel === 'All' ? 'All (11 & 12)' : `Class ${activeClassLevel}`}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showClassDropdown && (
                <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl shadow-2xl py-2 z-50 border border-slate-800">
                  {['All', '11', '12'].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setActiveClassLevel(lvl);
                        setShowClassDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 ${
                        activeClassLevel === lvl ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{lvl === 'All' ? 'All Classes (11 & 12)' : `Class ${lvl} Commerce`}</span>
                      {activeClassLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow ${
                  activeRole === 'Admin'
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                    : activeRole === 'Teacher'
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full animate-ping bg-current" />
                <span className="hidden sm:inline">{activeRole}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl shadow-2xl py-2 z-50 border border-slate-800">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">Switch Portal Role</div>
                  {[
                    { role: 'Student', label: '👨‍🎓 Student Portal' },
                    { role: 'Teacher', label: '👨‍🏫 Teacher Desk' },
                    { role: 'Admin', label: '👑 Full Admin Panel' }
                  ].map(item => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setActiveRole(item.role);
                        setShowRoleDropdown(false);
                        if (item.role === 'Admin') setActiveTab('admin');
                        else if (item.role === 'Teacher') setActiveTab('teacher');
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 ${
                        activeRole === item.role ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      {activeRole === item.role && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 relative transition"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 glass-panel rounded-2xl shadow-2xl p-4 z-50 border border-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <h4 className="font-bold text-xs text-slate-100">Live Notifications</h4>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">3 New</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px]">
                        <p className="text-slate-200 font-medium">{n.text}</p>
                        <span className="text-[9px] text-slate-500 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Mobile Bottom Dock Navigation (User Friendly & Mobile Compatible) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/90 px-2 py-2 flex items-center justify-around shadow-2xl">
        {[
          { id: 'dashboard', label: 'Home', icon: BookOpen },
          { id: 'courses', label: 'Lectures', icon: Video },
          { id: 'live', label: 'Live', icon: Radio, badge: 'LIVE' },
          { id: 'resources', label: 'Notes', icon: FileText },
          { id: 'quizzes', label: 'Tests', icon: Award },
          { id: 'ai-tutor', label: 'SaiyamAI', icon: Sparkles, gold: true },
          ...(activeRole === 'Admin' ? [{ id: 'admin', label: 'Admin', icon: ShieldCheck }] : [])
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl text-[10px] font-bold transition relative ${
                isActive 
                  ? tab.gold
                    ? 'text-amber-400 font-extrabold'
                    : 'text-amber-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-amber-400 scale-110' : 'text-slate-400'} transition-transform`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
