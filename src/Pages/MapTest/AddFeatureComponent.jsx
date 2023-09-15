import React, { useState } from "react";
import L from "leaflet";

function AddFeatureComponent({ map, featureMode }) {
  const [coordinates, setCoordinates] = useState([]);
  const [polygon, setPolygon] = useState(null);

  const handleMapClick = (event) => {
    if (map && featureMode === "marker") {
      // Add a marker to the map
      L.marker(event.latlng).addTo(map);
    } else if (map && featureMode === "polygon") {
      // Add coordinates to the polygon
      setCoordinates([...coordinates, [event.latlng.lat, event.latlng.lng]]);
      // Force a re-render of the map (you may need to adjust this)
      setPolygon(new Date().getTime());
    }
  };

  const createPolygon = () => {
    if (map && featureMode === "polygon" && coordinates.length >= 3) {
      // Create a polygon and add it to the map
      const newPolygon = L.polygon(coordinates).addTo(map);
      setPolygon(newPolygon);
      // Clear the coordinates
      setCoordinates([]);
    }
  };

  return (
    <div>
      <button onClick={createPolygon}>Create Polygon</button>
      <p>
        Click on the map to add{" "}
        {featureMode === "marker" ? "markers" : "polygon vertices"}.{" "}
        {featureMode === "polygon" &&
          "Click 'Create Polygon' to finish drawing."}
      </p>
    </div>
  );
}

export default AddFeatureComponent;
