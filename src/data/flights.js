/* ============================================
   Wanderly — Flight booking data

   Feeds the booking screen (Pemesanan Tiket):
   the airline roster, the airport for each
   destination and the departure schedule.
   ============================================ */

import { getService } from './services'

export const bookingOrigin = { city: 'Jakarta', code: 'CGK' }

/* Where each destination is reached from Jakarta. */
const airports = {
  'ijen-crater': { city: 'Banyuwangi', code: 'BXW', fareDelta: 0 },
  'raja-ampat': { city: 'Sorong', code: 'SOQ', fareDelta: 30 },
  komodo: { city: 'Labuan Bajo', code: 'LBJ', fareDelta: 18 },
  borobudur: { city: 'Yogyakarta', code: 'JOG', fareDelta: -6 },
  'diamond-beach': { city: 'Denpasar', code: 'DPS', fareDelta: 6 },
  'nusa-penida': { city: 'Denpasar', code: 'DPS', fareDelta: 12 },
  'pink-beach': { city: 'Labuan Bajo', code: 'LBJ', fareDelta: 18 },
  bromo: { city: 'Surabaya', code: 'SUB', fareDelta: -4 },
  'tanah-lot': { city: 'Denpasar', code: 'DPS', fareDelta: 8 },
  derawan: { city: 'Berau', code: 'BEJ', fareDelta: 22 },
  bunaken: { city: 'Manado', code: 'MDC', fareDelta: 26 },
}

/* Five departure dates offered in the summary card. */
export const bookingDates = [
  { id: 'sun-10', day: 'Sun', date: '10 Oct', label: '10 Oct 2026', fare: 78 },
  { id: 'mon-11', day: 'Mon', date: '11 Oct', label: '11 Oct 2026', fare: 72 },
  { id: 'tue-12', day: 'Tue', date: '12 Oct', label: '12 Oct 2026', fare: 68 },
  { id: 'wed-13', day: 'Wed', date: '13 Oct', label: '13 Oct 2026', fare: 70 },
  { id: 'thu-14', day: 'Thu', date: '14 Oct', label: '14 Oct 2026', fare: 75 },
]

export const bookingDefaultDate = bookingDates[2].id

const airlines = {
  garuda: {
    name: 'Garuda Indonesia',
    code: 'GA',
    color: '#0b5fa8',
    logo: '/images/Garuda_Indonesia.png',
  },
  'lion-air': {
    name: 'Lion Air',
    code: 'JT',
    color: '#e11b22',
    logo: '/images/Lion_Air.png',
  },
  airasia: {
    name: 'AirAsia',
    code: 'QZ',
    color: '#e32526',
    logo: '/images/Air_Asia.png',
  },
  'super-air-jet': {
    name: 'Super Air Jet',
    code: 'IU',
    color: '#0b3c7a',
    logo: '/images/Super_Air_Jet.png',
  },
}

/* Departure slots; `discount` is taken off the date's base fare. */
const schedule = [
  { airline: 'garuda', depart: '08:15', arrive: '11:25', discount: 0 },
  { airline: 'lion-air', depart: '09:40', arrive: '12:55', discount: 6 },
  { airline: 'airasia', depart: '13:20', arrive: '16:35', discount: 10 },
  { airline: 'super-air-jet', depart: '18:05', arrive: '22:13', discount: 10 },
]

/* Fares are written in one place so the currency is easy to swap. */
export const formatFare = (value) => `$${value}`

/* Everything the booking screen needs for one destination and date. */
export function getBooking(serviceId, dateId) {
  const service = getService(serviceId)
  const airport = airports[service.id] ?? airports['ijen-crater']
  const date = bookingDates.find((item) => item.id === dateId) ?? bookingDates[2]

  return {
    service,
    origin: bookingOrigin,
    destination: airport,
    date,
    flights: schedule.map((slot) => {
      const airline = airlines[slot.airline]
      return {
        id: `${airport.code}-${slot.airline}`,
        airline: airline.name,
        airlineCode: airline.code,
        airlineColor: airline.color,
        airlineLogo: airline.logo,
        depart: slot.depart,
        arrive: slot.arrive,
        from: bookingOrigin.code,
        to: airport.code,
        cabin: 'Economy',
        fare: date.fare + airport.fareDelta - slot.discount,
      }
    }),
  }
}
