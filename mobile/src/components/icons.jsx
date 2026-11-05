import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg'
import { colors } from '../theme'

const Stroke = ({ size = 20, color = colors.ink, width = 1.9, viewBox = '0 0 24 24', children }) => (
  <Svg width={size} height={size} viewBox={viewBox} fill="none" stroke={color}
    strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </Svg>
)

const Fill = ({ size = 20, color = colors.ink, viewBox = '0 0 24 24', children }) => (
  <Svg width={size} height={size} viewBox={viewBox} fill={color}>
    {children}
  </Svg>
)

/* ---- Navigation / chrome ---- */
export const ArrowLeft = (p) => (
  <Stroke {...p} width={2.1}>
    <Path d="M19 12H5" /><Path d="m11 6-6 6 6 6" />
  </Stroke>
)
export const ChevronLeft = (p) => (
  <Stroke {...p} width={2.3}><Path d="m14.6 5.2-6.9 6.8 6.9 6.8" /></Stroke>
)
export const ChevronRight = (p) => (
  <Stroke {...p} width={2.2}><Path d="m9.4 5.2 6.9 6.8-6.9 6.8" /></Stroke>
)
export const Close = (p) => (
  <Stroke {...p} width={2.2}>
    <Path d="M6.4 6.4 17.6 17.6" /><Path d="M17.6 6.4 6.4 17.6" />
  </Stroke>
)
export const Search = (p) => (
  <Stroke {...p} width={2.3}>
    <Circle cx="10.8" cy="10.8" r="6.6" /><Path d="m19.6 19.6-3.5-3.5" />
  </Stroke>
)
export const Plus = (p) => (
  <Stroke {...p} width={2.4}><Path d="M12 5.4v13.2M5.4 12h13.2" /></Stroke>
)
export const Send = (p) => (
  <Stroke {...p} width={2}>
    <Path d="M20.6 3.4 3.8 10.2l6.4 2.4 2.4 6.4 8-15.6Z" />
    <Path d="m10.2 12.6 4.6-4.6" />
  </Stroke>
)

/* ---- Places / services ---- */
export const Star = ({ size = 12, color = colors.gold }) => (
  <Fill size={size} color={color}>
    <Path d="M12 2.6l2.9 5.87 6.48.95-4.69 4.57 1.11 6.45L12 17.4l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.95z" />
  </Fill>
)
export const Pin = (p) => (
  <Stroke {...p} width={1.9}>
    <Path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
    <Circle cx="12" cy="10" r="3" />
  </Stroke>
)
export const Gear = (p) => (
  <Stroke {...p} width={1.7}>
    <Circle cx="12" cy="12" r="3.1" />
    <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </Stroke>
)

/* ---- Tab bar ---- */
export const HomeIcon = ({ size = 22, color = colors.muted }) => (
  <Fill size={size} color={color}>
    <Path d="M12 2.5 2.6 10.6a1.1 1.1 0 0 0-.4.85V21a1.2 1.2 0 0 0 1.2 1.2h5.1v-6a1.2 1.2 0 0 1 1.2-1.2h4.6a1.2 1.2 0 0 1 1.2 1.2v6h5.1A1.2 1.2 0 0 0 21.8 21v-9.55a1.1 1.1 0 0 0-.4-.85Z" />
  </Fill>
)
export const TicketIcon = ({ size = 22, color = colors.muted }) => (
  <Stroke size={size} color={color} width={1.8}>
    <Path d="M3 9.5V7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 7v2.5a2.5 2.5 0 0 0 0 5V17a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17v-2.5a2.5 2.5 0 0 0 0-5Z" />
    <Path d="M14.2 6.6v10.8" strokeDasharray="2 2.8" />
  </Stroke>
)
export const UserOutline = ({ size = 22, color = colors.muted, width = 1.9 }) => (
  <Stroke size={size} color={color} width={width}>
    <Circle cx="12" cy="8" r="3.6" />
    <Path d="M4.9 20.3a7.1 7.1 0 0 1 14.2 0" />
  </Stroke>
)
export const Person = ({ size = 42, color = colors.navy }) => (
  <Fill size={size} color={color}>
    <Circle cx="12" cy="8.6" r="3.9" />
    <Path d="M12 13.9c-4 0-7.2 2.4-7.2 5.4V21h14.4v-1.7c0-3-3.2-5.4-7.2-5.4Z" />
  </Fill>
)

