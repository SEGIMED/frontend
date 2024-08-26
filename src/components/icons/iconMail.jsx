export default function IconMail({ color }) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_7_4)">
        <g clipPath="url(#clip1_7_4)">
          <path
            d="M1.08 1.53C1.47 1.14 1.94 0.940002 2.5 0.940002H16.5C17.05 0.940002 17.52 1.14 17.91 1.53C18.3 1.92 18.5 2.39 18.5 2.94V12.94C18.5 13.5 18.3 13.97 17.91 14.36C17.52 14.75 17.05 14.94 16.5 14.94H2.5C1.94 14.94 1.47 14.75 1.08 14.36C0.69 13.97 0.5 13.5 0.5 12.94V2.94C0.5 2.39 0.69 1.92 1.08 1.53Z"
            stroke={color || "#808080"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <g clipPath="url(#clip2_7_4)">
            <path
              d="M0.5 4.94L9.5 10.94L18.5 4.94"
              stroke={color || "#808080"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_7_4">
          <rect width="20" height="16" fill="white" />
        </clipPath>
        <clipPath id="clip1_7_4">
          <rect width="20" height="16" fill="white" />
        </clipPath>
        <clipPath id="clip2_7_4">
          <rect width="20" height="8" fill="white" transform="translate(0 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}
