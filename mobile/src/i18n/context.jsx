import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CURRENCIES, LANGUAGES, translations } from './translations'
import { money, fromIDR, fromUSD } from './currency'
import { translateServiceField } from './serviceCopy'

const STORAGE_KEY = 'wanderly.preferences.v1'

const DEFAULT_PREFERENCES = { language: 'en', currency: 'IDR' }

const PreferencesContext = createContext(null)

const sanitise = (stored) => ({
  language: LANGUAGES.some((item) => item.id === stored?.language)
    ? stored.language
    : DEFAULT_PREFERENCES.language,
  currency: CURRENCIES.some((item) => item.id === stored?.currency)
    ? stored.currency
    : DEFAULT_PREFERENCES.currency,
})

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES)
  const [hydrated, setHydrated] = useState(false)

  // Restore the language and currency chosen on this device.
  useEffect(() => {
    let active = true
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return
        setPreferences(sanitise(JSON.parse(raw)))
      })
      .catch(() => {})
      .finally(() => {
        if (active) setHydrated(true)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)).catch(
      () => {},
    )
  }, [preferences, hydrated])

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

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used inside PreferencesProvider')
  }
  return context
}