/* ---- Social / actions ---- */
export const Heart = ({ size = 18, color = colors.muted, filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}
    stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 20.3s-7.6-4.6-9.1-9A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 9.1 4.3c-1.5 4.4-9.1 9-9.1 9Z" />
  </Svg>
)
export const Comment = ({ size = 18, color = colors.muted }) => (
  <Stroke size={size} color={color} width={1.9}>
    <Path d="M20.4 11.6c0 4.1-3.8 7.4-8.4 7.4a9.7 9.7 0 0 1-2.7-.4L4.2 20l1.3-3.6a7 7 0 0 1-2-4.8c0-4.1 3.8-7.4 8.5-7.4s8.4 3.3 8.4 7.4Z" />
  </Stroke>
)
export const ImageIcon = ({ size = 24, color = colors.muted }) => (
  <Stroke size={size} color={color} width={1.7}>
    <Rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.4" />
    <Circle cx="8.6" cy="9.6" r="1.7" />
    <Path d="m4.4 17 4.6-4.6 3.4 3.2 3-2.7 4.2 4.1" />
  </Stroke>
)

/* ---- Detail features ---- */
export const Flame = (p) => (
  <Fill {...p}>
    <Path d="M12.4 2.2c.5 3 2.6 4.2 4 6.3a7.2 7.2 0 0 1 1.3 4.2 5.7 5.7 0 0 1-11.4 0c0-1.7.7-3.2 1.7-4.4.4 1.2 1.1 2 2 2.4-.6-3 .2-6.3 2.4-8.5Z" />
  </Fill>
)
export const Eye = (p) => (
  <Stroke {...p} width={1.8}>
    <Path d="M2.4 12S6 5.8 12 5.8 21.6 12 21.6 12 18 18.2 12 18.2 2.4 12 2.4 12Z" />
    <Circle cx="12" cy="12" r="3.1" />
  </Stroke>
)
export const Camera = (p) => (
  <Stroke {...p} width={1.8}>
    <Path d="M4 8.6h2.7l1.3-2.2h8l1.3 2.2H20a1.4 1.4 0 0 1 1.4 1.4v7.6A1.4 1.4 0 0 1 20 19H4a1.4 1.4 0 0 1-1.4-1.4V10A1.4 1.4 0 0 1 4 8.6Z" />
    <Circle cx="12" cy="13.6" r="3.1" />
  </Stroke>
)
export const Waves = (p) => (
  <Stroke {...p} width={1.8}>
    <Path d="M2.6 8.4c1.7 0 2.5-1.7 4.7-1.7s2.5 1.7 4.7 1.7 2.5-1.7 4.7-1.7 2.5 1.7 4.7 1.7" />
    <Path d="M2.6 13c1.7 0 2.5-1.7 4.7-1.7s2.5 1.7 4.7 1.7 2.5-1.7 4.7-1.7 2.5 1.7 4.7 1.7" />
    <Path d="M2.6 17.6c1.7 0 2.5-1.7 4.7-1.7s2.5 1.7 4.7 1.7 2.5-1.7 4.7-1.7 2.5 1.7 4.7 1.7" />
  </Stroke>
)
export const Mountain = (p) => (
  <Stroke {...p} width={1.8}>
    <Path d="M2.8 19.2h18.4L14.6 6.8l-3.3 5.8-1.8-2.7-6.7 9.3Z" />
  </Stroke>
)
export const Temple = (p) => (
  <Stroke {...p} width={1.8}>
    <Path d="M12 3.2 5.4 9.4h13.2Z" /><Path d="M6.9 9.4v3.2h10.2V9.4" />
    <Path d="M4.6 12.6h14.8v3.4H4.6z" /><Path d="M2.6 19.6h18.8" />
  </Stroke>
)

