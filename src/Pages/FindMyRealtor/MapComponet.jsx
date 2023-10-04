import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";
import { Icon, divIcon, point } from "leaflet";
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponet({ onSelectCity }) {
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

  const handleShowCityArea = () => {
    // Coordinates for the polygon
    const cityAreaCoordinates = [
      [12.5638, 55.7553], // Top-left corner
      [12.5863, 55.7553], // Top-right corner
      [12.5863, 55.7495], // Top-right inner corner
      [12.5638, 55.7553], // Top-left corner (closing the polygon)
    ];

    // Set the drawing mode to CREATE so that you can draw the polygons
    setDrawingMode(CREATE);

    // Set the coordinates for the drawn items (polygons)
    setDrawnItems({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [cityAreaCoordinates],
          },
          properties: {},
        },
      ],
    });
  };

  const mode = deleteMode
    ? DELETE
    : drawingMode
    ? CREATE | EDIT | APPEND | ALL
    : 0;

  // A custom hook that listens to the map's click event
  // so if a click occurs, it will registere where.
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

      // Update the marker coordinates when the map is clicked
      setMarkerCoordinates([lat, lng]);

      onSelectCity(city);
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }
  };

  const [markerCoordinates, setMarkerCoordinates] = useState([
    55.654492914401786, 12.100073440774317,
  ]);

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../icons/placeholder.png"),
    iconSize: [26, 26], // size of the icon
  });

  // Define the GeoJSON data for the green area between markers
  const greenAreaCoordinates = [
    [12.5638, 55.7553], // Top-left corner
    [12.5863, 55.7553], // Top-right corner
    [12.5863, 55.7495], // Top-right inner corner
    [12.5638, 55.7553], // Top-left corner (closing the polygon)
  ];

  const greenAreaFeature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [greenAreaCoordinates],
    },
    properties: {},
  };

  // Map Container is just to determine where on the map i should focus when render
  // and the size  and zoom
  return (
    <div className="mapComponetDiv">
      <button onClick={handleToggleFreeDraw} disabled={drawingMode}>
        Enable Free Draw
      </button>
      <button onClick={handleToggleDeleteMode} disabled={deleteMode}>
        Enable Delete Mode
      </button>
      <button onClick={handleShowCityArea}>Press to see city area</button>
      <MapContainer
        center={[56.2639, 9.5018]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
      >
        {/* makes it possible to have the mouse click */}
        <ClickListener />
        {/* The tileLayer is what map we use, so leaflet is the component to create actions and openstreetmap - is the map itself */}
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

        {/* Render the green area */}
        <GeoJSON
          data={greenAreaFeature}
          style={() => ({
            color: "green", // Change the color of the polygon border
            fillColor: "green", // Change the fill color of the polygon
            weight: 2, // Adjust the border weight
            opacity: 1, // Adjust the opacity of the polygon border
            fillOpacity: 0.5, // Adjust the fill opacity
          })}
        />
      </MapContainer>
    </div>
  );
}

export default MapComponet;
