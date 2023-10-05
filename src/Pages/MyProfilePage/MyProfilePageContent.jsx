import ComparisonChart from "../../Components/Charts/ComparisonChart";
import LineChart from "../../Components/Charts/LineChart";
import BarChart from "../../Components/Charts/BarChart"
import { useEffect, useState } from "react";
import { ProfilePageData } from "../../Data/ProfilePageData";
import { ProfilePageStats1 } from "../../Data/ProfilePageStats1";
import { ProfilePageStats2 } from "../../Data/ProfilePageStats2";
import { ProfilePageStats3 } from "../../Data/ProfilePageStats3";
import { GenerateRandomColor } from "../../Components/HelperFunctions/GenerateRandomColor";
import ChartStyling from "../../Components/Charts/ChartStyling";
import "chart.js/auto";
import _ from "lodash";

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
  const ChartStylingWidth = 480; // Set your desired width
  const ChartStylingHeight = 240; // Set your desired height
  const MainChartStylingWidth = 700;
  const MainChartStylingHeight = 350;

  const ComparisonStyling = _.cloneDeep(ChartStyling)
  ComparisonStyling.indexAxis = "y"

  const BiddingTimeStyling = _.cloneDeep(ChartStyling)
  BiddingTimeStyling.plugins.legend.labels.boxWidth = 0;
  BiddingTimeStyling.plugins.legend.labels.boxHeight = 0;

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
        backgroundColor: ["#3B9E9B"],
      },
      {
        label: selectText2,
        data: ProfilePageData.map((data) => data[selectChoice2]),
        backgroundColor: ["#83C5E2"],
      },
    ],
  });

  const statChart1 = ({
    labels: ProfilePageStats1.map((data) => data.year),
    datasets: [
      {
        label: "Houses for Sale",
        data: ProfilePageStats1.map((data) => data.HousesForSale),
        borderColor: ["#3B9E9B"],
        backgroundColor: ["#ff8c42"]
      },
      {
        label: "Houses Sold",
        data: ProfilePageStats1.map((data) => data.HousesSold),
        borderColor: ["#83C5E2"],
        backgroundColor: ["#ff8c42"]
      },
    ],
  });

  const lastMonth = ProfilePageStats2[ProfilePageStats2.length - 1];
  const statChart2 = ({
    labels: [lastMonth.Month],
    datasets: [
      {
      label: "Villa Houses",
      data: [lastMonth.VillaHousesSold],
      backgroundColor: ["#3B9E9B"]
    },
    {
      label: "Holiday Houses",
      data: [lastMonth.HolidayHousesSold],
      backgroundColor: ["#83C5E2"]
    },
    {
      label: "Condominium Houses",
      data: [lastMonth.CondominiumHousesSold],
      backgroundColor: ["#ff8c42"]
    },
    {
      label: "Cooperative Houses",
      data: [lastMonth.CooperativeHousesSold],
      backgroundColor: ["#ffd166"]
    }
  ]
  })

  const statChart3 = ({
    labels: ProfilePageStats3.map((data) => data.CommunityCode),
    datasets: [
      {
        label: "Bidding time in days",
        data: ProfilePageStats3.map((data) => data.AvgBiddingTime),
        backgroundColor: GenerateRandomColor(ProfilePageStats1.length)
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
          backgroundColor: ["#3B9E9B"],
        },
        {
          label: selectText2,
          data: ProfilePageData.map((data) => data[selectChoice2]),
          backgroundColor: ["#83C5E2"],
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

        <div>
          <br />
        <div className="IndividualChart">
          <ComparisonChart
            ChartData={profileComparisonData}
            width={MainChartStylingWidth}
            height={MainChartStylingHeight}
            StylingOptions={ComparisonStyling}
          />
        </div>
        </div>

        <div className="SelectionDiv">
          <br />
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
      </div>

      <div className="StatDiv">
        <div className="StatCharts">
          <div className="IndividualChart">
          <LineChart
            ChartData={statChart1}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
            StylingOptions={ChartStyling}
          />
          </div>

          <br />
          
          <div className="IndividualChart">
          <BarChart
            ChartData={statChart2}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
            StylingOptions={ChartStyling}
          />
          </div>

          <br />

          <div className="IndividualChart">
          <BarChart
            ChartData={statChart3}
            width={ChartStylingWidth}
            height={ChartStylingHeight}
            StylingOptions={BiddingTimeStyling}
          />
          </div>
        </div>
      </div>
    </div>
  );
}
