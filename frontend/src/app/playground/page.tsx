"use client";

import React, { useState } from 'react';

export default function Playground() {
  const [selectedAdapter, setSelectedAdapter] = useState('Base Model');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am running on Google TPU v6e. Which LoRA adapter should we test today?' }
  ]);
  const [input, setInput] = useState('');

  const adapters = [
    'Base Model (Gemma 2 9B)',
    'Legal Assistant v2',
    'Medical Diagnosis',
    'Python Specialist',
    'Marketing Tone-Match'
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate API response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: `[Simulated response using ${selectedAdapter}] This is a high-performance response served from a TPU v5e chip with 42ms latency.` 
      }]);
    }, 500);
  };

  return (
    <main className="h-[calc(100vh-80px)] flex">
      {/* Sidebar - Adapter Selector */}
      <div className="w-80 border-r border-white/5 bg-black/40 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold font-outfit">Playground</h2>
        <div>
          <label className="text-xs font-bold text-white/40 uppercase mb-3 block">Select Adapter</label>
          <div className="space-y-2">
            {adapters.map((adapter) => (
              <button
                key={adapter}
                onClick={() => setSelectedAdapter(adapter)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${
                  selectedAdapter === adapter 
                    ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400' 
                    : 'hover:bg-white/5 border-transparent text-white/60'
                }`}
              >
                {adapter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto glass-card p-4 text-xs">
          <p className="text-white/40 mb-2 font-bold uppercase">Engine Status</p>
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            vLLM TPU v6e Active
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-transparent to-violet-500/5">
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-violet-500/20 border border-violet-500/30 text-white' 
                  : 'glass-card text-white/80'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Message with ${selectedAdapter}...`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-3 bottom-3 px-6 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-center text-[10px] text-white/20 mt-4 uppercase tracking-widest font-bold">
            Served via Multi-LoRA vLLM Pipeline on Google TPU Sprint Infrastructure
          </p>
        </div>
      </div>
    </main>
  );
}
