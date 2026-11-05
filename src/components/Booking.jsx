import { useEffect, useState } from 'react'
import './Booking.css'
import BottomNav from './BottomNav'
import {
  bookingDates,
  bookingDefaultDate,
  getBooking,
} from '../data/flights'
import {
  CABINS,
  DEFAULT_CABIN_ID,
  MAX_PASSENGERS,
  MIN_PASSENGERS,
  getCabin,
  tripTotal,
} from '../data/cabins'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m14.6 5.2-6.9 6.8 6.9 6.8" />
    </svg>
  )
}

/* Landing plane: the aircraft descends towards the runway line. */
function LandingPlaneIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g transform="rotate(90 12 12) translate(12 12) scale(0.72) translate(-12 -12)">
        <path
          d="M12 2.2c1 0 1.7 1.1 1.7 2.4v4.2l7.5 4.3v2.2l-7.5-2.2v4.4l2.6 2v1.6L12 20.5l-4.3 1.6v-1.6l2.6-2v-4.4l-7.5 2.2v-2.2l7.5-4.3V4.6c0-1.3.7-2.4 1.7-2.4Z"
          fill="currentColor"
        />
      </g>
      <path d="M4.5 20.6h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9.4 5.2 6.9 6.8-6.9 6.8" />
    </svg>
  )
}

