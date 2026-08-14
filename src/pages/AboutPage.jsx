import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, ShieldCheck, Code2, BrainCircuit, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
          <span>About Saiyam Jain Platform</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
          Empowering Developers & Tech Innovators Worldwide
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Saiyam Jain platform is built to deliver production-quality technology education, combining rigorous computer science fundamentals with modern software engineering execution.
        </p>
      </div>

      {/* Bio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
        <div className="md:col-span-5 flex justify-center">
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-6xl shadow-xl">
            SJ
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Message from Saiyam Jain</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            "In modern technology, watching tutorials is not enough. True mastery comes from engineering systems, understanding database behavior, enforcing security, and building applications that scale."
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            "Every course published on this platform is structured to give learners end-to-end practical capability, zero fluff, and authentic verifiable credentials."
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-900">
            <span>Saiyam Jain</span>
            <span className="text-slate-400">•</span>
            <span className="text-blue-600">Founder & Platform Architect</span>
          </div>
        </div>
      </div>

    </div>
  );
}
