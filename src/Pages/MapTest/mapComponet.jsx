import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CityBoundaries from './CityBoundaries';
import AddFeatureComponent from './AddFeatureComponent';

function MapComponent({ onSelectCity, selectedCity }) {
  const mapRef = useRef(null);
  const [featureMode, setFeatureMode] = useState('marker'); // State for feature mode

  // A custom hook that listens to the map's click event
  // so if a click occurs, it will register where.
  function ClickListener() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  // based on the click event / mouse click
  // we are able to extract the latitude and longitude
  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // Which are used here to do a "reverse geocoding" call to openstreetmap API
    // Making it possible to get a city name based on the latitude and longitude
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

  const toggleFeatureMode = () => {
    // Toggle between 'marker' and 'polygon' modes
    setFeatureMode(featureMode === 'marker' ? 'polygon' : 'marker');
  };

  return (
    <div className="mapComponentDiv">
      <button onClick={toggleFeatureMode}>
        Toggle {featureMode === 'marker' ? 'Polygon' : 'Marker'} Mode
      </button>
      <button>Free Draw knap</button>
      <button>Delete free draw område</button>
      <MapContainer
        center={[55.676098, 12.568337]}
        zoom={12}
        style={{ height: '600px', width: '100%' }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        {/* makes it possible to have the mouse click */}
        <ClickListener />
        {/* The tileLayer is what map we use, so leaflet is the component to create actions and openstreetmap - is the map itself */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Pass selectedCity and the map instance to CityBoundaries */}
        <CityBoundaries selectedCity={selectedCity} map={mapRef.current} />
        {/* Render the AddFeatureComponent and pass the map instance and featureMode */}
        <AddFeatureComponent map={mapRef.current} featureMode={featureMode} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
