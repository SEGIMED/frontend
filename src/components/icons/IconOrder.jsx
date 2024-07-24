const IconOrder = ({ color }) => {
  return (
    <svg
      width="24.000000"
      height="24.000000"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <desc>Created with Pixso.</desc>
      <defs>
        <clipPath id="clip360_3022">
          <rect
            id="Frame"
            width="24.000000"
            height="24.000000"
            transform="translate(-0.000122 -0.999512)"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <rect
        id="Frame"
        width="24.000000"
        height="24.000000"
        transform="translate(-0.000122 -0.999512)"
        fill={color || "#FFFFFF"}
        fillOpacity="0"
      />
      <g clipPath="url(#clip360_3022)">
        <path
          id="Vector"
          d="M2.99 8L6.99 4L10.99 8M6.99 4L6.99 18"
          stroke={color || "#FFFFFF"}
          strokeOpacity="1.000000"
          strokeWidth="2.000000"
          strokeLinejoin="round"
        />
        <path
          id="Vector"
          d="M20.99 14L16.99 18L12.99 14M16.99 18L16.99 4"
          stroke={color || "#FFFFFF"}
          strokeOpacity="1.000000"
          strokeWidth="2.000000"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default IconOrder;
