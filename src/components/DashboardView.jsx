import React from 'react';
import { 
  Radio, Play, Sparkles, BookOpen, FileText, Award, Users, 
  TrendingUp, Clock, ArrowRight, Star, ShieldCheck, Flame, CheckCircle, Zap
} from 'lucide-react';

export default function DashboardView({ 
  courses, 
  lectures, 
  liveClasses, 
  notes, 
  quizzes,
  announcements,
  activeClassLevel, 
  setActiveTab,
  onSelectCourse,
  onSelectLecture
}) {
  // Filter courses by selected class level
  const filteredCourses = activeClassLevel === 'All' 
    ? courses 
    : courses.filter(c => c.classLevel === activeClassLevel);

  const activeLiveStream = liveClasses.find(l => l.status === "LIVE NOW") || liveClasses[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-3xl glass-panel-gold p-8 lg:p-12 border border-amber-500/30">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target 100/100 • Board Exam 2026-27 Prep</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Welcome to <span className="gold-gradient-text">Saiyam Classes</span> Premier LMS
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              India's Most Trusted Learning Platform for <strong className="text-amber-400">Class 11 & Class 12</strong> Commerce & Mathematics. 
              Master <span className="text-emerald-400 font-semibold">Accountancy, Higher Mathematics, Business Studies & Economics</span> with CA Saiyam Gupta & senior faculties.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('live')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:scale-105 transition flex items-center space-x-2 group"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Join Live Stream</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('ai-tutor')}
                className="px-6 py-3 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm hover:bg-amber-500/10 transition flex items-center space-x-2 shadow"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ask SaiyamAI Tutor</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className="px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-200 font-medium text-sm hover:border-slate-500 transition"
              >
                Explore All Courses
              </button>
            </div>
          </div>

          {/* Banner Quick Card */}
          <div className="lg:col-span-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Active Batch Focus</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {activeClassLevel === 'All' ? 'Class 11 & 12' : `Class ${activeClassLevel}`}
                </span>
              </div>
              <h3 className="font-bold text-slate-100 text-base mb-1">
                Board Exam Scanner & Super 30 Batch
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Interactive live doubt solving, handwritten notes, chapter tests & NCERT solutions.
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Class 12 Accounts</span>
                  <span className="text-amber-400 font-bold">140 Hrs Complete</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Class 12 Calculus</span>
                  <span className="text-emerald-400 font-bold">160 Hrs Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Students', value: '1,450+', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Board 95%+ Scorers', value: '99.4%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Video Lectures', value: '380+ Hrs', icon: Play, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Notes & E-Books', value: '120+ PDFs', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold font-heading text-slate-100">{stat.value}</p>
                <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Grid: Active Live Stream & Resume Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Class Banner + Featured Courses */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Live Stream Alert Card */}
          {activeLiveStream && (
            <div className="glass-panel p-6 rounded-3xl border border-red-500/40 relative overflow-hidden bg-gradient-to-r from-red-950/40 via-slate-900/80 to-slate-950">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1 px-2.5 py-0.5 text-[10px] font-black bg-red-600 text-white rounded-full live-badge-pulse">
                      <Radio className="w-3 h-3" />
                      <span>LIVE NOW</span>
                    </span>
                    <span className="text-xs font-bold text-amber-400">{activeLiveStream.subject} • Class {activeLiveStream.classLevel}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                    {activeLiveStream.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Faculty: <strong className="text-slate-100">{activeLiveStream.instructor}</strong> • {activeLiveStream.viewerCount} Students Watching
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('live')}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center space-x-2 transition flex-shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Join Live Stream</span>
                </button>
              </div>
            </div>
          )}

          {/* Continue Learning Widget */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-lg font-heading text-slate-100 flex items-center space-x-2">
                <Play className="w-5 h-5 text-amber-400" />
                <span>Resume Recent Lecture</span>
              </h3>
              <button 
                onClick={() => setActiveTab('courses')}
                className="text-xs text-amber-400 font-semibold hover:underline flex items-center space-x-1"
              >
                <span>View All Lectures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {lectures[0] && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg text-slate-950 font-black">
                    <Play className="w-6 h-6 fill-slate-950" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {lectures[0].subject} • Class {lectures[0].classLevel}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100">{lectures[0].title}</h4>
                    <p className="text-xs text-slate-400">Speaker: {lectures[0].speaker} • {lectures[0].duration}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectLecture(lectures[0])}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Resume Video</span>
                </button>
              </div>
            )}
          </div>

          {/* Featured Courses Catalog Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-xl font-heading text-slate-100">
                  Featured {activeClassLevel === 'All' ? 'Class 11 & 12' : `Class ${activeClassLevel}`} Batches
                </h3>
                <p className="text-xs text-slate-400">Accounts, Higher Mathematics, Business Studies & Economics</p>
              </div>

              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs text-amber-400 font-bold hover:underline"
              >
                Browse Catalog ({filteredCourses.length})
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCourses.slice(0, 4).map(course => (
                <div 
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="bg-slate-950/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                        Class {course.classLevel}
                      </span>
                      <span className="bg-emerald-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {course.subject}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center space-x-1 bg-slate-900/80 px-2 py-0.5 rounded-md">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <strong className="text-white">{course.rating}</strong>
                      </span>
                      <span className="bg-slate-900/80 px-2 py-0.5 rounded-md font-medium text-[11px]">
                        {course.totalLectures} Lectures
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
                      <span>Faculty: <strong className="text-slate-200">{course.instructor}</strong></span>
                      <span className="text-emerald-400 font-bold">{course.enrolledCount} Enrolled</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard & Announcements */}
        <div className="lg:col-span-4 space-y-6">
          {/* SaiyamAI Quick Teaser Card */}
          <div className="glass-panel-gold p-5 rounded-3xl border border-amber-500/40 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm mb-2">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>SaiyamAI Student Assistant</span>
            </div>
            <p className="text-xs text-slate-200 mb-4 leading-relaxed">
              Have doubts in Class 11/12 Accounts, Calculus or BST case studies? Get instant step-by-step solutions!
            </p>
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow hover:brightness-110 transition flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Launch AI Doubt Solver</span>
            </button>
          </div>

          {/* Toppers Leaderboard */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base font-heading text-slate-100 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Class 12 & 11 Rankers</span>
              </h3>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                Weekly Test
              </span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Aarav Sharma", score: "99/100", rank: 1, classLvl: "12", subject: "Accounts & Maths" },
                { name: "Kabir Mehta", score: "98/100", rank: 2, classLvl: "11", subject: "Financial Accounting" },
                { name: "Riya Verma", score: "97/100", rank: 3, classLvl: "12", subject: "Business Studies" },
                { name: "Ananya Singhania", score: "95/100", rank: 4, classLvl: "11", subject: "Mathematics" }
              ].map(student => (
                <div key={student.rank} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                      student.rank === 1 ? 'bg-amber-500 text-slate-950' : student.rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-amber-800 text-white'
                    }`}>
                      #{student.rank}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-100">{student.name}</h4>
                      <p className="text-[10px] text-slate-400">Class {student.classLvl} • {student.subject}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-emerald-400">{student.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Board */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <h3 className="font-extrabold text-base font-heading text-slate-100 mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Official Notice Board</span>
            </h3>

            <div className="space-y-3">
              {announcements.map(item => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-200">{item.title}</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
