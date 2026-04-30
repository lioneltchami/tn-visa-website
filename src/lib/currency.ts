export const USD_TO_CAD = 1.38 // Update periodically

export function formatCAD(usd: number): string {
  return `~$${Math.round(usd * USD_TO_CAD).toLocaleString()} CAD`
}
