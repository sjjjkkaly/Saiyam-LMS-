import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  PlayCircle,
  ShoppingBag,
  Star,
  Users,
  ChevronDown,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { API_BASE, user, token } = useAuth();
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/courses/${slug}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data.course) {
          setCourse(data.course);
        }
      })
      .catch(err => console.error('Error fetching course:', err))
      .finally(() => setLoading(false));
  }, [slug, API_BASE, token]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 rounded-3xl skeleton-box" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Course Not Found</h2>
        <p className="text-slate-500 text-sm">The course you are looking for does not exist or has been removed.</p>
        <Link to="/courses" className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl inline-block">
          Back to Courses
        </Link>
      </div>
    );
  }

  const isInCart = cart.some(item => item.id === course.id);

  const handleBuyNow = () => {
    addToCart(course);
    navigate('/cart');
  };

  return (
    <div className="pb-24 space-y-12">
      
      {/* Course Hero Banner */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/30">
                  {course.category_name || 'General Domain'}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg">
                  {course.course_level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-400 text-base leading-relaxed max-w-3xl">
                {course.short_description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>{course.student_count || 0} Enrolled Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{course.duration || 'Self-paced'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Completion Certificate</span>
                </div>
              </div>
            </div>

            {/* Sidebar Pricing Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
                <div className="h-48 rounded-2xl bg-slate-800 overflow-hidden relative">
                  <img
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Investment</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-white">
                      ₹{course.sale_price > 0 ? course.sale_price : course.price}
                    </span>
                    {course.sale_price > 0 && (
                      <span className="text-base text-slate-500 line-through">
                        ₹{course.price}
                      </span>
                    )}
                  </div>
                </div>

                {course.is_enrolled ? (
                  <Link
                    to={`/dashboard/courses/${course.id}`}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all text-center block shadow-lg shadow-emerald-600/25"
                  >
                    Already Enrolled – Go to Player
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleBuyNow}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                    >
                      <span>Buy Now</span>
                    </button>
                    <button
                      onClick={() => addToCart(course)}
                      className={`w-full py-3 text-sm font-bold rounded-xl transition-all border ${
                        isInCart
                          ? 'bg-slate-800 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                    >
                      {isInCart ? 'Added in Cart' : 'Add to Cart'}
                    </button>
                  </div>
                )}

                <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Instant access after payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Lifetime curriculum updates</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-8 space-y-12">
          
          {/* Learning Outcomes */}
          {course.learning_outcomes && course.learning_outcomes.length > 0 && (
            <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learning_outcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum Sections & Lessons */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Course Curriculum</h3>
            
            {course.sections && course.sections.length > 0 ? (
              <div className="space-y-3">
                {course.sections.map((sec, idx) => (
                  <div key={sec.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>Section {idx + 1}: {sec.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-normal">
                        <span>{sec.lessons?.length || 0} Lessons</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSection === idx ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {openSection === idx && (
                      <div className="divide-y divide-slate-100 bg-slate-50/50 border-t border-slate-100">
                        {sec.lessons && sec.lessons.map(les => (
                          <div key={les.id} className="px-6 py-3.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3 font-medium text-slate-700">
                              <PlayCircle className="w-4 h-4 text-slate-400" />
                              <span>{les.title}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                              <span>{les.duration || '10:00'}</span>
                              {les.preview_enabled ? (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md">
                                  Preview
                                </span>
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs italic">Curriculum sections will appear here once configured by instructor.</p>
            )}
          </div>

          {/* Full Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Course Overview</h3>
            <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {course.full_description || course.short_description}
            </div>
          </div>

          {/* Instructor Details */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Instructor</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                {course.instructor_name ? course.instructor_name[0] : 'S'}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{course.instructor_name || 'Saiyam Jain'}</h4>
                <p className="text-xs text-slate-500 font-medium">Lead Educator & Tech Platform Architect</p>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              {course.instructor_bio || 'Experienced educator and software engineer dedicated to building practical, production-ready technology courses.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
