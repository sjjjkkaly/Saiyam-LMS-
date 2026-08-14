import React, { useState } from 'react';
import { 
  ShieldCheck, Plus, Trash2, Edit3, Save, X, BookOpen, Video, 
  Radio, FileText, Award, Users, UserCheck, Bell, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function AdminPanelView({ 
  courses, setCourses,
  lectures, setLectures,
  liveClasses, setLiveClasses,
  notes, setNotes,
  quizzes, setQuizzes,
  students, setStudents,
  teachers, setTeachers,
  announcements, setAnnouncements
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('courses'); 
  // 'courses' | 'live' | 'notes' | 'users' | 'quizzes' | 'announcements'

  // Modal State for Adding / Editing items
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddLiveModal, setShowAddLiveModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Form states
  const [newCourse, setNewCourse] = useState({
    title: '', subject: 'Accounts', classLevel: '12', instructor: 'CA Saiyam Gupta', description: ''
  });

  const [newLive, setNewLive] = useState({
    title: '', subject: 'Accounts', classLevel: '12', instructor: 'CA Saiyam Gupta', startTime: 'Today, 7:00 PM IST', status: 'UPCOMING'
  });

  const [newNote, setNewNote] = useState({
    title: '', subject: 'Accounts', classLevel: '12', author: 'CA Saiyam Gupta', contentPreview: ''
  });

  const [newUser, setNewUser] = useState({
    name: '', role: 'Student', classLevel: '12', batch: 'Batch 12-A', email: '', subject: 'Accounts'
  });

  // Handlers
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title) return;
    const courseObj = {
      id: `c-${Date.now()}`,
      ...newCourse,
      rating: 5.0,
      enrolledCount: 1,
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      duration: "50 Hours",
      totalLectures: 12,
      chapters: [{ id: "ch-1", title: "Chapter 1 Introduction", lecturesCount: 5 }]
    };
    setCourses([courseObj, ...courses]);
    setNewCourse({ title: '', subject: 'Accounts', classLevel: '12', instructor: 'CA Saiyam Gupta', description: '' });
    setShowAddCourseModal(false);
    alert('Course added successfully to LMS!');
  };

  const handleDeleteCourse = (id) => {
    if (confirm('Are you sure you want to remove this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleCreateLive = (e) => {
    e.preventDefault();
    if (!newLive.title) return;
    const liveObj = {
      id: `live-${Date.now()}`,
      ...newLive,
      viewerCount: 0,
      bannerImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      description: "Scheduled live stream by faculty."
    };
    setLiveClasses([liveObj, ...liveClasses]);
    setShowAddLiveModal(false);
    alert('Live stream scheduled successfully!');
  };

  const handleDeleteLive = (id) => {
    setLiveClasses(liveClasses.filter(l => l.id !== id));
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newNote.title) return;
    const noteObj = {
      id: `note-${Date.now()}`,
      ...newNote,
      pages: 20,
      fileSize: "3.5 MB",
      downloads: 0,
      tags: [newNote.subject]
    };
    setNotes([noteObj, ...notes]);
    setShowAddNoteModal(false);
    alert('Handwritten note added to Resource Center!');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name) return;
    if (newUser.role === 'Student') {
      const std = {
        id: `std-${Date.now()}`,
        name: newUser.name,
        classLevel: newUser.classLevel,
        batch: newUser.batch,
        email: newUser.email || `${newUser.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        enrolledCourses: ["c12-acc-01"],
        attendance: "100%",
        scoreAvg: "95%"
      };
      setStudents([...students, std]);
    } else {
      const tch = {
        id: `tch-${Date.now()}`,
        name: newUser.name,
        subject: newUser.subject,
        classesHandled: `Class ${newUser.classLevel}`,
        email: newUser.email || `${newUser.name.toLowerCase().replace(/\s+/g, '')}@saiyamclasses.edu`,
        status: "Active Faculty"
      };
      setTeachers([...teachers, tch]);
    }
    setShowAddUserModal(false);
    alert(`${newUser.role} created and assigned!`);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white font-heading">Saiyam Classes Admin Control Center</h1>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded border border-purple-500/30">
                Full CRUD Access
              </span>
            </div>
            <p className="text-xs text-slate-300">Manage Courses, Live Streams, Notes, Quizzes, Teachers & Students</p>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'live', label: `Live Streams (${liveClasses.length})`, icon: Radio },
          { id: 'notes', label: `Notes & PDFs (${notes.length})`, icon: FileText },
          { id: 'users', label: `Students & Teachers (${students.length + teachers.length})`, icon: Users },
          { id: 'quizzes', label: `Quizzes (${quizzes.length})`, icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition ${
                isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Manage Courses */}
      {activeAdminTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-100">All Courses</h3>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                    Class {c.classLevel} {c.subject}
                  </span>
                  <h4 className="font-bold text-sm text-slate-100">{c.title}</h4>
                  <p className="text-xs text-slate-400">Instructor: {c.instructor} • {c.totalLectures} Lectures</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteCourse(c.id)}
                    className="p-2 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Manage Live Streams */}
      {activeAdminTab === 'live' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-100">Live Classes Schedule</h3>
            <button
              onClick={() => setShowAddLiveModal(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Live Stream</span>
            </button>
          </div>

          <div className="space-y-3">
            {liveClasses.map(live => (
              <div key={live.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded">
                    {live.status}
                  </span>
                  <h4 className="font-bold text-sm text-slate-100 mt-1">{live.title}</h4>
                  <p className="text-xs text-slate-400">Class {live.classLevel} {live.subject} • {live.startTime}</p>
                </div>

                <button
                  onClick={() => handleDeleteLive(live.id)}
                  className="p-2 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Manage Notes */}
      {activeAdminTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-100">Notes & E-Books Catalog</h3>
            <button
              onClick={() => setShowAddNoteModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New PDF Note</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map(note => (
              <div key={note.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                    Class {note.classLevel} {note.subject}
                  </span>
                  <h4 className="font-bold text-sm text-slate-100 mt-1">{note.title}</h4>
                  <p className="text-xs text-slate-400">{note.pages} Pages • Author: {note.author}</p>
                </div>

                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-2 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Manage Students & Teachers */}
      {activeAdminTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-100">Student & Teacher Directory</h3>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Register New User / Assign Batch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Students list */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-amber-400">Enrolled Students ({students.length})</h4>
              <div className="space-y-2">
                {students.map(s => (
                  <div key={s.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-100">{s.name}</h5>
                      <p className="text-[10px] text-slate-400">Class {s.classLevel} • {s.batch}</p>
                    </div>
                    <button onClick={() => handleDeleteStudent(s.id)} className="text-red-400 hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Teachers list */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-emerald-400">Assigned Faculty ({teachers.length})</h4>
              <div className="space-y-2">
                {teachers.map(t => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-100">{t.name}</h5>
                      <p className="text-[10px] text-slate-400">Subject: {t.subject} ({t.classesHandled})</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Add Course */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCourse} className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-amber-500/40 space-y-4">
            <h3 className="font-bold text-lg text-slate-100">Add New Course to LMS</h3>
            <input
              type="text"
              placeholder="Course Title (e.g. Class 12 Partnership Masterclass)"
              value={newCourse.title}
              onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
              required
            />
            <div className="grid grid-cols-2 gap-3 text-xs">
              <select
                value={newCourse.subject}
                onChange={e => setNewCourse({ ...newCourse, subject: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              >
                <option value="Accounts">Accounts</option>
                <option value="Maths">Maths</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Economics">Economics</option>
              </select>
              <select
                value={newCourse.classLevel}
                onChange={e => setNewCourse({ ...newCourse, classLevel: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Instructor Name"
              value={newCourse.instructor}
              onChange={e => setNewCourse({ ...newCourse, instructor: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
            />
            <textarea
              placeholder="Course description..."
              value={newCourse.description}
              onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white h-24"
            />
            <div className="flex items-center justify-end space-x-3">
              <button type="button" onClick={() => setShowAddCourseModal(false)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">Create Course</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 2: Add Live Stream */}
      {showAddLiveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateLive} className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-red-500/40 space-y-4">
            <h3 className="font-bold text-lg text-slate-100">Schedule Live Stream</h3>
            <input
              type="text"
              placeholder="Stream Title (e.g. Class 12 Calculus Integration Workshop)"
              value={newLive.title}
              onChange={e => setNewLive({ ...newLive, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
              required
            />
            <div className="grid grid-cols-2 gap-3 text-xs">
              <select
                value={newLive.subject}
                onChange={e => setNewLive({ ...newLive, subject: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              >
                <option value="Accounts">Accounts</option>
                <option value="Maths">Maths</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Economics">Economics</option>
              </select>
              <select
                value={newLive.classLevel}
                onChange={e => setNewLive({ ...newLive, classLevel: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Start Time (e.g. Tomorrow, 6:00 PM IST)"
              value={newLive.startTime}
              onChange={e => setNewLive({ ...newLive, startTime: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
            />
            <div className="flex items-center justify-end space-x-3">
              <button type="button" onClick={() => setShowAddLiveModal(false)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-red-600 text-white font-bold text-xs rounded-xl">Schedule Stream</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal 3: Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-purple-500/40 space-y-4">
            <h3 className="font-bold text-lg text-slate-100">Register New User / Faculty</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
              required
            />
            <div className="grid grid-cols-2 gap-3 text-xs">
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher / Faculty</option>
              </select>
              <select
                value={newUser.classLevel}
                onChange={e => setNewUser({ ...newUser, classLevel: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
            />
            <div className="flex items-center justify-end space-x-3">
              <button type="button" onClick={() => setShowAddUserModal(false)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl">Register & Assign</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
