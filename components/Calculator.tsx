
import React, { useState, useMemo } from 'react';
import { FuelType } from '../types';
import { EMISSION_FACTORS, VEHICLE_ECONOMY, COLD_START_PENALTY } from '../constants';

interface CalculatorProps {
  onResult: (co2: number, distance: number, fuel: FuelType) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onResult }) => {
  const [distance, setDistance] = useState<number>(0);
  const [fuelType, setFuelType] = useState<FuelType>(FuelType.PETROL);

  const calculation = useMemo(() => {
    let co2 = 0;
    let penalty = distance < 2 && fuelType !== FuelType.WALK && fuelType !== FuelType.ELECTRIC ? COLD_START_PENALTY : 1;
    
    if (fuelType === FuelType.PETROL) {
      co2 = (distance / VEHICLE_ECONOMY.PETROL_CAR) * EMISSION_FACTORS.PETROL * penalty;
    } else if (fuelType === FuelType.DIESEL) {
      co2 = (distance / VEHICLE_ECONOMY.DIESEL_CAR) * EMISSION_FACTORS.DIESEL * penalty;
    } else if (fuelType === FuelType.ELECTRIC) {
      co2 = distance * VEHICLE_ECONOMY.ELECTRIC_CAR * EMISSION_FACTORS.ELECTRIC_GRID;
    }

    return co2;
  }, [distance, fuelType]);

  const handleAudit = () => {
    onResult(calculation, distance, fuelType);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Trip Auditor
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Distance of Trip (km)</label>
          <input 
            type="range" 
            min="0" 
            max="50" 
            step="0.5" 
            value={distance} 
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between mt-2 text-sm text-slate-500">
            <span>0 km</span>
            <span className="font-bold text-emerald-600 text-lg">{distance} km</span>
            <span>50 km</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Mode of Transport</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(FuelType).map((type) => (
              <button
                key={type}
                onClick={() => setFuelType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  fuelType === type 
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="text-sm text-emerald-800 font-medium mb-1 text-center">Estimated Footprint</div>
          <div className="text-3xl font-black text-emerald-900 text-center">
            {calculation.toFixed(3)} <span className="text-sm font-normal">kg CO2</span>
          </div>
          {distance < 2 && distance > 0 && fuelType !== FuelType.WALK && (
            <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Cold start penalty applied for sub-2km trip. Efficiency dropped by 1.5x.</span>
            </div>
          )}
        </div>

        <button 
          onClick={handleAudit}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          Generate Vayu-Mitra Audit
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Calculator;
