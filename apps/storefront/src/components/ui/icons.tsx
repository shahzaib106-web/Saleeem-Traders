type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

export function Arrow({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 10" aria-hidden="true" {...stroke}>
      <path d="M1 5h15.5" />
      <path d="M12.5 1l4 4-4 4" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.6 16.6 21 21" />
    </svg>
  );
}

export function IconBag({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M6.2 8h11.6l-1 12.2H7.2L6.2 8Z" />
      <path d="M9 8V6.4a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="3.5" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M15.5 3.63a3.5 3.5 0 0 1 0 6.74" />
    </svg>
  );
}

export function IconDocument({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8" />
    </svg>
  );
}

export function IconTruck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M1.5 4.5h13v11h-13z" />
      <path d="M14.5 9h4l3 3.2v3.3h-7" />
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.01" />
    </svg>
  );
}

export function IconYoutube({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29.4 29.4 0 0 0 2 12a29.4 29.4 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29.4 29.4 0 0 0 22 12a29.4 29.4 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z"
      />
    </svg>
  );
}

export function LogoMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="stLogoNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3d59" />
          <stop offset="45%" stopColor="#132b40" />
          <stop offset="100%" stopColor="#0a1824" />
        </linearGradient>
        <linearGradient id="stLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faecd1" />
          <stop offset="30%" stopColor="#d8b26e" />
          <stop offset="70%" stopColor="#ad823b" />
          <stop offset="100%" stopColor="#e2c388" />
        </linearGradient>
        <linearGradient id="stLogoGoldLight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f3dec2" />
          <stop offset="100%" stopColor="#cda560" />
        </linearGradient>
        <linearGradient id="stLogoBevel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* Architectural ceramic tile badge */}
      <rect x="2.5" y="2.5" width="43" height="43" rx="10" fill="url(#stLogoNavy)" />
      <rect x="2.5" y="2.5" width="43" height="43" rx="10" fill="url(#stLogoBevel)" />
      <rect x="3" y="3" width="42" height="42" rx="9.5" stroke="url(#stLogoGold)" strokeWidth="1.2" strokeOpacity="0.75" />

      {/* Subtle diamond tile inlay grid representing precision ceramics */}
      <rect
        x="15"
        y="15"
        width="18"
        height="18"
        rx="3.5"
        transform="rotate(45 24 24)"
        fill="rgba(255,255,255,0.03)"
        stroke="url(#stLogoGold)"
        strokeWidth="0.8"
        strokeDasharray="2.5 2"
        opacity="0.5"
      />

      {/* Modern luxury "S" & "T" monogram mark */}
      {/* T-horizontal crossbar anchor */}
      <line x1="18" y1="12" x2="30" y2="12" stroke="url(#stLogoGoldLight)" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

      {/* Dynamic S curve with architectural taper */}
      <path
        d="M32.5 16.5C32.5 13.8 29.2 12 24 12C18.8 12 15.5 14.2 15.5 17.6C15.5 21.6 20.2 22.8 24.2 23.8C28.5 24.9 32.5 26.2 32.5 30.4C32.5 34.2 29 36.5 24 36.5C18.5 36.5 15.2 34 15.2 30.5"
        fill="none"
        stroke="url(#stLogoGold)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central ceramic facet spark reflecting polished marble/tiles */}
      <path
        d="M38 10L38.8 7.5L39.6 10L42.1 10.8L39.6 11.6L38.8 14.1L38 11.6L35.5 10.8Z"
        fill="url(#stLogoGoldLight)"
        opacity="0.95"
      />
    </svg>
  );
}

export function IconHeart({ className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10Z" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconFilter({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>
  );
}

export function IconUpload({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </svg>
  );
}

export function IconTrash({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
    </svg>
  );
}
