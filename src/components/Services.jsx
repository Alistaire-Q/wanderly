import { useState } from 'react'
import './Services.css'
import BottomNav from './BottomNav'
import { serviceFilters, listedServices } from '../data/services'
import TagIcon, { BeachIcon, CultureIcon, HikerIcon, NatureIcon } from './TagIcon'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function ArrowLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
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

function HotelIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.8 20.4V5.6A1.6 1.6 0 0 1 5.4 4h7A1.6 1.6 0 0 1 14 5.6v14.8" />
      <path d="M14 10.4h4.6A1.6 1.6 0 0 1 20.2 12v8.4" />
      <path d="M2.4 20.4h19.2" />
      <path d="M7.4 8h3M7.4 11.6h3" />
      <path d="M16.4 13.8h1.6" />
    </svg>
  )
}

function VillaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.4 10.4 12 3.6l8.6 6.8" />
      <path d="M5.6 9.2v11.2h12.8V9.2" />
      <path d="M10 20.4v-5.2h4v5.2" />
    </svg>
  )
}

const filterIcons = {
  Hiking: HikerIcon,
  Hotel: HotelIcon,
  Beach: BeachIcon,
  Villa: VillaIcon,
  Nature: NatureIcon,
  Culture: CultureIcon,
}

export default function Services({ query, onSearch, onBack, onOpenDetail, onOpenProfile, onOpenTrips }) {
  const { t, serviceText } = usePreferences()
  const [term, setTerm] = useState(query)
  const [activeFilters, setActiveFilters] = useState(() => [serviceFilters[0]])
  const [openId, setOpenId] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(term)
  }

  // Filters are multi-select: tapping a chip toggles it on or off.
  const toggleFilter = (filter) => {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    )
  }

  // Clicking the open card again closes it. Opening also brings the finished
  // sheet into view once the expand animation has run.
  const toggleCard = (id) => {
    const opening = id !== openId
    setOpenId(opening ? id : null)

    if (opening) {
      window.setTimeout(() => {
        document
          .getElementById(`services-card-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 340)
    }
  }

  return (
    <div className="services" id="services-screen">
      <header className="services-header">
        <div className="services-topbar">
          <button
            type="button"
            className="services-back"
            id="services-back"
            aria-label="Back to home"
            onClick={onBack}
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="services-title">{t('List of Services')}</h1>
        </div>

        <form className="services-search" id="services-search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="services-search-input"
            id="services-search-input"
            value={term}
            placeholder={t('Search destination')}
            aria-label="Search destination"
            onChange={(event) => setTerm(event.target.value)}
          />
          <button
            type="submit"
            className="services-search-btn"
            id="services-search-btn"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>

        <div className="services-filters" id="services-filters">
          {serviceFilters.map((filter) => {
            const isActive = activeFilters.includes(filter)
            const Icon = filterIcons[filter]
            return (
              <button
                type="button"
                key={filter}
                className={`services-chip${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => toggleFilter(filter)}
              >
                {isActive && Icon ? <Icon /> : null}
                {t(filter)}
              </button>
            )
          })}
        </div>
      </header>

      <main className="services-scroll">
        <h2 className="services-section-title">{t('Relevant to your search:')}</h2>

        <div className="services-list">
          {listedServices.map((item) => {
            const isOpen = item.id === openId
            return (
              <article
                className={`services-card${isOpen ? ' is-open' : ''}`}
                id={`services-card-${item.id}`}
                key={item.id}
              >
                <button
                  type="button"
                  className="services-card-main"
                  aria-expanded={isOpen}
                  onClick={() => toggleCard(item.id)}
                >
                  <img
                    className="services-card-image"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />
                  <span className="services-card-body">
                    <span className="services-card-name">{item.name}</span>
                    <span className="services-card-chip">{t(item.category)}</span>
                    <span className="services-card-bottom">
                      <span className="services-card-location">
                        <PinIcon />
                        {item.location}
                      </span>
                      <span className="services-card-rating">
                        <StarIcon size={13} />
                        {item.rating}
                      </span>
                    </span>
                  </span>
                </button>

                <div className="services-card-sheet" aria-hidden={!isOpen}>
                  <div className="services-card-sheet-inner">
                    <div className="services-card-details">
                      <p className="services-card-desc">{serviceText(item, 'description')}</p>

                      <div className="services-card-tags">
                        {item.tags.map((tag) => (
                          <span className="services-tag" key={tag}>
                            <TagIcon name={tag} />
                            {t(tag)}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="services-card-cta"
                        id={`services-cta-${item.id}`}
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
      </main>

      <BottomNav
        onSelect={(tab) => {
          if (tab === 'profile') onOpenProfile?.()
          if (tab === 'trips') onOpenTrips?.()
        }}
      />
    </div>
  )
}
