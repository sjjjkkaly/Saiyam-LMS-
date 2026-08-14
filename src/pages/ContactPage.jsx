import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, MapPin } from 'lucide-react';

export default function ContactPage() {
  const { API_BASE } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg(data.message);
          setName('');
          setEmail('');
          setPhone('');
          setSubject('');
          setMessage('');
        } else {
          setErrorMsg(data.error || 'Failed to submit enquiry.');
        }
      })
      .catch(() => setErrorMsg('Connection error.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Contact Saiyam Jain</h1>
        <p className="text-slate-500 text-sm">Have a question about courses, partnerships, or platform features? Reach out directly below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Official Contact Details Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-8 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold">Direct Contact</h3>
              <p className="text-slate-400 text-xs mt-1">Get in touch via Call, WhatsApp, or Email.</p>
            </div>

            <div className="space-y-6 text-xs text-slate-300">
              
              {/* Phone */}
              <a
                href="tel:+919339256592"
                className="flex items-center gap-4 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-2xl border border-slate-700/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Phone Call</span>
                  <span className="text-sm font-bold text-white">+91 9339256592</span>
                </div>
              </a>

              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/919339256592"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 bg-emerald-950/60 hover:bg-emerald-900/60 rounded-2xl border border-emerald-800/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">WhatsApp Direct Chat</span>
                  <span className="text-sm font-bold text-white">+91 9339256592</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:saiyam@jainbhandar.com"
                className="flex items-center gap-4 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-2xl border border-slate-700/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                  <span className="text-sm font-bold text-white">saiyam@jainbhandar.com</span>
                </div>
              </a>

            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Send an Enquiry</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Saiyam Jain"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject</label>
              <input
                type="text"
                placeholder="Course Enquiry / General Inquiry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Message *</label>
              <textarea
                rows={5}
                required
                placeholder="Write your message details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && <p className="text-xs text-rose-500 font-bold">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
