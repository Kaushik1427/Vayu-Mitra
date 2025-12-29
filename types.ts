
export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  WALK = 'Walking/Cycling'
}

export enum UserRole {
  CITIZEN = 'citizen',
  BOARD = 'board'
}

export interface AreaData {
  id: string;
  name: string;
  aqi: number;
  healthRisk: 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
  hotspotReason?: string;
  pm25: number;
  pm10: number;
  treeCount: number; // Estimated mature trees in the vicinity
  mitigationPotential: string; // Strategic note for planners
}

export interface FootprintResult {
  co2: number;
  savings: number;
  isShortTrip: boolean;
  advice: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
