/* ============================================
   Wanderly — Flight fare classes

   Every flight is sold in four classes. The
   multiplier is applied to the airline's base
   fare (USD) and then to the passenger count, so
   the booking screen, My Trips and the e-ticket
   all derive their totals from the same numbers.
   ============================================ */

export const CABINS = [
  { id: 'economy', name: 'Economy', multiplier: 1 },
  { id: 'premium-economy', name: 'Premium Economy', multiplier: 1.6 },
  { id: 'business', name: 'Business', multiplier: 2.6 },
  { id: 'first', name: 'First', multiplier: 4 },
]

export const DEFAULT_CABIN_ID = CABINS[0].id
export const MIN_PASSENGERS = 1
export const MAX_PASSENGERS = 9

export function getCabin(id) {
  return CABINS.find((cabin) => cabin.id === id) ?? CABINS[0]
}

/* baseFare × multiplier → fare for one passenger. */
export function fareFor(baseFare, cabinId) {
  return round(baseFare * getCabin(cabinId).multiplier)
}

/* baseFare × multiplier × passengers → what the ticket costs. */
export function tripTotal(baseFare, cabinId, passengers = 1) {
  return round(fareFor(baseFare, cabinId) * passengers)
}

function round(value) {
  return Math.round(value * 100) / 100
}
