export type ShiftType = 'Pagi' | 'Malam';

export interface ShiftAssignment {
  pagi: { main: string[]; helper: string[] };
  malam: { main: string[]; helper: string[] };
}

export interface DailySchedule {
  day: string;
  shifts: ShiftAssignment;
}

export interface StaffConstraint {
  name: string;
  constraint: string;
}
