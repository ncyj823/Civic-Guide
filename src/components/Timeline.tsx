import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, Flag, ArrowRight, ClipboardCheck, Search, Vote, Landmark, Scale } from 'lucide-react';
import { useProgress } from './ProgressContext';

const steps = [
  { id: '1', title: 'Voter Registration', dateRange: 'Ongoing', description: 'Apply for voter ID or update your details.', icon: <ClipboardCheck size={20} /> },
  { id: '2', title: 'Candidate Nominations', dateRange: 'Phase 1', description: 'Political parties finalize their candidate lists.', icon: <Landmark size={20} /> },
  { id: '3', title: 'Scrutiny & Withdrawal', dateRange: 'Phase 2', description: 'Verification of nomination papers by officials.', icon: <Search size={20} /> },
  { id: '4', title: 'Campaigning Period', dateRange: '2 Weeks', description: 'Candidates share their manifestos and platforms.', icon: <Vote size={20} /> },
  { id: '5', title: 'Polling Day', dateRange: 'Election Day', description: 'The big day! Cast your vote at your assigned booth.', icon: <CheckCircle2 size={20} /> },
  { id: '6', title: 'Counting & Results', dateRange: 'Post-Election', description: 'The official counting of votes and declaration of winners.', icon: <Flag size={20} /> },
];

export const Timeline: React.FC = () => {
  const { updateTimeline } = useProgress();

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            onViewportEnter={() => updateTimeline(step.id)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6 group"
          >
            {index !== steps.length - 1 && (
              <div className="absolute left-6 top-10 bottom-0 w-[2px] bg-slate-100 group-hover:bg-blue-200 transition-colors hidden md:block" />
            )}

            <div className="relative z-10 w-12 h-12 flex-shrink-0 bg-white text-slate-400 group-hover:text-blue-600 rounded-full flex items-center justify-center border-2 border-slate-100 group-hover:border-blue-200 shadow-sm transition-all group-hover:scale-110">
              {step.icon}
            </div>

            <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {step.dateRange}
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
