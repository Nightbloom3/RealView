import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";
import { Icon, divIcon, point } from "leaflet";

export default function FreeDrawComp({ onSelectCity }) {
  const [drawingMode, setDrawingMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true); // Start with Delete Mode active
  const [drawnItems, setDrawnItems] = useState({});
  const freedrawRef = useRef(null);

  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === "Escape" && drawingMode) {
        // Cancel the current FreeDraw action when the escape key is pressed.
        freedrawRef.current.cancel();
      }
    },
    [drawingMode]
  );

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

  const mode = deleteMode
    ? DELETE
    : drawingMode
    ? CREATE | EDIT | APPEND | ALL
    : 0;

  function ClickListener() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  const [markerCoordinates, setMarkerCoordinates] = useState([
    55.654492914401786, 12.100073440774317,
  ]);

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

      const city =
        data.address.city || data.address.town || data.address.village;

      console.log("Clicked at Latitude:", lat);
      console.log("Clicked at Longitude:", lng);
      console.log("City:", city);

      onSelectCity(city);
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }

    // Update the marker coordinates when the map is clicked
    setMarkerCoordinates([lat, lng]);
  };

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("./icons/placeholder.png"),
    iconSize: [26, 26], // size of the icon
  });

  return (
    <div className="mapComponentDiv">
      <button onClick={handleToggleFreeDraw} disabled={drawingMode}>
        Enable Free Draw
      </button>
      <button onClick={handleToggleDeleteMode} disabled={deleteMode}>
        Enable Delete Mode
      </button>
      <MapContainer
        center={[56.2639, 9.5018]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
      >
        <ClickListener />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add the Marker with the custom icon */}
        <Marker position={markerCoordinates} icon={customIcon}>
          <Popup>Default Marker Popup Content</Popup>
        </Marker>

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