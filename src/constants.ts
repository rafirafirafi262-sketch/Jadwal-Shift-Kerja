import { DailySchedule, StaffConstraint } from './types';

export const MAIN_ROSTER = ['Pegawai 1', 'Pegawai 2', 'Fiska', 'Ningrum', 'Aisha', 'Adam'];
export const HELPER_LIST: string[] = [];
export const STAFF_LIST = [...MAIN_ROSTER];

export const SCHEDULE_DATA: DailySchedule[] = [
  { day: 'Senin', staff: ['Pegawai 1', 'Pegawai 2', 'Fiska'] },
  { day: 'Selasa', staff: ['Pegawai 1', 'Pegawai 2', 'Adam'] },
  { day: 'Rabu', staff: ['Pegawai 1', 'Pegawai 2', 'Fiska'] },
  { day: 'Kamis', staff: ['Pegawai 1', 'Pegawai 2', 'Fiska'] },
  { day: 'Jumat', staff: ['Pegawai 1', 'Pegawai 2', 'Fiska', 'Aisha'] },
  { day: 'Sabtu', staff: ['Pegawai 1', 'Pegawai 2', 'Aisha'] },
  { day: 'Minggu', staff: ['Pegawai 1', 'Pegawai 2', 'Aisha', 'Adam'] }
];

export const STAFF_CONSTRAINTS: StaffConstraint[] = [
  { name: 'Roster Utama', constraint: 'Pegawai 1, Pegawai 2, Fiska, Ningrum, Aisha, Adam' },
  { name: 'Pegawai 1 & Pegawai 2', constraint: 'Piket Penuh / Tidak Ada Hari Libur' },
  { name: 'Fiska', constraint: 'Jadwal Tetap (Senin, Rabu, Kamis, Jumat)' },
  { name: 'Ningrum', constraint: 'Off / Cuti Selama 1 Minggu' },
  { name: 'Aisha', constraint: 'Bertugas hari Jumat, Sabtu, Minggu' },
  { name: 'Adam', constraint: 'Bertugas hari Selasa & Minggu' }
];
