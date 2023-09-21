import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";
import L from 'leaflet'; // Import the 'L' object from the Leaflet library

export default function FreeDrawComp({ onSelectCity }) {
  const [drawingMode, setDrawingMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true); // Start with Delete Mode active
  const [drawnItems, setDrawnItems] = useState({});
  const freedrawRef = useRef(null);
  const mapRef = useRef(null); // Add a ref to store the map instance

  const handleEscapeKey = useCallback((event) => {
    if (event.key === "Escape" && drawingMode) {
      // Cancel the current FreeDraw action when the escape key is pressed.
      freedrawRef.current.cancel();
    }
  }, [drawingMode]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  const handleToggleFreeDraw = () => {
    setDrawingMode(!drawingMode);
    setDeleteMode(false); // Disable Delete Mode when enabling Free Draw
  };

  const handleToggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setDrawingMode(false); // Disable Free Draw when enabling Delete Mode
  };

  const mode = deleteMode ? DELETE : drawingMode ? (CREATE | EDIT | APPEND | ALL) : 0;

  const zoomToDrawnArea = () => {
    const drawnFeatures = drawnItems.features;

    if (mapRef.current && drawnFeatures && Array.isArray(drawnFeatures) && drawnFeatures.length > 0) {
      // Calculate the bounds of the drawn features
      const bounds = L.geoJSON(drawnFeatures).getBounds();
      // Zoom to the bounds
      mapRef.current.leafletElement.fitBounds(bounds);
    }
  };

  return (
    <div className="mapComponentDiv">
      <button onClick={handleToggleFreeDraw} disabled={drawingMode}>
        Enable Free Draw
      </button>
      <button onClick={handleToggleDeleteMode} disabled={deleteMode}>
        Enable Delete Mode
      </button>
      <button onClick={zoomToDrawnArea}>
        Zoom to Drawn Area
      </button>
      <MapContainer
        center={[56.2639, 9.5018]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
        ref={mapRef} // Assign the map instance to the ref
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Freedraw
          mode={mode}
          features={drawnItems}
          setFeatures={setDrawnItems}
          ref={freedrawRef}
        />
      </MapContainer>
    </div>
  );
}
