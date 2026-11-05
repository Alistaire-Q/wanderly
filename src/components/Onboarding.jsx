import './Onboarding.css'
import { usePreferences } from '../i18n/context'

export default function Onboarding({ onNext }) {
  const { t } = usePreferences()

  return (
    <div className="onboarding" id="onboarding-screen">
      {/* Background image */}
      <div className="onboarding-image-wrapper">
        <img
          src="/onboarding.jpeg"
          alt="Plan Your Trip"
          className="onboarding-image active"
        />
      </div>

      {/* Bottom card */}
      <div className="onboarding-card">
        <div className="onboarding-card-content">
          <h1 className="onboarding-title" id="onboarding-title">
            {t('Plan Your Trip')}
          </h1>
          <p className="onboarding-description" id="onboarding-description">
            {t(
              'Create your dream trip with ease. Choose a destination, find the perfect place to stay, and create an itinerary that suits your preferences.',
            )}
          </p>
        </div>

        {/* Button */}
        <button
          className="onboarding-btn"
          id="onboarding-btn"
          onClick={onNext}
        >
          {t('Next')}
        </button>
      </div>
    </div>
  )
}
