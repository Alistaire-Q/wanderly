import { useEffect, useRef, useState } from 'react'
import './ServiceDetail.css'
import { getService } from '../data/services'
import { parseIDR } from '../i18n/currency'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function StarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6l2.9 5.87 6.48.95-4.69 4.57 1.11 6.45L12 17.4l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.95z" />
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.4 2.2c.5 3 2.6 4.2 4 6.3a7.2 7.2 0 0 1 1.3 4.2 5.7 5.7 0 0 1-11.4 0c0-1.7.7-3.2 1.7-4.4.4 1.2 1.1 2 2 2.4-.6-3 .2-6.3 2.4-8.5Z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.4 12S6 5.8 12 5.8 21.6 12 21.6 12 18 18.2 12 18.2 2.4 12 2.4 12Z" />
      <circle cx="12" cy="12" r="3.1" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8.6h2.7l1.3-2.2h8l1.3 2.2H20a1.4 1.4 0 0 1 1.4 1.4v7.6A1.4 1.4 0 0 1 20 19H4a1.4 1.4 0 0 1-1.4-1.4V10A1.4 1.4 0 0 1 4 8.6Z" />
      <circle cx="12" cy="13.6" r="3.1" />
    </svg>
  )
}

function WavesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.6 8.4c1.7 0 2.5-1.7 4.7-1.7s2.5 1.7 4.7 1.7 2.5-1.7 4.7-1.7 2.5 1.7 4.7 1.7" />
      <path d="M2.6 13c1.7 0 2.5-1.7 4.7-1.7s2.5 1.7 4.7 1.7 2.5-1.7 4.7-1.7 2.5 1.7 4.7 1.7" />
      <path d="M2.6 17.6c1.7 0 2.5-1.7 4.7-1.7s2.5 1.7 4.7 1.7 2.5-1.7 4.7-1.7 2.5 1.7 4.7 1.7" />
    </svg>
  )
}

function MountainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.8 19.2h18.4L14.6 6.8l-3.3 5.8-1.8-2.7-6.7 9.3Z" />
    </svg>
  )
}

function TempleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.2 5.4 9.4h13.2Z" />
      <path d="M6.9 9.4v3.2h10.2V9.4" />
      <path d="M4.6 12.6h14.8v3.4H4.6z" />
      <path d="M2.6 19.6h18.8" />
    </svg>
  )
}

function TicketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5V7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 7v2.5a2.5 2.5 0 0 0 0 5V17a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17v-2.5a2.5 2.5 0 0 0 0-5Z" />
      <path d="M14.2 6.6v10.8" strokeDasharray="2 2.8" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6.4 6.4 17.6 17.6" />
      <path d="M17.6 6.4 6.4 17.6" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.6 5.4 8 12l6.6 6.6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.4 5.4 16 12l-6.6 6.6" />
    </svg>
  )
}

const featureIcons = {
  flame: FlameIcon,
  eye: EyeIcon,
  camera: CameraIcon,
  waves: WavesIcon,
  mountain: MountainIcon,
  temple: TempleIcon,
}

/* Photo viewer: steps through the gallery, wrapping around at both ends. */
const wrapIndex = (index, delta, total) => (index + delta + total) % total

