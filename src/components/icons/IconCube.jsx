const IconCube = ({ className, color }) => {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 55.5556H44.4444V0H0V55.5556ZM0 100H44.4444V66.6667H0V100ZM55.5556 100H100V44.4444H55.5556V100ZM55.5556 0V33.3333H100V0H55.5556Z" fill={color} />
        </svg>
    );
};

export default IconCube;    