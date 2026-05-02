import { DailySchedule, StaffConstraint } from './types';

export const MAIN_ROSTER = ['Fiska', 'Ningrum', 'Aisha'];
export const HELPER_LIST = ['Adam', 'Farrel'];
export const STAFF_LIST = [...MAIN_ROSTER, ...HELPER_LIST];

export const SCHEDULE_DATA: DailySchedule[] = [
  { day: 'Senin', staff: ['Fiska', 'Ningrum', 'Adam'] },
  { day: 'Selasa', staff: ['Adam', 'Farrel', 'Fiska'] },
  { day: 'Rabu', staff: ['Aisha', 'Adam', 'Ningrum'] },
  { day: 'Kamis', staff: ['Farrel', 'Fiska', 'Aisha'] },
  { day: 'Jumat', staff: ['Fiska', 'Ningrum', 'Aisha', 'Adam', 'Farrel'] },
  { day: 'Sabtu', staff: ['Fiska', 'Ningrum', 'Aisha', 'Adam', 'Farrel'] },
  { day: 'Minggu', staff: ['Aisha', 'Ningrum', 'Farrel'] }
];

export const STAFF_CONSTRAINTS: StaffConstraint[] = [
  { name: 'Roster Utama', constraint: 'Fiska, Ningrum, Aisha' },
  { name: 'Helper (Opsional)', constraint: 'Adam & Farrel (Bisa datang/tidak)' },
  { name: 'Aisha & Farrel', constraint: 'Libur Senin' },
  { name: 'Jam Operasional', constraint: '16.00 – 24.00 (Shift Sore/Malam)' }
];
