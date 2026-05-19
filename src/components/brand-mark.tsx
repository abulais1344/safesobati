type BrandMarkProps = {
  className?: string;
  size?: number;
};

export function BrandMark({ className = "", size = 40 }: BrandMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="safeLogoStroke" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f172a" />
          <stop offset="0.45" stopColor="#0f766e" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="safeLogoRoad" x1="18" y1="34" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f172a" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <path d="M32 7C25 12 17 15 10 17V28C10 43 20 54 32 58C44 54 54 43 54 28V17C47 15 39 12 32 7Z" fill="url(#safeLogoStroke)" opacity="0.98" />
      <path d="M16 18.5C19.5 17.5 23.2 15.9 26.8 13.7" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 18.5C44.5 17.5 40.8 15.9 37.2 13.7" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 37C27.6 33 30.7 30.5 32 30.5C33.3 30.5 36.4 33 38 37" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 38.8C19.8 36.9 21.2 35.4 23.1 35.4H40.9C42.8 35.4 44.2 36.9 44 38.8L43.1 47.2C43 48.5 41.9 49.5 40.6 49.5H23.4C22.1 49.5 21 48.5 20.9 47.2L20 38.8Z" fill="#0f172a" />
      <path d="M16 45.5L23.8 48.5" stroke="url(#safeLogoRoad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 50L33.5 56" stroke="url(#safeLogoRoad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 39.4C46.4 39.9 50 42.9 52 47.2" stroke="url(#safeLogoRoad)" strokeWidth="5" strokeLinecap="round" />
      <path d="M31.6 18C28.1 22.7 28.1 28.5 31.6 33.2C35.1 28.5 35.1 22.7 31.6 18Z" fill="#14b8a6" />
      <circle cx="31.6" cy="22" r="2.8" fill="#ffffff" />
      <path d="M20 48.8C24.7 49.2 29.7 52 33.6 56.2" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}