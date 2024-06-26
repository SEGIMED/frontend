import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState,useEffect } from "react";
import L from "leaflet"

const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });


function LocationMarker() {
    const [position, setPosition] = useState(null);
    
    

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
       
      });
    }, [map]);
    useMapEvents({
        click(e) {
          setPosition(e.latlng);
          
        }
      });

    return position === null ? null : (
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          Usted esta aqui. <br />
         
        </Popup>
      </Marker>
    );
  }

export default function Map() {
  const [userPosition, setUserPosition] = useState(null);

  const removeMarker = () => {
    setUserPosition(null);
  };

  return (
    <MapContainer
      style={{ width: "50%", height: "50%",  border: "4px solid #70C247",
      borderRadius: "15px" }}
      center={[-34.6037, -58.3816]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={(map) => {
        map.locate(); // Solicitar automáticamente la ubicación del usuario al cargar el mapa
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker removeMarker={removeMarker} />

      {userPosition && (
        <Marker position={userPosition}>
          <Popup>Your position</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}



