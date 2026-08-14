import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Award, ShieldCheck, CheckCircle2, XCircle, Printer } from 'lucide-react';

export default function CertificateVerifyPage() {
  const { certificateId } = useParams();
  const { API_BASE } = useAuth();

  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/certificates/verify/${certificateId}`)
      .then(res => res.json())
      .then(data => setVerification(data))
      .catch(err => setVerification({ valid: false, error: 'Certificate verification service error.' }))
      .finally(() => setLoading(false));
  }, [certificateId, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-sm font-bold animate-pulse">Verifying Certificate Authenticity...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Verification Status Header */}
        {verification?.valid ? (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>AUTHENTIC CERTIFICATE VERIFIED BY SAIYAM JAIN LMS PLATFORM</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs font-bold">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>CERTIFICATE INVALID OR NOT FOUND</span>
          </div>
        )}

        {/* Official Certificate Visual Container */}
        {verification?.valid && verification.certificate && (
          <div className="p-8 bg-white text-slate-900 rounded-2xl border-4 border-slate-200 space-y-6 text-center shadow-inner relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
              SJ
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Certificate of Completion</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Saiyam Jain Academy</h2>
            </div>

            <p className="text-xs text-slate-500 italic">This is to certify that</p>

            <h3 className="text-xl sm:text-2xl font-black text-blue-600 underline decoration-blue-200 underline-offset-8">
              {verification.certificate.student_name}
            </h3>

            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              has successfully completed all lectures, assignments, and curriculum requirements for the course
            </p>

            <h4 className="text-base font-bold text-slate-900 bg-slate-50 py-2 px-4 rounded-xl inline-block border border-slate-200">
              {verification.certificate.course_title}
            </h4>

            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs text-left">
              <div>
                <span className="text-slate-400 block font-medium">Certificate ID</span>
                <span className="font-mono font-bold text-slate-900">{verification.certificate.certificate_number}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block font-medium">Issue Date</span>
                <span className="font-bold text-slate-900">{new Date(verification.certificate.issue_date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center text-xs">
              <div className="text-left">
                <span className="font-bold text-slate-900 block">Saiyam Jain</span>
                <span className="text-[10px] text-slate-500">Lead Educator & Platform Founder</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          <Link to="/" className="text-blue-400 hover:underline font-bold">
            ← Back to Saiyam Jain Platform
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 font-bold text-white hover:text-blue-400"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
        </div>

      </div>
    </div>
  );
}
