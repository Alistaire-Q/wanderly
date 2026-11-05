import { useEffect, useState } from 'react'
import { Alert, BackHandler, Image, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/poppins'

import Onboarding from './src/screens/Onboarding'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Services from './src/screens/Services'
import ServiceDetail from './src/screens/ServiceDetail'
import Booking from './src/screens/Booking'
import Profile from './src/screens/Profile'
import MyTrips from './src/screens/MyTrips'
import UserProfile from './src/screens/UserProfile'

import { defaultAccount, seedPosts } from './src/data/account'
import { brandLogo } from './src/theme/images'
import { PreferencesProvider } from './src/i18n/context'

const ACCOUNT_KEY = 'wanderly.account.v1'

const LIGHT_STATUS_PAGES = new Set([
  'onboarding',
  'login',
  'home',
])

function WanderlyApp() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  })

  const [ready, setReady] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const [page, setPage] = useState('splash')
  const [searchQuery, setSearchQuery] = useState('Indonesia')
  const [detailId, setDetailId] = useState(null)
  const [detailOrigin, setDetailOrigin] = useState('services')
  const [profileOrigin, setProfileOrigin] = useState('home')
  const [trip, setTrip] = useState(null)
  const [tripsOrigin, setTripsOrigin] = useState('home')
  const [posts, setPosts] = useState(seedPosts)
  const [account, setAccount] = useState(defaultAccount)

  // Restore a locally saved profile; there is no session to hydrate.
  useEffect(() => {
    let active = true
    AsyncStorage.getItem(ACCOUNT_KEY)
      .then((raw) => {
        if (!active || !raw) return
        setAccount({ ...defaultAccount, ...JSON.parse(raw) })
      })
      .catch(() => {})
      .finally(() => {
        if (active) setReady(true)
      })
    return () => {
      active = false
    }
  }, [])

  // Splash stays up until storage and fonts are ready, then for two seconds
  // like the web app.
  useEffect(() => {
    if (!ready || (!fontsLoaded && !fontError)) return undefined
    const timer = setTimeout(() => {
      setSplashDone(true)
      setPage('onboarding')
    }, 2000)
    return () => clearTimeout(timer)
  }, [ready, fontsLoaded, fontError])

  // Screens can navigate and hand over the current search query.
  const navigate = (nextPage, query) => {
    const nextQuery = typeof query === 'string' ? query.trim() : ''
    if (nextQuery) setSearchQuery(nextQuery)
    setPage(nextPage)
  }

  // Opens a Detail page and remembers where it was opened from.
  const openDetail = (id, from) => {
    setDetailId(id)
    setDetailOrigin(from)
    setPage('detail')
  }

  // Settings remembers the screen it was opened from.
  const openProfile = (from) => {
    setProfileOrigin(from)
    setPage('profile')
  }

  // My Trips is a tab; remember the tab it was opened from.
  const openTrips = (from) => {
    setTripsOrigin(from)
    setPage('trips')
  }

  const saveAccount = (next) => {
    const updated = { ...account, ...next }
    setAccount(updated)
    AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(updated)).catch(() => {
      Alert.alert('Profile not saved', 'Please try again.')
    })
  }

  // There is no session any more: "Sign out" simply returns to the
  // decorative login screen.
  const handleSignOut = () => setPage('login')

  // Android hardware back follows the same trail as the on-screen chevrons.
  useEffect(() => {
    const onBack = () => {
      if (page === 'services') return setPage('home'), true
      if (page === 'detail') return setPage(detailOrigin), true
      if (page === 'booking') return setPage('detail'), true
      if (page === 'profile') return setPage(profileOrigin), true
      if (page === 'account') return setPage('profile'), true
      if (page === 'trips') return setPage('home'), true
      if (page === 'login') return setPage('onboarding'), true
      return false
    }
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBack,
    )
    return () => subscription.remove()
  }, [page, detailOrigin, profileOrigin])

  const statusBarStyle = LIGHT_STATUS_PAGES.has(page) ? 'light' : 'dark'

  if (!splashDone || page === 'splash') {
    return (
      <View style={styles.splash} testID="splash-screen">
        <StatusBar style="dark" />
        <Image source={brandLogo} style={styles.splashLogo} resizeMode="contain" />
      </View>
    )
  }

  if (page === 'onboarding') {
    return (
      <>
        <StatusBar style={statusBarStyle} />
        <Onboarding onNext={() => setPage('login')} />
      </>
    )
  }

  if (page === 'login') {
    return (
      <>
        <StatusBar style="light" />
        <Login onNavigate={navigate} />
      </>
    )
  }

  if (page === 'home') {
    return (
      <>
        <StatusBar style="light" />
        <Home
          onNavigate={navigate}
          onOpenDetail={(id) => openDetail(id, 'home')}
          onOpenProfile={() => openProfile('home')}
          onOpenTrips={() => openTrips('home')}
        />
      </>
    )
  }

  if (page === 'services') {
    return (
      <>
        <StatusBar style="dark" />
        <Services
          query={searchQuery}
          onSearch={setSearchQuery}
          onBack={() => setPage('home')}
          onOpenDetail={(id) => openDetail(id, 'services')}
          onOpenProfile={() => openProfile('services')}
          onOpenTrips={() => openTrips('services')}
        />
      </>
    )
  }

  if (page === 'detail') {
    return (
      <>
        <StatusBar style="light" />
        <ServiceDetail
          serviceId={detailId}
          onBack={() => setPage(detailOrigin)}
          onBook={() => setPage('booking')}
        />
      </>
    )
  }

  if (page === 'booking') {
    return (
      <>
        <StatusBar style="dark" />
        <Booking
          serviceId={detailId}
          trip={trip}
          onSelectTrip={setTrip}
          onBack={() => setPage('detail')}
          onGoHome={() => setPage('home')}
          onGoProfile={() => openProfile('booking')}
          onGoTrips={() => openTrips('booking')}
        />
      </>
    )
  }

  if (page === 'profile') {
    return (
      <>
        <StatusBar style="dark" />
        <Profile
          account={account}
          onOpenAccount={() => setPage('account')}
          onSignOut={handleSignOut}
          onBack={() => setPage(profileOrigin)}
          onSelectTab={(tab) => {
            if (tab === 'home') setPage('home')
            if (tab === 'trips') openTrips('profile')
          }}
        />
      </>
    )
  }

  if (page === 'account') {
    return (
      <>
        <StatusBar style="dark" />
        <UserProfile
          account={account}
          posts={posts}
          onUpdateAccount={saveAccount}
          onUpdatePosts={setPosts}
          onBack={() => setPage('profile')}
        />
      </>
    )
  }

  if (page === 'trips') {
    return (
      <>
        <StatusBar style="dark" />
        <MyTrips
          trip={trip}
          onCancel={() => setTrip(null)}
          onGoHome={() => setPage('home')}
          onSelectTab={(tab) => {
            if (tab === 'home') setPage('home')
            if (tab === 'profile') openProfile(tripsOrigin)
          }}
        />
      </>
    )
  }

  return (
    <>
      <StatusBar style="light" />
      <Login onNavigate={navigate} />
    </>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <WanderlyApp />
      </PreferencesProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  splashLogo: {
    width: 250,
    height: 250,
  },
})
