import { useState } from 'react'
import './Home.css'
import BottomNav from './BottomNav'
import { homePopular, homeRecommended } from '../data/services'
import TagIcon from './TagIcon'
import { usePreferences } from '../i18n/context'

/* Small cards label a beach with its island: "Nusa Penida, Bali". */
const nameWithRegion = (item) => `${item.name}, ${item.location.split(', ').pop()}`

/* ---- Icons ---- */

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m19.6 19.6-3.5-3.5" />
    </svg>
  )
}

function StarIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6l2.9 5.87 6.48.95-4.69 4.57 1.11 6.45L12 17.4l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.95z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function Home({ onNavigate, onOpenDetail, onOpenProfile, onOpenTrips }) {
  const { t, serviceText } = usePreferences()
  const [term, setTerm] = useState('')
  const [openId, setOpenId] = useState(null)

  const handleSearch = (event) => {
    event.preventDefault()
    onNavigate('services', term)
  }

  // Recommended cards open the detail sheet; tapping the open card closes it.
  // Opening scrolls the finished sheet into view after the animation.
  const toggleRecommended = (id) => {
    const opening = id !== openId
    setOpenId(opening ? id : null)

    if (opening) {
      window.setTimeout(() => {
        document
          .getElementById(`home-recommended-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 340)
    }
  }

  return (
    <div className="home" id="home-screen">
      {/* Blue header */}
      <header className="home-header">
        <div className="home-header-top">
          <div className="home-location">
            <span className="home-location-label">{t('Your location')}</span>
            <h1 className="home-location-city" id="home-location-city">
              Denpasar, Bali
            </h1>
          </div>

          <button
            type="button"
            className="home-settings"
            id="home-settings"
            aria-label="Settings"
            onClick={onOpenProfile}
          >
            <GearIcon />
          </button>
        </div>

        <form
          className="home-search"
          id="home-search"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="home-search-input"
            id="home-search-input"
            value={term}
            placeholder={t('Search destination')}
            aria-label="Search destination"
            onChange={(event) => setTerm(event.target.value)}
          />
          <button
            type="submit"
            className="home-search-btn"
            id="home-search-btn"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>
      </header>

      {/* Scrollable content */}
      <main className="home-scroll">
        <section className="home-section">
          <h2 className="home-section-title">{t('Popular nearby:')}</h2>

          <div className="home-popular-row">
            {homePopular.map((item) => (
              <button
                type="button"
                className="home-popular-card"
                id={`home-popular-${item.id}`}
                key={item.id}
                aria-label={`${nameWithRegion(item)}, rating ${item.rating}`}
                onClick={() => onOpenDetail(item.id)}
              >
                <img
                  className="home-popular-image"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
                <span className="home-popular-overlay">
                  <span className="home-popular-name">{nameWithRegion(item)}</span>
                  <span className="home-popular-rating">
                    <StarIcon />
                    {item.rating}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section-title">{t('Recommended:')}</h2>

          <div className="home-recommended-list">
            {homeRecommended.map((item) => {
              const isOpen = item.id === openId
              return (
                <article
                  className={`home-rec-card${isOpen ? ' is-open' : ''}`}
                  id={`home-recommended-${item.id}`}
                  key={item.id}
                >
                  <button
                    type="button"
                    className="home-rec-main"
                    aria-expanded={isOpen}
                    onClick={() => toggleRecommended(item.id)}
                  >
                    <img
                      className="home-rec-image"
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <span className="home-rec-body">
                      <span className="home-rec-name">{item.name}</span>
                      <span className="home-rec-chip">{t(item.category)}</span>
                      <span className="home-rec-bottom">
                        <span className="home-rec-location">
                          <PinIcon />
                          {item.location}
                        </span>
                        <span className="home-rec-rating">
                          <StarIcon size={13} />
                          {item.rating}
                        </span>
                      </span>
                    </span>
                  </button>

                  <div className="home-rec-sheet" aria-hidden={!isOpen}>
                    <div className="home-rec-sheet-inner">
                      <div className="home-rec-details">
                        <p className="home-rec-desc">{serviceText(item, 'description')}</p>

                        <div className="home-rec-tags">
                          {item.tags.map((tag) => (
                            <span className="home-rec-tag" key={tag}>
                              <TagIcon name={tag} />
                              {t(tag)}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="home-rec-cta"
                          onClick={() => onOpenDetail(item.id)}
                        >
                          {t('View Details')}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      {/* Bottom navigation */}
      <BottomNav
        onSelect={(tab) => {
          if (tab === 'profile') onOpenProfile?.()
          if (tab === 'trips') onOpenTrips?.()
        }}
      />
    </div>
  )
}
