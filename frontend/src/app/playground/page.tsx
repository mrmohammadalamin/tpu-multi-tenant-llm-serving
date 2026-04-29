"use client";

import React, { useState } from 'react';

export default function Playground() {
  const [selectedAdapter, setSelectedAdapter] = useState('Base Model (Gemma 3 12B)');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am running on Google TPU v6e. Which LoRA adapter should we test today?' }
  ]);
  const [input, setInput] = useState('');

  const adapters = [
    'Base Model (Gemma 3 12B)',
    'Legal Assistant v3',
    'Medical Diagnosis',
    'Python Specialist',
    'Marketing Tone-Match'
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Specialized Simulation Logic
    setTimeout(() => {
      let response = `[Simulated response using ${selectedAdapter}] `;
      
      if (selectedAdapter.includes('Legal')) {
        response += "Under Section 4.2 of the Multi-Tenant agreement, liability is capped at 12 months of service fees. I recommend reviewing the indemnification clause for third-party IP claims.";
      } else if (selectedAdapter.includes('Medical')) {
        response += "Typical symptoms of Vitamin D deficiency include bone pain, muscle weakness, and fatigue. In urban environments, this is often correlated with limited sunlight exposure.";
      } else if (selectedAdapter.includes('Python')) {
        response += "To perform a parallel dot product in JAX: \n```python\nimport jax.numpy as jnp\nfrom jax import pmap\n\ndef dot_prod(x, y):\n    return jnp.dot(x, y)\n\n# Parallelize across TPU cores\nparallel_dot = pmap(dot_prod)\n```";
      } else if (selectedAdapter.includes('Marketing')) {
        response += "Elevate your journey with the silent power of the Apex E-Series. Where performance meets unparalleled sophistication. Drive the future, today.";
      } else {
        response += "I am Gemma 3 12B, optimized for the Google TPU v6e. I can handle over 1,000 concurrent LoRA adapters with sub-50ms latency.";
      }

      setMessages([...newMessages, { 
        role: 'assistant', 
        content: response 
      }]);
    }, 800);
  };

  return (
    <main className="h-screen flex flex-col bg-black text-white font-inter">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href = '/'} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-xl font-outfit font-bold">Multi-LoRA Playground</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">TPU v6e Online</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Adapter Selector */}
        <div className="w-80 border-r border-white/5 bg-black/20 p-6 flex flex-col gap-6">
          <div>
            <label className="text-xs font-bold text-white/40 uppercase mb-3 block">Tenant Adapters</label>
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

          <div className="glass-card p-4">
            <p className="text-[10px] text-white/30 uppercase font-bold mb-2">Model Info</p>
            <p className="text-sm font-medium">Gemma 3 12B</p>
            <p className="text-xs text-white/40">Multi-LoRA Optimized</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-transparent to-violet-500/5">
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl p-5 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-white' 
                    : 'glass-card text-white/80'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-8 bg-black/40 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-4xl mx-auto relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Message with ${selectedAdapter}...`}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-400/50 transition-all text-lg"
              />
              <button 
                onClick={handleSend}
                className="absolute right-4 top-4 bottom-4 px-8 rounded-xl bg-cyan-400 text-black font-extrabold hover:bg-cyan-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                SEND
              </button>
            </div>
            <p className="text-center text-[10px] text-white/20 mt-4 uppercase tracking-[0.2em] font-bold">
              Powered by Google Cloud TPU v6e & vLLM JAX Engine
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
