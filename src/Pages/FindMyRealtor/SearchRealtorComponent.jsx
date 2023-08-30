import React, { useState } from 'react';
import realtorData from './RealtorData.json';
import MapComponet from './MapComponet';

function SearchRealtor() {
    const [searchText, setSearchText] = useState('');
    const [foundRealtors, setFoundRealtors] = useState([]);
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };
      
    // Should mabaye divide the function
    const handleSearchClick = () => {
        const filteredRealtors = realtorData.filter((realtor) => {
          const searchTextLower = searchText.toLowerCase();
          return (
            realtor.zipCode.includes(searchTextLower) ||
            realtor.city.toLowerCase().includes(searchTextLower) ||
            realtor.commune.toLowerCase().includes(searchTextLower) ||
            realtor.region.toLowerCase().includes(searchTextLower)
          );
        });
        setFoundRealtors(filteredRealtors);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    // so it will look like this

    // const matchesSearchCriteria = (realtor, searchTextLower) => {
    //     return (
    //       realtor.zipcode.includes(searchTextLower) ||
    //       realtor.city.toLowerCase().includes(searchTextLower) ||
    //     );
    //   };

    // const handleSearchClick = () => {
    //     const searchTextLower = searchText.toLowerCase();
      
    //     const filteredRealtors = realtorsData.filter((realtor) =>
    //       matchesSearchCriteria(realtor, searchTextLower)
    //     );
    //     setFoundRealtors(filteredRealtors);
    //   };

    const handleSelectCity = (city) => {
        setSearchText(city); // Update the search field when a city is selected
    };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search text"
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearchClick}>Search</button>

      <MapComponet onSelectCity={handleSelectCity} />

      {/* Returns and shows the list of found realtors */}
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Postnummer</th>
            <th>By</th>
            <th>Kommune</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
            {/* Maps over to list them all on each line */}
          {foundRealtors.map((realtor, index) => (
            <tr key={index}>
              <td>{realtor.name}</td>
              <td>{realtor.zipCode}</td>
              <td>{realtor.city}</td>
              <td>{realtor.commune}</td>
              <td>{realtor.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchRealtor;
