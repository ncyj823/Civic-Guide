import React, { useState } from 'react';
import { User, ShieldAlert, History, Wallet, ChevronDown, ChevronUp, Users, Scale, Landmark, CheckCircle2, XCircle } from 'lucide-react';

interface Case {
  description: string;
  court: string;
  status: string;
}

interface ElectionRecord {
  year: number;
  constituency: string;
  votes: string;
  result: 'Won' | 'Lost';
}

interface Candidate {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  constituency: string;
  age: number;
  education: string;
  assets: {
    movable: string;
    immovable: string;
    liabilities: string;
    netWorth: string;
  };
  criminalCases: Case[];
  history: ElectionRecord[];
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    party: 'Progressive Alliance',
    partyColor: 'bg-blue-600',
    constituency: 'North Delhi',
    age: 52,
    education: 'Post Graduate (Economics)',
    assets: {
      movable: '₹4.2 Cr',
      immovable: '₹12.5 Cr',
      liabilities: '₹1.8 Cr',
      netWorth: '₹14.9 Cr'
    },
    criminalCases: [
      { description: 'Unlawful assembly during protest', court: 'District Court, Delhi', status: 'Pending' }
    ],
    history: [
      { year: 2019, constituency: 'North Delhi', votes: '4,12,000', result: 'Won' },
      { year: 2014, constituency: 'South Delhi', votes: '3,85,000', result: 'Lost' }
    ]
  },
  {
    id: '2',
    name: 'Anita Deshmukh',
    party: 'Social Justice Party',
    partyColor: 'bg-green-600',
    constituency: 'South Mumbai',
    age: 45,
    education: 'LL.B (University of Mumbai)',
    assets: {
      movable: '₹2.8 Cr',
      immovable: '₹5.4 Cr',
      liabilities: '₹45 Lakhs',
      netWorth: '₹7.75 Cr'
    },
    criminalCases: [],
    history: [
      { year: 2019, constituency: 'South Mumbai', votes: '5,22,000', result: 'Won' }
    ]
  },
  {
    id: '3',
    name: 'Vikram Singh',
    party: 'National Democratic Front',
    partyColor: 'bg-orange-600',
    constituency: 'Lucknow Central',
    age: 58,
    education: 'Ph.D in Political Science',
    assets: {
      movable: '₹8.5 Cr',
      immovable: '₹22.0 Cr',
      liabilities: '₹5.2 Cr',
      netWorth: '₹25.3 Cr'
    },
    criminalCases: [
      { description: 'Defamation Case', court: 'High Court, Allahabad', status: 'Ongoing' },
      { description: 'Violation of Model Code of Conduct', court: 'Sessions Court, Lucknow', status: 'Dismissed' }
    ],
    history: [
      { year: 2019, constituency: 'Lucknow Central', votes: '4,88,000', result: 'Won' },
      { year: 2014, constituency: 'Lucknow Central', votes: '4,50,000', result: 'Won' }
    ]
  }
];

const PARTIES = ['All', 'Progressive Alliance', 'Social Justice Party', 'National Democratic Front'];

