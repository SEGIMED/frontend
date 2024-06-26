const IconPatientNav = ( {className, color} ) => {
    return (
        <svg className={ className } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
	        <desc>
			Created with Pixso.
	        </desc>
	        <defs>
		        <clipPath id="clip360_2755">
			        <rect id="svg" width="24.000000" height="24.000000" transform="translate(0.000000 -0.046631)" fill="white" fillOpacity="0"/>
		        </clipPath>
	        </defs>
	        <g clipPath="url(#clip360_2755)">
		    <path id="path" d="M9.17 9.78C9.95 10.56 10.89 10.95 12 10.95C13.1 10.95 14.04 10.56 14.82 9.78C15.6 9 16 8.05 16 6.95C16 5.84 15.6 4.9 14.82 4.12C14.04 3.34 13.1 2.95 12 2.95C10.89 2.95 9.95 3.34 9.17 4.12C8.39 4.9 8 5.84 8 6.95C8 8.05 8.39 9 9.17 9.78Z" stroke={ color } strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round"/>
		    <path id="path" d="M6 20.95L6 18.95C6 17.84 6.39 16.9 7.17 16.12C7.95 15.34 8.89 14.95 10 14.95L14 14.95" stroke={ color } strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" strokeLinecap="round"/>
		    <path id="path" d="M15 18.95L17 20.95L21 16.95" stroke={ color } strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" strokeLinecap="round"/>
	        </g>
        </svg>
    );
};

export default IconPatientNav;