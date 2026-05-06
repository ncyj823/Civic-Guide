import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Type, Eye, MousePointer2, Volume2, RotateCcw } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  highContrast: boolean;
  dyslexicFont: boolean;
  reduceMotion: boolean;
  srHints: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'Medium',
  highContrast: false,
  dyslexicFont: false,
  reduceMotion: false,
  srHints: false,
};

const fontScales = {
  'Small': 0.85,
  'Medium': 1,
  'Large': 1.15,
  'Extra Large': 1.3
};

export const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // Apply settings to document body/root
    document.documentElement.style.setProperty('--font-scale', fontScales[settings.fontSize].toString());
    
    if (settings.highContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');

    if (settings.dyslexicFont) document.body.classList.add('dyslexic-font');
    else document.body.classList.remove('dyslexic-font');

    if (settings.reduceMotion) document.body.classList.add('reduce-motion');
    else document.body.classList.remove('reduce-motion');

    if (settings.srHints) document.body.classList.add('show-sr-hints');
    else document.body.classList.remove('show-sr-hints');

  }, [settings]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFontSize = (val: string) => {
    setSettings(prev => ({ ...prev, fontSize: val as any }));
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Accessibility Settings"
          className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:scale-110 transition-all group"
        >
          <Settings className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Side Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ translateX: '100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[120] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                    <Settings size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Accessibility</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                {/* Font Size */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <Type size={14} />
                    Text Size
                  </div>
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min="0" 
                      max="3" 
                      step="1"
                      value={Object.keys(fontScales).indexOf(settings.fontSize)}
                      onChange={(e) => updateFontSize(Object.keys(fontScales)[parseInt(e.target.value)])}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                      <span>Extra</span>
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <Eye size={14} />
                    Visual Aids
                  </div>
                  <div className="space-y-3">
                    <AccessibilityToggle 
                      label="High Contrast" 
                      active={settings.highContrast} 
                      onClick={() => toggleSetting('highContrast')} 
                    />
                    <AccessibilityToggle 
                      label="Dyslexia Friendly Font" 
                      active={settings.dyslexicFont} 
                      onClick={() => toggleSetting('dyslexicFont')} 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <MousePointer2 size={14} />
                    Motion & Interaction
                  </div>
                  <div className="space-y-3">
                    <AccessibilityToggle 
                      label="Reduce Motion" 
                      active={settings.reduceMotion} 
                      onClick={() => toggleSetting('reduceMotion')} 
                    />
                    <AccessibilityToggle 
                      label="Screen Reader Hints" 
                      active={settings.srHints} 
                      onClick={() => toggleSetting('srHints')} 
                      hint="Shows aria-labels as visible text"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                <button 
                  onClick={resetDefaults}
                  className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                >
                  <RotateCcw size={18} />
                  Reset to Defaults
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                  Your settings are applied instantly and saved for this session.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const AccessibilityToggle = ({ label, active, onClick, hint }: { label: string, active: boolean, onClick: () => void, hint?: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${active ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'}`}
  >
    <div className="text-left">
      <span className="font-bold text-sm block">{label}</span>
      {hint && <span className="text-[10px] opacity-60 font-medium block mt-0.5">{hint}</span>}
    </div>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-blue-600' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`} />
    </div>
  </button>
);
