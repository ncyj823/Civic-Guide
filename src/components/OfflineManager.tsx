import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, CheckCircle2, Trash2, Database, ShieldCheck, Loader2 } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  size: number; // in KB
  downloading: boolean;
  saved: boolean;
}

const INITIAL_MODULES: Module[] = [
  { id: 'timeline', name: 'Timeline & Phases', size: 124, downloading: false, saved: false },
  { id: 'glossary', name: 'Civic Glossary', size: 85, downloading: false, saved: false },
  { id: 'quiz', name: 'Constitutional Quiz', size: 42, downloading: false, saved: false },
  { id: 'booth', name: 'Booth Locator (Mock)', size: 156, downloading: false, saved: false },
  { id: 'candidates', name: 'Candidate Database', size: 312, downloading: false, saved: false },
];

export const OfflineStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`w-full py-2 px-4 flex justify-center items-center gap-2 transition-colors duration-500 ${isOnline ? 'bg-green-50' : 'bg-amber-50'}`}>
      {isOnline ? (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
          <Wifi size={12} />
          Live
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
          <WifiOff size={12} />
          Offline — Cached Content
        </div>
      )}
      <span className={`text-[10px] font-bold uppercase tracking-tight ${isOnline ? 'text-green-700' : 'text-amber-700'}`}>
        {isOnline ? 'You are connected to the network' : 'Using saved data for all modules'}
      </span>
    </div>
  );
};

export const OfflineManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [isClearing, setIsClearing] = useState(false);

  const startDownload = (id: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, downloading: true } : m));

    // Simulate download
    setTimeout(() => {
      setModules(prev => prev.map(m => m.id === id ? { ...m, downloading: false, saved: true } : m));
    }, 1500);
  };

  const clearCache = () => {
    if (window.confirm('Are you sure you want to clear all cached offline content?')) {
      setIsClearing(true);
      setTimeout(() => {
        setModules(INITIAL_MODULES);
        setIsClearing(false);
      }, 800);
    }
  };

  const totalSize = modules.filter(m => m.saved).reduce((acc, m) => acc + m.size, 0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-10">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-100/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} />
              PWA Capabilities
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Offline Access</h2>
            <p className="text-slate-500 mt-2">Download critical election modules to access them even without internet.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center min-w-[200px]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Cached Size</p>
            <div className="flex items-center justify-center gap-2">
              <Database size={20} className="text-blue-600" />
              <span className="text-2xl font-black text-slate-900">{totalSize} KB</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {modules.map(module => (
            <div 
              key={module.id} 
              className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${module.saved ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400 group-hover:text-blue-600'}`}>
                  {module.saved ? <CheckCircle2 size={20} /> : <Download size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{module.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.size} KB</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {module.downloading && (
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                    <div className="h-full bg-blue-600 animate-progress origin-left" />
                  </div>
                )}
                
                {module.saved ? (
                  <span className="text-xs font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                    Saved
                  </span>
                ) : (
                  <button 
                    onClick={() => startDownload(module.id)}
                    disabled={module.downloading}
                    className="p-3 bg-white text-slate-900 rounded-xl border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm disabled:opacity-50"
                  >
                    {module.downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 max-w-sm">
            All data is stored locally in your browser's persistent storage for fast loading and offline use.
          </p>
          <button 
            onClick={clearCache}
            disabled={totalSize === 0 || isClearing}
            className="px-6 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all disabled:opacity-30 disabled:grayscale"
          >
            {isClearing ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this to index.css if not present, but for simulation we can use tailwind's animate-pulse or custom class
