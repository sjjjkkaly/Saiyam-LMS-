import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';
import {
  PlusCircle,
  BookOpen,
  Users,
  DollarSign,
  Star,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  Plus,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function InstructorDashboardPage() {
  const { token, API_BASE, user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'create'

  const [metrics, setMetrics] = useState(null);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for Course Creation
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [courseLevel, setCourseLevel] = useState('All Levels');
  const [thumbnail, setThumbnail] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [outcomesInput, setOutcomesInput] = useState('');
  const [formMsg, setFormMsg] = useState('');

  // Course Section / Lesson Builder state
  const [createdCourseId, setCreatedCourseId] = useState(null);
  const [sectionTitle, setSectionTitle] = useState('');
  const [sections, setSections] = useState([]);

  // Lesson Form
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonDuration, setLessonDuration] = useState('10:00');
  const [lessonPreview, setLessonPreview] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/instructor/overview`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/instructor/courses`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/categories`).then(res => res.json())
    ])
      .then(([ovData, crsData, catData]) => {
        setMetrics(ovData.metrics || {});
        setCourses(crsData.courses || []);
        setCategories(catData.categories || []);
      })
      .catch(err => console.error('Error loading instructor portal:', err))
      .finally(() => setLoading(false));
  }, [token, API_BASE]);

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!title) return;

    const reqs = requirementsInput.split('\n').filter(r => r.trim());
    const outcomes = outcomesInput.split('\n').filter(o => o.trim());

    fetch(`${API_BASE}/instructor/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        short_description: shortDesc,
        full_description: fullDesc,
        category_id: categoryId ? parseInt(categoryId) : null,
        price: parseFloat(price) || 0,
        sale_price: parseFloat(salePrice) || 0,
        course_level: courseLevel,
        thumbnail,
        requirements: reqs,
        learning_outcomes: outcomes
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.course_id) {
          setCreatedCourseId(data.course_id);
          setFormMsg('Course basic details saved! Now add sections and lessons below.');
          // Refresh course list
          fetch(`${API_BASE}/instructor/courses`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json())
            .then(cData => setCourses(cData.courses || []));
        }
      })
      .catch(() => setFormMsg('Error saving course.'));
  };

  const handleAddSection = () => {
    if (!sectionTitle || !createdCourseId) return;

    fetch(`${API_BASE}/instructor/courses/${createdCourseId}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: sectionTitle })
    })
      .then(res => res.json())
      .then(data => {
        if (data.section_id) {
          setSections(prev => [...prev, { id: data.section_id, title: sectionTitle, lessons: [] }]);
          setSectionTitle('');
        }
      });
  };

  const handleAddLesson = (sectionId) => {
    if (!lessonTitle) return;

    fetch(`${API_BASE}/instructor/sections/${sectionId}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: lessonTitle,
        video_url: lessonVideoUrl,
        duration: lessonDuration,
        preview_enabled: lessonPreview
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.lesson_id) {
          setSections(prev => prev.map(sec => sec.id === sectionId ? {
            ...sec,
            lessons: [...(sec.lessons || []), { id: data.lesson_id, title: lessonTitle, duration: lessonDuration }]
          } : sec));
          setLessonTitle('');
          setLessonVideoUrl('');
          setActiveSectionId(null);
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Instructor Portal</h1>
          <p className="text-slate-500 text-sm">Create, publish, and manage your online courses.</p>
        </div>
        <button
          onClick={() => setActiveTab(activeTab === 'create' ? 'courses' : 'create')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{activeTab === 'create' ? 'View My Courses' : 'Create New Course'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Courses</span>
          <p className="text-2xl font-black text-slate-900">{metrics?.totalCourses || 0}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Students</span>
          <p className="text-2xl font-black text-blue-600">{metrics?.totalStudents || 0}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Earnings</span>
          <p className="text-2xl font-black text-emerald-600">₹{metrics?.totalEarnings || 0}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Average Rating</span>
          <p className="text-2xl font-black text-amber-500">{metrics?.averageRating || 4.8} / 5</p>
        </div>
      </div>

      {/* VIEW 1: MY COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">My Course Roster</h2>
          {courses.length === 0 ? (
            <EmptyState
              title="No courses created yet"
              description="Click 'Create New Course' to open the course builder wizard and build your curriculum."
              actionText="Build First Course"
              onAction={() => setActiveTab('create')}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100">
                {courses.map(crs => (
                  <div key={crs.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                        <img
                          src={crs.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                          alt={crs.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{crs.title}</h3>
                        <p className="text-slate-500">{crs.course_level} • Price: ₹{crs.sale_price > 0 ? crs.sale_price : crs.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 font-bold rounded-full text-[10px] ${
                        crs.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        crs.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {crs.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: COURSE BUILDER WIZARD */}
      {activeTab === 'create' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Multi-Step Course Builder</h2>
            <p className="text-xs text-slate-500 mt-1">Configure basic metadata, basic requirements, and construct section/lesson tree.</p>
          </div>

          <form onSubmit={handleCreateCourse} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Full Stack Web Architecture"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                >
                  <option value="">Select Domain Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Short Description</label>
              <input
                type="text"
                placeholder="Brief high-level summary for course card..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Regular Price (₹)</label>
                <input
                  type="number"
                  placeholder="1999"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Sale Price (₹)</label>
                <input
                  type="number"
                  placeholder="999"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Difficulty Level</label>
                <select
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Thumbnail Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            {formMsg && <p className="text-xs font-bold text-emerald-600">{formMsg}</p>}

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Save Basic Details & Enable Section Builder
            </button>
          </form>

          {/* Section & Lesson Builder */}
          {createdCourseId && (
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="text-base font-bold text-slate-900">Curriculum Builder (Sections & Lessons)</h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Section Title (e.g. Introduction to React Architecture)"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200"
                />
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Add Section
                </button>
              </div>

              {sections.map(sec => (
                <div key={sec.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                    <span>Section: {sec.title}</span>
                    <button
                      onClick={() => setActiveSectionId(sec.id)}
                      className="text-blue-600 hover:underline"
                    >
                      + Add Lesson
                    </button>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-1">
                    {sec.lessons?.map(les => (
                      <div key={les.id} className="p-2 bg-white rounded-lg border border-slate-200 text-xs flex justify-between">
                        <span>{les.title}</span>
                        <span className="text-slate-400">{les.duration}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Lesson Modal/Form */}
                  {activeSectionId === sec.id && (
                    <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-2">
                      <input
                        type="text"
                        placeholder="Lesson Title"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 text-slate-900 text-xs rounded-lg border border-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Video Embed URL (YouTube or MP4)"
                        value={lessonVideoUrl}
                        onChange={(e) => setLessonVideoUrl(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 text-slate-900 text-xs rounded-lg border border-slate-200"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleAddLesson(sec.id)}
                          className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg"
                        >
                          Save Lesson
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
