/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Search, Vote, Info } from 'lucide-react';

const guides = [
  {
    title: 'Phase 1: Registration',
    icon: <ClipboardCheck className="w-6 h-6" />,
    steps: [
      'Check eligibility (Citizen, 18+, Resident)',
      'Visit Vote.gov to register online',
      'Or register by mail or in person',
      'Confirm registration status periodically'
    ]
  },
  {
    title: 'Phase 2: Research',
    icon: <Search className="w-6 h-6" />,
    steps: [
      'Look up your sample ballot',
      'Research candidate records and platforms',
      'Understand local ballot measures',
      'Check non-partisan sources like Vote411'
    ]
  },
  {
    title: 'Phase 3: Casting Vote',
    icon: <Vote className="w-6 h-6" />,
    steps: [
      'Decide: In-person, Early, or Mail-in',
      'Identify your polling place',
      'Bring required ID (if state law requires)',
      'Stay in line even if the polls close'
    ]
  }
];

export const GuideSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
      {guides.map((guide, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 mb-6">
            {guide.icon}
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-4">{guide.title}</h4>
          <ul className="space-y-3 flex-1">
            {guide.steps.map((step, sIdx) => (
              <li key={sIdx} className="flex gap-3 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      <div className="md:col-span-3 mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-4 items-center">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
          <Info size={20} />
        </div>
        <p className="text-sm text-amber-800 font-medium">
          Election laws vary by state. Always consult your official Secretary of State website for the most accurate local deadlines.
        </p>
      </div>
    </div>
  );
};
