import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Info, 
  CheckCircle2, 
  User, 
  Sun, 
  Moon,
  Filter,
  ChevronRight,
  Coffee,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHEDULE_DATA, STAFF_CONSTRAINTS, STAFF_LIST } from './constants';
import { DailySchedule } from './types';

export default function App() {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans p-4 md:p-8 selection:bg-[#EE4D2D] selection:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with WKP! Branding */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#EE4D2D] rounded-full flex items-center justify-center shadow-2xl shadow-orange-900/20 border-4 border-[#1A1A1A] shrink-0">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black italic tracking-tighter text-white leading-none">WKP!</span>
                <div className="h-1 w-12 bg-white mx-auto mt-1 rounded-full opacity-50"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic">
                Warung Kopi <span className="text-[#EE4D2D]">&</span> Panganan
              </h1>
              <div className="flex items-center gap-3 mt-2 text-slate-400 font-medium">
                <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest text-slate-300 border border-slate-700">
                  <Coffee size={12} />
                  <span>Coffee</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest text-slate-300 border border-slate-700">
                  <Utensils size={12} />
                  <span>Food</span>
                </div>
                <span className="text-sm">• Shift Schedule 2026</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-[#1A1A1A] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="bg-orange-500/10 text-[#EE4D2D] p-2.5 rounded-xl border border-orange-500/20">
                <Sun size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-0.5">Shift Pagi</p>
                <p className="text-sm font-bold">09.00 – 17.00</p>
              </div>
            </div>
            <div className="bg-[#1A1A1A] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="bg-indigo-500/10 text-indigo-400 p-2.5 rounded-xl border border-indigo-500/20">
                <Moon size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-0.5">Shift Malam</p>
                <p className="text-sm font-bold">16.00 – 24.00</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Staff Filter & Constraints */}
          <aside className="lg:col-span-1 space-y-6">
            <section className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-slate-800/50">
              <div className="flex items-center gap-2 mb-6 text-white font-black uppercase tracking-widest text-xs">
                <Filter size={16} className="text-[#EE4D2D]" />
                <h2>Filter Staf</h2>
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => setSelectedStaff(null)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between uppercase tracking-wider ${
                    selectedStaff === null 
                    ? 'bg-[#EE4D2D] text-white shadow-lg shadow-orange-900/40' 
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
                  }`}
                >
                  <span>Semua Staf</span>
                  {selectedStaff === null && <CheckCircle2 size={14} />}
                </button>
                {STAFF_LIST.map((staff) => (
                  <button
                    key={staff}
                    onClick={() => setSelectedStaff(staff)}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between uppercase tracking-wider ${
                      selectedStaff === staff 
                      ? 'bg-[#EE4D2D] text-white shadow-lg shadow-orange-900/40' 
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User size={14} />
                      <span>{staff}</span>
                    </div>
                    {selectedStaff === staff && <CheckCircle2 size={14} />}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-[#EE4D2D] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Coffee size={120} />
              </div>
              <div className="flex items-center gap-2 mb-4 font-black uppercase tracking-widest text-xs relative z-10">
                <Info size={16} />
                <h2>Ketentuan</h2>
              </div>
              <ul className="space-y-4 relative z-10">
                {STAFF_CONSTRAINTS.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="mt-1 bg-white/20 p-1 rounded">
                      <ChevronRight size={10} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/70">{item.name}</p>
                      <p className="text-sm font-bold leading-tight">{item.constraint}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Main Content: Schedule Table */}
          <main className="lg:col-span-3">
            <div className="bg-[#1A1A1A] rounded-3xl shadow-2xl border border-slate-800/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-slate-800">
                      <th className="p-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] w-36">Hari</th>
                      <th className="p-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                          <Sun size={14} className="text-orange-500" />
                          Shift Pagi
                        </div>
                      </th>
                      <th className="p-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                          <Moon size={14} className="text-indigo-400" />
                          Shift Malam
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEDULE_DATA.map((dayData, idx) => (
                      <motion.tr 
                        key={dayData.day}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-slate-800/30 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-6">
                          <span className="text-lg font-black italic uppercase tracking-tighter text-white">{dayData.day}</span>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-wrap gap-2">
                            {dayData.shifts.pagi.length > 0 ? (
                              dayData.shifts.pagi.map(staff => (
                                <StaffBadge 
                                  key={staff} 
                                  name={staff} 
                                  isSelected={selectedStaff === staff}
                                  isAnySelected={selectedStaff !== null}
                                  type="pagi"
                                />
                              ))
                            ) : (
                              <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest italic">— Libur Pagi</span>
                            )}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-wrap gap-2">
                            {dayData.shifts.malam.map(staff => (
                              <StaffBadge 
                                key={staff} 
                                name={staff} 
                                isSelected={selectedStaff === staff}
                                isAnySelected={selectedStaff !== null}
                                type="malam"
                              />
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend / Info */}
            <div className="mt-8 flex flex-wrap items-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.15em]">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-[#EE4D2D] shadow-lg shadow-orange-900/20"></div>
                <span>Staf Terpilih</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-slate-800 border border-slate-700"></div>
                <span>Staf Lainnya</span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-slate-400">
                <Users size={14} />
                <span>Total Staf: {STAFF_LIST.length} Orang</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function StaffBadge({ 
  name, 
  isSelected, 
  isAnySelected,
  type 
}: { 
  name: string; 
  isSelected: boolean; 
  isAnySelected: boolean;
  type: 'pagi' | 'malam';
}) {
  const isActive = isSelected || !isAnySelected;
  
  return (
    <div 
      className={`
        px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border
        ${isActive 
          ? isSelected 
            ? 'bg-[#EE4D2D] text-white scale-110 shadow-xl shadow-orange-900/40 border-transparent' 
            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
          : 'bg-slate-900/50 text-slate-700 opacity-20 grayscale border-transparent'
        }
      `}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${
        isSelected 
          ? 'bg-white animate-pulse' 
          : type === 'pagi' ? 'bg-orange-500' : 'bg-indigo-500'
      }`} />
      {name}
    </div>
  );
}
