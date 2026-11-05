/* ============================================
   Wanderly — Tag icons
   Shared by the List of Services cards and the
   Recommended cards on Home.
   ============================================ */

export function VolcanoIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.8 20h18.4L15.6 8.4a1.6 1.6 0 0 0-1.5-1h-4.2a1.6 1.6 0 0 0-1.5 1Z" />
      <path d="M9.4 3.6c1.2-1.4 3-1.2 3.7.3.5 1.1 1.6 1.3 2.6.7" />
    </svg>
  )
}

export function HikerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.4" cy="4.3" r="2" />
      <path d="M11.4 8.6 8.6 12.2l2.2 2.5V20" />
      <path d="m11.4 9.6 4.2 1.5 1.8-2.5" />
      <path d="m8.6 12.2-2.8 1.2" />
    </svg>
  )
}

export function BeachIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.8 12.2a9.2 9.2 0 0 1 18.4 0Z" />
      <path d="M12 12.2v5.8a2.2 2.2 0 0 0 4.4 0" />
      <path d="M2.4 21h19.2" />
    </svg>
  )
}

export function NatureIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 6.8 10.8h10.4L12 3Z" />
      <path d="M12 8.4 5.6 16.6h12.8L12 8.4Z" />
      <path d="M12 16.6v4.4" />
    </svg>
  )
}

export function CultureIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.4 5.8 9.2h12.4L12 3.4Z" />
      <path d="M7.2 9.2v3.2h9.6V9.2" />
      <path d="M4.8 12.4h14.4v3.4H4.8z" />
      <path d="M2.6 19.4h18.8" />
    </svg>
  )
}

const icons = {
  Volcano: VolcanoIcon,
  Hiking: HikerIcon,
  Beach: BeachIcon,
  Nature: NatureIcon,
  Culture: CultureIcon,
}

/* Icon for a service tag; renders nothing for unknown tags. */
export default function TagIcon({ name }) {
  const Icon = icons[name]
  return Icon ? <Icon /> : null
}
