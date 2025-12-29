
import { AreaData } from './types';

export const EMISSION_FACTORS = {
  ELECTRIC_GRID: 0.82, // kg CO2 / kWh
  PETROL: 2.31, // kg CO2 / L
  DIESEL: 2.68, // kg CO2 / L
  WALK: 0,
};

export const COLD_START_PENALTY = 1.5;

export const HYDERABAD_AREAS: AreaData[] = [
  { 
    id: 'sanathnagar', 
    name: 'Sanathnagar', 
    aqi: 285, 
    healthRisk: 'Poor', 
    hotspotReason: 'Industrial emissions & heavy vehicle movement',
    pm25: 120,
    pm10: 240,
    treeCount: 4200,
    mitigationPotential: 'Critical need for vertical gardening & industrial green belts.'
  },
  { 
    id: 'gachibowli', 
    name: 'Gachibowli', 
    aqi: 142, 
    healthRisk: 'Moderate', 
    hotspotReason: 'Construction dust & Bio-diversity junction congestion',
    pm25: 65,
    pm10: 130,
    treeCount: 12500,
    mitigationPotential: 'Protect existing rocky terrain & expand footpaths for IT commuters.'
  },
  { 
    id: 'jubilee-hills', 
    name: 'Jubilee Hills', 
    aqi: 95, 
    healthRisk: 'Satisfactory', 
    hotspotReason: 'High vehicular density during peak hours',
    pm25: 40,
    pm10: 85,
    treeCount: 28000,
    mitigationPotential: 'Model for urban canopy; focus on traffic flow management.'
  },
  { 
    id: 'nehru-zoo', 
    name: 'Nehru Zoo Park', 
    aqi: 310, 
    healthRisk: 'Very Poor', 
    hotspotReason: 'Waste burning nearby & heavy traffic on Mir Alam Tank road',
    pm25: 160,
    pm10: 320,
    treeCount: 45000,
    mitigationPotential: 'Buffer zone required between Zoo and industrial peripheries.'
  },
  { 
    id: 'bollaram', 
    name: 'Bollaram', 
    aqi: 215, 
    healthRisk: 'Poor', 
    hotspotReason: 'Industrial cluster & chemical units',
    pm25: 95,
    pm10: 190,
    treeCount: 6800,
    mitigationPotential: 'Focus on air scrubbing technology over simple afforestation.'
  },
  { 
    id: 'hitec-city', 
    name: 'Hitec City', 
    aqi: 168, 
    healthRisk: 'Moderate', 
    hotspotReason: 'High private vehicle usage & tech park traffic',
    pm25: 75,
    pm10: 155,
    treeCount: 10200,
    mitigationPotential: 'Last-mile EV shuttle implementation & high-density walking corridors.'
  }
];

export const VEHICLE_ECONOMY = {
  PETROL_CAR: 12, // km/L
  DIESEL_CAR: 15, // km/L
  ELECTRIC_CAR: 0.15, // kWh/km
};
