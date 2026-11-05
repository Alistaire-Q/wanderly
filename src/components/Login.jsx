import { useState } from 'react'
import './Login.css'
import { usePreferences } from '../i18n/context'

/* The login screen is kept for the visual flow only.
   Nothing is verified: every sign-in action opens Home. */
export default function Login({ onNavigate }) {
  const { t } = usePreferences()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const enterApp = (event) => {
    event?.preventDefault?.()
    onNavigate('home')
  }

  return (
    <div className="login" id="login-screen">
      {/* Blue header with clouds */}
      <div className="login-header">
        <div className="login-cloud login-cloud-1"></div>
        <div className="login-cloud login-cloud-2"></div>
        <div className="login-cloud login-cloud-3"></div>
      </div>

      {/* White card */}
      <div className="login-card">
        <h1 className="login-title" id="login-title">
          {t('Lets Travel you in.')}
        </h1>

        <form className="login-form" id="login-form" onSubmit={enterApp} noValidate>
          <div className="login-input-group">
            <input
              type="email"
              className="login-input"
              id="login-email"
              placeholder={t('Email')}
              autoComplete="email"
              inputMode="email"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
          </div>

          <div className="login-input-group">
            <input
              type="password"
              className="login-input"
              id="login-password"
              placeholder={t('Password')}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-btn-signin"
            id="login-btn-signin"
          >
            {t('Sign in')}
          </button>
        </form>

        <div className="login-divider">
          <span>{t('or sign in with')}</span>
        </div>

        {/* Social buttons — same as Sign in, they open Home directly. */}
        <div className="login-social-buttons">
          <button
            type="button"
            className="login-btn-social"
            id="login-btn-google"
            onClick={enterApp}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            className="login-btn-social"
            id="login-btn-apple"
            onClick={enterApp}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  )
}
