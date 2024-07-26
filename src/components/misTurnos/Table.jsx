import React from 'react';

export default function Table({ columnNames}) {
    const columnCount = columnNames.length +1
    const colum= columnNames.length - 1

    return (
        <div className={`grid grid-cols-${colum} md:grid-cols-${columnCount} items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4`}>
            {columnNames?.map((name, index) => (
                
                <div key={index} className={`font-bold text-[#5F5F5F]  ${index >= 4 ? 'hidden md:block' : ''}`}>
                    {index === 0 ? <span className="hidden md:block mr-8"></span> : null}
                    
                    <p className={`${index === 0 ? "md:ml-12 " : ' '}`}>{name}</p>
                </div>
            ))}
            <p></p>
        </div>
    );
}
