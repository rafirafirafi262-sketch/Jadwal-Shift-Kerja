import { DailySchedule, StaffConstraint } from './types';

export const MAIN_ROSTER = ['Fiska', 'Ningrum', 'Aisha'];
export const HELPER_LIST = ['Adam', 'Farrel'];
export const STAFF_LIST = [...MAIN_ROSTER, ...HELPER_LIST];

export const SCHEDULE_DATA: DailySchedule[] = [
  {
    day: 'Senin',
    shifts: {
      pagi: { main: ['Fiska', 'Ningrum'], helper: ['Adam'] },
      malam: { main: ['Fiska', 'Ningrum'], helper: ['Adam'] }
    }
  },
  {
    day: 'Selasa',
    shifts: {
      pagi: { main: ['Fiska', 'Ningrum'], helper: ['Adam'] },
      malam: { main: ['Aisha', 'Fiska'], helper: ['Farrel'] }
    }
  },
  {
    day: 'Rabu',
    shifts: {
      pagi: { main: ['Fiska', 'Ningrum'], helper: ['Adam'] },
      malam: { main: ['Aisha', 'Ningrum'], helper: ['Farrel'] }
    }
  },
  {
    day: 'Kamis',
    shifts: {
      pagi: { main: ['Fiska', 'Aisha'], helper: ['Adam'] },
      malam: { main: ['Ningrum', 'Aisha'], helper: ['Farrel'] }
    }
  },
  {
    day: 'Jumat',
    shifts: {
      pagi: { main: ['Fiska', 'Ningrum'], helper: ['Adam'] },
      malam: { main: ['Fiska', 'Aisha'], helper: ['Farrel'] }
    }
  },
  {
    day: 'Sabtu',
    shifts: {
      pagi: { main: ['Fiska', 'Aisha'], helper: ['Adam'] },
      malam: { main: ['Fiska', 'Ningrum', 'Aisha'], helper: ['Farrel'] }
    }
  },
  {
    day: 'Minggu',
    shifts: {
      pagi: { main: ['Ningrum', 'Aisha'], helper: ['Farrel'] },
      malam: { main: ['Fiska', 'Ningrum', 'Aisha'], helper: ['Adam'] }
    }
  }
];

export const STAFF_CONSTRAINTS: StaffConstraint[] = [
  { name: 'Roster Utama', constraint: 'Fiska, Ningrum, Aisha (Wajib 2 per shift)' },
  { name: 'Helper (Opsional)', constraint: 'Adam & Farrel (Bisa datang/tidak)' },
  { name: 'Aisha & Farrel', constraint: 'Libur Senin' },
  { name: 'Farrel', constraint: 'Sekolah di pagi hari kerja' },
  { name: 'Aisha', constraint: 'Berhalangan di Selasa/Rabu pagi' },
  { name: 'Ningrum', constraint: 'Berhalangan Sabtu pagi' }
];

export const LEBARAN_SCHEDULE_DATA = [
  { day: 'Senin', staff: ['Fiska', 'Ningrum', 'Adam'] },
  { day: 'Selasa', staff: ['Aisha', 'Farrel', 'Fiska'] },
  { day: 'Rabu', staff: ['Aisha', 'Adam', 'Ningrum'] },
  { day: 'Kamis', staff: ['Farrel', 'Fiska', 'Adam'] },
  { day: 'Jumat', staff: ['Aisha', 'Ningrum', 'Farrel'] },
  { day: 'Sabtu', staff: ['Fiska', 'Ningrum', 'Aisha', 'Adam', 'Farrel'] },
  { day: 'Minggu', staff: ['Fiska', 'Ningrum', 'Aisha', 'Adam', 'Farrel'] }
];
