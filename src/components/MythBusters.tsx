import React, { useState } from 'react';
import { ShieldCheck, Info, RotateCcw, Share2, CheckCircle2, AlertCircle } from 'lucide-react';

interface MythCard {
  id: number;
  myth: string;
  fact: string;
  source: string;
}

const MYTHS: MythCard[] = [
  {
    id: 1,
    myth: "EVMs can be easily hacked by connecting them to the internet.",
    fact: "EVMs are standalone machines with no internet connectivity or wireless capability. They use one-time programmable chips that cannot be altered after manufacturing.",
    source: "Source: ECI Technical Expert Committee Report"
  },
  {
    id: 2,
    myth: "If NOTA gets the most votes, the election is canceled or re-held.",
    fact: "Currently, NOTA has no legal impact on the election outcome. Even if NOTA gets the highest votes, the candidate with the next highest votes is declared the winner.",
    source: "Source: Supreme Court Judgment, 2013"
  },
  {
    id: 3,
    myth: "NRI voters can cast their votes online from abroad.",
    fact: "NRI voters must be physically present at their respective polling stations in India with their original passports to cast their votes.",
    source: "Source: Registration of Electors Rules, 1960"
  },
  {
    id: 4,
    myth: "Booth capturing is still common despite modern technology.",
    fact: "VVPATs, CCTV monitoring, and multi-layered security have made booth capturing virtually impossible. Any disruption triggers an immediate re-poll.",
    source: "Source: ECI Security Protocols"
  },
  {
    id: 5,
    myth: "You can vote if you only have a Voter ID card but your name isn't in the roll.",
    fact: "Having a Voter ID (EPIC) card alone is not enough. Your name MUST be present in the official Electoral Roll to be eligible to vote.",
    source: "Source: Representation of the People Act, 1951"
  },
  {
    id: 6,
    myth: "Candidates can run political advertisements on TV during the 48-hour silence period.",
    fact: "The 'Silence Period' strictly prohibits all forms of campaigning, including TV ads, public meetings, and social media promotions to allow voters to decide peacefully.",
    source: "Source: Section 126 of the RP Act"
  }
];

import { useProgress } from './ProgressContext';

export const MythBusters: React.FC = () => {
  const { updateMyths } = useProgress();
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleFlip = (id: number) => {
    updateMyths(id);
    setFlippedCards(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const bustedCount = flippedCards.size;
  const isAllBusted = bustedCount === MYTHS.length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Election Myth-Busters</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-slate-100 rounded-full h-3 w-64 overflow-hidden border border-slate-200">
            <div 
              className="bg-blue-600 h-full transition-all duration-700 ease-out"
              style={{ width: `${(bustedCount / MYTHS.length) * 100}%` }}
            />
          </div>
          <p className="text-sm font-black text-slate-500 uppercase tracking-widest">
            {bustedCount} of {MYTHS.length} myths busted
          </p>
        </div>
      </div>

      {isAllBusted && (
        <div className="bg-green-600 text-white rounded-[2.5rem] p-8 md:p-12 text-center animate-in zoom-in-95 duration-500 shadow-2xl shadow-green-600/20">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-black mb-3">You're an informed voter!</h3>
          <p className="text-green-50 mb-8 max-w-lg mx-auto opacity-90">
            Congratulations! You've successfully navigated through the most common electoral myths. Spread the truth to strengthen democracy.
          </p>
          <button className="px-8 py-4 bg-white text-green-600 rounded-2xl font-black flex items-center justify-center gap-3 mx-auto hover:bg-green-50 transition-all shadow-xl active:scale-95">
            <Share2 size={20} />
            Share Your Badge
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MYTHS.map((m) => (
          <div key={m.id} className="perspective h-[320px] group cursor-pointer" onClick={() => handleFlip(m.id)}>
            <div className={`relative w-full h-full flip-card-inner ${flippedCards.has(m.id) ? 'flip-card-flipped' : ''}`}>
              {/* Front */}
              <div className="absolute w-full h-full flip-card-front bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-100/50 flex flex-col justify-between hover:border-red-100 transition-colors">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6">
                    <AlertCircle size={12} />
                    Myth
                  </span>
                  <p className="text-xl font-black text-slate-900 leading-tight">
                    {m.myth}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-red-600 group-hover:gap-3 transition-all">
                  Reveal Truth
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full flip-card-back bg-slate-900 text-white border border-slate-800 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <ShieldCheck size={12} />
                    Fact
                  </span>
                  <p className="text-base font-bold text-slate-200 leading-relaxed">
                    {m.fact}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Info size={12} />
                    {m.source}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
