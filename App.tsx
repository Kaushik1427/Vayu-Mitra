
import React, { useState } from 'react';
import Calculator from './components/Calculator';
import BoardView from './components/BoardView';
import { getAuditAnalysis } from './services/geminiService';
import { FuelType, UserRole } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [auditResult, setAuditResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAudit = async (co2: number, distance: number, fuel: FuelType) => {
    setIsLoading(true);
    // Explicitly instructing the model to ONLY provide Citizen content
    const prompt = `
      Perform a Vayu-Mitra audit for a CITIZEN:
      - Trip Distance: ${distance} km
      - Mode: ${fuel}
      - Calculated CO2: ${co2.toFixed(3)} kg
      
      STRICT REQUIREMENT: 
      - Use ONLY the CITIZEN PERSONA.
      - DO NOT include "Section 2", "Pollution Board Strategic Brief", or any policy recommendations.
      - Focus on: personal savings, tree equivalents, and the 2km Active Mobility rule.
      - Gamify the results for the resident.
    `;
    const response = await getAuditAnalysis(prompt);
    setAuditResult(response || "Audit failed.");
    setIsLoading(false);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-12">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2.5 2.5 0 002.5-2.5V4a2 2 0 00-2-2h-1.305m-1.797 16.106L15 15.3l1.118-1.118a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-1.118-1.118z" />
              </svg>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2">VAYU-MITRA AI</h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-sm">Hyderabad Environmental Auditor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              onClick={() => setRole(UserRole.CITIZEN)}
              className="group bg-slate-800/50 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-400 p-8 rounded-[2rem] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-600/20"
            >
              <div className="w-12 h-12 bg-emerald-500/20 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <svg className="w-6 h-6 text-emerald-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">I am a Citizen</h3>
              <p className="text-slate-400 group-hover:text-emerald-100 leading-relaxed font-medium">Audit your personal footprint, take the 2km challenge, and save Hyderabad's air quality.</p>
            </button>

            <button 
              onClick={() => setRole(UserRole.BOARD)}
              className="group bg-slate-800/50 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-400 p-8 rounded-[2rem] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-600/20"
            >
              <div className="w-12 h-12 bg-indigo-500/20 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <svg className="w-6 h-6 text-indigo-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">I am Policy Planner</h3>
              <p className="text-slate-400 group-hover:text-indigo-100 leading-relaxed font-medium">Access TSPCB regional data, urban canopy metrics, and strategic infrastructure briefs.</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-500 bg-slate-50`}>
      <header className={`${role === UserRole.CITIZEN ? 'bg-emerald-900' : 'bg-indigo-950'} text-white sticky top-0 z-50 shadow-lg transition-colors`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${role === UserRole.CITIZEN ? 'bg-emerald-500' : 'bg-indigo-500'} rounded-xl flex items-center justify-center shadow-inner`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2.5 2.5 0 002.5-2.5V4a2 2 0 00-2-2h-1.305m-1.797 16.106L15 15.3l1.118-1.118a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-1.118-1.118z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none uppercase">Vayu-Mitra</h1>
              <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mt-1">
                {role === UserRole.CITIZEN ? 'Citizen Change-Maker' : 'TSPCB Policy Board'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {setRole(null); setAuditResult('');}}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9z" /></svg>
            Switch Role
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {role === UserRole.CITIZEN ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-8">
              <Calculator onResult={handleAudit} />
              <div className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-xl shadow-emerald-600/5 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                  <svg className="w-20 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                </div>
                <h4 className="font-black text-emerald-900 text-lg mb-2">The Active Mobility Score</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Walking for trips &lt;2km reduces localized PM2.5 by up to 15%. Engines emit significantly more toxins during the first 2km.</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 h-2 bg-emerald-50 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-xs font-black text-emerald-600">80% Shift Potential</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              {isLoading ? (
                <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50">
                  <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Auditing Personal Impact</h3>
                  <p className="text-slate-500 max-w-xs">Connecting to Hyderabad's environmental sensors...</p>
                </div>
              ) : auditResult ? (
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="prose prose-emerald max-w-none prose-h2:text-3xl prose-h2:font-black prose-h3:text-xl prose-h3:font-bold prose-strong:text-emerald-900">
                    <div dangerouslySetInnerHTML={{ __html: formatMarkdown(auditResult) }} />
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50/50 border-4 border-dashed border-emerald-100 p-20 rounded-[2.5rem] text-center">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
                    <svg className="w-10 h-10 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-emerald-800/30 mb-2 uppercase tracking-tighter">Impact Data Pending</h3>
                  <p className="text-emerald-800/20 font-bold">Configure your trip to start the Vayu-Mitra audit.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <BoardView />
        )}
      </main>
    </div>
  );
};

function formatMarkdown(text: string) {
  return text
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-black mt-10 mb-6 border-b-8 border-emerald-50 pb-2 flex items-center gap-3"><span class="w-2 h-8 bg-emerald-500 rounded-full"></span>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4 text-emerald-800">$1</h3>')
    .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-3 list-disc text-slate-700 leading-relaxed">$1</li>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-black text-emerald-950 bg-emerald-50 px-1 rounded">$1</strong>')
    .replace(/\n/gim, '<br />');
}

export default App;
