"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="min-h-screen px-8 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h1 className="text-5xl lg:text-7xl font-outfit font-extrabold mb-6 leading-tight">
            Next-Gen LLM <br />
            <span className="gradient-text">TPU v6e Multi-Tenancy</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-xl leading-relaxed">
            Scalable Multi-LoRA vLLM architecture running on Google's latest **TPU v6e**. 
            Leveraging a 16-chip CT6E cluster for maximum throughput and 70% cost reduction.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="glow-btn px-8 py-4 rounded-2xl text-lg font-bold text-white">
              Launch Playground
            </button>
            <button className="px-8 py-4 rounded-2xl text-lg font-bold border border-white/10 hover:bg-white/5 transition-all">
              View Documentation
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="w-full aspect-square max-w-md mx-auto glass-card relative overflow-hidden flex items-center justify-center p-8 group">
            {/* Animated TPU Chip Visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10" />
            <div className="relative z-10 w-48 h-48 border-2 border-cyan-400/30 rounded-3xl flex items-center justify-center animate-pulse">
              <div className="w-32 h-32 bg-cyan-400/20 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <span className="font-outfit text-4xl font-bold text-cyan-400">v6e</span>
              </div>
              {/* Spinning rings */}
              <div className="absolute inset-0 border border-violet-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute -inset-4 border border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
            {/* Float badges */}
            <div className="absolute top-10 right-10 glass-card px-4 py-2 text-xs font-bold text-cyan-400 border-cyan-400/20">
              JAX OPTIMIZED
            </div>
            <div className="absolute bottom-10 left-10 glass-card px-4 py-2 text-xs font-bold text-violet-400 border-violet-400/20">
              PAGED ATTENTION
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: 'Avg Latency', value: '42ms', change: '-12%', sub: 'vs GPU' },
          { label: 'Throughput', value: '1.2k', change: '+24%', sub: 'tokens/sec' },
          { label: 'Active LoRAs', value: '1,420', change: '+5', sub: 'new today' },
          { label: 'Infrastructure Cost', value: '$0.6/hr', change: '-75%', sub: 'vs A100' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <p className="text-sm font-medium text-white/40 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold font-outfit mb-2">{stat.value}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-white/20">{stat.sub}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tenant LoRA Management */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-outfit">Active LoRA Adapters</h2>
            <button className="text-sm font-bold text-cyan-400 hover:underline">+ Register New</button>
          </div>
          <div className="space-y-4">
            {[
              { id: 't-001', name: 'Legal-Gemma-2', tenant: 'LexisCorp', status: 'Warm' },
              { id: 't-002', name: 'Med-Assistant', tenant: 'HealthCare Inc', status: 'Active' },
              { id: 't-003', name: 'Code-Guru', tenant: 'DevStudio', status: 'Standby' },
              { id: 't-004', name: 'Marketing-Pro', tenant: 'GlobalAd', status: 'Warm' },
            ].map((lora, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-white/40 group-hover:text-cyan-400 transition-colors">
                    {lora.id.split('-')[1]}
                  </div>
                  <div>
                    <h4 className="font-bold">{lora.name}</h4>
                    <p className="text-xs text-white/40">{lora.tenant}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${lora.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {lora.status}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Comparison Sidebar */}
        <div className="glass-card p-8 bg-gradient-to-b from-white/[0.05] to-transparent">
          <h2 className="text-2xl font-bold font-outfit mb-6">TPU vs GPU</h2>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">
              <p className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Estimated Savings</p>
              <h4 className="text-4xl font-extrabold font-outfit">$4,280<span className="text-sm font-normal text-white/40 ml-1">/mo</span></h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">TPU v5e Efficiency</span>
                  <span className="text-cyan-400 font-bold">94%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[94%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Standard A100 Cost</span>
                  <span className="text-white/40 font-bold">100%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 w-[100%]" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-sm text-white/40 leading-relaxed italic">
                "TPUs allow for significantly higher adapter density per chip compared to traditional GPU architectures."
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
