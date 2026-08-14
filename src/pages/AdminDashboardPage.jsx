import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';
import {
  ShieldCheck,
  BookOpen,
  Users,
  DollarSign,
  FileText,
  Tag,
  Settings,
  Shield,
  Upload,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  PlusCircle,
  Edit3
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { token, API_BASE, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');

  const [analytics, setAnalytics] = useState(null);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [settings, setSettings] = useState({});

  const [loading, setLoading] = useState(true);

  // Coupon Creation Form State
  const [couponCode, setCouponCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');

  // Settings Form State
  const [razorpayKeyId, setRazorpayKeyId] = useState('');
  const [razorpaySecret, setRazorpaySecret] = useState('');
  const [settingsSavedMsg, setSettingsSavedMsg] = useState('');

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/admin/analytics`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/instructor/courses`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/admin/orders`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/admin/coupons`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/admin/enquiries`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/admin/audit-logs`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/admin/settings`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
    ])
      .then(([anData, crsData, usrData, ordData, cpnData, enqData, logData, setData]) => {
        setAnalytics(anData.metrics || {});
        setCourses(crsData.courses || []);
        setUsers(usrData.users || []);
        setOrders(ordData.orders || []);
        setCoupons(cpnData.coupons || []);
        setEnquiries(enqData.enquiries || []);
        setAuditLogs(logData.logs || []);
        if (setData.settings) {
          setSettings(setData.settings);
          setRazorpayKeyId(setData.settings.razorpay_key_id || '');
          setRazorpaySecret(setData.settings.razorpay_key_secret || '');
        }
      })
      .catch(err => console.error('Error loading admin portal:', err))
      .finally(() => setLoading(false));
  }, [token, API_BASE]);

  const handleUpdateCourseStatus = (courseId, newStatus) => {
    fetch(`${API_BASE}/admin/courses/${courseId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: newStatus } : c));
      });
  };

  const handleUpdateUserRole = (userId, newRole, newStatus) => {
    fetch(`${API_BASE}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole, status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole || u.role, status: newStatus || u.status } : u));
      });
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!couponCode || !discountValue) return;

    fetch(`${API_BASE}/admin/coupons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        code: couponCode,
        discount_type: discountType,
        discount_value: parseFloat(discountValue)
      })
    })
      .then(res => res.json())
      .then(() => {
        setCouponCode('');
        setDiscountValue('');
        // Refresh coupons
        fetch(`${API_BASE}/admin/coupons`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => setCoupons(data.coupons || []));
      });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/admin/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        settings: {
          razorpay_key_id: razorpayKeyId,
          razorpay_key_secret: razorpaySecret
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        setSettingsSavedMsg('Razorpay credentials and settings updated securely!');
        setTimeout(() => setSettingsSavedMsg(''), 4000);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Top Header */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 font-black text-xl flex items-center justify-center text-white shadow-lg">
            SJ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Admin Control Portal</h1>
              <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-md border border-purple-500/30">
                Saiyam Jain Platform
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Full system control, course approvals, revenue analytics & settings.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/courses/create"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create New Course</span>
          </Link>
          <Link
            to="/admin/courses"
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700"
          >
            Course Roster
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
        {[
          { id: 'analytics', label: 'Analytics' },
          { id: 'courses', label: `Courses (${courses.length})` },
          { id: 'users', label: `Users (${users.length})` },
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'coupons', label: 'Coupons' },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
          { id: 'logs', label: 'Audit Logs' },
          { id: 'settings', label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. ANALYTICS VIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Revenue</span>
              <p className="text-2xl font-black text-emerald-600">₹{analytics?.totalRevenue || 0}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Orders</span>
              <p className="text-2xl font-black text-slate-900">{analytics?.totalOrders || 0}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Students</span>
              <p className="text-2xl font-black text-blue-600">{analytics?.totalStudents || 0}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Pending Reviews</span>
              <p className="text-2xl font-black text-amber-500">{analytics?.pendingCourses || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. COURSES MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Manage Platform Courses</h3>
            <Link to="/admin/courses" className="text-xs font-bold text-blue-600 hover:underline">
              Open Full Course Roster Page →
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {courses.length === 0 ? (
                <EmptyState
                  title="No courses created yet"
                  description="Use the course builder to create and publish courses."
                  actionText="Launch Course Builder"
                  onAction={() => navigate('/admin/courses/create')}
                />
              ) : (
                courses.map(crs => (
                  <div key={crs.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{crs.title}</h3>
                      <p className="text-slate-500">Instructor: {crs.instructor_name || 'Saiyam Jain'} • Price: ₹{crs.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/courses/${crs.id}/edit`}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 font-bold text-[10px] rounded-lg flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Builder</span>
                      </Link>

                      <span className={`px-3 py-1 font-bold rounded-full text-[10px] ${
                        crs.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {crs.status}
                      </span>

                      {crs.status !== 'Published' && (
                        <button
                          onClick={() => handleUpdateCourseStatus(crs.id, 'Published')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg"
                        >
                          Approve & Publish
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {users.map(u => (
              <div key={u.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{u.name}</h3>
                  <p className="text-slate-500">{u.email} • Phone: {u.phone || 'N/A'}</p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleUpdateUserRole(u.id, e.target.value, u.status)}
                    className="px-2.5 py-1 bg-slate-100 font-bold rounded-lg border border-slate-200 text-[10px]"
                  >
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                  </select>

                  <button
                    onClick={() => handleUpdateUserRole(u.id, u.role, u.status === 'active' ? 'suspended' : 'active')}
                    className={`px-3 py-1 font-bold text-[10px] rounded-lg ${
                      u.status === 'active' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {u.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ORDERS VIEW */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No orders recorded in database.</div>
            ) : (
              orders.map(ord => (
                <div key={ord.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">#{ord.order_number}</span>
                    <span className="text-slate-500">Student: {ord.student_name} ({ord.student_email})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200">
                      {ord.payment_status}
                    </span>
                    <span className="text-sm font-black text-slate-900">₹{ord.total}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 5. COUPONS ENGINE */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateCoupon} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Create New Coupon Code</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="COUPON CODE (e.g. SAIYAM50)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold uppercase"
              />
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
              <input
                type="number"
                required
                placeholder="Discount Value (e.g. 50)"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold"
              />
            </div>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl">
              Create Coupon
            </button>
          </form>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="divide-y divide-slate-100">
              {coupons.map(cpn => (
                <div key={cpn.id} className="p-4 flex justify-between items-center font-medium">
                  <span className="font-bold text-slate-900 uppercase">{cpn.code}</span>
                  <span>{cpn.discount_type === 'percentage' ? `${cpn.discount_value}% OFF` : `₹${cpn.discount_value} OFF`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. SETTINGS VIEW */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6 text-xs max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Payment & Platform Configuration
          </h3>

          <div className="space-y-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Razorpay Key Secret</label>
              <input
                type="password"
                value={razorpaySecret}
                onChange={(e) => setRazorpaySecret(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>

          {settingsSavedMsg && <p className="text-xs font-bold text-emerald-600">{settingsSavedMsg}</p>}

          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md">
            Save Secure Credentials
          </button>
        </form>
      )}

    </div>
  );
}
