"use client";

import { useEffect } from "react";
import MapPte from "../../../component/MapPte/index";

export default function MapModalPte({ onClose, patient }) {
  const geolocationNumbers = patient?.geolocation?.map(parseFloat);

  useEffect(() => {
    function onClose2(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (typeof window !== "undefined")
      window.addEventListener("keydown", onClose2);

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
  console.log(geolocationNumbers);
  return (
    <div
      className=" flex items-center justify-center w-[100%] h-[100%]    "
      onClick={handleClickOutside}>
      {geolocationNumbers && geolocationNumbers.length > 0 ? (
        <div className="w-[100%] h-[100%] ">
          <MapPte positions={geolocationNumbers} />
        </div>
      ) : (
        <div className="p-4 bg-white rounded shadow-md ">
          <p>Geolocalizacion no esta disponible.</p>
        </div>
      )}
    </div>
  );
}