/* ---- Profile settings ---- */
export const Bell = (p) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.8}>
    <Path d="M18 8.8a6 6 0 1 0-12 0c0 4.4-1.7 5.6-1.7 5.6h15.4S18 13.2 18 8.8Z" />
    <Path d="M10.2 18.4a2 2 0 0 0 3.6 0" />
  </Stroke>
)
export const Security = (p) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.8}>
    <Rect x="4.4" y="10.2" width="15.2" height="10.4" rx="2.6" />
    <Path d="M8 10.2V7.6a4 4 0 0 1 8 0v2.6" /><Circle cx="12" cy="15.2" r="1.5" />
  </Stroke>
)
export const Globe = (p) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.7}>
    <Circle cx="12" cy="12" r="8.6" /><Path d="M3.5 12h17" />
    <Path d="M12 3.4c2.3 2.3 3.5 5.3 3.5 8.6S14.3 18.3 12 20.6C9.7 18.3 8.5 15.3 8.5 12S9.7 5.7 12 3.4Z" />
  </Stroke>
)
export const Currency = ({ currency = 'IDR', ...p }) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.7}>
    <Circle cx="12" cy="12" r="8.6" />
    <SvgText
      x="12"
      y="16.4"
      textAnchor="middle"
      fontSize={currency === 'IDR' ? 7.4 : 11.5}
      fontWeight="700"
      fill={p?.color ?? colors.ink}
      stroke="none"
    >
      {currency === 'IDR' ? 'Rp' : currency === 'CNY' ? '¥' : '$'}
    </SvgText>
  </Stroke>
)
export const Help = (p) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.8}>
    <Circle cx="12" cy="12" r="8.6" />
    <Path d="M9.7 9.5a2.4 2.4 0 1 1 3.4 2.5c-.7.4-1.1 1-1.1 1.8v.3" />
    <Circle cx="12" cy="17" r="0.9" fill={p?.color ?? colors.ink} stroke="none" />
  </Stroke>
)
export const Terms = (p) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.8}>
    <Path d="M13.6 3.4H6.8a1.8 1.8 0 0 0-1.8 1.8v13.6a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8V8.4Z" />
    <Path d="M13.4 3.6v4.6h4.8" /><Path d="M8.6 12.6h6.8M8.6 16.2h4.6" />
  </Stroke>
)
export const Privacy = (p) => (
  <Stroke {...p} size={p?.size ?? 16} width={1.8}>
    <Path d="M12 3.2 4.8 6v6.1c0 4.3 3 7.5 7.2 8.7 4.2-1.2 7.2-4.4 7.2-8.7V6Z" />
    <Circle cx="12" cy="10.6" r="1.6" /><Path d="M12 12.2v2.6" />
  </Stroke>
)

