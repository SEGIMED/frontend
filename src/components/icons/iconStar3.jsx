import { useState } from "react";

export default function IconTStar3({ className, color, onMouseEnter, onMouseLeave }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => { setIsHovered(true); onMouseEnter(); }}
      onMouseLeave={() => { setIsHovered(false); onMouseLeave(); }}
    >
      <desc>Created with Pixso.</desc>
      <defs>
        <clipPath id="clip540_5216">
          <rect
            width="24"
            height="24"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip540_5216)">
        <path
          d="M11.94 17.01L5.77 20.25L6.95 13.38L1.95 8.51L8.85 7.51L11.94 1.26L15.02 7.51L21.92 8.51L16.92 13.38L18.1 20.25L11.94 17.01Z"
          fill={isHovered ? "#F5E400" : color} // Usa color de hover si está en hover
        />
        <path
          d="M5.77 20.25L6.95 13.38L1.95 8.51L8.85 7.51L11.94 1.26L15.02 7.51L21.92 8.51L16.92 13.38L18.1 20.25L11.94 17.01L5.77 20.25Z"
          stroke="#5F5F5F"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
