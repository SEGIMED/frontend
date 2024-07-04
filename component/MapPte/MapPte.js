import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapPte({ positions }) {
  return (
    <MapContainer
      style={{
        width: "100%",
        height: "100%",
        border: "4px solid #70C247",
        borderRadius: "15px",
        pointerEvents: "none", // Deshabilitar eventos del mouse para el contenedor del mapa
      }}
      center={positions}
      zoom={14}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={positions} icon={defaultIcon}>
        {/* No es necesario Popup si solo queremos mostrar el marcador */}
      </Marker>
    </MapContainer>
  );
}
