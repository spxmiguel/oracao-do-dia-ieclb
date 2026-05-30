import type { Denomination } from "../types";

export const denominationLabels: Record<Denomination, string> = {
  evangelical: "Evangélico",
  catholic: "Católico",
  non_religious_christian: "Cristão sem religião"
};

export const denominations: Array<{ value: Denomination; label: string }> = [
  { value: "evangelical", label: denominationLabels.evangelical },
  { value: "catholic", label: denominationLabels.catholic },
  {
    value: "non_religious_christian",
    label: denominationLabels.non_religious_christian
  }
];