export default function ServiceDetail({ serviceId, onBack, onBook }) {
  const { t, formatIDR, serviceText } = usePreferences()
  const service = getService(serviceId)
  const { review } = service

  const scrollRef = useRef(null)
  const heroRef = useRef(null)
  const heroImageRef = useRef(null)

  /* As the white sheet slides up over the pinned photo, the photo blurs
     more and more. Wheel and trackpad scrolling are eased with a short
     glide, and the derived values (blur, zoom, sheet elevation) follow the
     eased position, so the sheet never moves in hard steps. Values land on
     the hero as CSS custom properties so the styling stays in the CSS. */
  useEffect(() => {
    const scroller = scrollRef.current
    const hero = heroRef.current
    const image = heroImageRef.current
    if (!scroller || !hero || !image) return undefined

    const MAX_BLUR = 8
    const MAX_ZOOM = 0.06
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let coverSpan = 1
    let target = 0
    let value = 0
    let frame = 0
    let glideTarget = null
    let glideFrame = 0

    const maxScroll = () => Math.max(0, scroller.scrollHeight - scroller.clientHeight)

    const measure = () => {
      const sheet = scroller.querySelector('.detail-sheet')
      const overlap = sheet
        ? Math.max(0, -(parseFloat(getComputedStyle(sheet).marginTop) || 0))
        : 0
      // Distance the sheet travels before the photo is fully covered.
      coverSpan = Math.max(1, hero.offsetHeight - overlap)
    }

    const paint = () => {
      hero.style.setProperty('--detail-hero-blur', `${(value * MAX_BLUR).toFixed(2)}px`)
      hero.style.setProperty('--detail-hero-zoom', (1 + value * MAX_ZOOM).toFixed(4))
      // The sheet lifts off the photo while covering it, then flattens out.
      scroller.style.setProperty(
        '--detail-sheet-elevation',
        (0.2 * (1 - value)).toFixed(3),
      )
    }

    const readProgress = () => {
      const span = Math.min(coverSpan, Math.max(1, maxScroll()))
      return Math.min(1, Math.max(0, scroller.scrollTop / span))
    }

    /* Eases the painted values towards the latest scroll position. */
    const settle = () => {
      const diff = target - value
      if (Math.abs(diff) < 0.0015) {
        value = target
        paint()
        frame = 0
        return
      }
      value += diff * 0.18
      paint()
      frame = requestAnimationFrame(settle)
    }

    const onScroll = () => {
      target = readProgress()
      if (!smooth) {
        value = target
        paint()
        return
      }
      if (!frame) frame = requestAnimationFrame(settle)
    }

    /* Glides the scroll position towards the wheel input. */
    const glide = () => {
      if (glideTarget === null) {
        glideFrame = 0
        return
      }
      const diff = glideTarget - scroller.scrollTop
      if (Math.abs(diff) < 0.5) {
        scroller.scrollTop = glideTarget
        glideTarget = null
        glideFrame = 0
        return
      }
      scroller.scrollTop += diff * 0.2
      glideFrame = requestAnimationFrame(glide)
    }

    const stopGlide = () => {
      if (glideFrame) cancelAnimationFrame(glideFrame)
      glideFrame = 0
      glideTarget = null
    }

    const onWheel = (event) => {
      // Let pinch-zoom and line-based wheels keep their native behaviour.
      if (event.ctrlKey || event.deltaMode !== 0) return
      event.preventDefault()
      if (glideTarget === null) glideTarget = scroller.scrollTop
      glideTarget = Math.min(maxScroll(), Math.max(0, glideTarget + event.deltaY))
      if (!glideFrame) glideFrame = requestAnimationFrame(glide)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    paint()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    scroller.addEventListener('touchstart', stopGlide, { passive: true })
    scroller.addEventListener('keydown', stopGlide)
    window.addEventListener('resize', onResize)
    if (smooth) scroller.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      if (glideFrame) cancelAnimationFrame(glideFrame)
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('touchstart', stopGlide)
      scroller.removeEventListener('keydown', stopGlide)
      scroller.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
      hero.style.removeProperty('--detail-hero-blur')
      hero.style.removeProperty('--detail-hero-zoom')
      scroller.style.removeProperty('--detail-sheet-elevation')
    }
  }, [serviceId])

  /* Photo viewer — every gallery photo in the sheet can be opened full screen. */
  const [viewerIndex, setViewerIndex] = useState(null)
  const gallery = service.gallery
  const touchStartX = useRef(0)

  const stepViewer = (delta) => {
    setViewerIndex((current) =>
      current === null ? current : wrapIndex(current, delta, gallery.length),
    )
  }

  useEffect(() => {
    if (viewerIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setViewerIndex(null)
        return
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const delta = event.key === 'ArrowLeft' ? -1 : 1
        setViewerIndex((current) =>
          current === null ? current : wrapIndex(current, delta, gallery.length),
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [viewerIndex, gallery])

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) stepViewer(delta < 0 ? 1 : -1)
  }

  return (
    <div className="detail" id="detail-screen">
      <div className="detail-scroll" ref={scrollRef}>
        <div className="detail-hero" ref={heroRef}>
          <img
            className="detail-hero-image"
            ref={heroImageRef}
            src={service.hero ?? service.image}
            alt={service.name}
          />
          <button
            type="button"
            className="detail-back"
            id="detail-back"
            aria-label="Back to list of services"
            onClick={onBack}
          >
            <ArrowLeftIcon />
          </button>
        </div>

        <div className="detail-sheet">
          <span className="detail-location">
            <PinIcon />
            {service.location}
          </span>

          <h1 className="detail-title">{service.name}</h1>

          <div className="detail-rating">
            <span className="detail-rating-star">
              <StarIcon size={15} />
            </span>
            <span className="detail-rating-value">{service.rating}</span>
            <span className="detail-rating-count">
              {t('({count} reviews)', { count: service.reviews })}
            </span>
          </div>

          <p className="detail-desc">{serviceText(service, 'longDescription')}</p>

          <div className="detail-gallery">
            {service.gallery.map((photo, index) => (
              <button
                type="button"
                className="detail-gallery-item"
                key={photo}
                onClick={() => setViewerIndex(index)}
                aria-label={`View photo ${index + 1} of ${service.gallery.length}`}
              >
                <img
                  className="detail-gallery-image"
                  src={photo}
                  alt={`${service.name} photo ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <h2 className="detail-subtitle">{t("Why you'll love it:")}</h2>

          <div className="detail-features">
            {service.features.map((feature) => {
              const Icon = featureIcons[feature.icon] ?? FlameIcon
              return (
                <div className="detail-feature" key={feature.label}>
                  <span className="detail-feature-icon">
                    <Icon />
                  </span>
                  <span className="detail-feature-label">{t(feature.label)}</span>
                  <span className="detail-feature-sub">{t(feature.sublabel)}</span>
                </div>
              )
            })}
          </div>

          <div className="detail-review">
            <div className="detail-review-top">
              <span className="detail-review-avatar">{review.initials}</span>
              <span className="detail-review-name">{review.name}</span>
              <span className="detail-review-stars">
                <StarIcon size={11} />
                {review.rating}
              </span>
            </div>
            <p className="detail-review-text">{review.text}</p>
          </div>

        </div>
      </div>

      <div className="detail-booking-bar">
        <div className="detail-booking">
          <span className="detail-price">
            <span className="detail-price-label">{t('From:')}</span>
            <span className="detail-price-value">
              {formatIDR(parseIDR(service.price))}
              <span className="detail-price-unit"> {t('/person')}</span>
            </span>
          </span>
          <button
            type="button"
            className="detail-book-btn"
            id="detail-book-btn"
            onClick={onBook}
          >
            <TicketIcon />
            {t('Book Now')}
          </button>
        </div>
      </div>

      {viewerIndex !== null && (
        <div
          className="detail-viewer"
          id="detail-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.name} photo ${viewerIndex + 1} of ${gallery.length}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="detail-viewer-backdrop" onClick={() => setViewerIndex(null)} />

          <img
            className="detail-viewer-image"
            src={gallery[viewerIndex]}
            alt={`${service.name} photo ${viewerIndex + 1}`}
          />

          <button
            type="button"
            className="detail-viewer-close"
            id="detail-viewer-close"
            aria-label="Close photo"
            onClick={() => setViewerIndex(null)}
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            className="detail-viewer-nav is-prev"
            aria-label="Previous photo"
            onClick={() => stepViewer(-1)}
          >
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            className="detail-viewer-nav is-next"
            aria-label="Next photo"
            onClick={() => stepViewer(1)}
          >
            <ChevronRightIcon />
          </button>

          <span className="detail-viewer-counter">
            {viewerIndex + 1} / {gallery.length}
          </span>
        </div>
      )}
    </div>
  )
}
