import React, { useState, useEffect } from 'react';
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
  Utensils,
  ClipboardList,
  Trash2,
  Plus,
  UserCheck,
  History,
  CalendarDays,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHEDULE_DATA, STAFF_CONSTRAINTS, STAFF_LIST, MAIN_ROSTER, HELPER_LIST } from './constants';
import { DailySchedule, AttendanceRecord } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'attendance'>('schedule');
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  
  // Attendance state
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('wkp_attendance');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Check In form states
  const DAYS_LIST = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  
  const mapDateToIndoDay = () => {
    const todayNum = new Date().getDay();
    // getDay() is 0 for Sunday, 1 for Monday etc.
    const map = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return map[todayNum];
  };

  const getHHMM = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const getShiftEndLimit = (day: string): string => {
    if (day === 'Jumat' || day === 'Sabtu') {
      return '24:00';
    }
    return '23:00'; // Senin - Kamis, Dan Minggu
  };

  const calculateWorkedHours = (day: string, timeStr: string): number => {
    const limitStr = getShiftEndLimit(day);
    const [inH, inM] = timeStr.split(':').map(Number);
    if (isNaN(inH) || isNaN(inM)) return 0;

    const limitH = limitStr === '24:00' ? 24 : 23;
    const limitM = 0;

    const inMinutes = inH * 60 + inM;
    const limitMinutes = limitH * 60 + limitM;

    if (inMinutes >= limitMinutes) {
      return 0;
    }

    const diffMin = limitMinutes - inMinutes;
    return parseFloat((diffMin / 60).toFixed(1));
  };

  const [absenStaff, setAbsenStaff] = useState<string>('');
  const [absenDay, setAbsenDay] = useState<string>(mapDateToIndoDay());
  const [absenTime, setAbsenTime] = useState<string>(getHHMM());
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('wkp_attendance', JSON.stringify(attendance));
  }, [attendance]);

  // Handle setting time to now
  const handleSetTimeToNow = () => {
    setAbsenTime(getHHMM());
  };

  const handleAddAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!absenStaff) {
      alert('Silakan pilih staf terlebih dahulu.');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: absenStaff,
      day: absenDay,
      time: absenTime,
      timestamp: Date.now()
    };

    setAttendance(prev => [newRecord, ...prev]);
    setSuccessMsg(`Berhasil mencatat absen: ${absenStaff} masuk hari ${absenDay} pukul ${absenTime}!`);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  const handleDeleteAttendance = (id: string) => {
    setAttendance(prev => prev.filter(r => r.id !== id));
  };

  const handleResetAttendance = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua data rekapan absensi?')) {
      setAttendance([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans p-4 md:p-8 selection:bg-[#EE4D2D] selection:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with WKP! Branding */}
        <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Bagian div di bawah ini ditambahkan overflow-hidden */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#EE4D2D] rounded-full flex items-center justify-center shadow-2xl shadow-orange-900/20 border-4 border-[#1A1A1A] shrink-0 overflow-hidden">
              
              {/* Ini adalah tag img untuk memanggil logo kamu */}
              <img 
                src="/logo_wkp.jpeg" 
                alt="Logo WKP" 
                className="w-full h-full object-cover" 
              />
              
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

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="bg-[#1A1A1A] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
                <div className="bg-indigo-500/10 text-indigo-400 p-2.5 rounded-xl border border-indigo-500/20">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-0.5">Shift Sore/Malam</p>
                  <p className="text-sm font-bold">16.00 – 24.00</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs bar */}
        <div className="flex gap-3 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#EE4D2D] text-white shadow-lg shadow-orange-900/30 font-bold scale-102'
                : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent hover:border-slate-700'
            }`}
          >
            <Calendar size={14} />
            <span>📋 Jadwal Kerja</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'attendance'
                ? 'bg-[#EE4D2D] text-white shadow-lg shadow-orange-900/30 font-bold scale-102'
                : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent hover:border-slate-700'
            }`}
          >
            <Clock size={14} />
            <span>⏱️ Absensi & Rekap</span>
          </button>
        </div>

        {/* Render Views dynamically */}
        <AnimatePresence mode="wait">
          {activeTab === 'schedule' ? (
            <motion.div
              key="schedule-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
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
                      className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between uppercase tracking-wider cursor-pointer ${
                        selectedStaff === null 
                        ? 'bg-[#EE4D2D] text-white shadow-lg shadow-orange-900/40' 
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
                      }`}
                    >
                      <span>Semua Staf</span>
                      {selectedStaff === null && <CheckCircle2 size={14} />}
                    </button>

                    <div className="mt-4 mb-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Roster Utama</div>
                    {MAIN_ROSTER.map((staff) => (
                      <button
                        key={staff}
                        onClick={() => setSelectedStaff(staff)}
                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between uppercase tracking-wider cursor-pointer ${
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

                    <div className="mt-4 mb-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Helper</div>
                    {HELPER_LIST.map((staff) => (
                      <button
                        key={staff}
                        onClick={() => setSelectedStaff(staff)}
                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between uppercase tracking-wider cursor-pointer ${
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

                <section className="bg-[#EE4D2D] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group border border-orange-500/30">
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
                              <Moon size={14} className="text-[#EE4D2D]" />
                              Staf Bertugas (Shift Sore/Malam)
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
                                {dayData.staff.map(staff => (
                                  <StaffBadge 
                                    key={staff} 
                                    name={staff} 
                                    isSelected={selectedStaff === staff}
                                    isAnySelected={selectedStaff !== null}
                                    isHelper={HELPER_LIST.includes(staff)}
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
                    <span>Staf Utama</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-md border-2 border-dashed border-orange-500/50"></div>
                    <span>Helper (Adam/Farrel)</span>
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
            </motion.div>
          ) : (
            <motion.div
              key="attendance-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Form Absen - Column 4 */}
              <div className="lg:col-span-4 space-y-6">
                <section className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-slate-800/50">
                  <div className="flex items-center gap-2 mb-6 text-white font-black uppercase tracking-widest text-xs">
                    <UserCheck size={16} className="text-[#EE4D2D]" />
                    <h2>Form Absen Masuk</h2>
                  </div>

                  <form onSubmit={handleAddAttendance} className="space-y-6">
                    {/* Select Staff */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                        Pilih Staf Yang Masuk *
                      </label>
                      <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                        {STAFF_LIST.map((staff) => {
                          const isSelected = absenStaff === staff;
                          const isHelper = HELPER_LIST.includes(staff);
                          return (
                            <button
                              key={staff}
                              type="button"
                              onClick={() => setAbsenStaff(staff)}
                              className={`px-4 py-3 rounded-2xl text-[11px] font-black text-left flex items-center gap-2 transition-all border cursor-pointer ${
                                isSelected
                                  ? 'bg-[#EE4D2D] text-white border-transparent shadow-lg shadow-orange-900/30 scale-[1.02]'
                                  : 'bg-slate-800/40 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/70'
                              }`}
                            >
                              <User size={12} className={isSelected ? 'text-white' : 'text-slate-500'} />
                              <span className="truncate">{staff}</span>
                              {isHelper && (
                                <span className="bg-slate-700/60 text-slate-400 text-[8px] font-black px-1 rounded ml-auto">H</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Choose Working Day */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                        Pilih Hari Absen
                      </label>
                      <select
                        value={absenDay}
                        onChange={(e) => setAbsenDay(e.target.value)}
                        className="w-full bg-[#121212] border border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#EE4D2D] text-white cursor-pointer"
                      >
                        {DAYS_LIST.map((day) => (
                          <option key={day} value={day} className="bg-slate-900 text-white font-bold">
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Time Input */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                          Waktu Masuk (Jam)
                        </label>
                        <button
                          type="button"
                          onClick={handleSetTimeToNow}
                          className="text-[9px] font-black text-[#EE4D2D] hover:text-[#ff5d3d] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                        >
                          <Clock size={10} />
                          Atur Ke Sekarang
                        </button>
                      </div>
                      <input
                        type="time"
                        value={absenTime}
                        onChange={(e) => setAbsenTime(e.target.value)}
                        className="w-full bg-[#121212] border border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#EE4D2D] text-white"
                      />
                      <p className="text-[9px] text-slate-500 mt-1.5 italic leading-relaxed">
                        Rekomendasi shift sore: masuk pukul 16.00.
                        <br />
                        <span className="text-[#EE4D2D]/90 font-bold">* Jam kerja otomatis dihitung s.d batas selesai:</span>
                        <br />
                        • Senin - Kamis & Minggu s.d <span className="text-white font-bold">23:00</span> (max 7 jam)
                        <br />
                        • Jumat - Sabtu s.d <span className="text-white font-bold">24:00</span> (max 8 jam)
                      </p>
                    </div>

                    {/* Alert Message */}
                    <AnimatePresence>
                      {successMsg && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl text-xs font-bold flex items-start gap-2.5 leading-relaxed"
                        >
                          <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                          <span>{successMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Check In */}
                    <button
                      type="submit"
                      className="w-full bg-[#EE4D2D] hover:bg-[#ff5d3d] text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-2xl shadow-xl shadow-orange-900/40 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus size={14} />
                      Mencatat Absen Masuk
                    </button>
                  </form>
                </section>
              </div>

              {/* Records and History Recap - Column 8 */}
              <div className="lg:col-span-8 space-y-6">
                {/* Spreadsheet style grid */}
                <section className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-slate-800/50">
                  <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs">
                      <FileSpreadsheet size={16} className="text-[#EE4D2D]" />
                      <h2>Rekapan Absensi Absen Masuk</h2>
                    </div>
                    <button
                      onClick={handleResetAttendance}
                      disabled={attendance.length === 0}
                      className={`px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer ${
                        attendance.length > 0
                          ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
                          : 'border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      Reset Rekapan
                    </button>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-800/50">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-900/80 border-b border-slate-800">
                          <th className="p-4 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Nama Staf</th>
                          {DAYS_LIST.map((day) => (
                            <th key={day} className="p-3 text-center text-[9px] font-black text-slate-500 uppercase tracking-widest min-w-[75px]">
                              {day}
                            </th>
                          ))}
                          <th className="p-4 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest min-w-[75px] border-l border-slate-800/80">Kehadiran</th>
                          <th className="p-4 text-center text-[9px] font-black text-[#EE4D2D] uppercase tracking-widest min-w-[95px] border-l border-slate-800/80 bg-slate-900/40">Total Jam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {STAFF_LIST.map((staff) => {
                          const isHelper = HELPER_LIST.includes(staff);
                          const staffRecords = attendance.filter((r) => r.name === staff);
                          const uniqueDaysCount = new Set(staffRecords.map((r) => r.day)).size;
                          const totalHours = staffRecords.reduce((sum, record) => {
                            return sum + calculateWorkedHours(record.day, record.time);
                          }, 0);

                          return (
                            <tr key={staff} className="border-b border-slate-800/30 hover:bg-white/[0.01] transition-all">
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-slate-200">{staff}</span>
                                  {isHelper && (
                                    <span className="bg-orange-500/10 text-orange-400 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-orange-500/20">
                                      Helper
                                    </span>
                                  )}
                                </div>
                              </td>

                              {DAYS_LIST.map((day) => {
                                const dayRecords = staffRecords.filter((r) => r.day === day);
                                return (
                                  <td key={day} className="p-3 text-center">
                                    {dayRecords.length > 0 ? (
                                      <div className="flex flex-col gap-1.5 items-center justify-center">
                                        {dayRecords.map((record, index) => {
                                          const hrs = calculateWorkedHours(record.day, record.time);
                                          return (
                                            <div
                                              key={record.id || index}
                                              className="bg-[#121212]/80 border border-emerald-500/15 text-slate-200 text-[10px] px-2 py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 shadow-md font-mono min-w-[62px]"
                                              title={`Batas keluar hari ${record.day}: ${getShiftEndLimit(record.day)}`}
                                            >
                                              <span className="flex items-center gap-1 font-extrabold text-slate-200">
                                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                                {record.time}
                                              </span>
                                              <span className="text-[8.5px] text-emerald-400 font-extrabold">
                                                {hrs} Jam
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ) : (
                                      <span className="text-slate-850 font-extrabold text-xs">—</span>
                                    )}
                                  </td>
                                );
                              })}

                              <td className="p-4 text-center border-l border-slate-800/40">
                                {uniqueDaysCount > 0 ? (
                                  <div className="inline-flex flex-col items-center justify-center">
                                    <span className="text-sm font-black text-slate-100 font-mono leading-none">
                                      {uniqueDaysCount}
                                    </span>
                                    <span className="text-[8px] font-bold tracking-widest text-slate-500 uppercase mt-1 leading-none">
                                      Hari
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-slate-800 font-bold text-xs">—</span>
                                )}
                              </td>

                              <td className="p-4 text-center border-l border-slate-800/40 bg-slate-900/20">
                                {totalHours > 0 ? (
                                  <div className="inline-flex flex-col items-center justify-center">
                                    <span className="text-sm font-black text-[#EE4D2D] font-mono leading-none">
                                      {totalHours.toFixed(1)}
                                    </span>
                                    <span className="text-[8px] font-bold tracking-widest text-[#EE4D2D]/60 uppercase mt-1 leading-none font-sans">
                                      Jam Kerja
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-slate-800 font-semibold text-xs">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-4 italic flex items-center gap-1.5 leading-relaxed">
                    <Info size={12} className="shrink-0 text-slate-400" />
                    <span>Absensi disimpan otomatis di browser agar riwayat tidak hilang saat halaman disegarkan.</span>
                  </p>
                </section>

                {/* Log Riwayat Aktivitas Baru */}
                <section className="bg-[#1A1A1A] rounded-3xl p-6 shadow-xl border border-slate-800/50">
                  <div className="flex items-center gap-2 mb-4 text-white font-black uppercase tracking-widest text-xs">
                    <History size={16} className="text-[#EE4D2D]" />
                    <h2>Log Riwayat Kedatangan</h2>
                  </div>

                  {attendance.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 rounded-2xl border-2 border-dashed border-slate-800/40 bg-slate-900/10">
                      <AlertCircle size={22} className="mx-auto mb-2 text-slate-600" />
                      <p className="text-xs font-bold uppercase tracking-wider">Belum Ada Absen Masuk</p>
                      <p className="text-[10px] text-slate-600 mt-1">Lakukan absen masuk kerja menggunakan formulir di sebelah kiri.</p>
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                      <AnimatePresence initial={false}>
                        {attendance.map((record) => (
                          <motion.div
                            key={record.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#121212] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/20">
                                <UserCheck size={16} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-sm text-white">{record.name}</span>
                                  <span className="bg-slate-800 text-slate-400 text-[8.5px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-slate-700">
                                    {record.day}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1">
                                  Masuk Kerja: <span className="text-emerald-400 font-black">{record.time}</span>
                                  <span className="text-slate-700 mx-1.5">•</span>
                                  Estimasi Kerja: <span className="text-indigo-400 font-black">{calculateWorkedHours(record.day, record.time)} Jam</span>{" "}
                                  <span className="text-slate-600 text-[9px] italic">(Batas {getShiftEndLimit(record.day)})</span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteAttendance(record.id)}
                              className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                              title="Hapus Absensi"
                            >
                              <Trash2 size={13} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StaffBadgeProps {
  name: string;
  isSelected: boolean;
  isAnySelected: boolean;
  isHelper?: boolean;
}

const StaffBadge: React.FC<StaffBadgeProps> = ({ 
  name, 
  isSelected, 
  isAnySelected,
  isHelper = false
}) => {
  const isActive = isSelected || !isAnySelected;
  
  return (
    <div 
      className={`
        px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border
        ${isActive 
          ? isSelected 
            ? 'bg-[#EE4D2D] text-white scale-110 shadow-xl shadow-orange-900/40 border-transparent' 
            : isHelper 
              ? 'bg-orange-500/5 border-2 border-dashed border-orange-500/30 text-orange-400'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
          : 'bg-slate-900/50 text-slate-700 opacity-20 grayscale border-transparent'
        }
      `}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${
        isSelected 
          ? 'bg-white animate-pulse' 
          : 'bg-indigo-500'
      }`} />
      {name} {isHelper && <span className="text-[8px] opacity-60">(H)</span>}
    </div>
  );
}
