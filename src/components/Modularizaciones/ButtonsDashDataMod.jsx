import IconArrowUp from '../icons/IconArrowUp';
import React from 'react';

const DashboardButtonData = ({ bgColor, icon, value, label }) => (
    <div
        className={`w-full flex flex-col justify-around gap-3 px-3 md:px-8 py-5 text-white text-xl rounded-3xl h-40`}
        style={{ backgroundColor: bgColor }}
    >
        <div className="h-full w-full flex items-center justify-start md:justify-center lg:justify-start gap-2">
            {icon}
            <span className="text-4xl xs:text-6xl md:text-7xl font-semibold ml-2">
                {value}
            </span>
            <IconArrowUp className="hidden md:block" />
        </div>
        <p className="font-semibold text-start md:text-center lg:text-start">
            {label}
        </p>
    </div>
);

export default DashboardButtonData;
