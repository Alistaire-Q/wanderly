import './BottomNav.css'

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5 2.6 10.6a1.1 1.1 0 0 0-.4.85V21a1.2 1.2 0 0 0 1.2 1.2h5.1v-6a1.2 1.2 0 0 1 1.2-1.2h4.6a1.2 1.2 0 0 1 1.2 1.2v6h5.1A1.2 1.2 0 0 0 21.8 21v-9.55a1.1 1.1 0 0 0-.4-.85Z" />
    </svg>
  )
}

function TicketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5V7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 7v2.5a2.5 2.5 0 0 0 0 5V17a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17v-2.5a2.5 2.5 0 0 0 0-5Z" />
      <path d="M14.2 6.6v10.8" strokeDasharray="2 2.8" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.9 20.3a7.1 7.1 0 0 1 14.2 0" />
    </svg>
  )
}

export default function BottomNav({ active = 'home', onSelect }) {
  // Screens decide which tabs they can reach; inactive tabs stay inert.
  const press = (tab) => (onSelect ? () => onSelect(tab) : undefined)

  return (
    <nav className="bottom-nav" id="bottom-nav">
      <button
        type="button"
        className={`bottom-nav-btn${active === 'home' ? ' is-active' : ''}`}
        aria-label="Home"
        aria-current={active === 'home' ? 'page' : undefined}
        onClick={press('home')}
      >
        <HomeIcon />
      </button>
      <button
        type="button"
        className={`bottom-nav-btn${active === 'trips' ? ' is-active' : ''}`}
        aria-label="My trips"
        aria-current={active === 'trips' ? 'page' : undefined}
        onClick={press('trips')}
      >
        <TicketIcon />
      </button>
      <button
        type="button"
        className={`bottom-nav-btn${active === 'profile' ? ' is-active' : ''}`}
        aria-label="Profile"
        aria-current={active === 'profile' ? 'page' : undefined}
        onClick={press('profile')}
      >
        <UserIcon />
      </button>
    </nav>
  )
}
