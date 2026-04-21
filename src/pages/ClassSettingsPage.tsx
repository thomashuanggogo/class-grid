import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface ClassSettingsPageProps {
  onStudentManage: () => void;
}

export function ClassSettingsPage({ onStudentManage }: ClassSettingsPageProps) {
  const { classes, currentClassId, addClass, setCurrentClass, updateClass } = useAppContext();
  const [showNewClass, setShowNewClass] = useState(false);
  const [className, setClassName] = useState('');
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);

  const current = classes.find(c => c.id === currentClassId);

  const handleAddClass = () => {
    if (className.trim()) {
      addClass(className, rows, cols);
      setClassName('');
      setRows(6);
      setCols(6);
      setShowNewClass(false);
    }
  };

  const handleUpdateClass = () => {
    if (editingClassId && current) {
      updateClass(editingClassId, rows, cols);
      setEditingClassId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">班級選擇</h2>
        </div>
        <select
          value={currentClassId || ''}
          onChange={(e) => setCurrentClass(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white"
        >
          <option value="">選擇班級...</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowNewClass(!showNewClass)}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
        >
          + 新增班級
        </button>

        {showNewClass && (
          <div className="mt-4 space-y-4 rounded-lg bg-slate-700/30 p-4">
            <input
              type="text"
              placeholder="班級名稱"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="行數"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value))}
                className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white"
              />
              <input
                type="number"
                placeholder="列數"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value))}
                className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white"
              />
            </div>
            <button
              onClick={handleAddClass}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
            >
              確認新增
            </button>
          </div>
        )}
      </div>

      {current && (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{current.name} 設定</h2>
          </div>

          {!editingClassId ? (
            <div className="space-y-4">
              <p className="text-slate-300">座位配置: {current.rows} × {current.cols}</p>
              <button
                onClick={() => setEditingClassId(current.id)}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
              >
                編輯班級配置
              </button>
              <button
                onClick={onStudentManage}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
              >
                管理學生名單
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">行數</label>
                  <input
                    type="number"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">列數</label>
                  <input
                    type="number"
                    value={cols}
                    onChange={(e) => setCols(parseInt(e.target.value))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white"
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateClass}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
              >
                儲存變更
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
