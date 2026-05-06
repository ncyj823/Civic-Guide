import React, { useState } from 'react';
import { MapPin, Search, Navigation, Accessibility, Users, Info, ArrowRight, Loader2 } from 'lucide-react';

const STATES_AND_UTS = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

interface Booth {
  id: string;
  number: string;
  name: string;
  address: string;
  distance: number;
  accessible: boolean;
  totalVoters: number;
}

export const PollingBoothLocator: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [booths, setBooths] = useState<Booth[] | null>(null);
  const [constituency, setConstituency] = useState('');

  const handleFindBooths = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || !state) return;

    setIsLoading(true);
    setBooths(null);

    // Mocking the search result
    setTimeout(() => {
      const mockBooths: Booth[] = [
        {
          id: '1',
          number: 'Booth #42',
          name: 'St. Xavier\'s High School',
          address: '12th Cross, Near Market Road, Zone 4',
          distance: 0.8,
          accessible: true,
          totalVoters: 750
        },
        {
          id: '2',
          number: 'Booth #108',
          name: 'Government Primary Education Center',
          address: 'Sector 15, Housing Board Colony',
          distance: 1.2,
          accessible: true,
          totalVoters: 920
        },
        {
          id: '3',
          number: 'Booth #15',
          name: 'Community Community Hall',
          address: 'Old Town Square, Near Police Station',
          distance: 2.5,
          accessible: false,
          totalVoters: 1350
        },
        {
          id: '4',
          number: 'Booth #89',
          name: 'KV Meharuli School Complex',
          address: 'Main Highway, Beside Petrol Pump',
          distance: 3.1,
          accessible: true,
          totalVoters: 600
        }
      ];

      setBooths(mockBooths);
      setConstituency('South Delhi Parliamentary Constituency');
      setIsLoading(false);
    }, 1200);
  };

  const getCapacityColor = (voters: number) => {
    if (voters < 800) return 'var(--pbl-green)';
    if (voters <= 1200) return 'var(--pbl-amber)';
    return 'var(--pbl-red)';
  };

  const getCapacityPercent = (voters: number) => {
    const max = 1500; // Mock max capacity for percentage
    return Math.min((voters / max) * 100, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Search Header Card */}
      <div className="bg-[var(--vsc-bg)] rounded-3xl border border-[var(--vsc-border)] p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[var(--vsc-text-main)] tracking-tight">Booth Locator</h2>
            <p className="text-sm text-[var(--vsc-text-muted)] font-medium">Find your assigned polling station</p>
          </div>
        </div>

        <form onSubmit={handleFindBooths} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <label className="block text-[10px] uppercase font-black tracking-widest text-[var(--vsc-text-muted)] mb-2 px-1">Pincode</label>
            <input 
              type="text" 
              placeholder="6 Digit PIN"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--vsc-input-border)] bg-[var(--vsc-input-bg)] text-[var(--vsc-text-main)] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:opacity-40"
            />
          </div>
          <div className="md:col-span-5">
            <label className="block text-[10px] uppercase font-black tracking-widest text-[var(--vsc-text-muted)] mb-2 px-1">State / UT</label>
            <select 
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--vsc-input-border)] bg-[var(--vsc-input-bg)] text-[var(--vsc-text-main)] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            >
              <option value="" disabled>Select State</option>
              {STATES_AND_UTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="md:col-span-4 flex items-end">
            <button 
              type="submit" 
              disabled={isLoading || pincode.length !== 6 || !state}
              className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:grayscale shadow-md hover:shadow-lg active:scale-95"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              Find Booths
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {booths && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
          {/* Metric Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[var(--vsc-bg)] border-[length:var(--pbl-border-width)] border-[var(--vsc-border)] rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-[var(--vsc-text-muted)]">Total Booths</span>
              <span className="text-2xl font-black text-blue-600">{booths.length} Found</span>
            </div>
            <div className="bg-[var(--vsc-bg)] border-[length:var(--pbl-border-width)] border-[var(--vsc-border)] rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-[var(--vsc-text-muted)]">Nearest Booth</span>
              <span className="text-2xl font-black text-slate-800">{Math.min(...booths.map(b => b.distance))} km</span>
            </div>
            <div className="bg-[var(--vsc-bg)] border-[length:var(--pbl-border-width)] border-[var(--vsc-border)] rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-[var(--vsc-text-muted)]">Constituency</span>
              <span className="text-sm font-bold text-slate-800 line-clamp-1">{constituency}</span>
            </div>
          </div>

          {/* Booth Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {booths.map((booth) => (
              <div 
                key={booth.id} 
                className="bg-[var(--vsc-bg)] border-[length:var(--pbl-border-width)] border-[var(--vsc-border)] rounded-2xl p-6 flex flex-col hover:shadow-xl hover:border-blue-400/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black text-slate-500 mb-2">{booth.number}</span>
                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{booth.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-blue-600">{booth.distance} km</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">away</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <MapPin size={16} className="text-slate-300 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{booth.address}</p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-slate-500">{booth.totalVoters} Voters</span>
                    </div>
                    {booth.accessible && (
                      <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        <Accessibility size={14} />
                        <span>Accessible</span>
                      </div>
                    )}
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-400">Current Load</span>
                      <span style={{ color: getCapacityColor(booth.totalVoters) }}>
                        {booth.totalVoters < 800 ? 'Low' : booth.totalVoters <= 1200 ? 'Moderate' : 'High'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${getCapacityPercent(booth.totalVoters)}%`,
                          backgroundColor: getCapacityColor(booth.totalVoters)
                        }}
                      />
                    </div>
                  </div>

                  <button className="w-full py-3 bg-slate-900 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-sm">
                    <Navigation size={14} />
                    GET DIRECTIONS
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!booths && !isLoading && (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400">Enter your details to find booths</h3>
          <p className="text-sm text-slate-400 mt-2">Mock data will be generated based on your pincode.</p>
        </div>
      )}
    </div>
  );
};
