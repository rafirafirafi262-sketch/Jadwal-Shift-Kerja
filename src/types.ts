export interface DailySchedule {
  day: string;
  pagi: string[];
  sore: string[];
  libur: string[];
}

export interface StaffConstraint {
  name: string;
  constraint: string;
}

export interface AttendanceRecord {
  id: string;
  name: string;
  day: string;
  time: string;
  timestamp: number;
}
