import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, ShieldCheck, Code2, BrainCircuit, Users, Mail, Phone, MessageSquare } from 'lucide-react';

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

      {/* Bio Grid with Saiyam Photo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
        <div className="md:col-span-5 flex justify-center">
          <div className="w-56 h-72 rounded-3xl bg-slate-100 overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
            <img
              src="/saiyam_jain.jpg"
              alt="Saiyam Jain"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Lead Educator & Founder</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Message from Saiyam Jain</h2>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-blue-600 pl-4 py-1">
            "In modern technology, watching tutorials is not enough. True mastery comes from engineering systems, understanding database behavior, enforcing security, and building applications that scale."
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            "Every course published on this platform is structured to give learners end-to-end practical capability, zero fluff, and authentic verifiable credentials."
          </p>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <a
              href="tel:+919339256592"
              className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl transition-all flex items-center gap-2.5 text-xs font-bold text-slate-800"
            >
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-normal uppercase">Phone</span>
                <span>+91 9339256592</span>
              </div>
            </a>

            <a
              href="https://wa.me/919339256592"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 rounded-2xl transition-all flex items-center gap-2.5 text-xs font-bold text-emerald-900"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-emerald-600 block font-normal uppercase">WhatsApp Chat</span>
                <span>+91 9339256592</span>
              </div>
            </a>

            <a
              href="mailto:saiyam@jainbhandar.com"
              className="p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-2xl transition-all flex items-center gap-2.5 text-xs font-bold text-slate-800"
            >
              <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-normal uppercase">Email</span>
                <span className="truncate block">saiyam@jainbhandar.com</span>
              </div>
            </a>
          </div>

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
