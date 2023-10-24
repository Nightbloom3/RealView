import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "react-leaflet-freedraw";
import { Icon, divIcon, point } from "leaflet";
import { GeoJSON } from 'react-leaflet';
import pointInPolygon from 'point-in-polygon';

import 'leaflet/dist/leaflet.css';
import cityBoundaries from "./CityBoundaries.json"; // Import the JSON file
import HouseForSale from "./HouseForSale.json"; // Import the JSON file

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
  const [housesForSale, setHousesForSale] = useState(HouseForSale); // Store the houses for sale data

// This was supposed to work with the freedraw plugin - it does not --- need fix
  // // Function to calculate the count of houses within polygons
  // const countHousesWithinPolygons = () => {
  //   if (drawnItems && drawnItems.features && drawnItems.features.length > 0) {
  //     const drawnPolygons = drawnItems.features.map((feature) => feature.geometry.coordinates[0]);
  //     const housesWithinPolygons = [];
  
  //     // Iterate through houses and check if they are within any drawn polygon
  //     for (const house of housesForSale) {
  //       const houseCoordinates = [house.longitude, house.latitude];
  //       const isHouseWithinPolygon = isPointInAnyPolygon(houseCoordinates, drawnPolygons);
  
  //       if (isHouseWithinPolygon) {
  //         housesWithinPolygons.push(house);
  //       }
  //     }
  
  //     console.log("Number of houses for sale within polygons:", housesWithinPolygons.length);
  //     console.log("Houses for sale within polygons:", housesWithinPolygons);
  //   } else {
  //     console.log("No polygons drawn or invalid data.");
  //   }
  // };

    // Test the point-in-polygon library
    const testPointInPolygon = () => {
      // Define a polygon as an array of coordinates [longitude, latitude]
      const polygon = [
        [12.568394062182847, 55.73629251717131],
        [12.469517109057847, 55.67284135822011],
        [12.453037616870349, 55.60540853422476],
        [12.505909320971911, 55.63642654736689],
        [12.569767353198474, 55.665483648721555],
        [12.597919819018786, 55.704579816001036],
        [12.568394062182847, 55.73629251717131]
      ];
  
      // Define a test point [longitude, latitude]
      const testPoint = [12.516013, 55.680825];
  
      // Check if the test point is inside the polygon
      const isInside = pointInPolygon(testPoint, polygon);
  
      if (isInside) {
        console.log('The test point is inside the polygon.');
      } else {
        console.log('The test point is outside the polygon.');
      }
    };


  // Function to calculate the count of houses within polygons
  const countHousesWithinPolygons = () => {
    if (selectedCity) {
      const matchingCityObject = cityBoundaries.find((city) => city.name === selectedCity);
      if (matchingCityObject) {
        const cityCoordinates = matchingCityObject.coordinates;
        const housesWithinCity = [];
  
        // Iterate through houses and check if they are within the coordinates of the matching city
        for (const house of housesForSale) {
          console.log("House Object:", house);
  
        // Access and print the "city" property
        console.log("House city:", house.city);



          const houseCoordinates = [house.longitude, house.latitude];
          console.log("House Coordinates:", houseCoordinates);
          console.log("City Coordinates:", cityCoordinates);
          const isHouseWithinCity = isPointInAnyPolygon(houseCoordinates, [cityCoordinates]);
  
          if (isHouseWithinCity) {
            housesWithinCity.push(house);
          }
        }
  
        console.log("Number of houses for sale within the matching city:", housesWithinCity.length);
        console.log("Houses for sale within the matching city:", housesWithinCity);
      } else {
        console.log("No matching city boundaries found.");
      }
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

  
  // const handleCityClick = (cityName) => {
  //   // Find the selected city object based on its name
  //   const selectedCityObject = cityBoundaries.find((city) => city.name === cityName);
  
  //   if (selectedCityObject) {
  //     // Set the coordinates for the city area
  //     setCityAreaCoordinates(selectedCityObject.coordinates);
 
  //     // Set the selected city
  //     setSelectedCity(cityName);
  //     console.log("Polygon Coordinates:", selectedCityObject.coordinates);
  //   }
  // };

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

  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
  
      const city = data.address.city || data.address.town || data.address.village;
  
      // Check if the returned city name matches any city in your data
      const matchingCity = cityBoundaries.find((cityObject) => cityObject.name === city);
  
      if (matchingCity) {
        // Set the coordinates for the matched city area
        setCityAreaCoordinates(matchingCity.coordinates);
        setSelectedCity(matchingCity.name);
      } else {
        // Reset the city area coordinates and selected city
        setCityAreaCoordinates([[0, 0]]);
        setSelectedCity(null);
      }
  
      // Perform additional actions based on the clicked coordinates
      // For example, handling marker placement
  
      console.log("Clicked at Latitude:", lat);
      console.log("Clicked at Longitude:", lng);
      console.log("City returned by reverse geocoding:", city);
      console.log("Matching city polygon coordinates:", matchingCity.coordinates);
  
      onSelectCity(city);
  
      if (placeMarkerMode) {
        setMarkerCoordinates([lat, lng]);
        setPlaceMarkerMode(false);
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    };
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
    <button onClick={countHousesWithinPolygons}>Count Houses in Polygons</button> {/* Add this button */}
    <button onClick={testPointInPolygon}>Test Point in Polygon</button>
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

