/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { getChatResponse } from '../services/geminiService';

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m CivicGuide. I can help you understand how elections work, from registration to the ballot box. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const fullHistory = [...messages, userMessage];
    const assistantResponse = await getChatResponse(fullHistory);
    
    setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Civic Assistant</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Powered by Gemini</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                m.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {m.content.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl rounded-tl-none italic text-gray-400 text-sm">
                Thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about registration, dates, or how to vote..."
            className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-center text-gray-400">
          Always verify state-specific deadlines with your local election board.
        </p>
      </div>
    </div>
  );
};
