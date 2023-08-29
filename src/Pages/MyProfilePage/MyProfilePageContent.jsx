import ComparisonChart from "../../Charts/ComparisonChart";
import { useEffect, useState } from "react";
import { ProfilePageData } from "../../Charts/Data/ProfilePageData";
import { Chart as ChartJS } from "chart.js/auto";
// ^^^^^^ Må ikke slettes - ellers virker siden ikke ^^^^^^^--- import { Chart as ChartJS } from "chart.js/auto";

// Reusable component for the select box
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
      },
      {
        label: selectText2,
        data: ProfilePageData.map((data) => data[selectChoice2]),
      },
    ],
  });

  useEffect(() => {
    setProfileData({
      labels: ProfilePageData.map((data) => data.year),
      datasets: [
        {
          label: selectText1,
          data: ProfilePageData.map((data) => data[selectChoice1]),
        },
        {
          label: selectText2,
          data: ProfilePageData.map((data) => data[selectChoice2]),
        },
      ],
    });
  }, [selectChoice1, selectChoice2, selectText1, selectText2]); // State variable dependencies

  function HandleChoiceChange1(e) {
    const selectedIndex = e.target.selectedIndex;
    setSelectChoice1(e.target.value);
    setSelectText1(e.target.options[selectedIndex].label);
  }

  function HandleChoiceChange2(e) {
    const selectedIndex = e.target.selectedIndex;
    setSelectChoice2(e.target.value);
    setSelectText2(e.target.options[selectedIndex].label);
  }

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
        onChange={HandleChoiceChange1}
        options={selectOptions}
        defaultValue={selectChoice1}
      ></SelectBox>

      <p>Compare to:</p>

      <SelectBox
        onChange={HandleChoiceChange2}
        options={selectOptions}
        defaultValue={selectChoice2}
      ></SelectBox>
    </div>
  );
}
