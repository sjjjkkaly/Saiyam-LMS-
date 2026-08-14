import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Zap,
  Users,
  Code2,
  BrainCircuit,
  Database,
  Lock,
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  const { API_BASE } = useAuth();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/courses`).then(res => res.json()),
      fetch(`${API_BASE}/categories`).then(res => res.json())
    ])
      .then(([courseData, catData]) => {
        setCourses(courseData.courses || []);
        setCategories(catData.categories || []);
      })
      .catch(err => console.error('Error fetching home data:', err))
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const faqs = [
    {
      q: "How do I access my enrolled courses?",
      a: "Once you complete your enrollment, your courses are instantly accessible in your Student Dashboard under 'My Courses'."
    },
    {
      q: "Are the certificates verified?",
      a: "Yes! Every certificate issued by Saiyam Jain platform includes a unique ID that can be publicly verified at /verify/[certificate-id]."
    },
    {
      q: "What payment methods are supported?",
      a: "We support instant online payments via Razorpay including Credit/Debit Cards, UPI (GPay, PhonePe), NetBanking, and Wallets."
    },
    {
      q: "Can instructors create and manage their own courses?",
      a: "Absolutely. Registered instructors get access to an Instructor Portal equipped with a drag-and-drop course builder, lesson uploader, quiz creator, and student analytics."
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-28 border-b border-slate-900">
        {/* Subtle Tech Grid & Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Next-Gen Creator Education Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Learn High-Impact Tech Skills from <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Saiyam Jain</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Industry-driven courses in Software Engineering, AI Systems, Cloud Architecture, and Data Science. Built with real project workflows, progress tracking, and verified certifications.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-base rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <span>About Saiyam Jain</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-slate-900 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Practical Focus</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Verified</p>
                  <p className="text-xs text-slate-500 font-medium">Certificates</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Razorpay</p>
                  <p className="text-xs text-slate-500 font-medium">Secure Checkout</p>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 shadow-md overflow-hidden shrink-0">
                    <img src="/saiyam_jain.jpg" alt="Saiyam Jain" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Saiyam Jain</h3>
                    <p className="text-xs text-blue-400 font-semibold">Lead Educator & Platform Architect</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  "Education is most powerful when it bridges theoretical fundamentals with modern industry execution. My platform is built to help you master real-world technology."
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real database persistence & tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Interactive LMS player & resume playback</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant automated course verification</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Learning Domains
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Curated domains designed to take you from foundational understanding to advanced mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id || i}
              to={`/courses?category=${cat.slug}`}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {i === 0 ? <Code2 className="w-6 h-6" /> :
                 i === 1 ? <BrainCircuit className="w-6 h-6" /> :
                 i === 2 ? <Database className="w-6 h-6" /> :
                 <Lock className="w-6 h-6" />}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED COURSES CATALOG (WITH CLEAN EMPTY STATE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Start learning from top-rated, comprehensive video curricula.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-80 rounded-2xl skeleton-box" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <EmptyState
            title="No courses published yet"
            description="The platform course catalog is currently clean. Instructors and Admins can publish real courses from their dashboard."
            actionText="Explore Course Catalog"
            onAction={() => window.location.href = '/courses'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
                <div className="h-48 bg-slate-100 relative">
                  <img
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-xs font-bold backdrop-blur-xs">
                    {course.course_level}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 mt-1">
                      {course.short_description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xl font-extrabold text-blue-600">
                      ₹{course.sale_price > 0 ? course.sale_price : course.price}
                    </span>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. WHY LEARN WITH SAIYAM JAIN */}
      <section className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Why Learn on This Platform?
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Designed from the ground up for high performance, verified learning outcomes, and frictionless user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Interactive Course Player</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Resume video lectures automatically from your exact previous position. Completed lessons auto-update your progress percentage.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Authentic Certificates</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Earn verifiable completion certificates with unique ID numbers upon 100% course completion.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Razorpay Secure Checkout</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Server-side HMAC-SHA256 signature verification guarantees secure, instant course unlocks upon payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Advance Your Technical Journey?
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Create your account today, explore available courses, or start creating your own curriculum as an instructor.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3.5 bg-white text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors shadow-md"
              >
                Create Account
              </Link>
              <Link
                to="/courses"
                className="px-8 py-3.5 bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors border border-blue-400/30"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
