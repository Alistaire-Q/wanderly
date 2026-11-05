const WanderlyLogo = ({ size = 56 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pinGradient" x1="32" y1="2" x2="32" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="planeGradient" x1="20" y1="18" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <filter id="pinShadow" x="-4" y="-2" width="72" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1D4ED8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Location Pin */}
      <path
        d="M32 2C19.85 2 10 11.85 10 24C10 40 32 66 32 66C32 66 54 40 54 24C54 11.85 44.15 2 32 2Z"
        fill="url(#pinGradient)"
        filter="url(#pinShadow)"
      />

      {/* Inner circle highlight */}
      <circle cx="32" cy="24" r="16" fill="rgba(255,255,255,0.15)" />

      {/* Paper Airplane */}
      <path
        d="M22 30L42 16L30 36L27 27L22 30Z"
        fill="url(#planeGradient)"
      />
      <path
        d="M42 16L30 36L35 26L42 16Z"
        fill="rgba(255,255,255,0.7)"
      />
      {/* Wing fold accent */}
      <path
        d="M27 27L30 36L35 26"
        stroke="rgba(29,78,216,0.3)"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
};

export default WanderlyLogo;
