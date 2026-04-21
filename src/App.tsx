import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { ClassSettingsPage } from './pages/ClassSettingsPage';
import './index.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'settings' | 'seats' | 'scoring' | 'export'>('settings');
  const { classes, addClass } = useAppContext();
  const [showForm, setShowForm] = useState(classes.length === 0);

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
                id="classNameInput"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="行數"
                  defaultValue="6"
                  id="rowsInput"
                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white"
                />
                <input
                  type="number"
                  placeholder="列數"
                  defaultValue="6"
                  id="colsInput"
                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white"
                />
              </div>
              <button
                onClick={() => {
                  const name = (document.getElementById('classNameInput') as HTMLInputElement)?.value;
                  const rows = parseInt((document.getElementById('rowsInput') as HTMLInputElement)?.value || '6');
                  const cols = parseInt((document.getElementById('colsInput') as HTMLInputElement)?.value || '6');
                  if (name) {
                    addClass(name, rows, cols);
                    setShowForm(false);
                  }
                }}
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
