export function ExodusIcon({ size = 32, color = "#1C274C" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" />
      <path
        d="M654.2 466.877V387.216V329.282V271.347H538.33H400.735H263.14H147.27V387.216V466.877L393.674 592.342L654.2 466.877Z"
        stroke={color}
        strokeWidth="50"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrownIcon({ size = 32, color = "#1C274C" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M649.037 547.797V469.459L649.172 369.923C651.037 319.49 650.528 294.273 644.781 283.849C640.114 278.21 633.767 274.755 626.981 274.159C614.437 273.058 598.683 290.991 567.175 326.857L567.17 326.863C550.879 345.408 545.616 354.679 536.527 356.116C531.493 356.91 526.361 356.093 521.709 353.754C513.318 349.529 504.84 338.065 493.649 315.134L434.663 194.268C413.516 150.938 408.706 129.273 401.26 129.273C393.815 129.273 386.123 150.938 364.976 194.269L305.989 315.134C294.799 338.065 289.203 349.529 280.811 353.754C276.16 356.093 271.029 356.91 265.993 356.116C256.904 354.679 248.757 345.405 232.463 326.857C200.955 290.991 185.202 273.058 172.657 274.159C165.872 274.755 159.525 278.21 154.857 283.849C149.111 294.273 150.043 319.49 150.467 369.923L150.523 469.459V547.797L392.837 671.179L649.037 547.797Z"
        stroke={color}
        strokeWidth="50"
        strokeLinejoin="round"
      />
    </svg>
  );
}
