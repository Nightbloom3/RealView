import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";

export default function FreeDrawComp({ onSelectCity }) {
  const [drawingMode, setDrawingMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [drawnItems, setDrawnItems] = useState({});
  const freedrawRef = useRef(null);

  function ClickListener() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // ... (Same as in your original code)

    if (drawingMode) {
      const shape = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[]],
        },
      };
      shape.geometry.coordinates[0].push([lng, lat]);

      setDrawnItems({
        type: "FeatureCollection",
        features: [shape],
      });
    }
  };

  const toggleDrawingMode = () => {
    if (drawingMode) {
      setDrawnItems({});
    }
    setDrawingMode(!drawingMode);
    setDeleteMode(false); // Disable delete mode when toggling drawing mode
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);

    if (deleteMode) {
      // Disable delete mode
      if (freedrawRef.current && freedrawRef.current.leafletElement) {
        freedrawRef.current.leafletElement.stopDelete();
      }
    }
  };

  return (
    <div className="mapComponentDiv">
      <button onClick={toggleDrawingMode}>
        {drawingMode ? "Disable Free Draw" : "Enable Free Draw"}
      </button>
      <button onClick={toggleDeleteMode}>
        {deleteMode ? "Disable Delete Mode" : "Enable Delete Mode"}
      </button>
      <MapContainer
        center={[56.2639, 9.5018]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickListener />

        {/* Conditionally render the FreeDraw component */}
        {drawingMode && (
          <Freedraw
            mode={CREATE | EDIT | (deleteMode ? DELETE : 0)}
            features={drawnItems}
            setFeatures={setDrawnItems}
            ref={freedrawRef}
          />
        )}
      </MapContainer>
    </div>
  );
}
