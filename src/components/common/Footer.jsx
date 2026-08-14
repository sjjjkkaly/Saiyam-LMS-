import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MessageSquare, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-slate-800">
                <img src="/saiyam_jain.jpg" alt="Saiyam Jain" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-xl font-extrabold text-white">Saiyam Jain</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering developers, tech enthusiasts, and creators with world-class education, practical engineering, and career-transforming online courses.
            </p>
            <div className="flex flex-col space-y-2 text-xs text-slate-300 pt-1">
              <a href="tel:+919339256592" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+91 9339256592</span>
              </a>
              <a href="https://wa.me/919339256592" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +91 9339256592</span>
              </a>
              <a href="mailto:saiyam@jainbhandar.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>saiyam@jainbhandar.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Saiyam Jain</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Top Domains</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses?category=software-engineering" className="hover:text-white transition-colors">Full Stack Engineering</Link></li>
              <li><Link to="/courses?category=artificial-intelligence" className="hover:text-white transition-colors">AI & LLM Architecture</Link></li>
              <li><Link to="/courses?category=data-science" className="hover:text-white transition-colors">Data Science & Python</Link></li>
              <li><Link to="/courses?category=cyber-security" className="hover:text-white transition-colors">Cyber Security</Link></li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Stay Informed</h4>
            <p className="text-slate-400 text-xs mb-3">
              Subscribe for course launch notifications and tech tutorials.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 bg-slate-900 text-white placeholder:text-slate-500 text-xs rounded-xl border border-slate-800 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Saiyam Jain. All rights reserved. Production LMS Platform.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/refund" className="hover:text-slate-300">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
