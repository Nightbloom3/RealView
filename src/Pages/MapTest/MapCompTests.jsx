import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

class MapCompTest extends Component {
  state = {
    city: null,
  };

  cities = [
    {
      name: 'Copenhagen',
      coordinates: [55.6761, 12.5683], // Copenhagen's coordinates
    },
    // Add more cities here
  ];

  handleCityClick = (e) => {
    const { lat, lng } = e.latlng;
    const clickedCity = this.cities.find((city) => {
      const [cityLat, cityLng] = city.coordinates;
      return lat === cityLat && lng === cityLng;
    });
  
    if (clickedCity) {
      this.setState({ city: clickedCity });
    }
  };

  render() {
    const { city } = this.state;

    return (
      <div>
        <MapContainer center={[51.505, -0.09]} zoom={5} onClick={this.handleCityClick} className="map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Add more markers for other cities */}
          {city && (
            <Marker position={city.coordinates}>
              <Popup>{city.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  }
}

export default MapCompTest;
