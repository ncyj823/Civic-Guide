import React, { useState } from 'react';
import { Search, MapPin, Download, Loader2, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const STATES_AND_UTS = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

type StatusOutcome = 'ENROLLED' | 'PENDING' | 'NOT_FOUND';

interface SearchResult {
  status: StatusOutcome;
  epicNo: string;
  name: string;
  serialNo?: string;
  boothName?: string;
  boothAddress?: string;
  constituency?: string;
}

export const VoterStatusChecker: React.FC = () => {
  const [epicNo, setEpicNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!epicNo || !name || !dob || !state) return;
    
    setIsLoading(true);
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const lastChar = epicNo.slice(-1);
      const lastDigit = parseInt(lastChar, 10);
      
      let status: StatusOutcome = 'NOT_FOUND';
      if (!isNaN(lastDigit)) {
        if (lastDigit >= 0 && lastDigit <= 3) status = 'ENROLLED';
        else if (lastDigit >= 4 && lastDigit <= 6) status = 'PENDING';
      }

      const mockResult: SearchResult = {
        status,
        epicNo: epicNo.toUpperCase(),
        name,
        ...(status === 'ENROLLED' && {
          serialNo: `142${lastDigit}`,
          boothName: `Govt. Primary School, Sector ${lastDigit + 1}`,
          boothAddress: 'Main Road, Block B, City Center',
          constituency: 'Central Assembly Constituency (104)'
        })
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  const handleMapClick = (boothName: string) => {
    const promptStr = `Show me the location of ${boothName} on a map`;
    // Attempt to call the global sendPrompt if it exists (e.g. for AI assistant hookup)
    if (typeof window !== 'undefined' && (window as any).sendPrompt) {
      (window as any).sendPrompt(promptStr);
    } else {
      // Fallback for demonstration
      alert(`Simulated Action: sendPrompt called with -> "${promptStr}"`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl border border-[var(--vsc-border)] bg-[var(--vsc-bg)] p-6 md:p-10 shadow-sm transition-colors duration-300">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[var(--vsc-text-main)] flex items-center gap-3 tracking-tight">
          <Search className="w-8 h-8 text-blue-600" />
          Voter Registration Status
        </h2>
        <p className="text-[var(--vsc-text-muted)] mt-2 text-lg">
          Check your electoral roll status using your EPIC number and basic details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[var(--vsc-text-main)] uppercase tracking-wide">EPIC Number</label>
            <input 
              type="text" 
              placeholder="AAA1234567"
              value={epicNo}
              onChange={(e) => setEpicNo(e.target.value.toUpperCase())}
              pattern="^[A-Z]{3}[0-9]{7}$"
              title="3 letters followed by 7 numbers (e.g., AAA1234567)"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--vsc-input-border)] bg-[var(--vsc-input-bg)] text-[var(--vsc-text-main)] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-[var(--vsc-text-muted)] placeholder:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[var(--vsc-text-main)] uppercase tracking-wide">Full Name</label>
            <input 
              type="text" 
              placeholder="As per voter ID"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--vsc-input-border)] bg-[var(--vsc-input-bg)] text-[var(--vsc-text-main)] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-[var(--vsc-text-muted)] placeholder:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[var(--vsc-text-main)] uppercase tracking-wide">Date of Birth</label>
            <input 
              type="date" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--vsc-input-border)] bg-[var(--vsc-input-bg)] text-[var(--vsc-text-main)] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[var(--vsc-text-main)] uppercase tracking-wide">State / UT</label>
            <select 
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--vsc-input-border)] bg-[var(--vsc-input-bg)] text-[var(--vsc-text-main)] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            >
              <option value="" disabled>Select your state</option>
              {STATES_AND_UTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 px-6 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
          {isLoading ? 'Searching Electoral Roll...' : 'Check Status'}
        </button>
      </form>

      {/* Result Section */}
      {result && (
        <div className="mt-10 pt-10 border-t border-[var(--vsc-border)] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-black text-[var(--vsc-text-main)] tracking-tight">Search Result</h3>
            {result.status === 'ENROLLED' && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-bold border border-green-200">
                <CheckCircle className="w-5 h-5" /> Enrolled
              </span>
            )}
            {result.status === 'PENDING' && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-bold border border-amber-200">
                <Clock className="w-5 h-5" /> Pending
              </span>
            )}
            {result.status === 'NOT_FOUND' && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-bold border border-red-200">
                <AlertCircle className="w-5 h-5" /> Not Found
              </span>
            )}
          </div>

          {result.status === 'ENROLLED' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[var(--vsc-input-bg)] border border-[var(--vsc-border)] hover:border-blue-300 transition-colors">
                  <p className="text-xs text-[var(--vsc-text-muted)] uppercase font-bold tracking-widest mb-1">EPIC Number</p>
                  <p className="font-mono font-bold text-[var(--vsc-text-main)] text-xl">{result.epicNo}</p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--vsc-input-bg)] border border-[var(--vsc-border)] hover:border-blue-300 transition-colors">
                  <p className="text-xs text-[var(--vsc-text-muted)] uppercase font-bold tracking-widest mb-1">Serial Number</p>
                  <p className="font-bold text-[var(--vsc-text-main)] text-xl">{result.serialNo}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--vsc-input-bg)] border border-[var(--vsc-border)] space-y-5 hover:border-blue-300 transition-colors">
                <div>
                  <p className="text-xs text-[var(--vsc-text-muted)] uppercase font-bold tracking-widest mb-1">Constituency</p>
                  <p className="font-bold text-[var(--vsc-text-main)] text-lg">{result.constituency}</p>
                </div>
                <div className="pt-5 border-t border-[var(--vsc-border)]">
                  <p className="text-xs text-[var(--vsc-text-muted)] uppercase font-bold tracking-widest mb-2">Polling Station</p>
                  <p className="font-bold text-[var(--vsc-text-main)] text-lg leading-tight">{result.boothName}</p>
                  <p className="text-[var(--vsc-text-muted)] mt-1.5">{result.boothAddress}</p>
                  
                  <button 
                    onClick={() => handleMapClick(result.boothName || '')}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-lg"
                  >
                    <MapPin className="w-4 h-4" />
                    Find on map
                  </button>
                </div>
              </div>

              <button className="w-full py-4 px-6 bg-slate-900 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                <Download className="w-6 h-6" />
                Download e-EPIC
              </button>
            </div>
          )}

          {result.status === 'PENDING' && (
            <div className="p-8 rounded-2xl bg-[var(--vsc-input-bg)] border border-[var(--vsc-border)] text-center max-w-lg mx-auto">
              <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h4 className="font-black text-[var(--vsc-text-main)] text-2xl mb-3">Application Under Review</h4>
              <p className="text-[var(--vsc-text-muted)] text-base leading-relaxed">
                Your voter registration application is currently being processed by the Electoral Registration Officer (ERO). 
                Please check back in a few days.
              </p>
            </div>
          )}

          {result.status === 'NOT_FOUND' && (
            <div className="p-8 rounded-2xl bg-[var(--vsc-input-bg)] border border-[var(--vsc-border)] text-center max-w-lg mx-auto">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h4 className="font-black text-[var(--vsc-text-main)] text-2xl mb-3">No Record Found</h4>
              <p className="text-[var(--vsc-text-muted)] text-base leading-relaxed">
                We couldn't find any electoral roll record matching the provided details. 
                Please verify your EPIC number or consider submitting a new registration application.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
