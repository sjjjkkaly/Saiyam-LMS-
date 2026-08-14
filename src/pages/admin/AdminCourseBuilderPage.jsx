import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  HelpCircle,
  Clock,
  Lock,
  PlayCircle,
  Sparkles,
  Upload,
  UserPlus,
  Award,
  Layers,
  Tag,
  Calendar,
  BookOpen
} from 'lucide-react';

export default function AdminCourseBuilderPage() {
  const { id: editCourseId } = useParams();
  const { token, API_BASE, user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState('basic'); // 'basic', 'outcomes', 'curriculum', 'pricing', 'access', 'certificate', 'instructor'
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Categories & Instructors & All Courses list
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  // STEP 1: Basic Info
  const [courseId, setCourseId] = useState(editCourseId || null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [courseLevel, setCourseLevel] = useState('All Levels');
  const [language, setLanguage] = useState('English');
  const [duration, setDuration] = useState('10 Hours');
  const [thumbnail, setThumbnail] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  // STEP 2: Outcomes & Requirements
  const [outcomes, setOutcomes] = useState(['Learn complete full stack web architecture', 'Deploy applications to production']);
  const [requirements, setRequirements] = useState(['Basic computer literacy', 'No programming experience needed']);
  const [newOutcomeInput, setNewOutcomeInput] = useState('');
  const [newReqInput, setNewReqInput] = useState('');

  // STEP 3: Curriculum Structure (Sections -> Lessons / Quizzes / Assignments)
  const [sections, setSections] = useState([
    {
      id: 'sec-1',
      title: 'Section 1: Course Foundations',
      collapsed: false,
      lessons: [
        {
          id: 'les-1',
          title: 'Lesson 1: Welcome & Course Roadmap',
          slug: 'welcome-roadmap',
          description: 'Introduction to course objectives.',
          video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          video_provider: 'youtube',
          lesson_type: 'Video',
          duration: '05:20',
          preview_enabled: true,
          downloadable: false,
          required_completion: true,
          drip_type: 'immediately',
          drip_value: '',
          resources: []
        }
      ],
      quizzes: [],
      assignments: []
    }
  ]);

  // Modals state for adding Lesson/Quiz/Assignment
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);

  // Lesson Form State
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonProvider, setLessonProvider] = useState('youtube');
  const [lessonType, setLessonType] = useState('Video');
  const [lessonDuration, setLessonDuration] = useState('10:00');
  const [lessonPreview, setLessonPreview] = useState(false);

  // Quiz Form State
  const [quizTitle, setQuizTitle] = useState('');
  const [quizTimeLimit, setQuizTimeLimit] = useState('15');
  const [quizPassingScore, setQuizPassingScore] = useState('60');

  // Assignment Form State
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentInstructions, setAssignmentInstructions] = useState('');
  const [assignmentMaxMarks, setAssignmentMaxMarks] = useState('100');

  // STEP 4: Pricing & Coupons
  const [isPaid, setIsPaid] = useState(true);
  const [price, setPrice] = useState('1999');
  const [salePrice, setSalePrice] = useState('999');
  const [allowCoupons, setAllowCoupons] = useState(true);

  // STEP 5: Access, Drip & Prerequisites
  const [accessType, setAccessType] = useState('lifetime');
  const [accessDays, setAccessDays] = useState('365');
  const [enrollmentType, setEnrollmentType] = useState('open');
  const [prerequisiteCourseId, setPrerequisiteCourseId] = useState('');

  // STEP 6: Certificate Settings
  const [certificateEnabled, setCertificateEnabled] = useState(true);
  const [certMinCompletion, setCertMinCompletion] = useState('100');
  const [certMinQuizScore, setCertMinQuizScore] = useState('60');

  // STEP 7: Instructor Assignment
  const [instructorId, setInstructorId] = useState('');
  const [status, setStatus] = useState('Draft');

  // Fetch Dropdown Options & Existing Course (if Edit Mode)
  useEffect(() => {
    if (!token) return;

    Promise.all([
      fetch(`${API_BASE}/categories`).then(res => res.json()),
      fetch(`${API_BASE}/instructors`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/courses`).then(res => res.json())
    ])
      .then(([catData, instData, crsData]) => {
        setCategories(catData.categories || []);
        setInstructors(instData.instructors || []);
        setAllCourses(crsData.courses || []);
        if (instData.instructors?.length > 0 && !instructorId) {
          setInstructorId(instData.instructors[0].id);
        }
      });

    if (editCourseId) {
      fetch(`${API_BASE}/admin/courses/${editCourseId}/full`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.course) {
            const c = data.course;
            setCourseId(c.id);
            setTitle(c.title || '');
            setSlug(c.slug || '');
            setShortDesc(c.short_description || '');
            setFullDesc(c.full_description || '');
            setCategoryId(c.category_id || '');
            setInstructorId(c.instructor_id || '');
            setPrice(c.price || 0);
            setSalePrice(c.sale_price || 0);
            setIsPaid(c.price > 0 || c.sale_price > 0);
            setCourseLevel(c.course_level || 'All Levels');
            setLanguage(c.language || 'English');
            setDuration(c.duration || '');
            setThumbnail(c.thumbnail || '');
            setFeaturedImage(c.featured_image || '');
            setOutcomes(c.learning_outcomes || []);
            setRequirements(c.requirements || []);
            setAllowCoupons(!!c.allow_coupons);
            setAccessType(c.access_type || 'lifetime');
            setAccessDays(c.access_days || 365);
            setEnrollmentType(c.enrollment_type || 'open');
            setPrerequisiteCourseId(c.prerequisite_course_id || '');
            setCertificateEnabled(!!c.certificate_enabled);
            setCertMinCompletion(c.certificate_min_completion || 100);
            setCertMinQuizScore(c.certificate_min_quiz_score || 60);
            setStatus(c.status || 'Draft');
            if (c.sections && c.sections.length > 0) {
              setSections(c.sections);
            }
          }
        });
    }
  }, [editCourseId, token, API_BASE]);

  // Title Auto-Slug generator
  const handleTitleChange = (val) => {
    setTitle(val);
    setSaveStatus('unsaved');
    if (!editCourseId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  // Section Handlers
  const handleAddSection = () => {
    const newSec = {
      id: 'sec-' + Date.now(),
      title: `Section ${sections.length + 1}: New Curriculum Section`,
      collapsed: false,
      lessons: [],
      quizzes: [],
      assignments: []
    };
    setSections([...sections, newSec]);
    setSaveStatus('unsaved');
  };

  const handleUpdateSectionTitle = (secId, newTitle) => {
    setSections(sections.map(s => s.id === secId ? { ...s, title: newTitle } : s));
    setSaveStatus('unsaved');
  };

  const handleDeleteSection = (secId) => {
    setSections(sections.filter(s => s.id !== secId));
    setSaveStatus('unsaved');
  };

  const handleMoveSection = (idx, direction) => {
    const newSecs = [...sections];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newSecs.length) return;
    const temp = newSecs[idx];
    newSecs[idx] = newSecs[targetIdx];
    newSecs[targetIdx] = temp;
    setSections(newSecs);
    setSaveStatus('unsaved');
  };

  // Lesson Handlers
  const handleSaveLessonModal = () => {
    if (!lessonTitle || !activeSectionId) return;

    const newLesson = {
      id: 'les-' + Date.now(),
      title: lessonTitle,
      slug: lessonTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      video_url: lessonVideoUrl,
      video_provider: lessonProvider,
      lesson_type: lessonType,
      duration: lessonDuration || '10:00',
      preview_enabled: lessonPreview,
      downloadable: false,
      required_completion: true,
      drip_type: 'immediately',
      drip_value: '',
      resources: []
    };

    setSections(sections.map(sec => sec.id === activeSectionId ? {
      ...sec,
      lessons: [...(sec.lessons || []), newLesson]
    } : sec));

    setLessonTitle('');
    setLessonVideoUrl('');
    setLessonModalOpen(false);
    setSaveStatus('unsaved');
  };

  // Quiz Handler
  const handleSaveQuizModal = () => {
    if (!quizTitle || !activeSectionId) return;

    const newQuiz = {
      id: 'qz-' + Date.now(),
      title: quizTitle,
      time_limit_minutes: parseInt(quizTimeLimit) || 15,
      passing_score: parseFloat(quizPassingScore) || 60,
      randomize_questions: 0,
      questions: [
        {
          id: 1,
          question: 'Sample Question 1',
          options: ['Option A', 'Option B', 'Option C'],
          correct_answer: 'Option A',
          marks: 1
        }
      ]
    };

    setSections(sections.map(sec => sec.id === activeSectionId ? {
      ...sec,
      quizzes: [...(sec.quizzes || []), newQuiz]
    } : sec));

    setQuizTitle('');
    setQuizModalOpen(false);
    setSaveStatus('unsaved');
  };

  // Assignment Handler
  const handleSaveAssignmentModal = () => {
    if (!assignmentTitle || !activeSectionId) return;

    const newAssignment = {
      id: 'asg-' + Date.now(),
      title: assignmentTitle,
      instructions: assignmentInstructions || 'Complete implementation according to guidelines.',
      max_marks: parseFloat(assignmentMaxMarks) || 100,
      submission_type: 'both'
    };

    setSections(sections.map(sec => sec.id === activeSectionId ? {
      ...sec,
      assignments: [...(sec.assignments || []), newAssignment]
    } : sec));

    setAssignmentTitle('');
    setAssignmentInstructions('');
    setAssignmentModalOpen(false);
    setSaveStatus('unsaved');
  };

  // Save Full Course API Handler
  const handleSaveCourse = (newStatus = status) => {
    if (!title) {
      setValidationErrors(['Course Title is required before saving.']);
      return;
    }

    setSaveStatus('saving');
    setValidationErrors([]);

    const payload = {
      id: courseId,
      title,
      slug,
      short_description: shortDesc,
      full_description: fullDesc,
      category_id: categoryId ? parseInt(categoryId) : null,
      instructor_id: instructorId ? parseInt(instructorId) : (user?.id || 1),
      price: isPaid ? parseFloat(price) || 0 : 0,
      sale_price: isPaid ? parseFloat(salePrice) || 0 : 0,
      course_level: courseLevel,
      language,
      duration,
      thumbnail,
      featured_image: featuredImage,
      requirements,
      learning_outcomes: outcomes,
      allow_coupons: allowCoupons,
      access_type: accessType,
      access_days: parseInt(accessDays) || 365,
      enrollment_type: enrollmentType,
      prerequisite_course_id: prerequisiteCourseId ? parseInt(prerequisiteCourseId) : null,
      certificate_enabled: certificateEnabled,
      certificate_min_completion: parseFloat(certMinCompletion) || 100,
      certificate_min_quiz_score: parseFloat(certMinQuizScore) || 60,
      visibility: 'Public',
      featured: 1,
      reviews_enabled: 1,
      qna_enabled: 1,
      status: newStatus,
      sections
    };

    fetch(`${API_BASE}/admin/courses/full-save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.course_id) {
          setCourseId(data.course_id);
          setStatus(newStatus);
          setSaveStatus('saved');
        } else {
          setValidationErrors([data.error || 'Failed to save course.']);
          setSaveStatus('unsaved');
        }
      })
      .catch(() => {
        setValidationErrors(['Network error saving course.']);
        setSaveStatus('unsaved');
      });
  };

  // Pre-Publish Validation Check
  const handlePublishValidation = () => {
    const errors = [];
    if (!title.trim()) errors.push('Course title is missing.');
    if (!shortDesc.trim()) errors.push('Short description is missing.');
    if (!categoryId) errors.push('Course domain category must be selected.');
    if (!thumbnail.trim()) errors.push('Course thumbnail image URL is missing.');
    if (sections.length === 0) errors.push('Curriculum must contain at least 1 section.');
    
    let totalLessons = 0;
    sections.forEach(s => totalLessons += (s.lessons?.length || 0));
    if (totalLessons === 0) errors.push('Curriculum must contain at least 1 lesson video.');

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      handleSaveCourse('Published');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* 1. STICKY TOP ACTION BAR */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/courses')}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors"
            title="Back to Courses Roster"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Visual LMS Course Builder</span>
            <h1 className="text-base font-bold text-white truncate max-w-xs sm:max-w-md">
              {title || 'Untitled Course'}
            </h1>
          </div>
        </div>

        {/* Save & Publish Action Controls */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 mr-2">
            {saveStatus === 'saving' && <span className="text-amber-400 animate-pulse">Saving...</span>}
            {saveStatus === 'saved' && <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Saved to DB</span>}
            {saveStatus === 'unsaved' && <span className="text-rose-400">Unsaved changes</span>}
          </span>

          <button
            onClick={() => setPreviewOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => handleSaveCourse('Draft')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          {status === 'Published' ? (
            <button
              onClick={() => handleSaveCourse('Draft')}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublishValidation}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Course</span>
            </button>
          )}
        </div>
      </header>

      {/* Validation Banner */}
      {validationErrors.length > 0 && (
        <div className="bg-rose-500 text-white px-6 py-3 text-xs font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Course Cannot Be Published Yet: {validationErrors.join(' • ')}</span>
          </div>
          <button onClick={() => setValidationErrors([])} className="underline text-white font-bold">Dismiss</button>
        </div>
      )}

      {/* 2. MAIN BUILDER BODY */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* STEPPER NAVIGATION SIDEBAR */}
        <aside className="w-64 shrink-0 space-y-2">
          {[
            { id: 'basic', label: '1. Basic Information', icon: Layers },
            { id: 'outcomes', label: '2. Outcomes & Requirements', icon: CheckCircle2 },
            { id: 'curriculum', label: '3. Visual Curriculum', icon: BookOpen },
            { id: 'pricing', label: '4. Pricing & Coupons', icon: Tag },
            { id: 'access', label: '5. Access & Drip Content', icon: Clock },
            { id: 'certificate', label: '6. Certificate Settings', icon: Award },
            { id: 'instructor', label: '7. Instructor Assignment', icon: UserPlus }
          ].map(step => {
            const StepIcon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-xs font-bold rounded-2xl text-left transition-all ${
                  activeStep === step.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/80'
                }`}
              >
                <StepIcon className="w-4 h-4 shrink-0" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </aside>

        {/* CONTENT PANEL AREA */}
        <main className="flex-1 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 min-h-[600px]">
          
          {/* STEP 1: BASIC INFORMATION */}
          {activeStep === 'basic' && (
            <div className="space-y-6 text-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                1. Basic Course Details
              </h2>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Course Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Complete Full Stack Web Development Architecture"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 text-slate-900 font-bold text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Course Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full px-4 py-2.5 bg-slate-50 text-slate-700 font-mono text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Short Description *</label>
                <textarea
                  rows={2}
                  placeholder="Brief 1-2 sentence overview for course card..."
                  value={shortDesc}
                  onChange={(e) => { setShortDesc(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full p-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Full Description (Formatted Text)</label>
                <textarea
                  rows={6}
                  placeholder="Detailed course description, topics covered, target audience..."
                  value={fullDesc}
                  onChange={(e) => { setFullDesc(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full p-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Category Domain *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => { setCategoryId(e.target.value); setSaveStatus('unsaved'); }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                  >
                    <option value="">Select Domain</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Difficulty Level</label>
                  <select
                    value={courseLevel}
                    onChange={(e) => { setCourseLevel(e.target.value); setSaveStatus('unsaved'); }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Estimated Duration</label>
                  <input
                    type="text"
                    placeholder="12 Hours"
                    value={duration}
                    onChange={(e) => { setDuration(e.target.value); setSaveStatus('unsaved'); }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-medium rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Thumbnail Image URL *</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={thumbnail}
                  onChange={(e) => { setThumbnail(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-medium rounded-xl border border-slate-200"
                />
                {thumbnail && (
                  <div className="w-40 h-24 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 mt-2">
                    <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: LEARNING OUTCOMES & REQUIREMENTS */}
          {activeStep === 'outcomes' && (
            <div className="space-y-6 text-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                2. What Students Will Learn & Prerequisites
              </h2>

              <div className="space-y-3">
                <label className="font-bold text-slate-700 block">What Students Will Learn</label>
                <div className="space-y-2">
                  {outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...outcomes];
                          updated[idx] = e.target.value;
                          setOutcomes(updated);
                          setSaveStatus('unsaved');
                        }}
                        className="flex-1 px-3.5 py-2 bg-slate-50 text-slate-900 font-medium rounded-xl border border-slate-200"
                      />
                      <button
                        onClick={() => {
                          setOutcomes(outcomes.filter((_, i) => i !== idx));
                          setSaveStatus('unsaved');
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add learning outcome (e.g. Master React Hooks and State Architecture)"
                    value={newOutcomeInput}
                    onChange={(e) => setNewOutcomeInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200"
                  />
                  <button
                    onClick={() => {
                      if (newOutcomeInput.trim()) {
                        setOutcomes([...outcomes, newOutcomeInput.trim()]);
                        setNewOutcomeInput('');
                        setSaveStatus('unsaved');
                      }
                    }}
                    className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl"
                  >
                    + Add Outcome
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <label className="font-bold text-slate-700 block">Requirements & Prerequisites</label>
                <div className="space-y-2">
                  {requirements.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...requirements];
                          updated[idx] = e.target.value;
                          setRequirements(updated);
                          setSaveStatus('unsaved');
                        }}
                        className="flex-1 px-3.5 py-2 bg-slate-50 text-slate-900 font-medium rounded-xl border border-slate-200"
                      />
                      <button
                        onClick={() => {
                          setRequirements(requirements.filter((_, i) => i !== idx));
                          setSaveStatus('unsaved');
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add requirement (e.g. Basic JavaScript understanding)"
                    value={newReqInput}
                    onChange={(e) => setNewReqInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200"
                  />
                  <button
                    onClick={() => {
                      if (newReqInput.trim()) {
                        setRequirements([...requirements, newReqInput.trim()]);
                        setNewReqInput('');
                        setSaveStatus('unsaved');
                      }
                    }}
                    className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl"
                  >
                    + Add Requirement
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: VISUAL CURRICULUM BUILDER */}
          {activeStep === 'curriculum' && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">3. Visual Curriculum Builder</h2>
                  <p className="text-slate-500 text-[11px]">Organize sections, lesson videos, quizzes, and project assignments.</p>
                </div>
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Section</span>
                </button>
              </div>

              {sections.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-slate-500 font-bold mb-3">No curriculum sections added yet.</p>
                  <button onClick={handleAddSection} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl">
                    Add First Section
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sections.map((sec, sIdx) => (
                    <div key={sec.id} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      
                      {/* Section Header Controls */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={sec.title}
                            onChange={(e) => handleUpdateSectionTitle(sec.id, e.target.value)}
                            className="w-full px-3 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-xl border border-slate-200 focus:border-blue-500"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <button onClick={() => handleMoveSection(sIdx, 'up')} className="p-1.5 bg-white text-slate-600 hover:bg-slate-200 rounded-lg">
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleMoveSection(sIdx, 'down')} className="p-1.5 bg-white text-slate-600 hover:bg-slate-200 rounded-lg">
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteSection(sec.id)} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Items under Section */}
                      <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                        {/* Lessons */}
                        {sec.lessons?.map(les => (
                          <div key={les.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-blue-600" />
                              <span className="font-bold text-slate-900">{les.title}</span>
                              {les.preview_enabled && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md">Free Preview</span>}
                            </div>
                            <span className="text-slate-400 font-medium">{les.duration || '10:00'}</span>
                          </div>
                        ))}

                        {/* Quizzes */}
                        {sec.quizzes?.map(qz => (
                          <div key={qz.id} className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <HelpCircle className="w-4 h-4 text-purple-600" />
                              <span className="font-bold text-purple-900">Quiz: {qz.title}</span>
                            </div>
                            <span className="text-purple-600 font-medium">{qz.time_limit_minutes} Mins</span>
                          </div>
                        ))}

                        {/* Assignments */}
                        {sec.assignments?.map(asg => (
                          <div key={asg.id} className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-amber-600" />
                              <span className="font-bold text-amber-900">Assignment: {asg.title}</span>
                            </div>
                            <span className="text-amber-600 font-medium">Max {asg.max_marks} Marks</span>
                          </div>
                        ))}
                      </div>

                      {/* Add Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => { setActiveSectionId(sec.id); setLessonModalOpen(true); }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-[11px] rounded-xl hover:bg-blue-100"
                        >
                          + Add Lesson Video
                        </button>
                        <button
                          onClick={() => { setActiveSectionId(sec.id); setQuizModalOpen(true); }}
                          className="px-3 py-1.5 bg-purple-50 text-purple-700 font-bold text-[11px] rounded-xl hover:bg-purple-100"
                        >
                          + Add Quiz
                        </button>
                        <button
                          onClick={() => { setActiveSectionId(sec.id); setAssignmentModalOpen(true); }}
                          className="px-3 py-1.5 bg-amber-50 text-amber-700 font-bold text-[11px] rounded-xl hover:bg-amber-100"
                        >
                          + Add Assignment
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PRICING & COUPONS */}
          {activeStep === 'pricing' && (
            <div className="space-y-6 text-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                4. Pricing & Coupon Settings
              </h2>

              <div className="space-y-3">
                <label className="font-bold text-slate-700 block">Course Pricing Model</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 font-bold text-slate-900 cursor-pointer">
                    <input type="radio" name="isPaid" checked={!isPaid} onChange={() => setIsPaid(false)} />
                    <span>Free Course</span>
                  </label>
                  <label className="flex items-center gap-2 font-bold text-slate-900 cursor-pointer">
                    <input type="radio" name="isPaid" checked={isPaid} onChange={() => setIsPaid(true)} />
                    <span>Paid Course</span>
                  </label>
                </div>
              </div>

              {isPaid && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Regular Price (INR ₹) *</label>
                    <input
                      type="number"
                      placeholder="1999"
                      value={price}
                      onChange={(e) => { setPrice(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Sale Price (INR ₹)</label>
                    <input
                      type="number"
                      placeholder="999"
                      value={salePrice}
                      onChange={(e) => { setSalePrice(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-3 text-slate-900 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCoupons}
                    onChange={(e) => { setAllowCoupons(e.target.checked); setSaveStatus('unsaved'); }}
                  />
                  <span>Allow Platform Coupon Code Discounts</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: ACCESS & DRIP CONTENT */}
          {activeStep === 'access' && (
            <div className="space-y-6 text-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                5. Access Duration & Prerequisites
              </h2>

              <div className="space-y-3">
                <label className="font-bold text-slate-700 block">Access Duration</label>
                <select
                  value={accessType}
                  onChange={(e) => { setAccessType(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                >
                  <option value="lifetime">Lifetime Unlimited Access</option>
                  <option value="fixed_days">Fixed Duration Access (Days)</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="font-bold text-slate-700 block">Prerequisite Required Course</label>
                <select
                  value={prerequisiteCourseId}
                  onChange={(e) => { setPrerequisiteCourseId(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                >
                  <option value="">No Prerequisite Required</option>
                  {allCourses.filter(c => c.id !== courseId).map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 6: CERTIFICATE SETTINGS */}
          {activeStep === 'certificate' && (
            <div className="space-y-6 text-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                6. Verified Certificate Settings
              </h2>

              <label className="flex items-center gap-3 text-slate-900 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={certificateEnabled}
                  onChange={(e) => { setCertificateEnabled(e.target.checked); setSaveStatus('unsaved'); }}
                />
                <span>Auto-issue Official Saiyam Jain Certificate upon Completion</span>
              </label>

              {certificateEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Minimum Course Completion %</label>
                    <input
                      type="number"
                      value={certMinCompletion}
                      onChange={(e) => { setCertMinCompletion(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block">Minimum Quiz Passing Score %</label>
                    <input
                      type="number"
                      value={certMinQuizScore}
                      onChange={(e) => { setCertMinQuizScore(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 7: INSTRUCTOR ASSIGNMENT */}
          {activeStep === 'instructor' && (
            <div className="space-y-6 text-xs">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                7. Lead Instructor Assignment
              </h2>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Select Lead Instructor *</label>
                <select
                  value={instructorId}
                  onChange={(e) => { setInstructorId(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200"
                >
                  {instructors.map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name} ({inst.email})</option>
                  ))}
                </select>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ADD LESSON MODAL */}
      {lessonModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Add Lesson Video</h3>
            <input
              type="text"
              placeholder="Lesson Title (e.g. Getting Started with React)"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold"
            />
            <input
              type="text"
              placeholder="Video URL (YouTube or MP4 link)"
              value={lessonVideoUrl}
              onChange={(e) => setLessonVideoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
            />
            <label className="flex items-center gap-2 font-bold text-slate-700">
              <input type="checkbox" checked={lessonPreview} onChange={(e) => setLessonPreview(e.target.checked)} />
              <span>Enable as Free Public Preview</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setLessonModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button onClick={handleSaveLessonModal} className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl">Add Lesson</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD QUIZ MODAL */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Add Section Quiz</h3>
            <input
              type="text"
              placeholder="Quiz Title (e.g. Core Concepts Quiz)"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold"
            />
            <div className="flex gap-3 pt-2">
              <button onClick={() => setQuizModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button onClick={handleSaveQuizModal} className="flex-1 py-2.5 bg-purple-600 text-white font-bold rounded-xl">Add Quiz</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ASSIGNMENT MODAL */}
      {assignmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Add Assignment</h3>
            <input
              type="text"
              placeholder="Assignment Title (e.g. Build a Web Application)"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold"
            />
            <textarea
              rows={3}
              placeholder="Instructions..."
              value={assignmentInstructions}
              onChange={(e) => setAssignmentInstructions(e.target.value)}
              className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200"
            />
            <div className="flex gap-3 pt-2">
              <button onClick={() => setAssignmentModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 font-bold rounded-xl">Cancel</button>
              <button onClick={handleSaveAssignmentModal} className="flex-1 py-2.5 bg-amber-600 text-white font-bold rounded-xl">Add Assignment</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
