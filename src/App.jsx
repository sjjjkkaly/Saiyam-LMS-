import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import CoursePlayerPage from './pages/CoursePlayerPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminCourseBuilderPage from './pages/admin/AdminCourseBuilderPage';
import CertificateVerifyPage from './pages/CertificateVerifyPage';

// React Error Boundary Class
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50">
          <div className="max-w-xl w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application Error</h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              An unexpected error occurred while rendering this page:
            </p>
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-mono overflow-auto max-h-40">
              {this.state.error ? this.state.error.toString() : 'Unknown error'}
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Reload Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl text-center"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Protected Route Helper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Authenticating access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:slug" element={<CourseDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/verify/:certificateId" element={<CertificateVerifyPage />} />

                  {/* Student Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin', 'Super Admin']}>
                        <StudentDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/courses/:id"
                    element={
                      <ProtectedRoute allowedRoles={['Student', 'Instructor', 'Admin', 'Super Admin']}>
                        <CoursePlayerPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Instructor Protected Routes */}
                  <Route
                    path="/instructor"
                    element={
                      <ProtectedRoute allowedRoles={['Instructor', 'Admin', 'Super Admin']}>
                        <InstructorDashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Protected Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['Admin', 'Super Admin']}>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses"
                    element={
                      <ProtectedRoute allowedRoles={['Admin', 'Super Admin']}>
                        <AdminCoursesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses/create"
                    element={
                      <ProtectedRoute allowedRoles={['Admin', 'Super Admin']}>
                        <AdminCourseBuilderPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses/:id/edit"
                    element={
                      <ProtectedRoute allowedRoles={['Admin', 'Super Admin']}>
                        <AdminCourseBuilderPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
