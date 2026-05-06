import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Share2, Download, CheckCircle2, XCircle, Trophy, User as UserIcon, MessageCircle } from 'lucide-react';
import { useProgress } from './ProgressContext';

interface Question {
  q: string;
  options: string[];
  correct: number;
}

const QUIZ_QUESTIONS: Question[] = [
  { q: "What is the minimum age to vote in India?", options: ["16", "18", "21", "25"], correct: 1 },
  { q: "Which document is primarily used for voting?", options: ["PAN Card", "Ration Card", "Voter ID (EPIC)", "Aadhar Card"], correct: 2 },
  { q: "What does NOTA stand for?", options: ["None of the Above", "No Options To Apply", "New Option To All", "None Of These Answers"], correct: 0 },
  { q: "How many hours before polling does the silence period start?", options: ["12 hours", "24 hours", "48 hours", "72 hours"], correct: 2 },
  { q: "Who conducts elections in India?", options: ["Supreme Court", "Parliament", "Election Commission of India", "Home Ministry"], correct: 2 }
];

export const VoterBadgeSystem: React.FC = () => {
  const { progress, setQuizCompleted, setUserName } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const allComplete = progress.quiz && progress.timeline === 6 && progress.howItWorks === 6 && progress.myths === 6;

  useEffect(() => {
    if (allComplete && !showBadge) {
      setShowBadge(true);
    }
  }, [allComplete]);

  const handleAnswer = (idx: number) => {
    if (idx === QUIZ_QUESTIONS[currentQuestion].correct) {
      setScore(s => s + 1);
    }

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      setQuizFinished(true);
      if (score + (idx === QUIZ_QUESTIONS[currentQuestion].correct ? 1 : 0) === 5) {
        setQuizCompleted(true);
      }
    }
  };

  const downloadBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (circle)
    ctx.fillStyle = '#FFFBEB'; // Amber 50
    ctx.beginPath();
    ctx.arc(250, 250, 240, 0, Math.PI * 2);
    ctx.fill();

    // Draw border
    ctx.strokeStyle = '#D97706'; // Amber 600
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw Shield Shape
    ctx.fillStyle = '#FBBF24'; // Amber 400
    ctx.beginPath();
    ctx.moveTo(250, 100);
    ctx.quadraticCurveTo(400, 100, 400, 250);
    ctx.quadraticCurveTo(400, 400, 250, 450);
    ctx.quadraticCurveTo(100, 400, 100, 250);
    ctx.quadraticCurveTo(100, 100, 250, 100);
    ctx.fill();

    // Text
    ctx.fillStyle = '#065F46'; // Green 800
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('INFORMED VOTER', 250, 220);
    ctx.font = 'black 60px sans-serif';
    ctx.fillText('2026', 250, 290);
    
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#047857'; // Green 700
    ctx.fillText(progress.userName || 'CITIZEN', 250, 350);

    // Save as image
    const link = document.createElement('a');
    link.download = `VoterBadge_${progress.userName || 'Citizen'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const CircularProgress = ({ val, max, label }: { val: number | boolean, max: number, label: string }) => {
    const numericVal = typeof val === 'boolean' ? (val ? max : 0) : val;
    const percent = (numericVal / max) * 100;
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r={radius} className="fill-none stroke-slate-100" strokeWidth="8" />
            <circle 
              cx="40" cy="40" r={radius} 
              className="fill-none stroke-blue-600 transition-all duration-1000 ease-out" 
              strokeWidth="8" 
              strokeDasharray={circumference} 
              strokeDashoffset={offset} 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-800">
            {percent === 100 ? <CheckCircle2 className="text-green-500" size={20} /> : `${Math.round(percent)}%`}
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{label}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* Progress Dashboard */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
        <div className="flex flex-wrap justify-around gap-8">
          <CircularProgress val={progress.quiz} max={1} label="Quiz" />
          <CircularProgress val={progress.timeline} max={6} label="Timeline" />
          <CircularProgress val={progress.howItWorks} max={6} label="Process" />
          <CircularProgress val={progress.myths} max={6} label="Myths" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Name Input & Quiz */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-xl">
          {!progress.userName ? (
            <div className="space-y-6 text-center py-10">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-6">
                <UserIcon size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Identify Yourself</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Enter your name to personalize your Informed Voter badge.</p>
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 font-bold focus:ring-4 focus:ring-blue-100 outline-none text-center text-xl transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setUserName((e.target as HTMLInputElement).value);
                }}
              />
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Press Enter to start</p>
            </div>
          ) : !quizFinished ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Question {currentQuestion + 1} of 5</span>
                <span className="text-xs font-bold text-slate-400">Welcome, {progress.userName}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{QUIZ_QUESTIONS[currentQuestion].q}</h3>
              <div className="grid grid-cols-1 gap-4">
                {QUIZ_QUESTIONS[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full p-5 rounded-2xl border-2 border-slate-50 hover:border-blue-200 bg-white text-left font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/30 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${score === 5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {score === 5 ? <Trophy size={48} /> : <XCircle size={48} />}
              </div>
              <h3 className="text-3xl font-black text-slate-900">Score: {score}/5</h3>
              <p className="text-slate-500">
                {score === 5 
                  ? "Perfect! You've completed the knowledge requirement." 
                  : "So close! You need 5/5 to earn the badge."}
              </p>
              {score < 5 && (
                <button 
                  onClick={() => {
                    setQuizFinished(false);
                    setCurrentQuestion(0);
                    setScore(0);
                  }}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 mx-auto hover:bg-blue-600 transition-all"
                >
                  <RotateCcw size={18} /> Try Again
                </button>
              )}
            </div>
          )}
        </div>

        {/* Badge Reveal */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          <AnimatePresence>
            {showBadge ? (
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                className="relative z-10 w-full flex flex-col items-center"
              >
                {/* SVG Badge */}
                <div className="relative w-64 h-64 mb-8">
                  <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    {/* Shield Shape */}
                    <path 
                      d="M250,50 L400,100 L400,300 C400,400 250,450 250,450 C250,450 100,400 100,300 L100,100 L250,50 Z" 
                      fill="url(#goldGrad)" 
                      stroke="#FFF" 
                      strokeWidth="10"
                    />
                    <text x="250" y="210" textAnchor="middle" fill="#065F46" className="text-[32px] font-black uppercase tracking-widest">Informed Voter</text>
                    <text x="250" y="280" textAnchor="middle" fill="#065F46" className="text-[60px] font-black">2026</text>
                    <text x="250" y="340" textAnchor="middle" fill="#047857" className="text-[24px] font-bold uppercase">{progress.userName}</text>
                    {/* Star icons */}
                    <circle cx="250" cy="110" r="15" fill="#FFF" />
                  </svg>
                </div>

                <div className="space-y-4 w-full max-w-xs">
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(`I just earned the Informed Voter badge! Are you ready to vote? Check out https://civicguide.gov`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg"
                  >
                    <MessageCircle size={20} />
                    Share on WhatsApp
                  </a>
                  <button 
                    onClick={downloadBadge}
                    className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-lg"
                  >
                    <Download size={20} />
                    Download Badge (PNG)
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center opacity-40">
                <Award size={80} className="mx-auto mb-6" />
                <h4 className="text-xl font-bold">Complete all activities to unlock your official badge</h4>
                <p className="text-sm mt-2">Quiz (5/5), Timeline, How-it-works & Myths</p>
              </div>
            )}
          </AnimatePresence>
          <canvas ref={canvasRef} width="500" height="500" className="hidden" />
        </div>
      </div>
    </div>
  );
};

const RotateCcw = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);
