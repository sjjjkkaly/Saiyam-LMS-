import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  BookOpen,
  ShoppingBag,
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  ShieldCheck,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin, isInstructor } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              SJ
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Saiyam Jain
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase -mt-1">
                LMS & Digital Learning
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative flex-1 max-w-md mx-8">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              placeholder="Search courses, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-hidden"
            />
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/courses"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/courses' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Explore Courses
            </Link>
            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/about' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About Saiyam
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/contact' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white font-bold text-xs rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Authenticated User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 bg-slate-100/80 hover:bg-slate-100 rounded-xl border border-slate-200/60 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center uppercase shadow-xs">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[100px] leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>Student Dashboard</span>
                    </Link>

                    {isInstructor && (
                      <Link
                        to="/instructor"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <PlusCircle className="w-4 h-4 text-indigo-600" />
                        <span>Instructor Portal</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-transparent"
            />
          </form>

          <div className="flex flex-col gap-2">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Explore Courses
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              About Saiyam
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
