import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { CURRENCIES, LANGUAGES, translations } from './translations'
import { money, fromIDR, fromUSD } from './currency'
import { translateServiceField } from './serviceCopy'
import { PreferencesContext } from './context'

const STORAGE_KEY = 'wanderly.preferences.v1'

const DEFAULT_PREFERENCES = { language: 'en', currency: 'IDR' }

function readStoredPreferences() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PREFERENCES
    const stored = JSON.parse(raw)
    return {
      language: LANGUAGES.some((item) => item.id === stored.language)
        ? stored.language
        : DEFAULT_PREFERENCES.language,
      currency: CURRENCIES.some((item) => item.id === stored.currency)
        ? stored.currency
        : DEFAULT_PREFERENCES.currency,
    }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(readStoredPreferences)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    } catch (error) {
      console.warn('[wanderly] preferences could not be stored:', error.message)
    }
  }, [preferences])

  const setLanguage = useCallback(
    (language) => setPreferences((current) => ({ ...current, language })),
    [],
  )

  const setCurrency = useCallback(
    (currency) => setPreferences((current) => ({ ...current, currency })),
    [],
  )

  const translate = useCallback((language, phrase, values) => {
    const dictionary = translations[language] ?? {}
    let text = dictionary[phrase] ?? translations.en[phrase] ?? phrase
    if (values) {
      text = text.replace(/\{(\w+)\}/g, (match, key) =>
        Object.prototype.hasOwnProperty.call(values, key)
          ? String(values[key])
          : match,
      )
    }
    return text
  }, [])

  const t = useCallback(
    (phrase, values) => translate(preferences.language, phrase, values),
    [translate, preferences.language],
  )

  const formatIDR = useCallback(
    (amount) => money(fromIDR(amount, preferences.currency), preferences.currency),
    [preferences.currency],
  )

  const formatUSD = useCallback(
    (amount) => money(fromUSD(amount, preferences.currency), preferences.currency),
    [preferences.currency],
  )

  const serviceText = useCallback(
    (service, field) => translateServiceField(service, field, preferences.language),
    [preferences.language],
  )

  const value = useMemo(
    () => ({
      ...preferences,
      setLanguage,
      setCurrency,
      t,
      translate,
      formatIDR,
      formatUSD,
      serviceText,
    }),
    [
      preferences,
      setLanguage,
      setCurrency,
      t,
      translate,
      formatIDR,
      formatUSD,
      serviceText,
    ],
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}
