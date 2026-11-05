import { useEffect, useState } from 'react'
import './Profile.css'
import BottomNav from './BottomNav'
import { CURRENCIES, LANGUAGES } from '../i18n/translations'
import { getInfoContent } from '../i18n/infoContent'
import { usePreferences } from '../i18n/context'

/* ---- Icons ---- */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m14.6 5.2-6.9 6.8 6.9 6.8" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9.4 5.2 6.9 6.8-6.9 6.8" />
    </svg>
  )
}

function AvatarPersonIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8.6" r="3.9" />
      <path d="M12 13.9c-4 0-7.2 2.4-7.2 5.4V21h14.4v-1.7c0-3-3.2-5.4-7.2-5.4Z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.9 20.3a7.1 7.1 0 0 1 14.2 0" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8.8a6 6 0 1 0-12 0c0 4.4-1.7 5.6-1.7 5.6h15.4S18 13.2 18 8.8Z" />
      <path d="M10.2 18.4a2 2 0 0 0 3.6 0" />
    </svg>
  )
}

function SecurityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.4" y="10.2" width="15.2" height="10.4" rx="2.6" />
      <path d="M8 10.2V7.6a4 4 0 0 1 8 0v2.6" />
      <circle cx="12" cy="15.2" r="1.5" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.5 12h17" />
      <path d="M12 3.4c2.3 2.3 3.5 5.3 3.5 8.6S14.3 18.3 12 20.6C9.7 18.3 8.5 15.3 8.5 12S9.7 5.7 12 3.4Z" />
    </svg>
  )
}

function CurrencyIcon({ currency = 'IDR' }) {
  const symbol = currency === 'IDR' ? 'Rp' : currency === 'CNY' ? '¥' : '$'
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <text
        x="12"
        y="16.4"
        textAnchor="middle"
        fontSize={currency === 'IDR' ? 7.4 : 11.5}
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        {symbol}
      </text>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 11.4-8 11.4S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.9" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.7 9.5a2.4 2.4 0 1 1 3.4 2.5c-.7.4-1.1 1-1.1 1.8v.3" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TermsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.6 3.4H6.8a1.8 1.8 0 0 0-1.8 1.8v13.6a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8V8.4Z" />
      <path d="M13.4 3.6v4.6h4.8" />
      <path d="M8.6 12.6h6.8M8.6 16.2h4.6" />
    </svg>
  )
}

function PrivacyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.2 4.8 6v6.1c0 4.3 3 7.5 7.2 8.7 4.2-1.2 7.2-4.4 7.2-8.7V6Z" />
      <circle cx="12" cy="10.6" r="1.6" />
      <path d="M12 12.2v2.6" />
    </svg>
  )
}

/* ---- Content ---- */

