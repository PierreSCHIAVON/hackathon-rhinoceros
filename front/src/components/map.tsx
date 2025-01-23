import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngTuple } from "leaflet";



const MapComponent = () => {
    const [geojsonData, setGeojsonData] = useState(null);
    useEffect(() => {
    fetch("/map.geojson")
    .then((response) => response.json())
    .then((data) => setGeojsonData(data));
}, []);

const position : LatLngTuple = [43.6, 1.45];
const geoJsonStyle = {
    color: "blue",
    weight: 2,
    fillColor: "lightblue",
    fillOpacity: 0.5,
};

return (
    <MapContainer center={position} zoom={13} style={{ height: "50vh", width: "75%",margin:"auto" }}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {geojsonData && <GeoJSON data={geojsonData} style={geoJsonStyle} />}
    </MapContainer>
);
};

export default MapComponent;