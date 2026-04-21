import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export function StudentManagementPage() {
  const { currentClassId, students, addStudent, deleteStudent } = useAppContext();
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');

  const classStudents = students.filter(s => s.classId === currentClassId);

  const handleAddStudent = () => {
    if (currentClassId && studentNumber.trim() && studentName.trim()) {
      addStudent(currentClassId, parseInt(studentNumber), studentName);
      setStudentNumber('');
      setStudentName('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-xl">
        <h2 className="mb-4 text-xl font-bold text-white">管理學生名單</h2>

        <div className="mb-6 rounded-lg bg-slate-700/30 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">單筆新增學生</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              type="number"
              placeholder="座號"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-400"
            />
            <input
              type="text"
              placeholder="姓名"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-400"
            />
            <button
              onClick={handleAddStudent}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
            >
              新增
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            ※ 新增後請至「座位編輯」將其排入位置。
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            現有名單 ({classStudents.length}人)
          </h3>
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {classStudents.length === 0 ? (
              <p className="text-slate-400">尚無學生</p>
            ) : (
              classStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-lg bg-slate-700/30 p-3"
                >
                  <span className="text-white">
                    {student.number.toString().padStart(2, '0')} {student.name}
                  </span>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    刪除
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
