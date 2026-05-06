import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Search, Vote, Info, MapPin, ShieldCheck, HelpCircle } from 'lucide-react';
import { useProgress } from './ProgressContext';

const guides = [
  { id: 1, title: 'Check Enrollment', icon: <ClipboardCheck />, steps: ['Verify name in roll', 'Check polling booth'] },
  { id: 2, title: 'Research Candidates', icon: <Search />, steps: ['Review affidavits', 'Check track record'] },
  { id: 3, title: 'Locate Booth', icon: <MapPin />, steps: ['Find booth location', 'Check accessibility'] },
  { id: 4, title: 'ID Verification', icon: <ShieldCheck />, steps: ['Bring Voter ID (EPIC)', 'Or 12 alternate IDs'] },
  { id: 5, title: 'In-Booth Process', icon: <HelpCircle />, steps: ['Finger marking', 'Press EVM button'] },
  { id: 6, title: 'Collect Slip', icon: <Vote />, steps: ['Verify VVPAT slip', 'Collect ink mark'] },
];

export const GuideSection: React.FC = () => {
  const { updateHowItWorks } = useProgress();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {guides.map((guide, idx) => (
        <motion.div
          key={guide.id}
          onViewportEnter={() => updateHowItWorks(guide.id)}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full group hover:border-blue-200 transition-all"
        >
          <div className="w-12 h-12 bg-slate-50 group-hover:bg-blue-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 mb-6 transition-colors">
            {guide.icon}
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">{guide.title}</h4>
          <ul className="space-y-3 flex-1">
            {guide.steps.map((step, sIdx) => (
              <li key={sIdx} className="flex gap-3 text-sm text-slate-500">
                <span className="w-5 h-5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {sIdx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
