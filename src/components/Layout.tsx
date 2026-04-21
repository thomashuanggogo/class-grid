import React from 'react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'settings' | 'seats' | 'scoring' | 'export';
  onPageChange: (page: 'settings' | 'seats' | 'scoring' | 'export') => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const { classes, currentClassId } = useAppContext();
  const current = classes.find(c => c.id === currentClassId);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-2xl font-bold text-white">ClassGrid</h1>
          {current && <p className="text-slate-400">{current.name}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </div>

      <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-around gap-4">
            {(['settings', 'seats', 'scoring', 'export'] as const).map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex flex-col items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                  currentPage === page
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span>{page === 'settings' ? '⚙️' : page === 'seats' ? '📋' : page === 'scoring' ? '📊' : '📥'}</span>
                <span className="text-xs">
                  {page === 'settings' && '班級設定'}
                  {page === 'seats' && '座位編輯'}
                  {page === 'scoring' && '快速評分'}
                  {page === 'export' && '統計匯出'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
