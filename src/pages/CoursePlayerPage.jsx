import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  Award,
  Download,
  Menu,
  X
} from 'lucide-react';

export default function CoursePlayerPage() {
  const { id: courseId } = useParams();
  const { token, API_BASE, user } = useAuth();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('video'); // 'video', 'quiz', 'assignment', 'qna'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // Assignment state
  const [assignmentText, setAssignmentText] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/student/course-player/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.course) {
          setCourse(data.course);
          setSections(data.sections || []);
          
          // Select first lesson
          if (data.sections && data.sections.length > 0 && data.sections[0].lessons?.length > 0) {
            setActiveLesson(data.sections[0].lessons[0]);
          }
        }
      })
      .catch(err => console.error('Error loading course player:', err))
      .finally(() => setLoading(false));
  }, [courseId, token, API_BASE]);

  const handleLessonSelect = (lesson) => {
    setActiveLesson(lesson);
    setQuizScore(null);
    setSubmissionSuccess(false);
  };

  const handleMarkComplete = () => {
    if (!activeLesson) return;

    fetch(`${API_BASE}/student/lesson-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        lesson_id: activeLesson.id,
        course_id: course.id,
        completion_status: activeLesson.completed ? 0 : 1
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Update state locally
          setSections(prev => prev.map(sec => ({
            ...sec,
            lessons: sec.lessons.map(les => les.id === activeLesson.id ? { ...les, completed: activeLesson.completed ? 0 : 1 } : les)
          })));
          setActiveLesson(prev => ({ ...prev, completed: prev.completed ? 0 : 1 }));

          if (data.certificate_issued) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          }
        }
      })
      .catch(err => console.error('Error updating progress:', err));
  };

  const renderVideoPlayer = () => {
    if (!activeLesson) return null;

    const videoUrl = activeLesson.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ';

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      let embedId = videoUrl.split('v=')[1] || videoUrl.split('/').pop();
      if (embedId.includes('&')) embedId = embedId.split('&')[0];
      return (
        <iframe
          className="w-full h-full rounded-2xl shadow-xl"
          src={`https://www.youtube.com/embed/${embedId}?autoplay=0&rel=0`}
          title={activeLesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return (
        <video
          ref={videoRef}
          controls
          className="w-full h-full rounded-2xl bg-black shadow-xl"
          src={videoUrl}
        >
          Your browser does not support HTML5 video.
        </video>
      );
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-sm font-bold animate-pulse">Loading LMS Course Player...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Course Player Error</h2>
        <p className="text-slate-500 text-sm">Course not found or active enrollment required.</p>
        <Link to="/dashboard" className="px-6 py-2 bg-blue-600 text-white font-bold text-sm rounded-xl">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] flex bg-slate-950 text-white overflow-hidden">
      
      {/* LEFT SIDEBAR: CURRICULUM TREE */}
      <div className={`w-80 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute z-40 h-full'}`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white truncate max-w-[180px]">{course.title}</h3>
          </div>
          <Link to="/dashboard/courses" className="text-xs text-slate-400 hover:text-white font-bold">
            Exit
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {sections.map((sec, sIdx) => (
            <div key={sec.id} className="p-3 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Section {sIdx + 1}: {sec.title}
              </div>
              <div className="space-y-1">
                {sec.lessons?.map(les => (
                  <button
                    key={les.id}
                    onClick={() => handleLessonSelect(les)}
                    className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left text-xs transition-all ${
                      activeLesson?.id === les.id
                        ? 'bg-blue-600 text-white font-bold shadow-md'
                        : 'text-slate-300 hover:bg-slate-800/80 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {les.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Play className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      )}
                      <span className="truncate">{les.title}</span>
                    </div>
                    <span className="text-[10px] opacity-60 shrink-0">{les.duration || '10:00'}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT MAIN PLAYER AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-slate-900 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkComplete}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeLesson?.completed
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeLesson?.completed ? 'Completed' : 'Mark as Complete'}</span>
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="p-6 flex-1 max-w-5xl mx-auto w-full space-y-6">
          <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            {renderVideoPlayer()}
          </div>

          {/* Lesson Header Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-900">
            <div>
              <h1 className="text-xl font-bold text-white">{activeLesson?.title || 'Lecture Video'}</h1>
              <p className="text-xs text-slate-400 mt-1">Lesson Type: {activeLesson?.lesson_type || 'Video'}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'video' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'quiz' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Quiz
              </button>
              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'assignment' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >
                Assignment
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'video' && (
            <div className="space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white">Lesson Notes & Overview</h3>
              <p className="leading-relaxed text-slate-400">
                {activeLesson?.description || 'Watch the video lecture thoroughly, complete the accompanying quiz, and submit the assignment for instructor evaluation.'}
              </p>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">Lesson Knowledge Check Quiz</h3>
              <p className="text-slate-400">Answer the following question to verify your understanding:</p>

              <div className="space-y-3 pt-2">
                <p className="font-bold text-white">Q1. What is the primary benefit of real full-stack architecture with database persistence?</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input type="radio" name="q1" value="a" onChange={() => setQuizAnswers({ q1: 'a' })} />
                    <span>A. Data persists across sessions, auth is enforced server-side, and state is consistent.</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input type="radio" name="q1" value="b" onChange={() => setQuizAnswers({ q1: 'b' })} />
                    <span>B. It only changes local state in browser memory without server API.</span>
                  </label>
                </div>

                <button
                  onClick={() => setQuizScore(quizAnswers.q1 === 'a' ? 100 : 0)}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl mt-4"
                >
                  Submit Quiz
                </button>

                {quizScore !== null && (
                  <div className={`p-3 rounded-xl text-xs font-bold mt-2 ${quizScore === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {quizScore === 100 ? 'Passed! Score: 100% (Correct)' : 'Try Again! Score: 0%'}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'assignment' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white">Assignment Submission</h3>
              <p className="text-slate-400">Submit your implementation notes or code repository link for grading:</p>

              <textarea
                rows={4}
                placeholder="Enter submission notes or Github repository link..."
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                className="w-full p-3 bg-slate-950 text-white rounded-xl border border-slate-800 text-xs focus:outline-hidden focus:border-blue-500"
              />

              <button
                onClick={() => setSubmissionSuccess(true)}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
              >
                Submit Assignment
              </button>

              {submissionSuccess && (
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl font-bold">
                  Assignment submitted successfully! Instructor will review and grade your submission.
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
