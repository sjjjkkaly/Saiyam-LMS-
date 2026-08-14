import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmptyState from '../../components/common/EmptyState';
import {
  PlusCircle,
  Search,
  Filter,
  RefreshCw,
  Edit3,
  Copy,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  Users,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AdminCoursesPage() {
  const { token, API_BASE } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCourses = () => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/instructor/courses`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(`${API_BASE}/categories`).then(res => res.json()),
      fetch(`${API_BASE}/instructors`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json())
    ])
      .then(([crsData, catData, instData]) => {
        setCourses(crsData.courses || []);
        setCategories(catData.categories || []);
        setInstructors(instData.instructors || []);
      })
      .catch(err => console.error('Error fetching admin courses:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, [token, API_BASE]);

  const handleUpdateStatus = (courseId, newStatus) => {
    fetch(`${API_BASE}/admin/courses/${courseId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => fetchCourses());
  };

  const handleDuplicateCourse = (courseId) => {
    fetch(`${API_BASE}/admin/courses/${courseId}/duplicate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.new_course_id) {
          navigate(`/admin/courses/${data.new_course_id}/edit`);
        }
      });
  };

  const handleDeleteCourse = () => {
    if (!deleteTarget) return;
    fetch(`${API_BASE}/admin/courses/${deleteTarget.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(() => {
        setDeleteTarget(null);
        fetchCourses();
      });
  };

  // Filter Logic
  const filteredCourses = courses.filter(c => {
    const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || (c.short_description && c.short_description.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesCategory = !categoryFilter || c.category_id === parseInt(categoryFilter);
    const matchesInstructor = !instructorFilter || c.instructor_id === parseInt(instructorFilter);
    return matchesSearch && matchesStatus && matchesCategory && matchesInstructor;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="text-xs font-bold text-blue-600 hover:underline">Admin Dashboard</Link>
            <span className="text-slate-400">/</span>
            <span className="text-xs font-bold text-slate-500">Courses</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Course Roster & Management</h1>
          <p className="text-slate-500 text-sm">Create, edit, duplicate, and publish online courses.</p>
        </div>

        <Link
          to="/admin/courses/create"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>+ Create New Course</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search course title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
          >
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Instructor Filter */}
          <select
            value={instructorFilter}
            onChange={(e) => setInstructorFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
          >
            <option value="">All Instructors</option>
            {instructors.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Course Table / Empty State */}
      {loading ? (
        <div className="h-64 rounded-2xl skeleton-box" />
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          title="No courses created yet"
          description="Click the button below to launch the professional visual LMS Course Builder and construct your first course."
          actionText="Create Your First Course"
          onAction={() => navigate('/admin/courses/create')}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Course</th>
                  <th className="p-4">Instructor</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Students</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredCourses.map(crs => (
                  <tr key={crs.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Course */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={crs.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                            alt={crs.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{crs.title}</span>
                          <span className="text-slate-400 text-[10px]">{crs.course_level}</span>
                        </div>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="p-4 font-bold text-slate-900">
                      {crs.instructor_name || 'Saiyam Jain'}
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-semibold text-[10px]">
                        {crs.category_name || 'General'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-bold text-blue-600">
                      ₹{crs.sale_price > 0 ? crs.sale_price : crs.price}
                    </td>

                    {/* Enrolled Students */}
                    <td className="p-4 font-bold text-slate-900">
                      {crs.student_count || 0}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 font-bold rounded-full text-[10px] ${
                        crs.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        crs.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        crs.status === 'Archived' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {crs.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Edit in Course Builder */}
                        <Link
                          to={`/admin/courses/${crs.id}/edit`}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit Course Builder"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        {/* Public Preview */}
                        <Link
                          to={`/courses/${crs.slug}`}
                          target="_blank"
                          className="p-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Public View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicateCourse(crs.id)}
                          className="p-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                          title="Duplicate Course"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        {/* Status Toggle */}
                        {crs.status !== 'Published' ? (
                          <button
                            onClick={() => handleUpdateStatus(crs.id, 'Published')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(crs.id, 'Draft')}
                            className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] rounded-lg"
                          >
                            Unpublish
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(crs)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 text-center shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Course?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <span className="font-bold text-slate-900">"{deleteTarget.title}"</span>? This action cannot be easily undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
