import CityBoundires from "./CityBoundaries"

function TestPage() {
  // Define your onSelectCity function here
  const onSelectCity = (city) => {
    // Your logic for handling the selected city
    console.log("Selected city:", city);
    // You can perform any further actions you need with the city name
  };

  return (
    <div>
      <h1>Find min ejendomsmægler</h1>

      <div>
        {/* Render the FreeDrawComp component and pass onSelectCity as a prop */}
        <CityBoundires onSelectCity={onSelectCity} />
      </div>
    </div>
  );
}

export default TestPage;
