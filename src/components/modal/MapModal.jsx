"use client"

import { useEffect } from 'react';
import Map from "../../../component/Map/index";

export default function MapModal({ onClose }) {

    useEffect(() => {
        // Este código se ejecutará solo en el cliente, después de que el componente se haya montado
        if (typeof window !== "undefined") {
          // Acceso seguro al objeto window
          const width = window.innerWidth;
        }
      }, []);

    useEffect(() => {
        function onClose2(event) {
        
            if (event.key === 'Escape') {
                onClose();
            }
        }
    
        if (typeof window !== "undefined") window.addEventListener("keydown", onClose2);
        
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
            <Map />
        </div>
    );
}

