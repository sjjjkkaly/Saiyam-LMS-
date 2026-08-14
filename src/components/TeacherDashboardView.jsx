import React, { useState } from 'react';
import { UserCheck, Radio, FileText, CheckCircle2, Send, Plus, Users, Clock } from 'lucide-react';

export default function TeacherDashboardView({ liveClasses, courses, students }) {
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [sentBroadcasts, setSentBroadcasts] = useState([
    "📢 Reminder: Class 12 Partnership Revaluation test on Friday at 6 PM."
  ]);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setSentBroadcasts([broadcastMsg.trim(), ...sentBroadcasts]);
    setBroadcastMsg('');
    alert('Broadcast notification sent to all assigned Class 11 & 12 students!');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Teacher Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white font-heading">Faculty Control Desk</h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Senior Faculty View
              </span>
            </div>
            <p className="text-xs text-slate-300">Classroom Management, Assignment Grading & Live Broadcasts</p>
          </div>
        </div>
      </div>

      {/* Broadcast Message Widget */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-base text-slate-100 font-heading">
          Broadcast Class Announcement
        </h3>
        
        <form onSubmit={handleSendBroadcast} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Type message to broadcast to all Class 11 & 12 students..."
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Send Broadcast</span>
          </button>
        </form>

        <div className="space-y-2 pt-2">
          <span className="text-xs text-slate-400 font-bold">Recent Sent Messages:</span>
          {sentBroadcasts.map((msg, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Batches & Live Class Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-slate-100 font-heading">
            Assigned Student Batches ({students.length})
          </h3>
          <div className="space-y-3">
            {students.map(s => (
              <div key={s.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-100">{s.name}</h4>
                  <p className="text-[10px] text-slate-400">Class {s.classLevel} • {s.batch}</p>
                </div>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Attendance: {s.attendance}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-slate-100 font-heading">
            Upcoming Live Lectures
          </h3>
          <div className="space-y-3">
            {liveClasses.map(l => (
              <div key={l.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {l.status}
                </span>
                <h4 className="font-bold text-slate-100">{l.title}</h4>
                <p className="text-[10px] text-slate-400">{l.startTime}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
