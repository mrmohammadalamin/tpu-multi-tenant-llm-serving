"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <main className="min-h-screen px-8 py-12 max-w-7xl mx-auto font-inter text-white">
      {/* Hero Section */}
      <section className="mb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            TPU v6e CLUSTER ONLINE
          </div>
          <h1 className="text-5xl lg:text-7xl font-outfit font-extrabold mb-6 leading-tight">
            Gemma 3 <br />
            <span className="gradient-text">Multi-Tenant Serving</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-xl leading-relaxed">
            Enterprise-grade Multi-LoRA architecture on Google Cloud TPU v6e. 
            Served by vLLM JAX engine with queue-aware horizontal scaling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => window.location.href = '/playground'}
              className="glow-btn px-8 py-4 rounded-2xl text-lg font-bold text-white"
            >
              Launch Playground
            </button>
            <button className="px-8 py-4 rounded-2xl text-lg font-bold border border-white/10 hover:bg-white/5 transition-all">
              Documentation
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="w-full aspect-square max-w-md mx-auto glass-card relative overflow-hidden flex items-center justify-center p-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10" />
            <div className="relative z-10 w-48 h-48 border-2 border-cyan-400/30 rounded-3xl flex items-center justify-center animate-pulse">
              <div className="w-32 h-32 bg-cyan-400/20 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <span className="font-outfit text-4xl font-bold text-cyan-400">v6e</span>
              </div>
              <div className="absolute inset-0 border border-violet-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute -inset-4 border border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: 'Cluster Nodes', value: '4', change: '+2', sub: 'Scaled 5m ago' },
          { label: 'Avg Latency', value: '42ms', change: '-12%', sub: 'vs GPU' },
          { label: 'Request Queue', value: '2', change: 'Stable', sub: 'vLLM Metrics' },
          { label: 'Cost Saved', value: '75%', change: 'Active', sub: 'Spot Optimized' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <p className="text-sm font-medium text-white/40 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold font-outfit mb-2">{stat.value}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400`}>
                {stat.change}
              </span>
              <span className="text-xs text-white/20">{stat.sub}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Real-time Logs Preview */}
        <div className="lg:col-span-2 glass-card p-8 bg-black/40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-outfit">Cluster Scaling Logs</h2>
            <span className="text-xs font-mono text-white/40">vllm-autoscaler-v1</span>
          </div>
          <div className="space-y-3 font-mono text-[11px] leading-relaxed">
            <p className="text-cyan-400">[INFO] 20:42:01 - Queue length exceeded threshold (L=8 &gt; T=5)</p>
            <p className="text-white/60">[SCALING] 20:42:15 - Triggering HPA: Adding 2 new TPU v6e nodes...</p>
            <p className="text-white/40">[INFO] 20:43:50 - Node us-south1-ai1b-node-7 ready.</p>
            <p className="text-white/40">[INFO] 20:44:10 - Node us-south1-ai1b-node-8 ready.</p>
            <p className="text-green-400">[SUCCESS] 20:45:00 - Traffic redistributed. Latency stabilized at 42ms.</p>
            <p className="text-white/20">--------------------------------------------------</p>
            <p className="text-white/40">[INFO] 21:05:12 - Loading adapter 'Legal-v3' for Tenant LexisCorp...</p>
            <p className="text-white/40">[INFO] 21:05:12 - Adapter loaded in 34ms (TPU HBM warm-hit).</p>
          </div>
        </div>

        {/* Challenge FAQ Sidebar */}
        <div className="glass-card p-8 bg-gradient-to-br from-violet-500/10 to-transparent">
          <h2 className="text-xl font-bold font-outfit mb-6">Challenge FAQ</h2>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-cyan-400 mb-1">Q: Why TPU over GPU?</h4>
              <p className="text-xs text-white/60">A: TPU v6e provides 3x better price-to-performance for Multi-LoRA workloads due to higher HBM bandwidth.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-cyan-400 mb-1">Q: How do you handle 1k tenants?</h4>
              <p className="text-xs text-white/60">A: We use vLLM's dynamic LoRA swapping. We only load weights for active requests, keeping the base model static.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-cyan-400 mb-1">Q: What triggers scaling?</h4>
              <p className="text-xs text-white/60">A: Not CPU, but 'Request Queue Length'. This ensures zero-latency even during traffic spikes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Chart Section */}
      <section className="glass-card p-10 bg-black/40 text-center">
        <h2 className="text-3xl font-extrabold font-outfit mb-4">70% More Efficient Scaling</h2>
        <p className="text-white/40 max-w-2xl mx-auto mb-10">
          Our custom GKE controller ensures that for every $1 spent on traditional cloud GPUs, you get 3.4x more inference capacity on TPU v6e.
        </p>
        <div className="flex items-end justify-center gap-12 h-64 border-b border-white/10 pb-4">
          <div className="group relative">
            <div className="w-24 bg-white/10 h-64 rounded-t-xl transition-all group-hover:bg-white/20" />
            <p className="text-[10px] mt-4 font-bold text-white/40">LEGACY GPU</p>
          </div>
          <div className="group relative">
            <div className="w-24 bg-cyan-400 h-20 rounded-t-xl shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all group-hover:scale-105" />
            <p className="text-[10px] mt-4 font-bold text-cyan-400">TPU v6e (OURS)</p>
          </div>
        </div>
      </section>
    </main>
  );
}
