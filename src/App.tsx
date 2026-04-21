import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { ClassSettingsPage } from './pages/ClassSettingsPage';
import './index.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'settings' | 'seats' | 'scoring' | 'export'>('settings');
  const { classes } = useAppContext();

  if (classes.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-4 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-xl">
          <h1 className="mb-4 text-3xl font-bold text-white">ClassGrid</h1>
          <p className="mb-6 text-slate-300">歡迎使用課堂管理系統</p>
          <ClassSettingsPage onStudentManage={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === 'settings' && (
        <ClassSettingsPage onStudentManage={() => {}} />
      )}
      {currentPage === 'seats' && <div className="text-white">座位編輯頁面 (開發中)</div>}
      {currentPage === 'scoring' && <div className="text-white">快速評分頁面 (開發中)</div>}
      {currentPage === 'export' && <div className="text-white">統計匯出頁面 (開發中)</div>}
    </Layout>
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
