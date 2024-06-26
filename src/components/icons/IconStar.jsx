const IconStar = ({className, color}) => {
    return (
        <svg className={className} viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M300 23.2338C302.616 23.2338 304.341 28.0062 304.341 28.0062L386.904 203.891L581.253 233.585L440.627 377.788L473.826 581.257L300 485.116L126.175 581.257L159.374 377.788L18.7475 233.576L213.097 203.882L295.585 28.1468C295.585 28.1468 297.385 23.2338 300 23.2338ZM300 0C292.734 0 286.124 4.20046 283.021 10.7824L200.374 186.845L15.916 215.039C8.96858 216.099 3.20251 220.965 0.96171 227.631C-1.26971 234.288 0.408542 241.639 5.32142 246.674L139.338 384.098L107.667 578.219C106.504 585.308 109.495 592.443 115.374 596.568C118.599 598.847 122.377 600 126.165 600C129.278 600 132.409 599.212 135.241 597.656L299.991 506.53L464.741 597.656C467.573 599.212 470.704 600 473.817 600C477.605 600 481.393 598.847 484.609 596.568C490.487 592.443 493.478 585.308 492.315 578.219L460.644 384.098L594.661 246.674C599.564 241.639 601.252 234.288 599.02 227.631C596.789 220.965 591.014 216.108 584.066 215.039L399.608 186.855L316.98 10.7824C313.886 4.20046 307.267 0 300 0Z" fill="#FFE609"/>
            <path d="M300.001 23.2338C302.617 23.2338 304.342 28.0062 304.342 28.0062L386.905 203.891L581.254 233.585L440.628 377.788L473.827 581.257L300.001 485.116L126.175 581.257L159.375 377.788L18.748 233.576L213.097 203.882L295.585 28.1468C295.585 28.1468 297.385 23.2338 300.001 23.2338Z" fill={color}/>
        </svg>
    )
};

export default IconStar;