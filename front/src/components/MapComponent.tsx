"use client";

import { useState, useEffect, Key } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getUserPosition, getZoneByCoordinates, zones } from "../services/locationService";

const userIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [userZone, setUserZone] = useState<string | null>(null);

  useEffect(() => {
    const updateLocation = async () => {
      try {
        const position = await getUserPosition();
        setUserPosition(position);

        const zoneName = getZoneByCoordinates(position[0], position[1]);
        setUserZone(zoneName);
      } catch (error) {
        console.error("Error getting location:", error);
        setUserPosition(null);
        setUserZone(null);
      }
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}>
        Zone AActuelle: {userZone ? userZone : "Aucune zone détectée"}
      </div>

      <MapContainer
        center={[43.6043, 1.4437]}
        zoom={12}
        style={{ height: "85vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {zones.map((zone: { id: Key | null | undefined; coords: [number, number][]; color: any; }) => (
          <Polygon
            key={zone.id}
            positions={zone.coords as [number, number][]}
            pathOptions={{ fillColor: zone.color, fillOpacity: 0.5 }}
          />
        ))}
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              {userZone ? `You are in ${userZone}` : "You are outside any zone"}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
