import { useState } from 'react'
import './MyTrips.css'
import BottomNav from './BottomNav'
import { getCabin, tripTotal } from '../data/cabins'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function PlaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path transform="rotate(90 12 12)" d="M12 2.2c1 0 1.7 1.1 1.7 2.4v4.2l7.5 4.3v2.2l-7.5-2.2v4.4l2.6 2v1.6L12 20.5l-4.3 1.6v-1.6l2.6-2v-4.4l-7.5 2.2v-2.2l7.5-4.3V4.6c0-1.3.7-2.4 1.7-2.4Z" />
    </svg>
  )
}

function TicketIcon({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.2V6.8A1.6 1.6 0 0 1 4.6 5.2h14.8A1.6 1.6 0 0 1 21 6.8v2.4a2.6 2.6 0 0 0 0 5.2v2.8a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 17.2v-2.8a2.6 2.6 0 0 0 0-5.2Z" />
      <path d="M14.4 5.4v13.2" strokeDasharray="2 2.6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="m6.6 6.6 10.8 10.8M17.4 6.6 6.6 17.4" />
    </svg>
  )
}

/* A short, stable booking code for the e-ticket. */
function bookingCode(key) {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) % 46656
  }
  return `WL-${hash.toString(36).toUpperCase().padStart(3, '0')}`
}

