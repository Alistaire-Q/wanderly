import { useState, useEffect } from 'react'
import './App.css'
import Onboarding from './components/Onboarding'
import Login from './components/Login'
import Home from './components/Home'
import Services from './components/Services'
import ServiceDetail from './components/ServiceDetail'
import Booking from './components/Booking'
import Profile from './components/Profile'
import MyTrips from './components/MyTrips'
import UserProfile from './components/UserProfile'
import { defaultAccount, seedPosts } from './data/account'

const ACCOUNT_KEY = 'wanderly.account.v1'

function loadAccount() {
  try {
    const stored = window.localStorage.getItem(ACCOUNT_KEY)
    if (!stored) return defaultAccount
    return { ...defaultAccount, ...JSON.parse(stored) }
  } catch {
    return defaultAccount
  }
}

function App() {
  const [page, setPage] = useState(() => {
    const { hash } = window.location
    if (hash === '#home') return 'home'
    if (hash === '#services') return 'services'
    if (hash === '#detail') return 'detail'
    if (hash === '#booking') return 'booking'
    if (hash === '#profile') return 'profile'
    if (hash === '#trips') return 'trips'
    if (hash === '#account') return 'account'
    if (hash === '#login') return 'login'
    return 'splash'
  })
  const [searchQuery, setSearchQuery] = useState('Indonesia')
  const [detailId, setDetailId] = useState(null)
  const [detailOrigin, setDetailOrigin] = useState('services')
  const [profileOrigin, setProfileOrigin] = useState('home')
  const [trip, setTrip] = useState(null)
  const [tripsOrigin, setTripsOrigin] = useState('home')
  const [posts, setPosts] = useState(seedPosts)
  const [account, setAccount] = useState(loadAccount)

  useEffect(() => {
    // Auto-transition from splash to onboarding after 2 seconds
    const timer = setTimeout(
      () =>
        setPage((current) => (current === 'splash' ? 'onboarding' : current)),
      2000,
    )
    return () => clearTimeout(timer)
  }, [])

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
    try {
      window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(updated))
    } catch (error) {
      console.warn('[wanderly] profile could not be stored:', error.message)
    }
  }

  // There is no session any more: "Sign out" simply returns to the
  // decorative login screen.
  const handleSignOut = () => {
    setPage('login')
  }

  if (page === 'splash') {
    return (
      <div className="splash-screen" id="splash-screen">
        <div className="splash-icon">
          <img src="/Wanderly.png" alt="Wanderly Logo" />
        </div>
      </div>
    )
  }

  if (page === 'onboarding') {
    return <Onboarding onNext={() => setPage('login')} />
  }

  if (page === 'login') {
    return <Login onNavigate={navigate} />
  }

  if (page === 'home') {
    return (
      <Home
        onNavigate={navigate}
        onOpenDetail={(id) => openDetail(id, 'home')}
        onOpenProfile={() => openProfile('home')}
        onOpenTrips={() => openTrips('home')}
      />
    )
  }

  if (page === 'services') {
    return (
      <Services
        query={searchQuery}
        onSearch={setSearchQuery}
        onBack={() => setPage('home')}
        onOpenDetail={(id) => openDetail(id, 'services')}
        onOpenProfile={() => openProfile('services')}
        onOpenTrips={() => openTrips('services')}
      />
    )
  }

  if (page === 'detail') {
    return (
      <ServiceDetail
        serviceId={detailId}
        onBack={() => setPage(detailOrigin)}
        onBook={() => setPage('booking')}
      />
    )
  }

  if (page === 'booking') {
    return (
      <Booking
        serviceId={detailId}
        trip={trip}
        onSelectTrip={setTrip}
        onBack={() => setPage('detail')}
        onGoHome={() => setPage('home')}
        onGoProfile={() => openProfile('booking')}
        onGoTrips={() => openTrips('booking')}
      />
    )
  }

  if (page === 'profile') {
    return (
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
    )
  }

  if (page === 'account') {
    return (
      <UserProfile
        account={account}
        posts={posts}
        onUpdateAccount={saveAccount}
        onUpdatePosts={setPosts}
        onBack={() => setPage('profile')}
      />
    )
  }

  if (page === 'trips') {
    return (
      <MyTrips
        trip={trip}
        onCancel={() => setTrip(null)}
        onGoHome={() => setPage('home')}
        onSelectTab={(tab) => {
          if (tab === 'home') setPage('home')
          if (tab === 'profile') openProfile(tripsOrigin)
        }}
      />
    )
  }

  return <Login onNavigate={navigate} />
}

export default App
