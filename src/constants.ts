import { DailySchedule, StaffConstraint } from './types';

export const MAIN_ROSTER = ['Rafi', 'Fiska', 'Pasya', 'Aisha', 'Lutfhi'];
export const HELPER_LIST: string[] = [];
export const STAFF_LIST = [...MAIN_ROSTER];

export const SCHEDULE_DATA: DailySchedule[] = [
  { day: 'Senin', pagi: [], sore: ['Rafi', 'Fiska', 'Pasya'], libur: ['Aisha', 'Lutfhi'] },
  { day: 'Selasa', pagi: [], sore: ['Fiska', 'Pasya', 'Lutfhi'], libur: ['Rafi', 'Aisha'] },
  { day: 'Rabu', pagi: [], sore: ['Fiska', 'Aisha'], libur: ['Rafi', 'Pasya', 'Lutfhi'] },
  { day: 'Kamis', pagi: [], sore: ['Rafi', 'Aisha', 'Lutfhi'], libur: ['Fiska', 'Pasya'] },
  { day: 'Jumat', pagi: [], sore: ['Aisha', 'Pasya', 'Lutfhi'], libur: ['Rafi', 'Fiska'] },
  { day: 'Sabtu', pagi: ['Fiska', 'Pasya'], sore: ['Rafi', 'Aisha', 'Lutfhi'], libur: [] },
  { day: 'Minggu', pagi: ['Rafi', 'Aisha'], sore: ['Fiska', 'Pasya', 'Lutfhi'], libur: [] }
];

export const STAFF_CONSTRAINTS: StaffConstraint[] = [
  { name: 'Roster Utama', constraint: 'Rafi, Fiska, Pasya, Aisha, Lutfhi' },
  { name: 'Shift Pagi', constraint: 'Hanya ada di hari Sabtu & Minggu (2 Orang)' },
  { name: 'Shift Sore', constraint: 'Setiap hari (Maksimal 3 Orang)' },
  { name: 'Keterangan Libur', constraint: 'Staf yang tertulis ⛔ Libur tidak bertugas pada hari tersebut' }
];
