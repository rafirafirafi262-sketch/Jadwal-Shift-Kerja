import { DailySchedule, StaffConstraint } from './types';

export const SCHEDULE_DATA: DailySchedule[] = [
  {
    day: 'Senin',
    shifts: {
      pagi: [],
      malam: ['Fiska', 'Ningrum', 'Adam']
    }
  },
  {
    day: 'Selasa',
    shifts: {
      pagi: ['Fiska', 'Adam'],
      malam: ['Aisha', 'Ningrum', 'Farrel']
    }
  },
  {
    day: 'Rabu',
    shifts: {
      pagi: ['Fiska', 'Ningrum'],
      malam: ['Aisha', 'Adam', 'Farrel']
    }
  },
  {
    day: 'Kamis',
    shifts: {
      pagi: ['Fiska', 'Adam'],
      malam: ['Aisha', 'Ningrum', 'Farrel']
    }
  },
  {
    day: 'Jumat',
    shifts: {
      pagi: ['Fiska', 'Ningrum'],
      malam: ['Aisha', 'Adam', 'Farrel']
    }
  },
  {
    day: 'Sabtu',
    shifts: {
      pagi: ['Aisha', 'Adam'],
      malam: ['Fiska', 'Ningrum', 'Farrel']
    }
  },
  {
    day: 'Minggu',
    shifts: {
      pagi: ['Aisha', 'Farrel'],
      malam: ['Fiska', 'Ningrum', 'Adam']
    }
  }
];

export const STAFF_CONSTRAINTS: StaffConstraint[] = [
  { name: 'Aisha & Farrel', constraint: 'Libur Senin' },
  { name: 'Farrel', constraint: 'Sekolah di pagi hari kerja' },
  { name: 'Aisha', constraint: 'Berhalangan di Selasa/Rabu pagi' },
  { name: 'Ningrum', constraint: 'Berhalangan Sabtu pagi' }
];

export const STAFF_LIST = ['Fiska', 'Ningrum', 'Adam', 'Aisha', 'Farrel'];
