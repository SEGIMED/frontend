"use client"

import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import MapPte from '../../../component/MapPte/index'; 


export default function MapModalPte({ onClose, patient}) {


    
    const geolocationNumbers = patient.geolocation?.map(parseFloat) ;
    
    useEffect(() => {
        function onClose2(event) {
     
            if (event.key === 'Escape') {
                onClose();
            }
        }
    
        if(typeof window !== "undefined" )window.addEventListener("keydown", onClose2);
        
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", onClose2);
        };
    }, [onClose]);

    function handleClickOutside(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 "  
            onClick={handleClickOutside}
        >
            <MapPte positions={geolocationNumbers} />

        </div>
    );
}