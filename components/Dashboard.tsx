
import React from 'react';
import { HYDERABAD_AREAS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return '#10b981'; // Good
  if (aqi <= 100) return '#84cc16'; // Satisfactory
  if (aqi <= 200) return '#facc15'; // Moderate
  if (aqi <= 300) return '#f97316'; // Poor
  if (aqi <= 400) return '#ef4444'; // Very Poor
  return '#7f1d1d'; // Severe
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HYDERABAD_AREAS.slice(0, 3).map((area) => (
          <div key={area.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <span className="text-slate-500 text-sm font-medium mb-1">{area.name}</span>
            <div className="text-4xl font-black mb-1" style={{ color: getAQIColor(area.aqi) }}>
              {area.aqi}
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-50 text-slate-600 uppercase tracking-wider">
              {area.healthRisk}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Regional AQI Comparison</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HYDERABAD_AREAS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="aqi" radius={[4, 4, 0, 0]}>
                {HYDERABAD_AREAS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getAQIColor(entry.aqi)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hotspot Location</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">PM2.5 / PM10</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Context</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {HYDERABAD_AREAS.map((area) => (
              <tr key={area.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{area.name}</div>
                  <div className="text-xs text-slate-500">{area.healthRisk} Risk</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium">{area.pm25}</span>
                    <span className="text-[10px] text-slate-400">/</span>
                    <span className="text-sm font-medium">{area.pm10}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {area.hotspotReason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
