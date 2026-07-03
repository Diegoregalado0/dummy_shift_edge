export interface Vehicle {
  condition: 'New' | 'Used';
  year: number;
  make: string;
  model: string;
  trim: string;
  vin: string;
  stock: string;
  msrp: number;
  image: string;
  bodyType: string;
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelEconomyCity: number;
  fuelEconomyHwy: number;
}

export interface DetailCategory {
  category: string;
  items: string[];
}

export interface VehicleRecord {
  vehicle: Vehicle;
  basicInfo: { label: string; value: string }[];
  keyFeatures: string[];
  detailCategories: DetailCategory[];
  /** Where this data was sourced from, for traceability. */
  source: string;
}

export function vehicleMakeModel(vehicle: Vehicle): string {
  return vehicle.model.startsWith(vehicle.make)
    ? vehicle.model
    : `${vehicle.make} ${vehicle.model}`;
}