/* ---- Filter / tag icons ---- */
export const Hotel = (p) => (
  <Stroke {...p} size={p?.size ?? 12} width={1.9}>
    <Path d="M3.8 20.4V5.6A1.6 1.6 0 0 1 5.4 4h7A1.6 1.6 0 0 1 14 5.6v14.8" />
    <Path d="M14 10.4h4.6A1.6 1.6 0 0 1 20.2 12v8.4" /><Path d="M2.4 20.4h19.2" />
    <Path d="M7.4 8h3M7.4 11.6h3" /><Path d="M16.4 13.8h1.6" />
  </Stroke>
)
export const Villa = (p) => (
  <Stroke {...p} size={p?.size ?? 12} width={1.9}>
    <Path d="M3.4 10.4 12 3.6l8.6 6.8" /><Path d="M5.6 9.2v11.2h12.8V9.2" />
    <Path d="M10 20.4v-5.2h4v5.2" />
  </Stroke>
)
export const Volcano = (p) => (
  <Stroke {...p} size={p?.size ?? 11} width={2}>
    <Path d="M2.8 20h18.4L15.6 8.4a1.6 1.6 0 0 0-1.5-1h-4.2a1.6 1.6 0 0 0-1.5 1Z" />
    <Path d="M9.4 3.6c1.2-1.4 3-1.2 3.7.3.5 1.1 1.6 1.3 2.6.7" />
  </Stroke>
)
export const Hiker = (p) => (
  <Stroke {...p} size={p?.size ?? 12} width={2}>
    <Circle cx="13.4" cy="4.3" r="2" />
    <Path d="M11.4 8.6 8.6 12.2l2.2 2.5V20" />
    <Path d="m11.4 9.6 4.2 1.5 1.8-2.5" /><Path d="m8.6 12.2-2.8 1.2" />
  </Stroke>
)
export const Beach = (p) => (
  <Stroke {...p} size={p?.size ?? 12} width={1.9}>
    <Path d="M2.8 12.2a9.2 9.2 0 0 1 18.4 0Z" />
    <Path d="M12 12.2v5.8a2.2 2.2 0 0 0 4.4 0" /><Path d="M2.4 21h19.2" />
  </Stroke>
)
export const Nature = (p) => (
  <Stroke {...p} size={p?.size ?? 12} width={1.9}>
    <Path d="M12 3 6.8 10.8h10.4L12 3Z" /><Path d="M12 8.4 5.6 16.6h12.8L12 8.4Z" />
    <Path d="M12 16.6v4.4" />
  </Stroke>
)
export const Culture = (p) => (
  <Stroke {...p} size={p?.size ?? 12} width={1.9}>
    <Path d="M12 3.4 5.8 9.2h12.4L12 3.4Z" /><Path d="M7.2 9.2v3.2h9.6V9.2" />
    <Path d="M4.8 12.4h14.4v3.4H4.8z" /><Path d="M2.6 19.4h18.8" />
  </Stroke>
)

/* ---- Travel ---- */
export const Plane = ({ size = 20, color = colors.blue }) => (
  <Fill size={size} color={color}>
    <Path d="M12 2.2c1 0 1.7 1.1 1.7 2.4v4.2l7.5 4.3v2.2l-7.5-2.2v4.4l2.6 2v1.6L12 20.5l-4.3 1.6v-1.6l2.6-2v-4.4l-7.5 2.2v-2.2l7.5-4.3V4.6c0-1.3.7-2.4 1.7-2.4Z" />
  </Fill>
)
export const PlaneLanding = ({ size = 20, color = colors.blue }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G transform="rotate(90 12 12) translate(12 12) scale(0.72) translate(-12 -12)">
      <Path
        d="M12 2.2c1 0 1.7 1.1 1.7 2.4v4.2l7.5 4.3v2.2l-7.5-2.2v4.4l2.6 2v1.6L12 20.5l-4.3 1.6v-1.6l2.6-2v-4.4l-7.5 2.2v-2.2l7.5-4.3V4.6c0-1.3.7-2.4 1.7-2.4Z"
        fill={color}
      />
    </G>
    <Path d="M4.5 20.6h15" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
  </Svg>
)
export const Pencil = (p) => (
  <Stroke {...p} size={p?.size ?? 17} width={1.9}>
    <Path d="M15.6 4.2a2.1 2.1 0 0 1 3 3L8.2 17.6l-4 1 1-4L15.6 4.2Z" />
    <Path d="m14.2 5.6 3 3" />
  </Stroke>
)
export const GoogleMark = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <Path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <Path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <Path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </Svg>
)
export const AppleMark = ({ size = 20, color = '#000' }) => (
  <Fill size={size} color={color}>
    <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </Fill>
)

export const featureIcons = {
  flame: Flame,
  eye: Eye,
  camera: Camera,
  waves: Waves,
  mountain: Mountain,
  temple: Temple,
}

export const filterIcons = {
  Hiking: Hiker,
  Hotel,
  Beach,
  Villa,
  Nature,
  Culture,
}

export const tagIcons = {
  Volcano,
  Hiking: Hiker,
  Beach,
  Nature,
  Culture,
}
