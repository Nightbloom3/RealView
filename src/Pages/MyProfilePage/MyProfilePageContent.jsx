import ComparisonChart from "../../Charts/ComparisonChart";
import LineChart from "../../Charts/LineChart";
import BarChart from "../../Charts/BarChart"
import { useEffect, useState } from "react";
import { ProfilePageData } from "../../Charts/Data/ProfilePageData";
import { ProfilePageStats1 } from "../../Charts/Data/ProfilePageStats1";
import { ProfilePageStats2 } from "../../Charts/Data/ProfilePageStats2";
import { ProfilePageStats3 } from "../../Charts/Data/ProfilePageStats3";
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
  const ChartStylingWidth = 400; // Set your desired width
  const ChartStylingHeight = 200; // Set your desired height
  const ComparisonStyling = {
    MaintainAspectRatio: true,
    responsive: true,
    indexAxis: "y",
  };
  const BiddingTimeStyling = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 0,
          boxHeight: 0,
        },
      },
    },
  }

  // useStates for the Chart's Data
  const [selectChoice1, setSelectChoice1] = useState("HousesSold");
  const [selectText1, setSelectText1] = useState("Houses Sold");

  const [selectChoice2, setSelectChoice2] = useState("HousesAcquired");
  const [selectText2, setSelectText2] = useState("Houses Acquired");

  const [profileComparisonData, setProfileComparisonData] = useState({
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

  const [statChart1, setStatChart1] = useState({
    labels: ProfilePageStats1.map((data) => data.year),
    datasets: [
      {
        label: "Houses for Sale",
        data: ProfilePageStats1.map((data) => data.HousesForSale),
        borderColor: ["blue"],
        backgroundColor: ["black"]
      },
      {
        label: "Houses Sold",
        data: ProfilePageStats1.map((data) => data.HousesSold),
        borderColor: ["red"],
        backgroundColor: ["black"]
      },
    ],
  });

  const lastMonth = ProfilePageStats2[ProfilePageStats2.length - 1];
  const [statChart2, setStatChart2] = useState({
    labels: [lastMonth.Month],
    datasets: [
      {
      label: "Villa Houses",
      data: [lastMonth.VillaHousesSold],
      backgroundColor: ["blue"]
    },
    {
      label: "Holiday Houses",
      data: [lastMonth.HolidayHousesSold],
      backgroundColor: ["red"]
    },
    {
      label: "Condominium Houses",
      data: [lastMonth.CondominiumHousesSold],
      backgroundColor: ["orange"]
    },
    {
      label: "Cooperative Houses",
      data: [lastMonth.CooperativeHousesSold],
      backgroundColor: ["yellow"]
    }
  ]
  })

  const [statChart3, setStatChart3] = useState({
    labels: ProfilePageStats3.map((data) => data.CommunityCode),
    datasets: [
      {
        label: "Bidding time in days",
        data: ProfilePageStats3.map((data) => data.AvgBiddingTime),
        backgroundColor: ["blue", "red", "green", "yellow", "purple", "orange"]
      }
    ]
  })

  // useEffect to change the data that the chart uses whenever there is a change in the associated values
  useEffect(() => {
    setProfileComparisonData({
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
    <div className="MyProfilePage_Content_Grid-container">
      <div className="ComparisonDiv">
        <div className="TextDiv">
          <h1>LOREM IPSUM</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <br />

        <div className="Chart">
          <ComparisonChart
            ChartData={profileComparisonData}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
            StylingOptions={ComparisonStyling}
          />
        </div>

        <br />

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

      <div className="ChartDiv">
        <div className="StatCharts">
          <LineChart
            ChartData={statChart1}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
          />

          <BarChart
            ChartData={statChart2}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
          />

          <BarChart
            ChartData={statChart3}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
            StylingOptions={BiddingTimeStyling}
          />
        </div>
      </div>
    </div>
  );
}
