import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";
import { Icon, divIcon, point } from "leaflet";
import { GeoJSON } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import cityBoundaries from "./CityBoundaries.json"; // Import the JSON file

function MapComponet({ onSelectCity }) {
  const [drawingMode, setDrawingMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true); // Start with Delete Mode active
  const [drawnItems, setDrawnItems] = useState({});
  const freedrawRef = useRef(null);
 // Leaflet can't render undefined values.
  const [cityAreaCoordinates, setCityAreaCoordinates] = useState([[0, 0]]); // Initialize with a placeholder coordinate
  const [selectedCity, setSelectedCity] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [placeMarkerMode, setPlaceMarkerMode] = useState(false); // Added state to track "Place Marker" button click


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

  
  const handleCityClick = (cityName) => {
    // Find the selected city object based on its name
    const selectedCityObject = cityBoundaries.find((city) => city.name === cityName);
  
    if (selectedCityObject) {
      // Set the coordinates for the city area
      setCityAreaCoordinates(selectedCityObject.coordinates);
 
      // Set the selected city
      setSelectedCity(cityName);
    }
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

      const matchingCity = cityBoundaries.find((cityObject) => {
        const [cityLng, cityLat] = cityObject.coordinates[0]; // Assuming the first coordinate represents the city's location
        const latDiff = Math.abs(lat - cityLat);
        const lngDiff = Math.abs(lng - cityLng);
        return latDiff < 0.01 && lngDiff < 0.01; // Adjust the threshold as needed
      });

      // This might need a change from line 135 - 140
      onSelectCity(city);

      if (matchingCity) {
        handleCityClick(matchingCity.name);
      }

      // Check if the "Place Marker" button was clicked, and update the marker coordinates
      if (placeMarkerMode) {
        setMarkerCoordinates([lat, lng]);
        setPlaceMarkerMode(false); // Reset placeMarkerMode after placing the marker
      }

    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }

  };

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../icons/placeholder.png"),
    iconSize: [26, 26], // size of the icon
  });

  const cityAreaFeature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [cityAreaCoordinates],
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
    <button onClick={() => setPlaceMarkerMode(true)}>Place Marker</button>
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

      <Freedraw
        mode={mode}
        features={drawnItems}
        setFeatures={setDrawnItems}
        ref={freedrawRef}
      />

      {/* Conditional rendering of the city area
      The city area polygon is only rendered if cityAreaCoordinates does not contain the initial placeholder value [0, 0]
      There by forceing a re-render of the map, showing the polygons       */}
      {cityAreaCoordinates[0][0] !== 0 && (
        <GeoJSON
          data={cityAreaFeature}
          style={() => ({
            color: "blue", // Change the color of the polygon border
            fillColor: "blue", // Change the fill color of the polygon
            weight: 2, // Adjust the border weight
            opacity: 1, // Adjust the opacity of the polygon border
            fillOpacity: 0.5, // Adjust the fill opacity
          })}
        />
      )}
        {markerCoordinates && (
          <Marker position={markerCoordinates} icon={customIcon}>
            <Popup>Marker Location</Popup>
          </Marker>
        )}
    </MapContainer>
  </div>
  );
}

export default MapComponet;

