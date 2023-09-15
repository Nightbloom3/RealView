import React, { useState } from "react";
import MapComponent from "./mapComponet";
import "../FindMyRealtor/Search.css";

function SearchRealtor() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="findMyRealtorDiv">
      <div className="mapComponentDiv">
        {/* Pass selectedCity to MapComponent */}
        <MapComponent onSelectCity={handleSelectCity} selectedCity={selectedCity} />
      </div>
      <div className="selectedCityInfo">
        {selectedCity && (
          <p>
            You have selected: <strong>{selectedCity}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchRealtor;
