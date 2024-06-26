export default function IconTStar2({ className , color, borde }) {
    return (
        <svg 
             
            className={className}
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <desc>
                Created with Pixso.
            </desc>
            <defs>
                <clipPath id="clip540_5216">
                    <rect 
                        id="svg" 
                        width="24" 
                        height="24" 
                        transform="translate(-0.052612 -0.736328)" 
                        fill="white" 
                        fillOpacity="0" 
                    />
                </clipPath>
            </defs>
            <g clipPath="url(#clip540_5216)">
                <path 
                    id="path" 
                    d="M-0.06 -0.74L23.94 -0.74L23.94 23.26L-0.06 23.26L-0.06 -0.74Z" 
                    fill="none" 
                    fillRule="nonzero" 
                />
                <path 
                    id="path" 
                    d="M23.94 -0.74L23.94 23.26L-0.06 23.26L-0.06 -0.74L23.94 -0.74Z" 
                    stroke="none" 
                    strokeOpacity="0" 
                    strokeWidth="2" 
                    strokeLinejoin="round" 
                />
                <path 
                    id="path" 
                    d="M11.94 17.01L5.77 20.25L6.95 13.38L1.95 8.51L8.85 7.51L11.94 1.26L15.02 7.51L21.92 8.51L16.92 13.38L18.1 20.25L11.94 17.01Z" 
                    fill={color }  // Aquí aplicamos el color de relleno
                    fillRule="nonzero" 
                />
                <path 
                    id="path" 
                    d="M5.77 20.25L6.95 13.38L1.95 8.51L8.85 7.51L11.94 1.26L15.02 7.51L21.92 8.51L16.92 13.38L18.1 20.25L11.94 17.01L5.77 20.25Z" 
                    stroke={borde}  // Mantenemos el trazo para la forma
                    strokeOpacity="1" 
                    strokeWidth="2" 
                    strokeLinejoin="round" 
                />
            </g>
        </svg>
    );
};
