export type ShiftType = 'Pagi' | 'Malam';

export interface ShiftAssignment {
  pagi: string[];
  malam: string[];
}

export interface DailySchedule {
  day: string;
  shifts: ShiftAssignment;
}

export interface StaffConstraint {
  name: string;
  constraint: string;
}
