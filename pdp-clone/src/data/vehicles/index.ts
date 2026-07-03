import type { VehicleRecord } from '../../types';
import { cx30 } from './cx30-3mvdmbal7tm218544';
import { mazda3 } from './mazda3-jm1bpacl6t1867613';
import { cx5 } from './cx5-jm3kmcha0t0191703';
import { cx90 } from './cx90-jm3kkchd6t1405992';

export const vehicles: VehicleRecord[] = [cx30, mazda3, cx5, cx90];

export function getVehicleByVin(vin: string | null): VehicleRecord | undefined {
  if (!vin) return undefined;
  return vehicles.find((v) => v.vehicle.vin.toUpperCase() === vin.toUpperCase());
}