export const CandidateProfiles: React.FC = () => {
  const [selectedParty, setSelectedParty] = useState('All');
  const [expandedSection, setExpandedSection] = useState<Record<string, string | null>>({});

  const toggleAccordion = (candidateId: string, section: string) => {
    setExpandedSection(prev => ({
      ...prev,
      [candidateId]: prev[candidateId] === section ? null : section
    }));
  };

  const filteredCandidates = selectedParty === 'All' 
    ? MOCK_CANDIDATES 
    : MOCK_CANDIDATES.filter(c => c.party === selectedParty);

  const handleCompare = (candidateName: string) => {
    const promptStr = `Compare the affidavits of ${candidateName} and their main opponent side by side`;
    if (typeof window !== 'undefined' && (window as any).sendPrompt) {
      (window as any).sendPrompt(promptStr);
    } else {
      alert(`Simulated Action: sendPrompt called with -> "${promptStr}"`);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 py-10">
      {/* Party Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {PARTIES.map(party => (
          <button
            key={party}
            onClick={() => setSelectedParty(party)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
              selectedParty === party 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {party}
          </button>
        ))}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredCandidates.map(candidate => (
          <div 
            key={candidate.id} 
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col overflow-hidden transition-all hover:translate-y-[-4px]"
          >
            {/* Header / Avatar Section */}
            <div className="p-8 pb-4 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-3xl font-black text-slate-300 shadow-inner">
                {getInitials(candidate.name)}
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{candidate.name}</h3>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${candidate.partyColor}`}>
                  {candidate.party}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200">
                  {candidate.constituency}
                </span>
              </div>
            </div>

            {/* Basic Info Strip */}
            <div className="px-8 py-4 bg-slate-50/50 border-y border-slate-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</p>
                <p className="font-bold text-slate-700">{candidate.age} Years</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Education</p>
                <p className="font-bold text-slate-700 text-sm leading-tight line-clamp-1" title={candidate.education}>{candidate.education}</p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="flex-grow p-6 space-y-3">
              {/* Assets & Liabilities */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(candidate.id, 'assets')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Wallet size={18} className="text-blue-500" />
                    <span className="font-bold text-slate-800 text-sm">Assets & Liabilities</span>
                  </div>
                  {expandedSection[candidate.id] === 'assets' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection[candidate.id] === 'assets' && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Movable Assets</span>
                        <span className="font-bold text-slate-800">{candidate.assets.movable}</span>
                      </div>
                      <div className="flex justify-between text-xs py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Immovable Assets</span>
                        <span className="font-bold text-slate-800">{candidate.assets.immovable}</span>
                      </div>
                      <div className="flex justify-between text-xs py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Total Liabilities</span>
                        <span className="font-bold text-red-600">{candidate.assets.liabilities}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 font-black">
                        <span className="text-slate-900">NET WORTH</span>
                        <span className="text-blue-600">{candidate.assets.netWorth}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Criminal Cases */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(candidate.id, 'cases')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert size={18} className={candidate.criminalCases.length > 0 ? 'text-red-500' : 'text-green-500'} />
                    <span className="font-bold text-slate-800 text-sm">Criminal Cases</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black text-white ${candidate.criminalCases.length > 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                      {candidate.criminalCases.length}
                    </span>
                  </div>
                  {expandedSection[candidate.id] === 'cases' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection[candidate.id] === 'cases' && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                    {candidate.criminalCases.length > 0 ? (
                      <div className="space-y-4">
                        {candidate.criminalCases.map((c, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-800 leading-tight mb-2">{c.description}</p>
                            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider text-slate-400">
                              <span>{c.court}</span>
                              <span className="text-blue-600">{c.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle2 size={32} className="text-green-200 mx-auto mb-2" />
                        <p className="text-xs font-bold text-green-600">No criminal cases recorded.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Election History */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(candidate.id, 'history')}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <History size={18} className="text-orange-500" />
                    <span className="font-bold text-slate-800 text-sm">Election History</span>
                  </div>
                  {expandedSection[candidate.id] === 'history' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection[candidate.id] === 'history' && (
                  <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                      {candidate.history.map((record, idx) => (
                        <div key={idx} className="relative pl-8">
                          <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-slate-50 flex items-center justify-center ${record.result === 'Won' ? 'bg-green-500' : 'bg-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]'}`}>
                            {record.result === 'Won' ? <CheckCircle2 size={10} className="text-white" /> : <XCircle size={10} className="text-white" />}
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-900">{record.year} - {record.constituency}</p>
                            <p className="text-[10px] font-bold text-slate-500 mt-1">Votes: {record.votes} • <span className={record.result === 'Won' ? 'text-green-600' : 'text-red-600'}>{record.result}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer / Compare Button */}
            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => handleCompare(candidate.name)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
              >
                <Users size={18} />
                Compare with Opponent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
