export default function IconEditar({ color, className }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_72_2)">
        <mask
          id="mask0_72_2"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24">
          <path d="M24 0H0V24H24V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_72_2)">
          <path
            d="M7 7H6C5.44 7 4.97 7.19 4.58 7.58C4.19 7.97 4 8.44 4 9V18C4 18.55 4.19 19.02 4.58 19.41C4.97 19.8 5.44 20 6 20H15C15.55 20 16.02 19.8 16.41 19.41C16.8 19.02 17 18.55 17 18V17"
            stroke={color ? color : "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 5.09C21 4.52 20.79 4.02 20.38 3.61C19.97 3.2 19.47 2.99 18.9 2.99C18.32 2.99 17.82 3.2 17.41 3.61L9 12V15H12L20.38 6.58C20.79 6.17 21 5.67 21 5.09Z"
            stroke={color ? color : "white"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16 5L19 8"
            stroke={color ? color : "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_72_2">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