export default function MyTrips({ trip, onCancel, onGoHome, onSelectTab }) {
  const { t, formatUSD } = usePreferences()
  const [showTicket, setShowTicket] = useState(false)

  const cabin = trip ? getCabin(trip.cabinId) : getCabin()
  const total = trip
    ? tripTotal(trip.flight.fare, trip.cabinId, trip.passengers)
    : 0
  const code = trip ? bookingCode(trip.key) : ''

  return (
    <div className="trips" id="trips-screen">
      <header className="trips-header">
        <h1 className="trips-title">{t('My Trips')}</h1>
        <p className="trips-subtitle">
          {trip ? t('Your upcoming flight') : t('All your flights in one place')}
        </p>
      </header>

      <main className="trips-scroll">
        {trip ? (
          <article className="trip-card" id="trip-card">
             <div className="trip-card-top">
              <span className="trip-badge" aria-hidden="true">
                {trip.flight.airlineLogo ? (
                  <img className="trip-badge-img" src={trip.flight.airlineLogo} alt="" />
                ) : (
                  trip.flight.airlineCode
                )}
              </span>
              <span className="trip-airline">{trip.flight.airline}</span>
              <span className="trip-status">{t('Confirmed')}</span>
            </div>

            <div className="trip-route">
              <div className="trip-stop">
                <span className="trip-code">{trip.flight.from}</span>
                <span className="trip-city">{trip.fromCity}</span>
                <span className="trip-time">{trip.flight.depart}</span>
              </div>

              <span className="trip-path" aria-hidden="true">
                <PlaneIcon />
              </span>

              <div className="trip-stop is-arrival">
                <span className="trip-code">{trip.flight.to}</span>
                <span className="trip-city">{trip.toCity}</span>
                <span className="trip-time">{trip.flight.arrive}</span>
              </div>
            </div>

            <div className="trip-divider" aria-hidden="true" />

            <div className="trip-meta">
              <div className="trip-meta-item">
                <span className="trip-meta-label">{t('Date')}</span>
                <span className="trip-meta-value">
                  {t(trip.date.day)}, {t(trip.date.label)}
                </span>
              </div>
              <div className="trip-meta-item">
                <span className="trip-meta-label">{t('Passenger')}</span>
                <span className="trip-meta-value">
                  {t(
                    trip.passengers > 1 ? '{count} Passengers' : '{count} Passenger',
                    { count: trip.passengers },
                  )}
                </span>
                <span className="trip-meta-sub">
                  {t(cabin.name)} ×{cabin.multiplier.toFixed(1)}
                </span>
              </div>
              <div className="trip-meta-item is-price">
                <span className="trip-meta-label">{t('Total')}</span>
                <span className="trip-meta-value">{formatUSD(total)}</span>
              </div>
            </div>

            <div className="trip-actions">
              <button
                type="button"
                className="trip-view"
                id="trip-view"
                onClick={() => setShowTicket(true)}
              >
                {t('View Ticket')}
              </button>
              <button
                type="button"
                className="trip-cancel"
                id="trip-cancel"
                onClick={onCancel}
              >
                {t('Cancel')}
              </button>
            </div>
          </article>
        ) : (
          <div className="trips-empty" id="trips-empty">
            <span className="trips-empty-icon" aria-hidden="true">
              <TicketIcon />
            </span>
            <h2 className="trips-empty-title">{t('No Trips Yet')}</h2>
            <p className="trips-empty-text">
              {t(
                "You haven't booked a flight yet. Pick a destination to get started.",
              )}
            </p>
            <button
              type="button"
              className="trips-explore"
              id="trips-explore"
              onClick={onGoHome}
            >
              {t('Explore destinations')}
            </button>
          </div>
        )}
      </main>

      {showTicket && trip && (
        <div className="trips-modal" role="dialog" aria-modal="true" aria-label="E-ticket">
          <button
            type="button"
            className="trips-modal-backdrop"
            aria-label="Close e-ticket"
            onClick={() => setShowTicket(false)}
          />

          <div className="trips-sheet">
            <span className="trips-sheet-grabber" aria-hidden="true" />

            <div className="trips-sheet-head">
              <h2 className="trips-sheet-title">{t('E-Ticket')}</h2>
              <button
                type="button"
                className="trips-sheet-close"
                aria-label="Close"
                onClick={() => setShowTicket(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <p className="trips-sheet-ref">
              {t('Booking code')} <strong>{code}</strong>
            </p>

            <div className="trips-sheet-route">
              <div className="trips-sheet-stop">
                <span className="trips-sheet-code">{trip.flight.from}</span>
                <span className="trips-sheet-city">{trip.fromCity}</span>
                <span className="trips-sheet-time">{trip.flight.depart}</span>
              </div>
              <span className="trips-sheet-path" aria-hidden="true">
                <PlaneIcon />
              </span>
              <div className="trips-sheet-stop is-arrival">
                <span className="trips-sheet-code">{trip.flight.to}</span>
                <span className="trips-sheet-city">{trip.toCity}</span>
                <span className="trips-sheet-time">{trip.flight.arrive}</span>
              </div>
            </div>

            <dl className="trips-sheet-details">
              <div>
                <dt>{t('Destination')}</dt>
                <dd>{trip.serviceName}</dd>
              </div>
              <div>
                <dt>{t('Airline')}</dt>
                <dd className="trips-airline-value">
                  {trip.flight.airlineLogo ? (
                    <img
                      className="trips-airline-logo"
                      src={trip.flight.airlineLogo}
                      alt=""
                    />
                  ) : null}
                  {trip.flight.airline}
                </dd>
              </div>
              <div>
                <dt>{t('Date')}</dt>
                <dd>
                  {t(trip.date.day)}, {t(trip.date.label)}
                </dd>
              </div>
              <div>
                <dt>{t('Class')}</dt>
                <dd>
                  {t(cabin.name)} ×{cabin.multiplier.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt>{t('Passenger')}</dt>
                <dd>
                  {t(
                    trip.passengers > 1 ? '{count} Passengers' : '{count} Passenger',
                    { count: trip.passengers },
                  )}
                </dd>
              </div>
              <div>
                <dt>{t('Total paid')}</dt>
                <dd className="is-total">{formatUSD(total)}</dd>
              </div>
            </dl>

            <div className="trips-sheet-barcode" aria-hidden="true" />

            <button
              type="button"
              className="trip-view trips-sheet-done"
              onClick={() => setShowTicket(false)}
            >
              {t('Done')}
            </button>
          </div>
        </div>
      )}

      <BottomNav active="trips" onSelect={onSelectTab} />
    </div>
  )
}
