import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';
import { Search, Filter, SlidersHorizontal, BookOpen, Star, Clock, Layers, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  const { API_BASE } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [level, setLevel] = useState(searchParams.get('level') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (level) params.append('level', level);
    if (sort) params.append('sort', sort);

    Promise.all([
      fetch(`${API_BASE}/courses?${params.toString()}`).then(res => res.json()),
      fetch(`${API_BASE}/categories`).then(res => res.json())
    ])
      .then(([courseData, catData]) => {
        setCourses(courseData.courses || []);
        setCategories(catData.categories || []);
      })
      .catch(err => console.error('Error loading courses:', err))
      .finally(() => setLoading(false));
  }, [search, category, level, sort, API_BASE]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search, category, level, sort });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Course Catalog
        </h1>
        <p className="text-slate-500 text-sm">
          Discover hands-on courses in software engineering, artificial intelligence, and digital technologies.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search course title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 px-3 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 font-medium"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          {/* Level Dropdown */}
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full md:w-40 px-3 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 font-medium"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-44 px-3 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 font-medium"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>

        </form>
      </div>

      {/* Course Grid / Empty State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-80 rounded-2xl skeleton-box" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses available yet"
          description="There are currently no courses matching your search criteria. Instructors can log in and create courses anytime."
          actionText="Clear Filters"
          onAction={() => {
            setSearch('');
            setCategory('');
            setLevel('');
            setSort('newest');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-xs font-bold backdrop-blur-xs">
                  {course.course_level}
                </span>
                {course.is_enrolled && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs">
                    Enrolled
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="text-blue-600 font-bold">{course.category_name || 'General'}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration || 'Self-paced'}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-500 text-xs line-clamp-2">
                    {course.short_description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Instructor</span>
                    <span className="text-xs font-bold text-slate-700">{course.instructor_name || 'Saiyam Jain'}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-extrabold text-blue-600">
                      ₹{course.sale_price > 0 ? course.sale_price : course.price}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/courses/${course.slug}`}
                  className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors text-center block"
                >
                  {course.is_enrolled ? 'Go to Course' : 'View Details'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
