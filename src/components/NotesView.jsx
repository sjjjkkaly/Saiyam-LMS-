import React, { useState } from 'react';
import { 
  FileText, BookOpen, Download, Eye, Search, Filter, Star, 
  Sparkles, CheckCircle2, Bookmark
} from 'lucide-react';
import PdfViewerModal from './PdfViewerModal';

export default function NotesView({ notes, ebooks, activeClassLevel }) {
  const [activeTab, setActiveTab] = useState('handwritten'); // 'handwritten' | 'ebooks'
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [classFilter, setClassFilter] = useState(activeClassLevel || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingNote, setReadingNote] = useState(null);

  const subjects = ['All', 'Accounts', 'Maths', 'Business Studies', 'Economics'];

  // Filter notes
  const filteredNotes = notes.filter(n => {
    const matchesSubject = subjectFilter === 'All' || n.subject === subjectFilter;
    const matchesClass = classFilter === 'All' || n.classLevel === classFilter;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesClass && matchesSearch;
  });

  // Filter ebooks
  const filteredEbooks = ebooks.filter(e => {
    const matchesSubject = subjectFilter === 'All' || e.subject === subjectFilter;
    const matchesClass = classFilter === 'All' || e.classLevel === classFilter;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesClass && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Controls */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading gold-gradient-text">
              Resource Center • Notes & E-Books
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Download CA Saiyam Gupta's Handwritten Topper Notes, Formula Books & Scanners
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search PDF notes, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
          </div>
        </div>

        {/* Tab Selector: Handwritten Notes vs E-Books */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('handwritten')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition ${
              activeTab === 'handwritten' 
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Handwritten Topper Notes ({filteredNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ebooks')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition ${
              activeTab === 'ebooks' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Official E-Books & Scanners ({filteredEbooks.length})</span>
          </button>
        </div>

        {/* Subject & Class Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Subjects */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Subject:</span>
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setSubjectFilter(subj)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  subjectFilter === subj
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">Class:</span>
            {['All', '11', '12'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setClassFilter(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  classFilter === lvl
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {lvl === 'All' ? 'Class 11 & 12' : `Class ${lvl}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Handwritten Notes Section */}
      {activeTab === 'handwritten' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-400/30">
                    Class {note.classLevel} {note.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    {note.pages} Pages • {note.fileSize}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-100 group-hover:text-amber-400 transition-colors">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-xl border border-slate-800/80 line-clamp-3">
                  "{note.contentPreview}"
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags?.map(t => (
                    <span key={t} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">Author: <strong className="text-slate-200">{note.author}</strong></span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setReadingNote(note)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl transition flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      alert(`Downloading "${note.title}"... Saved!`);
                    }}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official E-Books Section */}
      {activeTab === 'ebooks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEbooks.map(book => (
            <div
              key={book.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="bg-slate-950/90 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-400/30">
                      Class {book.classLevel}
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {book.subject}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-slate-950/80 px-2.5 py-1 rounded-lg flex items-center space-x-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-sm text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{book.pages} Pages</span>
                <button
                  onClick={() => setReadingNote(book)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Scanner</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PDF Modal */}
      {readingNote && (
        <PdfViewerModal note={readingNote} onClose={() => setReadingNote(null)} />
      )}
    </div>
  );
}
