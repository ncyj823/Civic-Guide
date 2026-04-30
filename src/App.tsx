/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChatAssistant } from './components/ChatAssistant';
import { Timeline } from './components/Timeline';
import { GuideSection } from './components/GuideSection';
import { VoterStatusChecker } from './components/VoterStatusChecker';
import { Vote, ShieldCheck, HelpCircle, ChevronDown } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">CivicGuide</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Process</a>
            <a href="#guides" className="hover:text-blue-600 transition-colors">Guides</a>
            <a href="#assistant" className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all">Smart Assistant</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
              <ShieldCheck size={14} />
              Empowering Every Voter
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight mb-8">
              Democracy <br />
              <span className="text-blue-600 italic">Simplified.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10">
              Your non-partisan companion for navigating elections. Understand the process, 
              track important dates, and get AI-powered answers to your civic questions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#assistant" className="px-8 py-4 bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-red-800 hover:shadow-xl hover:translate-y-[-2px] transition-all">
                Ask Civic Assistant
              </a>
              <a href="#how-it-works" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                See the Process
              </a>
            </div>
          </motion.div>

          {/* AI Chat Preview / Assistant */}
          <motion.div
            id="assistant"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ChatAssistant />
          </motion.div>
        </div>

        {/* Status Checker Section */}
        <section id="status-checker" className="mb-32 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Check Your Voter Status</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Verify your enrollment details instantly across all states and union territories.
            </p>
          </div>
          <VoterStatusChecker />
        </section>

        {/* Timeline Section */}
        <section id="how-it-works" className="mb-32 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Election Lifecycle</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A bird's eye view of how candidates go from party nominations to the general election.
            </p>
          </div>
          <Timeline />
        </section>

        {/* Guides Section */}
        <section id="guides" className="mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Step-by-Step Voting</h2>
              <p className="text-slate-500">
                Practical guides for each phase of your voting journey. Knowledge is power.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium flex items-center gap-2">
                <HelpCircle size={16} className="text-slate-400" />
                Common Questions
              </div>
            </div>
          </div>
          <GuideSection />
        </section>

        {/* FAQ - Quick Terms */}
        <section className="mb-32">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-6">Key Civic Terms</h3>
                <div className="space-y-6">
                  {[
                    { t: 'Primary vs General', d: 'Primaries narrow candidates within a party; General election determines the final winner.' },
                    { t: 'Electoral College', d: 'The 538 electors who formally choose the President based on state vote results.' },
                    { t: 'Ballot Measure', d: 'A law or issue that voters decide on directly at the state or local level.' }
                  ].map((item, i) => (
                    <div key={i} className="group cursor-default">
                      <div className="flex items-center justify-between py-4 border-b border-white/10 group-hover:border-white/30 transition-colors">
                        <span className="font-bold text-lg">{item.t}</span>
                        <ChevronDown size={18} className="text-white/40 group-hover:text-white transition-colors" />
                      </div>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-all h-0 group-hover:h-auto overflow-hidden">
                        {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <h4 className="text-xl font-bold mb-4">Your Voice Matters</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Participation is the foundation of our civic system. By voting, you influence 
                  everything from national policy to local schools and roads. Start your journey today.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <div className="text-2xl font-bold mb-1">160M+</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Voters in 2020</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <div className="text-2xl font-bold mb-1">100%</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Of Voices Matter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Vote className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">CivicGuide</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
            CivicGuide is a non-partisan educational tool designed to increase electoral literacy. 
            Information provided is for educational purposes only.
          </p>
          <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="https://vote.gov" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Vote.gov</a>
            <a href="https://usa.gov" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">USA.gov</a>
            <a href="https://ballotpedia.org" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Ballotpedia</a>
          </div>
          <div className="mt-12 text-slate-300 text-[10px] uppercase tracking-[0.2em]">
            &copy; 2026 CivicGuide Project
          </div>
        </div>
      </footer>
    </div>
  );
}
