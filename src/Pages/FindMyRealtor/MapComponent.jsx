import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";
import { Icon, divIcon, point } from "leaflet";
import { GeoJSON } from 'react-leaflet';
import pointInPolygon from 'point-in-polygon';

import 'leaflet/dist/leaflet.css';
import HouseForSale from "./HouseForSale.json"; // Import the JSON file

function MapComponent({ onSelectCity }) {
  const [drawingMode, setDrawingMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true); // Start with Delete Mode active
  const [drawnItems, setDrawnItems] = useState({});
  const [drawnPolygons, setDrawnPolygons] = useState([]);
  const freedrawRef = useRef(null);
  // Leaflet can't render undefined values.
  const [cityAreaCoordinates, setCityAreaCoordinates] = useState([[0, 0]]); // Initialize with a placeholder coordinate
  const [selectedCity, setSelectedCity] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [placeMarkerMode, setPlaceMarkerMode] = useState(false); // Added state to track "Place Marker" button click
  const [housesForSale, setHousesForSale] = useState(HouseForSale); // Store the houses for sale data

  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      const city = data.address.city || data.address.town || data.address.village;

      console.log("Clicked at Latitude:", lat);
      console.log("Clicked at Longitude:", lng);
      console.log("City returned by reverse geocoding:", city);

      setSelectedCity(city);
      onSelectCity(city);

      if (placeMarkerMode) {
        setMarkerCoordinates([lat, lng]);
        setPlaceMarkerMode(false);
      }

      // API Request - Geo Reverse Coding
      const cityInfoResponse = await fetch(
        `https://api.dataforsyningen.dk/steder?hovedtype=Bebyggelse&undertype
      =by&primærtnavn=${city}&format=geojson`
      );

      // Parse the response from the GeoJSON API
      const cityInfoData = await cityInfoResponse.json();

      // Check if there are features in the response
      if (cityInfoData.features.length > 0) {
        // Extract the geometry information from the first feature
        const geometry = cityInfoData.features[0].geometry;

        // Check the type of geometry (Polygon or MultiPolygon)
        if (geometry.type === "Polygon") {
          // For a Polygon, directly set the coordinates in state
          setCityAreaCoordinates(geometry.coordinates[0]);
        } else if (geometry.type === "MultiPolygon") {
          // For a MultiPolygon, directly set the coordinates in state
          setCityAreaCoordinates(
            geometry.coordinates.reduce((accumulator, polygon) => {
              // Flatten each polygon's coordinates and concatenate to the accumulator
              return [...accumulator, ...polygon[0]];
            }, [])
          );
        } else {
          // Handle unknown geometry type
          console.error("Unknown geometry type:", geometry.type);
          // Optionally, provide feedback to the user, e.g., display an error message
        }
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }
  };

  // A custom hook that listens to the map's click event
  // so if a click occurs, it will registere where.
  function ClickListener() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }

  const countHousesWithinPolygons = () => {
    if (selectedCity) {
      const housesWithinCity = [];

      // Iterate through houses and check if they are within the coordinates of the matching city
      for (const house of housesForSale) {
        if (house.city === selectedCity) {
          const houseCoordinates = [house.longitude, house.latitude];
          // console.log("House Coordinates:", houseCoordinates);
          // console.log("City Coordinates:", cityAreaCoordinates);

          const isHouseWithinCity = isPointInAnyPolygon(houseCoordinates, [
            cityAreaCoordinates,
          ]);

          if (isHouseWithinCity) {
            housesWithinCity.push(house);
          }
        }
      }
      console.log(
        "Number of houses for sale within the matching city:",
        housesWithinCity.length
      );
      console.log(
        "Houses for sale within the matching city:",
        housesWithinCity
      );
    } else {
      console.log("No city selected.");
    }
  };

  // can be used to verify if something is within a set of polygons
  function isPointInAnyPolygon(point, polygons) {
    for (const polygon of polygons) {
      if (pointInPolygon(point, polygon)) {
        return true;
      }
    }
    return false;
  }

  const getHousesForSaleBySelectedCity = () => {
    const housesWithinSelectedCity = [];
  
    for (const house of housesForSale) {
      if (house.city === selectedCity) {
        housesWithinSelectedCity.push(house);
      }
    }
  
    console.log(`Number of houses for sale in ${selectedCity}:`, housesWithinSelectedCity.length);
    console.log(`Houses for sale in ${selectedCity}:`, housesWithinSelectedCity);
  
    return housesWithinSelectedCity;
  };

  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === "Escape" && drawingMode) {
        // Cancel the current FreeDraw action when the escape key is pressed.
        freedrawRef.current.cancel();
      }
    },
    [drawingMode]
  );

  const mode = deleteMode
    ? DELETE
    : drawingMode
    ? CREATE | EDIT | APPEND | ALL
    : 0;

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      if (drawingMode) {
        // Disable FreeDraw mode when unmounting
        setDrawingMode(false);
      }
    };
  }, [handleEscapeKey, drawingMode]);

  const handleToggleFreeDraw = () => {
    setDrawingMode(!drawingMode);
    setDeleteMode(false); // Disable Delete Mode when enabling Free Draw
  };

  const handleToggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setDrawingMode(false); // Disable Free Draw when enabling Delete Mode
  };

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../icons/placeholder.png"),
    iconSize: [26, 26], // size of the icon
  });

  // Map Container is just to determine where on the map i should focus when render
  // and the size  and zoom
  return (
    <div className="mapComponetDiv">
      <button onClick={handleToggleFreeDraw} disabled={drawingMode}>Enable Free Draw</button>
      <button onClick={handleToggleDeleteMode} disabled={deleteMode}>Enable Delete Mode</button>
      <button onClick={() => setPlaceMarkerMode(true)}>Place Marker</button>
      <button onClick={countHousesWithinPolygons}>Count Houses in Polygons</button>
      <button onClick={getHousesForSaleBySelectedCity}>Get Houses For Sale By Selected City</button>
      <button onClick={() => console.log("Drawn Polygons:", drawnPolygons)}>Log Drawn Polygons</button>

      <MapContainer
        center={[56.2639, 9.5018]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
        data-testid="your-map-element"
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
  onChange={(event) => setDrawnPolygons(event.features)}
  ref={freedrawRef}
/>

        {/* Conditional rendering of the city area
      The city area polygon is only rendered if cityAreaCoordinates does not contain the initial placeholder value [0, 0]
      There by forceing a re-render of the map, showing the polygons       */}
        {cityAreaCoordinates[0][0] !== 0 && (
          <GeoJSON
            data={{
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [cityAreaCoordinates],
              },
              properties: {},
            }}
            style={() => ({
              color: "blue",
              fillColor: "blue",
              weight: 2,
              opacity: 1,
              fillOpacity: 0.5,
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

export default MapComponent;

