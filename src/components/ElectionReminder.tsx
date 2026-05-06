import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Bell, Share2, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

const MOCK_ELECTION_DATES = [
  { state: 'Delhi', date: '2026-05-25' },
  { state: 'Punjab', date: '2026-06-01' },
  { state: 'Gujarat', date: '2026-12-15' },
  { state: 'Tamil Nadu', date: '2027-04-10' },
  { state: 'Karnataka', date: '2027-05-12' }
];

const REMINDER_OPTIONS = [
  { label: '1 Day Before', value: 1 },
  { label: '3 Days Before', value: 3 },
  { label: '1 Week Before', value: 7 }
];

export const ElectionReminder: React.FC = () => {
  const [selectedState, setSelectedState] = useState(MOCK_ELECTION_DATES[0]);
  const [reminderDays, setReminderDays] = useState(1);
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const nearestDate = new Date(MOCK_ELECTION_DATES[0].date).getTime();
      const now = new Date().getTime();
      const difference = nearestDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setIsSubmitted(true);
    }
  };

  const getReminderDate = () => {
    const electionDate = new Date(selectedState.date);
    electionDate.setDate(electionDate.getDate() - reminderDays);
    return electionDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`Don't forget to vote on ${selectedState.date}! Register here: https://voters.eci.gov.in`)}`;

  if (isSubmitted) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-blue-900/10 text-center animate-in zoom-in-95 duration-500">
        <div className="mb-8 flex justify-center">
          <svg className="w-24 h-24 text-green-500" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
            <path className="checkmark-draw" fill="none" stroke="currentColor" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Reminder Set!</h3>
        <p className="text-slate-500 mb-8 leading-relaxed">
          You will be reminded on <span className="font-bold text-blue-600">{getReminderDate()}</span> via SMS for the {selectedState.state} elections.
        </p>
        <div className="flex flex-col gap-4">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noreferrer"
            className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg"
          >
            <MessageCircle size={20} />
            Share on WhatsApp
          </a>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
          >
            Set another reminder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-100/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
              <Bell size={12} />
              Never Miss Your Vote
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Election Day Reminder</h2>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Polling Date</p>
            <p className="text-xl font-black text-blue-600">{new Date(selectedState.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <form onSubmit={handleSetReminder} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* State Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Select State</label>
              <select 
                value={selectedState.state}
                onChange={(e) => setSelectedState(MOCK_ELECTION_DATES.find(s => s.state === e.target.value)!)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
              >
                {MOCK_ELECTION_DATES.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
              </select>
            </div>

            {/* Phone Input */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">+91</span>
                <input 
                  type="text" 
                  maxLength={10}
                  placeholder="00000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                  className="w-full pl-16 pr-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Reminder Preference */}
          <div className="space-y-4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Remind Me</label>
            <div className="flex flex-wrap gap-3">
              {REMINDER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setReminderDays(opt.value)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                    reminderDays === opt.value 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' 
                      : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1 active:translate-y-0"
          >
            Set Reminder
            <ArrowRight size={20} />
          </button>
        </form>
      </div>

      {/* Countdown Section */}
      <div className="text-center space-y-8 pb-12">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Countdown to {MOCK_ELECTION_DATES[0].state} Elections</h3>
        <div className="flex justify-center gap-4 md:gap-6">
          <div className="countdown-block">
            <span className="text-3xl md:text-5xl font-black mb-1">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Days</span>
          </div>
          <div className="countdown-block">
            <span className="text-3xl md:text-5xl font-black mb-1">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Hours</span>
          </div>
          <div className="countdown-block">
            <span className="text-3xl md:text-5xl font-black mb-1">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Mins</span>
          </div>
          <div className="countdown-block">
            <span className="text-3xl md:text-5xl font-black mb-1 text-blue-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
