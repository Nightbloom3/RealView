import React, { useEffect } from "react";
import L from "leaflet";

function CityBoundaries({ selectedCity, map }) {
  useEffect(() => {
    if (map) {
      // Clear any existing city boundaries
      map.eachLayer((layer) => {
        if (layer.feature && layer.feature.properties.city_boundary) {
          map.removeLayer(layer);
        }
      });

      if (selectedCity) {
        // Hard-coded GeoJSON data for testing
        const cityBoundariesGeoJSON = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [55.676098, 12.568337],
                      [56.676098, 13.568337],
                      [57.676098, 14.568337],
                      [58.676098, 15.568337],
                      [59.676098, 16.568337],
                    ],
                  ],
                },
              },
              // Add more GeoJSON features here for additional city boundaries in Denmark
            ],
          };

        L.geoJSON(cityBoundariesGeoJSON, {
          style: {
            fillColor: "transparent",
            color: "red", // Outline color
            weight: 2, // Outline width
          },
          onEachFeature: (feature, layer) => {
            layer.feature.properties.city_boundary = true;
          },
        }).addTo(map);
      }
    }
  }, [selectedCity, map]);

  return null;
}

export default CityBoundaries;
