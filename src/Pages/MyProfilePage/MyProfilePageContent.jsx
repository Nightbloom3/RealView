import ComparisonChart from "../../Charts/ComparisonChart";
import { useEffect, useState } from "react";
import { ProfilePageData } from "../../Charts/Data/ProfilePageData";
import { Chart as ChartJS } from "chart.js/auto";
// ^^^^^^ Do not delete, the unused import, ChartJS needs it like this for it to work ^^^^^^^";

// Reusable component for the select box
// onChange is for whichever onChange function you want to run with the SelectBox
// options is the choices that the SelectBox will use, check the selectOptions variable below for the format
// defaultValue as its name implies defines the default value you want the SelectBox to show initially
function SelectBox({ onChange, options, defaultValue }) {
  return (
    <div className="SelectBox">
      <select id="selectChoices" onChange={onChange} value={defaultValue}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function MyProfilePageContent() {
  //Options for the chart
  const ChartStylingWidth = 500; // Set your desired width
  const ChartStylingHeight = 500; // Set your desired height
  const ComparisonStyling = {
    MaintainAspectRatio: true,
    responsive: true,
    indexAxis: "y",
  };

  // useStates for the Chart's Data
  const [selectChoice1, setSelectChoice1] = useState("HousesSold");
  const [selectText1, setSelectText1] = useState("Houses Sold");

  const [selectChoice2, setSelectChoice2] = useState("HousesAcquired");
  const [selectText2, setSelectText2] = useState("Houses Acquired");

  const [profileData, setProfileData] = useState({
    labels: ProfilePageData.map((data) => data.year),
    datasets: [
      {
        label: selectText1,
        data: ProfilePageData.map((data) => data[selectChoice1]),
        backgroundColor: ["blue"],
      },
      {
        label: selectText2,
        data: ProfilePageData.map((data) => data[selectChoice2]),
        backgroundColor: ["red"],
      },
    ],
  });

  // useEffect to change the data that the chart uses whenever there is a change in the associated values
  useEffect(() => {
    setProfileData({
      labels: ProfilePageData.map((data) => data.year),
      datasets: [
        {
          label: selectText1,
          data: ProfilePageData.map((data) => data[selectChoice1]),
          backgroundColor: ["blue"],
        },
        {
          label: selectText2,
          data: ProfilePageData.map((data) => data[selectChoice2]),
          backgroundColor: ["red"],
        },
      ],
    });
  }, [selectChoice1, selectChoice2, selectText1, selectText2]); // State variable dependencies

  // Function to be used as the onChange part of the SelectBoxes
  // setSelectChoice and setSelectText in this case are not the set functions to a useState
  // at least not directly, they are instead pointers to set functions for useStates,
  // so that you can chose which useStates you want to update here
  function HandleChoiceChange(e, setSelectChoice, setSelectText) {
    const selectedIndex = e.target.selectedIndex;
    setSelectChoice(e.target.value);
    setSelectText(e.target.options[selectedIndex].label);
  }

  // Array of options for the SelectBoxes,
  // label being the text shown for the option,
  // value being the internal value for the choice,
  // both values are extracted by useStates to use for the chart
  const selectOptions = [
    { label: "Houses Sold", value: "HousesSold" },
    { label: "Houses Acquired", value: "HousesAcquired" },
    { label: "Average sale price of houses", value: "HousesAvgPriceSold" },
    { label: "Average earnings on house sales", value: "HousesAvgEarnings" },
    { label: "Average price change on houses", value: "HousesAvgPriceChange" },
  ];

  return (
    <div>
      <div className="Chart">
        <ComparisonChart
          ChartData={profileData}
          width={ChartStylingWidth}
          height={ChartStylingHeight}
          StylingOptions={ComparisonStyling}
        />
      </div>

      <SelectBox
        onChange={(e) =>
          HandleChoiceChange(e, setSelectChoice1, setSelectText1)
        }
        options={selectOptions}
        defaultValue={selectChoice1}
      ></SelectBox>

      <p>Compare to:</p>

      <SelectBox
        onChange={(e) =>
          HandleChoiceChange(e, setSelectChoice2, setSelectText2)
        }
        options={selectOptions}
        defaultValue={selectChoice2}
      ></SelectBox>
    </div>
  );
}
