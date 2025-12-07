import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { generateBaseResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { DEFAULT_AI_PROMPT } from '../constants';
import ReactMarkdown from 'react-markdown';

export const BuilderAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm your Base Engineering Assistant. I can help you write smart contracts, debug Wagmi errors, or explain Base features. How can I help you today?",
      timestamp: Date.now(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateBaseResponse(input);

    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-900">
                <Sparkles size={20} className="text-indigo-600" />
                <h2 className="font-semibold">Base AI Engineer</h2>
            </div>
            <div className="text-xs text-indigo-500 font-medium px-2 py-1 bg-white rounded-md border border-indigo-100">
                Powered by Gemini 2.5 Flash
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${msg.role === 'model' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}
                    `}>
                        {msg.role === 'model' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div className={`
                        max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                        ${msg.role === 'model' 
                            ? 'bg-white text-slate-700 border border-slate-100' 
                            : 'bg-blue-600 text-white'}
                    `}>
                        {msg.role === 'model' ? (
                            <div className="prose prose-sm prose-indigo max-w-none">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        ) : (
                            msg.text
                        )}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Bot size={18} />
                    </div>
                    <div className="bg-white rounded-2xl px-4 py-3 border border-slate-100 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                        <span className="text-xs text-slate-400 font-medium">Thinking...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
            {messages.length === 1 && (
                 <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button 
                        onClick={() => setInput("Why is my build failing with 'wagmi/experimental' not found?")}
                        className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs rounded-full border border-indigo-200 transition-colors flex items-center gap-1.5"
                    >
                        <AlertTriangle size={12} />
                        Debug Build Failure
                    </button>
                    <button 
                        onClick={() => setInput("Show me a simple Smart Contract for Base.")}
                        className="whitespace-nowrap px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200 transition-colors"
                    >
                        Create Contract
                    </button>
                 </div>
            )}
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Base, Wagmi, or Smart Contracts..."
                    className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-[60px] text-sm text-slate-800 placeholder:text-slate-400"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Send size={16} />
                </button>
            </div>
        </div>
    </div>
  );
};
