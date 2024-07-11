export default function SoporteTecnico({ className, color }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_52_259)">
        <mask
          id="mask0_52_259"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="26"
          height="26">
          <path d="M26 0H0V26H26V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_52_259)">
          <path
            d="M4.33 15.16V11.91C4.33 10.76 4.55 9.66 4.99 8.6C5.43 7.53 6.05 6.6 6.87 5.78C7.68 4.97 8.62 4.34 9.68 3.9C10.74 3.46 11.85 3.25 13 3.25C14.14 3.25 15.25 3.46 16.31 3.9C17.37 4.34 18.31 4.97 19.12 5.78C19.94 6.6 20.56 7.53 21 8.6C21.44 9.66 21.66 10.76 21.66 11.91V15.16"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 20.58C19.5 22.37 16.59 23.83 13 23.83"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.96 13.63C5.39 13.21 5.9 13 6.5 13H7.58C8.18 13 8.69 13.21 9.11 13.63C9.53 14.05 9.75 14.56 9.75 15.16V18.41C9.75 19.01 9.53 19.52 9.11 19.94C8.69 20.37 8.18 20.58 7.58 20.58H6.5C5.9 20.58 5.39 20.37 4.96 19.94C4.54 19.52 4.33 19.01 4.33 18.41V15.16C4.33 14.56 4.54 14.05 4.96 13.63Z"
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16.88 13.63C17.3 13.21 17.81 13 18.41 13H19.5C20.09 13 20.6 13.21 21.03 13.63C21.45 14.05 21.66 14.56 21.66 15.16V18.41C21.66 19.01 21.45 19.52 21.03 19.94C20.6 20.37 20.09 20.58 19.5 20.58H18.41C17.81 20.58 17.3 20.37 16.88 19.94C16.46 19.52 16.25 19.01 16.25 18.41V15.16C16.25 14.56 16.46 14.05 16.88 13.63Z"
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_52_259">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
