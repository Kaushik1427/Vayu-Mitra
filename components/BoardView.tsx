
import React from 'react';
import { HYDERABAD_AREAS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const getAQIColor = (aqi: number) => {
  if (aqi <= 100) return '#10b981';
  if (aqi <= 200) return '#facc15';
  if (aqi <= 300) return '#f97316';
  return '#ef4444';
};

const BoardView: React.FC = () => {
  const totalTrees = HYDERABAD_AREAS.reduce((acc, curr) => acc + curr.treeCount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">TSPCB Strategic Dashboard</h2>
          <p className="text-slate-500 font-medium">Policy Planner Mode | Hyderabad 2025</p>
        </div>
        <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Monitored Canopy</div>
            <div className="text-2xl font-black">{totalTrees.toLocaleString()} <span className="text-sm font-normal text-emerald-400">Trees</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Regional AQI Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HYDERABAD_AREAS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="aqi" radius={[6, 6, 0, 0]} name="AQI Level">
                  {HYDERABAD_AREAS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getAQIColor(entry.aqi)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Urban Canopy vs. PM2.5 (Inverse Correlation)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HYDERABAD_AREAS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar yAxisId="left" dataKey="treeCount" fill="#10b981" radius={[6, 6, 0, 0]} name="Tree Count" />
                <Bar yAxisId="right" dataKey="pm25" fill="#6366f1" radius={[6, 6, 0, 0]} name="PM2.5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Infrastructure Audit List</h3>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Live Monitoring</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Location</th>
              <th className="px-8 py-4">AQI Risk</th>
              <th className="px-8 py-4">Canopy Density</th>
              <th className="px-8 py-4">Strategic Planner Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {HYDERABAD_AREAS.map((area) => (
              <tr key={area.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-8 py-6">
                  <div className="font-black text-slate-800 text-lg leading-tight">{area.name}</div>
                  <div className="text-xs text-slate-500 font-medium">ID: TSPCB-{area.id.toUpperCase()}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getAQIColor(area.aqi) }}></div>
                    <span className="font-black text-slate-700">{area.aqi}</span>
                    <span className="text-xs font-bold text-slate-400">({area.healthRisk})</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-emerald-700">{area.treeCount.toLocaleString()} Mature Trees</div>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-2">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (area.treeCount / 30000) * 100)}%` }}></div>
                  </div>
                </td>
                <td className="px-8 py-6 max-w-xs">
                  <div className="text-sm text-slate-600 italic bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                    "{area.mitigationPotential}"
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardView;
