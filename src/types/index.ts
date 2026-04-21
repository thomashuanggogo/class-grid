export interface Class {
  id: string;
  name: string;
  rows: number;
  cols: number;
  createdAt: number;
}

export interface Student {
  id: string;
  classId: string;
  number: number; // 座號
  name: string;
  createdAt: number;
}

export interface Seat {
  id: string;
  classId: string;
  row: number;
  col: number;
  studentId: string | null;
}

export interface ScoreRecord {
  id: string;
  classId: string;
  studentId: string;
  score: number;
  timestamp: number;
}

export interface ScoreCategory {
  id: string;
  label: string;
  score: number;
  color: 'green' | 'red';
}
