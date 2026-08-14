import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  FileText,
  Award,
  User,
  CheckCircle2,
  Clock,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user, token, API_BASE } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');

  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/student/enrolled-courses`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/student/certificates`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/student/orders`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/student/wishlist`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
    ])
      .then(([encData, certData, ordData, wishData]) => {
        setEnrollments(encData.enrollments || []);
        setCertificates(certData.certificates || []);
        setOrders(ordData.orders || []);
        setWishlist(wishData.wishlist || []);
      })
      .catch(err => console.error('Error loading student dashboard:', err))
      .finally(() => setLoading(false));
  }, [token, API_BASE]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 font-black text-2xl flex items-center justify-center text-white shadow-lg">
            {user?.name ? user.name[0] : 'S'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-xs text-slate-400 mt-1">Student Dashboard • {user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-center border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 w-full md:w-auto justify-around">
          <div>
            <span className="text-2xl font-black text-white">{enrollments.length}</span>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Enrolled</p>
          </div>
          <div>
            <span className="text-2xl font-black text-emerald-400">{certificates.length}</span>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Certificates</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'courses' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Enrolled Courses</span>
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'certificates' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>My Certificates</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'orders' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Orders & Receipts</span>
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'wishlist' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Wishlist</span>
            </button>
          </div>
        </div>

        {/* Content View */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: MY ENROLLED COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Enrolled Courses</h2>
              {loading ? (
                <div className="h-64 rounded-2xl skeleton-box" />
              ) : enrollments.length === 0 ? (
                <EmptyState
                  title="No enrolled courses yet"
                  description="Explore the catalog and enroll in your first course to begin learning."
                  actionText="Browse Courses"
                  onAction={() => window.location.href = '/courses'}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrollments.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="h-36 rounded-xl bg-slate-100 overflow-hidden">
                          <img
                            src={item.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                        
                        {/* Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-slate-600">
                            <span>Course Progress</span>
                            <span>{item.progress_percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                              style={{ width: `${item.progress_percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/dashboard/courses/${item.course_id}`}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors text-center block flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Continue Learning</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Earned Certificates</h2>
              {certificates.length === 0 ? (
                <EmptyState
                  title="Complete a course to earn your first certificate"
                  description="Complete 100% of lessons in any enrolled course to receive an official verifiable completion certificate."
                  icon={Award}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map(cert => (
                    <div key={cert.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{cert.course_title}</h3>
                          <p className="text-xs text-slate-500 font-mono">ID: {cert.certificate_number}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Issued: {new Date(cert.issue_date).toLocaleDateString()}</span>
                        <Link
                          to={`/verify/${cert.certificate_number}`}
                          target="_blank"
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span>Public Verification</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Purchase Receipts</h2>
              {orders.length === 0 ? (
                <EmptyState
                  title="No order history found"
                  description="Your completed course purchase receipts will appear here."
                  icon={FileText}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="divide-y divide-slate-100">
                    {orders.map(ord => (
                      <div key={ord.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">#{ord.order_number}</span>
                          <span className="text-slate-500">{ord.course_title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200">
                            {ord.payment_status}
                          </span>
                          <span className="text-sm font-black text-slate-900">₹{ord.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Saved Wishlist</h2>
              {wishlist.length === 0 ? (
                <EmptyState
                  title="Wishlist is empty"
                  description="Save courses to your wishlist while exploring."
                  icon={Heart}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map(w => (
                    <div key={w.wishlist_id} className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                      <h3 className="text-sm font-bold text-slate-900">{w.title}</h3>
                      <Link to={`/courses/${w.slug}`} className="text-xs font-bold text-blue-600 hover:underline">
                        View Course Details
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
