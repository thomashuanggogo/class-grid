import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Class, Student, Seat, ScoreRecord } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  classes: Class[];
  students: Student[];
  seats: Seat[];
  scoreRecords: ScoreRecord[];
  currentClassId: string | null;

  // Class methods
  addClass: (className: string, rows: number, cols: number) => void;
  deleteClass: (classId: string) => void;
  updateClass: (classId: string, rows: number, cols: number) => void;
  setCurrentClass: (classId: string) => void;

  // Student methods
  addStudent: (classId: string, number: number, name: string) => void;
  deleteStudent: (studentId: string) => void;

  // Seat methods
  assignSeat: (seatId: string, studentId: string | null) => void;
  swapSeats: (seatId1: string, seatId2: string) => void;

  // Score methods
  addScore: (classId: string, studentId: string, score: number) => void;
  getStudentScore: (studentId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useLocalStorage<Class[]>('classes', []);
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [seats, setSeats] = useLocalStorage<Seat[]>('seats', []);
  const [scoreRecords, setScoreRecords] = useLocalStorage<ScoreRecord[]>('scoreRecords', []);
  const [currentClassId, setCurrentClassId] = useLocalStorage<string | null>('currentClassId', null);

  const addClass = (className: string, rows: number, cols: number) => {
    const newClass: Class = {
      id: Date.now().toString(),
      name: className,
      rows,
      cols,
      createdAt: Date.now(),
    };
    setClasses([...classes, newClass]);
    setCurrentClassId(newClass.id);

    // Initialize seats for this class
    const newSeats: Seat[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newSeats.push({
          id: `${newClass.id}-${row}-${col}`,
          classId: newClass.id,
          row,
          col,
          studentId: null,
        });
      }
    }
    setSeats([...seats, ...newSeats]);
  };

  const deleteClass = (classId: string) => {
    setClasses(classes.filter(c => c.id !== classId));
    setStudents(students.filter(s => s.classId !== classId));
    setSeats(seats.filter(s => s.classId !== classId));
    setScoreRecords(scoreRecords.filter(r => r.classId !== classId));
    if (currentClassId === classId) {
      setCurrentClassId(classes[0]?.id || null);
    }
  };

  const updateClass = (classId: string, rows: number, cols: number) => {
    const updatedClasses = classes.map(c =>
      c.id === classId ? { ...c, rows, cols } : c
    );
    setClasses(updatedClasses);

    // Update seats
    const newSeats = seats.filter(s => s.classId !== classId);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newSeats.push({
          id: `${classId}-${row}-${col}`,
          classId,
          row,
          col,
          studentId: null,
        });
      }
    }
    setSeats(newSeats);
  };

  const addStudent = (classId: string, number: number, name: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      classId,
      number,
      name,
      createdAt: Date.now(),
    };
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    setSeats(seats.map(seat =>
      seat.studentId === studentId ? { ...seat, studentId: null } : seat
    ));
  };

  const assignSeat = (seatId: string, studentId: string | null) => {
    setSeats(seats.map(seat =>
      seat.id === seatId ? { ...seat, studentId } : seat
    ));
  };

  const swapSeats = (seatId1: string, seatId2: string) => {
    const seat1 = seats.find(s => s.id === seatId1);
    const seat2 = seats.find(s => s.id === seatId2);

    if (seat1 && seat2) {
      setSeats(seats.map(seat => {
        if (seat.id === seatId1) return { ...seat, studentId: seat2.studentId };
        if (seat.id === seatId2) return { ...seat, studentId: seat1.studentId };
        return seat;
      }));
    }
  };

  const addScore = (classId: string, studentId: string, score: number) => {
    const newRecord: ScoreRecord = {
      id: Date.now().toString(),
      classId,
      studentId,
      score,
      timestamp: Date.now(),
    };
    setScoreRecords([...scoreRecords, newRecord]);
  };

  const getStudentScore = (studentId: string): number => {
    return scoreRecords
      .filter(r => r.studentId === studentId)
      .reduce((sum, r) => sum + r.score, 0);
  };

  const value: AppContextType = {
    classes,
    students,
    seats,
    scoreRecords,
    currentClassId,
    addClass,
    deleteClass,
    updateClass,
    setCurrentClass: setCurrentClassId,
    addStudent,
    deleteStudent,
    assignSeat,
    swapSeats,
    addScore,
    getStudentScore,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