export default function Profile({
  account,
  onBack,
  onSelectTab,
  onOpenAccount,
  onSignOut,
}) {
  const { t, translate, language, currency, setLanguage, setCurrency } = usePreferences()
  const [sheet, setSheet] = useState(null)
  const [toast, setToast] = useState('')

  const user = account ?? { name: 'Lawrence Russel', email: 'lawrence@example.com', avatar: null }

  const languageLabel =
    LANGUAGES.find((item) => item.id === language)?.label ?? LANGUAGES[0].label
  const currencyLabel =
    CURRENCIES.find((item) => item.id === currency)?.label ?? CURRENCIES[0].label

  // Toasts confirm a tap without leaving the screen.
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(timer)
  }, [toast])

  // Sheets lock the page behind them while open.
  useEffect(() => {
    if (!sheet) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSheet(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sheet])

  const accountRows = [
    {
      id: 'account',
      Icon: UserIcon,
      title: t('My Account'),
      sub: t('Manage profile information and account security.'),
    },
    {
      id: 'notification',
      Icon: BellIcon,
      title: t('Notification'),
      sub: t('Set notification preferences'),
    },
    {
      id: 'security',
      Icon: SecurityIcon,
      title: t('Security'),
      sub: t('Change password and security settings'),
    },
  ]

  const otherRows = [
    {
      id: 'help',
      Icon: HelpIcon,
      title: t('Help Center'),
      sub: t('FAQs, guides, and support'),
      onClick: () => setSheet('help'),
    },
    {
      id: 'terms',
      Icon: TermsIcon,
      title: t('Terms and Conditions'),
      sub: t("Application's terms of use"),
      onClick: () => setSheet('terms'),
    },
    {
      id: 'privacy',
      Icon: PrivacyIcon,
      title: t('Privacy Policy'),
      sub: t('How we protect your data'),
      onClick: () => setSheet('privacy'),
    },
  ]

  const preferenceRows = [
    {
      id: 'language',
      Icon: GlobeIcon,
      title: t('Language'),
      sub: languageLabel,
      onClick: () => setSheet('language'),
    },
    {
      id: 'currency',
      Icon: CurrencyIcon,
      title: t('Currency'),
      sub: currencyLabel,
      onClick: () => setSheet('currency'),
    },
    {
      id: 'location',
      Icon: PinIcon,
      title: t('Location'),
      sub: t('Allow location access for accurate recommendations.'),
      onClick: () => setToast(t('Location settings coming soon')),
    },
  ]

  const renderRow = ({ id, Icon, title, sub, onClick }) => (
    <button
      type="button"
      key={id}
      className="profile-row"
      id={`profile-row-${id}`}
      onClick={onClick ?? (() => setToast(t('{title} settings coming soon', { title })))}
    >
      <span className="profile-row-icon" aria-hidden="true">
        <Icon currency={currency} />
      </span>
      <span className="profile-row-text">
        <span className="profile-row-title">{title}</span>
        <span className="profile-row-sub">{sub}</span>
      </span>
    </button>
  )

  const sheetOptions = sheet === 'language' ? LANGUAGES : CURRENCIES
  const sheetValue = sheet === 'language' ? language : currency
  const infoSheet = sheet === 'help' || sheet === 'terms' || sheet === 'privacy'
  const info = infoSheet ? getInfoContent(sheet, language) : null
  const sheetTitle = info ? info.title : t(sheet === 'language' ? 'Choose language' : 'Choose currency')

  const chooseOption = (option) => {
    // Confirm in the language the user just picked.
    const message =
      sheet === 'language'
        ? translate(option.id, 'Language set to {value}', {
            value: option.label,
          })
        : t('Currency set to {value}', { value: option.label })
    if (sheet === 'language') setLanguage(option.id)
    if (sheet === 'currency') setCurrency(option.id)
    setToast(message)
    setSheet(null)
  }

  return (
    <div className="profile" id="profile-screen">
      <header className="profile-header">
        <button
          type="button"
          className="profile-back"
          id="profile-back"
          aria-label="Back"
          onClick={onBack}
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="profile-title">{t('Settings:')}</h1>
      </header>

      <main className="profile-scroll">
        <button
          type="button"
          className="profile-account"
          id="profile-account"
          onClick={onOpenAccount}
        >
          <span className="profile-avatar" aria-hidden="true">
            {user.avatar ? (
              <img className="profile-avatar-img" src={user.avatar} alt="" />
            ) : (
              <AvatarPersonIcon />
            )}
          </span>
          <span className="profile-identity">
            <span className="profile-name">{user.name}</span>
            <span className="profile-email">{user.email}</span>
          </span>
          <span className="profile-account-arrow" aria-hidden="true">
            <ChevronRightIcon />
          </span>
        </button>

        <div className="profile-group">{accountRows.map(renderRow)}</div>

        <h2 className="profile-section-label">{t('Preference:')}</h2>
        <div className="profile-group">{preferenceRows.map(renderRow)}</div>

        <h2 className="profile-section-label">{t('Others:')}</h2>
        <div className="profile-group">{otherRows.map(renderRow)}</div>

        <button
          type="button"
          className="profile-signout"
          id="profile-signout"
          onClick={onSignOut}
        >
          {t('Sign out')}
        </button>
      </main>

      {toast && (
        <div className="profile-toast" role="status">
          {toast}
        </div>
      )}

      {sheet && (
        <div
          className="pref-modal"
          role="dialog"
          aria-modal="true"
          aria-label={sheetTitle}
          id="profile-pref-modal"
        >
          <button
            type="button"
            className="pref-backdrop"
            aria-label="Close"
            onClick={() => setSheet(null)}
          />
          <div className={`pref-sheet${infoSheet ? ' pref-sheet-info' : ''}`}>
            <span className="pref-grabber" aria-hidden="true" />
            <div className="pref-head">
              <h2 className="pref-title">{sheetTitle}</h2>
              <button
                type="button"
                className="pref-close"
                aria-label="Close"
                onClick={() => setSheet(null)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {infoSheet ? (
              <div className="pref-info" id={`profile-info-${sheet}`}>
                <p className="pref-info-meta">{info.meta}</p>
                <p className="pref-info-intro">{info.intro}</p>
                {info.sections.map((section) => (
                  <section className="pref-info-section" key={section.title}>
                    <h3 className="pref-info-section-title">{section.title}</h3>
                    <p className="pref-info-text">{section.body}</p>
                  </section>
                ))}
                {info.action && (
                  <a className="pref-info-action" href={info.action.href}>
                    {info.action.label}
                  </a>
                )}
              </div>
            ) : (
              <div className="pref-options">
                {sheetOptions.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    className={`pref-option${option.id === sheetValue ? ' is-active' : ''}`}
                    id={`profile-option-${option.id}`}
                    aria-pressed={option.id === sheetValue}
                    onClick={() => chooseOption(option)}
                  >
                    <span className="pref-option-label">{option.label}</span>
                    <span className="pref-check" aria-hidden="true">
                      {option.id === sheetValue ? '✓' : ''}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNav active="profile" onSelect={onSelectTab} />
    </div>
  )
}
