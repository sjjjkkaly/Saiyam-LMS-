import React, { useState } from 'react';
import { 
  Search, Filter, Video, Play, BookOpen, Clock, Star, Users, 
  FileText, Download, CheckCircle, Sparkles, ChevronRight, X, Volume2, FastForward
} from 'lucide-react';

export default function CoursesView({ 
  courses, 
  lectures, 
  activeClassLevel, 
  selectedLecture, 
  setSelectedLecture,
  setActiveTab 
}) {
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [classFilter, setClassFilter] = useState(activeClassLevel || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Subjects available
  const subjects = ['All', 'Accounts', 'Maths', 'Business Studies', 'Economics'];

  // Filter courses
  const filteredCourses = courses.filter(c => {
    const matchesSubject = subjectFilter === 'All' || c.subject === subjectFilter;
    const matchesClass = classFilter === 'All' || c.classLevel === classFilter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesClass && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Filter Controls */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading gold-gradient-text">
              Video Lectures & Masterclasses
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Curated for Class 11 & Class 12 Commerce & Higher Mathematics
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search lectures, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>
        </div>

        {/* Subject & Class Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
          {/* Subjects */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Subject:</span>
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setSubjectFilter(subj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  subjectFilter === subj
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">Class:</span>
            {['All', '11', '12'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setClassFilter(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  classFilter === lvl
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {lvl === 'All' ? 'Class 11 & 12' : `Class ${lvl}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="bg-slate-950/90 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-amber-400/40">
                    Class {course.classLevel}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    {course.subject}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 flex items-center space-x-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-base text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                {/* Chapters List summary */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Syllabus Chapters:
                  </span>
                  {course.chapters.slice(0, 3).map(ch => (
                    <div key={ch.id} className="text-xs text-slate-300 flex items-center space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span>{course.totalLectures} Lectures</span> • <span className="text-slate-300 font-semibold">{course.duration}</span>
              </div>

              <button
                onClick={() => {
                  setActiveCourseModal(course);
                  const matchingLec = lectures.find(l => l.courseId === course.id) || lectures[0];
                  setSelectedLecture(matchingLec);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Start Learning</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal when a lecture/course is active */}
      {(selectedLecture || activeCourseModal) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-5xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-0 my-8">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded border border-amber-400/30 uppercase">
                    Class {selectedLecture?.classLevel || '12'} {selectedLecture?.subject}
                  </span>
                  <span className="text-xs text-slate-400">Instructor: {selectedLecture?.speaker}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-100 mt-1">
                  {selectedLecture?.title || activeCourseModal?.title}
                </h2>
              </div>

              <button
                onClick={() => {
                  setSelectedLecture(null);
                  setActiveCourseModal(null);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Player Screen */}
              <div className="lg:col-span-8 bg-slate-950 p-4 space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group flex items-center justify-center">
                  <iframe
                    src={selectedLecture?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    title={selectedLecture?.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Interactive Player Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg flex items-center space-x-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <span className="text-slate-400 font-mono">00:00 / {selectedLecture?.duration || '45 mins'}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Playback Speed selector */}
                    <div className="flex items-center space-x-1">
                      <FastForward className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-400">Speed:</span>
                      {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                        <button
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            playbackSpeed === speed ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedLecture(null);
                        setActiveCourseModal(null);
                        setActiveTab('ai-tutor');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ask AI Doubt</span>
                    </button>
                  </div>
                </div>

                {/* PDF Note Attachment download */}
                {selectedLecture?.pdfNote && (
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      <div>
                        <h4 className="font-bold text-slate-200">Attached Chapter Note PDF</h4>
                        <p className="text-slate-400 text-[11px]">{selectedLecture.pdfNote}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedLecture(null);
                        setActiveCourseModal(null);
                        setActiveTab('resources');
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Open PDF Notes</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar: Lecture Timestamps & Chapter List */}
              <div className="lg:col-span-4 bg-slate-900/60 p-5 border-l border-slate-800 space-y-5 max-h-[550px] overflow-y-auto">
                <h3 className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Topic Timestamps</span>
                </h3>

                <div className="space-y-2">
                  {(selectedLecture?.timestamps || [
                    { time: "02:15", title: "Concept Explanation" },
                    { time: "15:30", title: "NCERT Board Example" },
                    { time: "30:45", title: "Common Student Errors" }
                  ]).map((stamp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 transition cursor-pointer text-xs flex items-center justify-between"
                    >
                      <span className="font-medium text-slate-300">{stamp.title}</span>
                      <span className="font-mono text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                        {stamp.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Transcript preview */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-slate-200">Lecture Key Summary:</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                    "{selectedLecture?.transcript || 'Complete formula breakdown with NCERT 6-mark board question step marking.'}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
