import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import * as turf from "@turf/turf";

const MapComponent = () => {
    const [geojsonData, setGeojsonData] = useState(null);
    const [userPosition, setUserPosition] = useState<LatLngTuple | null>(null);

    useEffect(() => {
        fetch("/map.geojson")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setGeojsonData(data))
            .catch((error) => console.error("Error fetching GeoJSON data:", error));

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserPosition([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, []);

    const position: LatLngTuple = [43.6, 1.45]; // Default center position if geolocation fails
    const geoJsonStyle = {
        color: "blue",
        weight: 2,
        fillColor: "lightblue",
        fillOpacity: 0.5,
    };
    const forEachFeature = (feature: unknown) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPosition = [position.coords.latitude, position.coords.longitude];
                    console.log(userPosition)
                    const userPoint = turf.point(userPosition);
                    const geometry = feature.geometry;
                    const featureId = feature.properties?.id;
                    console.log(geometry)
                    console.log(featureId)
                    if (geometry && geometry.type === "Polygon" && featureId) {
                        const polygon = turf.polygon(geometry.coordinates);
                        const isInside = turf.booleanPointInPolygon(userPoint, polygon);
                        if (isInside) {
                            console.log(`User is inside the feature with ID: ${featureId}`);
                        } else {
                            console.log(`nope`);
                        }
                    }
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    };
    return (
        <MapContainer center={position} zoom={12} style={{ height: "75vh", width: "90%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geojsonData && <GeoJSON data={geojsonData} style={geoJsonStyle} onEachFeature={forEachFeature}/>}
            
            {userPosition && (
                <>
                    <Marker position={userPosition}>
                        <Popup>Your location</Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    );
};

export default MapComponent;