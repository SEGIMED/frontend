export default function IconCheckBoton({ className, color }) {
  return (
    <svg className={className} viewBox="0 0 23 23" fill="none">
      <g clipPath="url(#clip0_86_2)">
        <mask
          id="mask0_86_2"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="23"
          height="23">
          <path d="M22.8701 0H0V22.8701H22.8701V0Z" fill={color || "white"} />
        </mask>
        <g mask="url(#mask0_86_2)">
          <path
            d="M3.41 3.41C3.77 3.05 4.25 2.85 4.76 2.85H18.1C18.61 2.85 19.09 3.05 19.45 3.41C19.81 3.77 20.01 4.25 20.01 4.76V18.1C20.01 18.61 19.81 19.09 19.45 19.45C19.09 19.81 18.61 20.01 18.1 20.01H4.76C4.25 20.01 3.77 19.81 3.41 19.45C3.05 19.09 2.85 18.61 2.85 18.1V4.76C2.85 4.25 3.05 3.77 3.41 3.41Z"
            stroke={color || "white"}
            strokeWidth="2.287"
            strokeLinejoin="round"
          />
          <path
            d="M8.57 11.43L10.48 13.33L14.29 9.52"
            stroke={color || "white"}
            strokeWidth="2.287"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_86_2">
          <rect width="22.8701" height="22.8701" fill={color || "white"} />
        </clipPath>
      </defs>
    </svg>
  );
}
