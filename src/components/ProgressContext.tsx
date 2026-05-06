import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressState {
  quiz: boolean; // true if 5/5
  timeline: number; // 0 to 6
  howItWorks: number; // 0 to 6
  myths: number; // 0 to 6
  userName: string;
}

interface ProgressContextType {
  progress: ProgressState;
  setQuizCompleted: (val: boolean) => void;
  updateTimeline: (id: string) => void;
  updateHowItWorks: (id: number) => void;
  updateMyths: (id: number) => void;
  setUserName: (name: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>({
    quiz: false,
    timeline: 0,
    howItWorks: 0,
    myths: 0,
    userName: ''
  });

  const [visitedTimeline, setVisitedTimeline] = useState<Set<string>>(new Set());
  const [visitedHowItWorks, setVisitedHowItWorks] = useState<Set<number>>(new Set());
  const [visitedMyths, setVisitedMyths] = useState<Set<number>>(new Set());

  const setQuizCompleted = (val: boolean) => setProgress(p => ({ ...p, quiz: val }));
  const setUserName = (name: string) => setProgress(p => ({ ...p, userName: name }));

  const updateTimeline = (id: string) => {
    setVisitedTimeline(prev => {
      const next = new Set(prev).add(id);
      setProgress(p => ({ ...p, timeline: next.size }));
      return next;
    });
  };

  const updateHowItWorks = (id: number) => {
    setVisitedHowItWorks(prev => {
      const next = new Set(prev).add(id);
      setProgress(p => ({ ...p, howItWorks: next.size }));
      return next;
    });
  };

  const updateMyths = (id: number) => {
    setVisitedMyths(prev => {
      const next = new Set(prev).add(id);
      setProgress(p => ({ ...p, myths: next.size }));
      return next;
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, setQuizCompleted, updateTimeline, updateHowItWorks, updateMyths, setUserName }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
