import React, { useState, useEffect, useRef } from "react";
import realtorData from "./RealtorData.json";
import MapComponent from "./MapComponent";
import "./Search.css";

function SearchRealtor() {
  const [searchText, setSearchText] = useState("");
  const [foundRealtors, setFoundRealtors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // Track suggestion visibility

  const searchInputRef = useRef(null); // Create a reference for the search input element

  // Click event listener
  // if clicked inside "search"
  // suggestion list SHOW / true
  useEffect(() => {
    // Add a click event listener to the document
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        // Clicked outside of the search input
        setShowSuggestions(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Updates the search input - for every key press
  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    // Generate suggestions based on the current input
    const suggestionsList = generateSuggestions(text);
    setSuggestions(suggestionsList);

    // Show suggestions when the input field is focused
    setShowSuggestions(true);
  };

  // Returns a list of search results when button is clicked. 
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

    // Hide suggestions when the Search button is pressed
    setShowSuggestions(false);
  };

  // when a suggestion is clicked from the list
  const handleSelectSuggestion = (suggestion) => {
    // Set the selected suggestion in the search field
    setSearchText(suggestion.text);
    // Clear suggestions
    setSuggestions([]);
    // Hide suggestions when a suggestion is selected
    setShowSuggestions(false);
  };

  const generateSuggestions = (text) => {
    const searchTextLower = text.toLowerCase();
    const suggestionsList = [];
    const addedSuggestions = new Set(); // Create a Set to store added suggestions

    if (searchTextLower === "") {
      // If the search field is empty, return an empty list of suggestions
      return suggestionsList;
    }

    // Push suggestions based on search criteria
    realtorData.forEach((realtor) => {
      const cityLower = realtor.city.toLowerCase();
      const communeLower = realtor.commune.toLowerCase();
      const regionLower = realtor.region.toLowerCase();

      // Check if the city starts with the search text in the correct order
      if (cityLower.startsWith(searchTextLower)) {
        suggestionsList.push({ text: `${realtor.city}`, type: "City" });
      }

      // Check if the commune starts with the search text in the correct order
      if (regionLower.startsWith(searchTextLower)) {
        const suggestionText = `${realtor.region}`;

        // Only add the suggestion if it's not already in the Set
        if (!addedSuggestions.has(suggestionText)) {
          suggestionsList.push({ text: suggestionText, type: "Region" });
          addedSuggestions.add(suggestionText); // Add the suggestion to the Set
        }
      }

      // Check if the commune starts with the search text in the correct order
      if (communeLower.startsWith(searchTextLower)) {
        const suggestionText = `${realtor.commune}`;

        // Only add the suggestion if it's not already in the Set
        if (!addedSuggestions.has(suggestionText)) {
          suggestionsList.push({ text: suggestionText, type: "Commune" });
          addedSuggestions.add(suggestionText); // Add the suggestion to the Set
        }
      }
    });
    
    return suggestionsList;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleSelectCity = (city) => {
    setSearchText(city || ''); // Update the search field when a city is selected but also Ensures city is not undefined or null
  };

  return (
    <div className="findMyRealtorDiv">
      <div className="searchDiv">
        <input
          type="text"
          placeholder="Enter search text"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          ref={searchInputRef}
        />
        <button onClick={handleSearchClick}>Search</button>

        <div
          id="searchResultDiv"
          style={{ display: showSuggestions ? "none" : "block" }}
        >
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

        <div
          id="suggestionDiv"
          style={{ display: showSuggestions ? "block" : "none" }}
        >
          {showSuggestions ? (
            <div className="suggestionDiv">
              {suggestions.filter((suggestion) => suggestion.type === "City")
                .length > 0 && (
                <div className="suggestion-container suggestion-city-container">
                  <h3>By</h3>
                  {suggestions
                    .filter((suggestion) => suggestion.type === "City")
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion.text}
                      </div>
                    ))}
                </div>
              )}

              {suggestions.filter((suggestion) => suggestion.type === "Commune")
                .length > 0 && (
                <div className="suggestion-container suggestion-commune-container">
                  <h3>Kommune</h3>
                  {suggestions
                    .filter((suggestion) => suggestion.type === "Commune")
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion.text}
                      </div>
                    ))}
                </div>
              )}

              {suggestions.filter((suggestion) => suggestion.type === "Region")
                .length > 0 && (
                <div className="suggestion-container suggestion-region-container">
                  <h3>Region</h3>
                  {suggestions
                    .filter((suggestion) => suggestion.type === "Region")
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion.text}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="MapComponentDiv">
        <MapComponent onSelectCity={handleSelectCity} />
      </div>
    </div>
  );
}

export default SearchRealtor;
