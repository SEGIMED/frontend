export default function IconAlarmBlue({ color, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_109_65)">
        <mask
          id="mask0_109_65"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="26"
          height="26">
          <path d="M26 0H0V26H26V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_109_65)">
          <path
            d="M8.66 17.33V13C8.66 11.8 9.08 10.78 9.93 9.93C10.78 9.08 11.8 8.66 12.99 8.66C14.19 8.66 15.21 9.08 16.06 9.93C16.91 10.78 17.33 11.8 17.33 13V17.33"
            stroke={color ? color : "#487FFA"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.25 13H4.33M13 3.25V4.33M21.66 13H22.75M6.06 6.06L6.82 6.82M19.93 6.06L19.17 6.82"
            stroke={color ? color : "#487FFA"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M7.58 17.33H18.41C19.13 17.33 19.5 17.69 19.5 18.41V20.58C19.5 21.3 19.13 21.66 18.41 21.66H7.58C6.86 21.66 6.5 21.3 6.5 20.58V18.41C6.5 17.69 6.86 17.33 7.58 17.33Z"
            stroke={color ? color : "#487FFA"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_109_65">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
