import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./mapComponet.css";

function MapComponet({ onSelectCity }) {

  // A custom hook that listens to the map's click event
  // so if a click occurs, it will registere where.
  function ClickListener() {
    useMapEvents({
      click: handleMapClick
    });
    return null;
  }

  // based on the click event / mouse click
  // we are able to extract the latitude and longitude
  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // Which are used here to do a "reverse geocoding" call to openstreetmap API
    // Makeing it possible to get a city name based on the latitude and longitude
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

  // Map Container is just to determine where on the map i should focus when render
  // and the size  and zoom
  return (
    <div className='mapComponetDiv'>
      <button>Free Draw knap</button>
      <button>Delete free draw område</button>
    <MapContainer
      center={[56.2639, 9.5018]}
      zoom={7}
      style={{ height: '600px', width: '100%' }}
    >
      {/* makes it possible to have the mouse click */}
      <ClickListener/>
      {/* The tileLayer is what map we use, so leaflet is the component to create actions and openstreetmap - is the map itself */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
    </div>
  );
}

export default MapComponet;
