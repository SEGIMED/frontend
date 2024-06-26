const IconMessageNav = ( {className, color}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
	        <desc>
			Created with Pixso.
	        </desc>
	        <defs>
		        <clipPath id="clip360_2731">
			        <rect id="svg" width="24.000000" height="24.000000" transform="translate(0.000000 -0.046631)" fill="white" fillOpacity="0"/>
		        </clipPath>
	        </defs>
	        <g clipPath="url(#clip360_2731)">
		        <path id="path" d="M18 10.95L11 10.95C10.33 10.95 10 10.62 10 9.95L10 3.95C10 3.28 10.33 2.95 11 2.95L20 2.95C20.66 2.95 21 3.28 21 3.95L21 13.95L18 10.95Z" stroke={ color } strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round"/>
		        <path id="path" d="M14 14.95L14 16.95C14 17.62 13.66 17.95 13 17.95L6 17.95L3 20.95L3 10.95C3 10.28 3.33 9.95 4 9.95L6 9.95" stroke={ color } strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" strokeLinecap="round"/>
	        </g>
        </svg>
    );
};

export default IconMessageNav 