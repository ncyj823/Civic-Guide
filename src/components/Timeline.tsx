/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TimelineStep } from '../types';
import { Calendar, CheckCircle2, Flag, ArrowRight } from 'lucide-react';

const steps: TimelineStep[] = [
  {
    id: '1',
    title: 'Voter Registration',
    dateRange: 'Throughout the Year',
    description: 'Ensure you are eligible and registered to vote in your state.',
    longDescription: 'Registration deadlines vary by state, often 15-30 days before an election. Some states offer same-day registration.'
  },
  {
    id: '2',
    title: 'Primary Elections',
    dateRange: 'Feb - June',
    description: 'Political parties choose their candidates for the general election.',
    longDescription: 'Primaries can be closed (only party members) or open (any voter). This is when you help decide who represents your party.'
  },
  {
    id: '3',
    title: 'General Election Prep',
    dateRange: 'Sept - Oct',
    description: 'Research candidates, find your polling place, and request mail-in ballots.',
    longDescription: 'Use this time to review non-partisan voter guides and check your registration status one last time.'
  },
  {
    id: '4',
    title: 'Election Day',
    dateRange: 'Early Nov',
    description: 'Cast your vote in person or ensure your mail-in ballot is postmarked.',
    longDescription: 'The General Election is held on the Tuesday after the first Monday in November. Polls typically open early and close late.'
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6 group"
          >
            {/* Timeline Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-6 top-10 bottom-0 w-[2px] bg-gray-100 group-hover:bg-blue-200 transition-colors hidden md:block" />
            )}

            {/* Icon Circle */}
            <div className="relative z-10 w-12 h-12 flex-shrink-0 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110">
              {index === 0 ? <CheckCircle2 size={24} /> : 
               index === steps.length - 1 ? <Flag size={20} /> :
               <Calendar size={20} />}
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-blue-200 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                <span className="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                  {step.dateRange}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                {step.description}
              </p>
              <div className="pt-4 mt-4 border-t border-gray-50 flex items-start gap-3">
                <ArrowRight size={14} className="mt-1 text-blue-400 flex-shrink-0" />
                <p className="text-xs text-slate-500 italic">
                  {step.longDescription}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
