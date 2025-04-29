
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export type UserRole = "student" | "teacher" | "admin" | "parent" | "hod" | "dean";

export interface Course {
  id: string;
  name: string;
  code: string;
  teacher: string;
  schedule: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  courseId: string;
  status: "present" | "absent" | "late";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "alert" | "info" | "warning" | "success";
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}
