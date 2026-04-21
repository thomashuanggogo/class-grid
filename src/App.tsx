import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { ClassSettingsPage } from './pages/ClassSettingsPage';
import './index.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'settings' | 'seats' | 'scoring' | 'export'>('settings');
  const { classes, addClass } = useAppContext();
  const [showForm, setShowForm] = useState(classes.length === 0);
  const [className, setClassName] = useState('');
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);

  console.log('AppContent rendered, classes:', classes, 'showForm:', showForm);

  const handleCreateClass = () => {
    console.log('handleCreateClass called, className:', className);
    if (className.trim()) {
      console.log('Creating class:', className, rows, cols);
      addClass(className, rows, cols);
      setClassName('');
      setRows(6);
      setCols(6);
      setShowForm(false);
    } else {
      console.log('Class name is empty');
    }
  };

  return (
    <>
      {classes.length === 0 && showForm ? (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-xl">
            <h1 className="mb-2 text-3xl font-bold text-white">ClassGrid</h1>
            <p className="mb-6 text-slate-300">歡迎使用課堂管理系統</p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="班級名稱"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="行數"
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value) || 6)}
                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white"
                />
                <input
                  type="number"
                  placeholder="列數"
                  value={cols}
                  onChange={(e) => setCols(parseInt(e.target.value) || 6)}
                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white"
                />
              </div>
              <button
                onClick={handleCreateClass}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
              >
                創建班級
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
          {currentPage === 'settings' && <ClassSettingsPage onStudentManage={() => {}} />}
          {currentPage === 'seats' && <div className="text-white">座位編輯頁面 (開發中)</div>}
          {currentPage === 'scoring' && <div className="text-white">快速評分頁面 (開發中)</div>}
          {currentPage === 'export' && <div className="text-white">統計匯出頁面 (開發中)</div>}
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
