interface SigilProps {
  size?: number
  className?: string
}

/** A static sigil for inline use (badges, dividers). */
export default function Sigil({ size = 48, className = '' }: SigilProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`sigil-glow ${className}`}
      aria-hidden
    >
      <circle cx="32" cy="32" r="29" stroke="#f4d27a" strokeWidth="0.6" />
      <circle
        cx="32"
        cy="32"
        r="22"
        stroke="#f4d27a"
        strokeWidth="0.4"
        strokeDasharray="1 2"
      />
      <path
        d="M32 6 L40 32 L58 32 L43 44 L48 60 L32 50 L16 60 L21 44 L6 32 L24 32 Z"
        stroke="#ff7aa8"
        strokeWidth="0.6"
        fill="none"
      />
      <circle cx="32" cy="32" r="3" fill="#f4d27a" />
    </svg>
  )
}
