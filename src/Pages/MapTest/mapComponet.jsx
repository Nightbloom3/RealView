import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ onSelectCity }) {
  const [drawingMode, setDrawingMode] = useState(false);
  const [drawnItems, setDrawnItems] = useState(null);

  // A custom hook that listens to the map's click event
  // so if a click occurs, it will register where.
  function ClickListener() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  // Handle the click event on the map
  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // ... (Same as in your original code)

    // If drawing mode is active, handle FreeDraw actions
    if (drawingMode) {
      // Use the `drawnItems` state to add or remove FreeDraw shapes
      // based on your FreeDraw component's requirements.
      // You may need to customize this part to match your use case.
      const shape = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[]],
        },
      };
      shape.geometry.coordinates[0].push([lng, lat]);

      // Update the `drawnItems` state with the new shape
      setDrawnItems({
        type: 'FeatureCollection',
        features: [shape],
      });
    }
  };

  // Handle the toggle button click to enable/disable FreeDraw mode
  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
  };

  return (
    <div className='mapComponentDiv'>
      <button onClick={toggleDrawingMode}>
        {drawingMode ? 'Disable Free Draw' : 'Enable Free Draw'}
      </button>
      <button>Delete Free Draw Area</button>
      <MapContainer
        center={[56.2639, 9.5018]}
        zoom={7}
        style={{ height: '600px', width: '100%' }}
      >
        {/* TileLayer and ClickListener remain the same */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickListener />

        {/* Include the FreeDraw component */}
        {drawingMode && (
          <Freedraw
            mode={CREATE | EDIT | DELETE | APPEND | ALL} // Customize as needed
            features={drawnItems}
            setFeatures={setDrawnItems}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
