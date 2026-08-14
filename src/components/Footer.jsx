import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Sparkles, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="glass-panel border-t border-slate-800/80 pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-bold text-slate-950">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl font-heading gold-gradient-text">
              SAIYAM CLASSES
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            India's Premier Learning Management System exclusively for Class 11 and Class 12 Commerce & Higher Mathematics.
          </p>
          <div className="text-xs text-amber-400 font-bold">
            Targeting 100/100 in Board Examinations
          </div>
        </div>

        {/* Subjects taught */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm font-heading text-slate-100 uppercase tracking-wider">
            Specialized Subjects
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>📊 Accountancy (Class 11 & 12)</li>
            <li>📐 Higher Mathematics & Calculus</li>
            <li>💼 Business Studies Case Studies</li>
            <li>📈 Macroeconomics & Microeconomics</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm font-heading text-slate-100 uppercase tracking-wider">
            LMS Features
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => setActiveTab('courses')} className="hover:text-amber-400">Video Lectures & Masterclasses</button></li>
            <li><button onClick={() => setActiveTab('live')} className="hover:text-amber-400">Interactive Live Classes</button></li>
            <li><button onClick={() => setActiveTab('resources')} className="hover:text-amber-400">Handwritten Topper Notes</button></li>
            <li><button onClick={() => setActiveTab('quizzes')} className="hover:text-amber-400">NCERT Test Series</button></li>
            <li><button onClick={() => setActiveTab('ai-tutor')} className="hover:text-amber-400">SaiyamAI Tutor Engine</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3 text-xs text-slate-400">
          <h4 className="font-bold text-sm font-heading text-slate-100 uppercase tracking-wider">
            Head Office Contact
          </h4>
          <p className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Saiyam Classes Tower, Education Hub, New Delhi</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>+91 98765 43210 / +91 11 2345 6789</span>
          </p>
          <p className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>support@saiyamclasses.edu</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 Saiyam Classes LMS. All rights reserved.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>for Class 11 & 12 Champions</span>
        </p>
      </div>
    </footer>
  );
}
