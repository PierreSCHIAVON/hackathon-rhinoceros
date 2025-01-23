import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngTuple } from "leaflet";


const MapComponent = () => {
    const [geojsonData, setGeojsonData] = useState(null);

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
    }, []);

    const position: LatLngTuple = [43.6, 1.45];
    const geoJsonStyle = {
        color: "blue",
        weight: 2,
        fillColor: "lightblue",
        fillOpacity: 0.5,
    };

    return (
        <MapContainer center={position} zoom={12} style={{ height: "75vh", width: "90%"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geojsonData && <GeoJSON data={geojsonData} style={geoJsonStyle} />}
        </MapContainer>
    );
};

export default MapComponent;