export default function Booking({
  serviceId,
  trip,
  onSelectTrip,
  onBack,
  onGoHome,
  onGoProfile,
  onGoTrips,
}) {
  const { t, formatUSD } = usePreferences()
  const [dateId, setDateId] = useState(() => trip?.date?.id ?? bookingDefaultDate)
  const [passengers, setPassengers] = useState(() => trip?.passengers ?? 1)
  const [cabinId, setCabinId] = useState(() => trip?.cabinId ?? DEFAULT_CABIN_ID)
  const [showCabins, setShowCabins] = useState(false)
  const [pendingFlight, setPendingFlight] = useState(null)

  const { service, origin, destination, date, flights } = getBooking(serviceId, dateId)
  const cabin = getCabin(cabinId)

  // Sheets close with Escape, like the settings sheet in Profile.
  useEffect(() => {
    if (!showCabins && !pendingFlight) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setShowCabins(false)
      setPendingFlight(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showCabins, pendingFlight])

  // Passengers and class are stored on the trip so My Trips and the
  // e-ticket read exactly the same values.
  const syncTrip = (patch) => {
    if (!trip || trip.serviceId !== service.id) return
    onSelectTrip?.({ ...trip, ...patch })
  }

  const changePassengers = (delta) => {
    const next = Math.min(
      MAX_PASSENGERS,
      Math.max(MIN_PASSENGERS, passengers + delta),
    )
    if (next === passengers) return
    setPassengers(next)
    syncTrip({ passengers: next })
  }

  const chooseCabin = (option) => {
    setCabinId(option.id)
    setShowCabins(false)
    syncTrip({ cabinId: option.id })
  }

  const handleNav = (tab) => {
    if (tab === 'home') onGoHome?.()
    if (tab === 'profile') onGoProfile?.()
    if (tab === 'trips') onGoTrips?.()
  }

  // Selecting a flight asks for confirmation first; on "yes" the trip is
  // stored in App and the user lands on My Trips with the ticket booked.
  const selectFlight = (flight, isSelected) => {
    if (isSelected) {
      onSelectTrip?.(null)
      return
    }
    setPendingFlight(flight)
  }

  const confirmFlight = () => {
    if (!pendingFlight) return
    onSelectTrip?.({
      key: `${dateId}-${pendingFlight.id}`,
      serviceId: service.id,
      serviceName: service.name,
      fromCity: origin.city,
      toCity: destination.city,
      flight: pendingFlight,
      date,
      passengers,
      cabinId: cabin.id,
    })
    setPendingFlight(null)
    onGoTrips?.()
  }

  const cancelFlight = () => setPendingFlight(null)

  return (
    <div className="booking" id="booking-screen">
      <header className="booking-header">
        <button
          type="button"
          className="booking-back"
          id="booking-back"
          aria-label="Back to service detail"
          onClick={onBack}
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="booking-title">{t('Flights')}</h1>
      </header>

      <main className="booking-scroll">
        <section className="booking-summary">
          <div className="booking-summary-top">
            <span className="booking-plane" aria-hidden="true">
              <LandingPlaneIcon size={22} />
            </span>

            <div className="booking-route">
              <p className="booking-route-cities">
                {origin.city}
                <span className="booking-route-arrow" aria-hidden="true">
                  →
                </span>
                {destination.city}
              </p>
              <p className="booking-route-meta">
                {t(date.label)} •{' '}
                {t(
                  passengers > 1 ? '{count} Passengers' : '{count} Passenger',
                  { count: passengers },
                )}
              </p>
            </div>

            <div className="booking-stepper" id="booking-passengers">
              <button
                type="button"
                className="booking-step"
                id="booking-passenger-minus"
                aria-label="Remove passenger"
                disabled={passengers <= MIN_PASSENGERS}
                onClick={() => changePassengers(-1)}
              >
                −
              </button>
              <span
                className="booking-step-value"
                id="booking-passenger-count"
                aria-live="polite"
              >
                {passengers}
              </span>
              <button
                type="button"
                className="booking-step"
                id="booking-passenger-plus"
                aria-label="Add passenger"
                disabled={passengers >= MAX_PASSENGERS}
                onClick={() => changePassengers(1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="booking-dates" id="booking-dates">
            {bookingDates.map((option) => {
              const isActive = option.id === dateId
              return (
                <button
                  type="button"
                  key={option.id}
                  className={`booking-date${isActive ? ' is-active' : ''}`}
                  id={`booking-date-${option.id}`}
                  aria-pressed={isActive}
                  onClick={() => setDateId(option.id)}
                >
                  <span className="booking-date-day">{t(option.day)}</span>
                  <span className="booking-date-value">{t(option.date)}</span>
                  <span className="booking-date-fare">
                    {formatUSD(
                      (option.fare + destination.fareDelta) * cabin.multiplier,
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="booking-class"
            id="booking-class"
            aria-haspopup="dialog"
            aria-expanded={showCabins}
            onClick={() => setShowCabins(true)}
          >
            <span className="booking-class-info">
              <span className="booking-class-label">{t('Class')}</span>
              <span className="booking-class-name">{t(cabin.name)}</span>
            </span>
            <span className="booking-class-meta">
              <span className="booking-class-mult">
                ×{cabin.multiplier.toFixed(1)}
              </span>
              <ChevronRightIcon />
            </span>
          </button>
        </section>

        <h2 className="booking-section-title">{t('Airlines:')}</h2>

        <div className="booking-list">
          {flights.map((flight) => {
            const isSelected =
              trip?.key === `${dateId}-${flight.id}` &&
              trip?.serviceId === service.id
            return (
              <article
                className={`booking-card${isSelected ? ' is-selected' : ''}`}
                id={`booking-flight-${flight.id}`}
                key={flight.id}
              >
                <div className="booking-card-head">
                  <span className="booking-logo" aria-hidden="true">
                    {flight.airlineLogo ? (
                      <img className="booking-logo-img" src={flight.airlineLogo} alt="" />
                    ) : (
                      flight.airlineCode
                    )}
                  </span>
                  <span className="booking-airline">{flight.airline}</span>
                </div>

                <div className="booking-times">
                  <span className="booking-time">{flight.depart}</span>
                  <span className="booking-track" aria-hidden="true" />
                  <span className="booking-time is-arrival">{flight.arrive}</span>
                  <span className="booking-code">{flight.from}</span>
                  <span />
                  <span className="booking-code is-arrival">{flight.to}</span>
                </div>

                <div className="booking-card-side">
                  <span className="booking-cabin">{t(cabin.name)}</span>
                  <span className="booking-fare">
                    {formatUSD(tripTotal(flight.fare, cabin.id, passengers))}
                  </span>
                  <button
                    type="button"
                    className="booking-select"
                    id={`booking-select-${flight.id}`}
                    aria-pressed={isSelected}
                    onClick={() => selectFlight(flight, isSelected)}
                  >
                    {isSelected ? t('Selected') : t('Select')}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </main>

      {showCabins && (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-label={t('Choose class')}
          id="booking-class-modal"
        >
          <button
            type="button"
            className="booking-backdrop"
            aria-label="Close"
            onClick={() => setShowCabins(false)}
          />

          <div className="booking-sheet">
            <span className="booking-sheet-grabber" aria-hidden="true" />
            <div className="booking-sheet-head">
              <h2 className="booking-sheet-title">{t('Choose class')}</h2>
              <button
                type="button"
                className="booking-sheet-close"
                aria-label="Close"
                onClick={() => setShowCabins(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="booking-options">
              {CABINS.map((option) => {
                const isActive = option.id === cabin.id
                return (
                  <button
                    type="button"
                    key={option.id}
                    className={`booking-option${isActive ? ' is-active' : ''}`}
                    id={`booking-cabin-${option.id}`}
                    aria-pressed={isActive}
                    onClick={() => chooseCabin(option)}
                  >
                    <span className="booking-option-name">{t(option.name)}</span>
                    <span className="booking-option-mult">
                      ×{option.multiplier.toFixed(1)}
                    </span>
                    <span className="booking-option-check" aria-hidden="true">
                      {isActive ? '✓' : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {pendingFlight && (
        <div
          className="booking-modal booking-confirm-modal"
          role="alertdialog"
          aria-modal="true"
          aria-label={t('Confirm booking')}
          id="booking-confirm"
        >
          <button
            type="button"
            className="booking-backdrop"
            aria-label="Close"
            onClick={cancelFlight}
          />

          <div className="booking-confirm">
            <span className="booking-confirm-badge" aria-hidden="true">
              <LandingPlaneIcon size={26} />
            </span>
            <h2 className="booking-confirm-title">{t('Book this flight?')}</h2>
            <p className="booking-confirm-text">
              {t('Your ticket will be booked and you will be taken to My Trips.')}
            </p>
            <div className="booking-confirm-actions">
              <button
                type="button"
                className="booking-confirm-btn is-ghost"
                id="booking-confirm-no"
                onClick={cancelFlight}
              >
                {t('No')}
              </button>
              <button
                type="button"
                className="booking-confirm-btn is-primary"
                id="booking-confirm-yes"
                onClick={confirmFlight}
              >
                {t('Yes')}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="trips" onSelect={handleNav} />
    </div>
  )
}
