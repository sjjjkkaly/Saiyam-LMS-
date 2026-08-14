import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { login, API_BASE } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setError('');

    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, role })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token && data.user) {
          login(data.token, data.user);
          if (data.user.role === 'Instructor') {
            navigate('/instructor');
          } else {
            navigate('/dashboard');
          }
        } else {
          setError(data.error || 'Registration failed.');
        }
      })
      .catch(() => setError('Connection error.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
            SJ
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 text-xs">Join Saiyam Jain digital learning platform today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="Saiyam Jain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Account Purpose</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-bold"
            >
              <option value="Student">I want to learn (Student)</option>
              <option value="Instructor">I want to teach (Instructor)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password *</label>
            <input
              type="password"
              required
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
