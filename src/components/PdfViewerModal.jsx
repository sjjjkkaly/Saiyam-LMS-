import React, { useState } from 'react';
import { X, Download, Bookmark, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export default function PdfViewerModal({ note, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-amber-500/40 overflow-hidden shadow-2xl space-y-0 my-8 flex flex-col h-[80vh]">
        {/* Reader Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Class {note.classLevel} {note.subject}
                </span>
                <span className="text-xs text-slate-400">{note.pages || 24} Pages • {note.fileSize || '4 MB'}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-100 line-clamp-1">{note.title}</h3>
            </div>
          </div>

          {/* Reader Action Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center space-x-1 ${
                isBookmarked ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <a
              href={`#download-${note.id}`}
              onClick={(e) => {
                e.preventDefault();
                alert(`Downloading "${note.title}" PDF... Saved to your local downloads!`);
              }}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Toolbar (Zoom & Page controls) */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span>Zoom:</span>
            <button 
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-amber-400 font-bold">{zoomLevel}%</span>
            <button 
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page <strong className="text-white">{currentPage}</strong> of {note.pages || 24}</span>
            <button
              disabled={currentPage >= (note.pages || 24)}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Document Canvas View */}
        <div className="flex-1 bg-slate-900/50 p-6 overflow-y-auto flex items-center justify-center">
          <div 
            className="w-full max-w-2xl bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 text-slate-200 transition-all font-mono text-sm leading-relaxed"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Saiyam Classes Official Study Note • Page {currentPage}
                </span>
                <h4 className="font-bold text-base text-white mt-1">{note.title}</h4>
              </div>
              <span className="text-xs text-slate-500 font-sans">Author: {note.author}</span>
            </div>

            <div className="whitespace-pre-wrap bg-slate-900/80 p-5 rounded-xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-emerald-300">
              {note.contentPreview || note.description || "Handwritten formula booklet & step-by-step NCERT solutions for Class 11 & Class 12 Board Examination."}
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500 font-sans">
              🔒 Watermarked for Saiyam Classes Registered Student Portal. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
