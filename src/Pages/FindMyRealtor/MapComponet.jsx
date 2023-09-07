import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
//npm install react-leaflet leaflet
import 'leaflet/dist/leaflet.css';
// import Freedraw, {  CREATE,  EDIT,  DELETE,  APPEND,  ALL } from "react-leaflet-freedraw";
import "./mapComponet.css";

function MapComponet({ onSelectCity }) {
  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
  
        const city = data.address.city || data.address.town || data.address.village;
        onSelectCity(city);
      } catch (error) {
        console.error('Error fetching reverse geocoding data:', error);
      }
    };

  // A custom hook that listens to the map's click event
  function ClickListener() {
    useMapEvents({
      click: handleMapClick
    });
    return null;
  }

  //might be possible to extract the mapContainer from the div and create a external CSS file
  return (
    <div className='mapComponetDiv'>
      <button>Free Draw knap</button>
      <button>Delete free draw område</button>
    <MapContainer
      center={[56.2639, 9.5018]}
      zoom={7}
      style={{ height: '600px', width: '100%' }}
    >
      <ClickListener />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
    </div>

  );
}

export default MapComponet;
