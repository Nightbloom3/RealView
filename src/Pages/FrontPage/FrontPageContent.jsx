import BarChart from "../../Components/Charts/BarChart";
import PieChart from "../../Components/Charts/PieChart";
import LineChart from "../../Components/Charts/LineChart";
import ComparisonChart from "../../Components/Charts/ComparisonChart";
import { useState, useEffect } from "react";
import { BarData } from "../../Data/BarData";
import { PieData } from "../../Data/PieData";
import { LineData } from "../../Data/LineData";
import { ComparisonData } from "../../Data/ComparisonData";
import { GenerateRandomColor } from "../../Components/HelperFunctions/GenerateRandomColor";
import ChartStyling from "../../Components/Charts/ChartStyling";
import "chart.js/auto";
import _ from "lodash";

export default function FrontPageContent() {
  const ChartStylingWidth = 600;
  const ChartStylingHeight = 300;
  const PieStylingWidth = 300;
  const PieStylingHeight = 300;

  const PieStyling = _.cloneDeep(ChartStyling)
  PieStyling.scales.x.display = false;
  PieStyling.scales.y.display = false;

  const BarStyling = _.cloneDeep(ChartStyling)
  BarStyling.plugins.legend.labels.boxWidth = 0;
  BarStyling.plugins.legend.labels.boxHeight = 0;
  
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const [comparisonData, setComparisonData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    setBarData({
      labels: BarData.map((data) => data.year),
      datasets: [
        {
          label: "# Houses Acquired",
          data: BarData.map((data) => data.housesAcquired),
          backgroundColor: GenerateRandomColor(BarData.length)
        },
      ],
    });

    setPieData({
      labels: PieData.map((data) => data.realtor),
      datasets: [
        {
          label: "% Market Share",
          data: PieData.map((data) => data.MarketShare),
          backgroundColor: GenerateRandomColor(PieData.length)
        },
      ],
    });

    setLineData({
      labels: LineData.map((data) => data.year),
      datasets: [
        {
          label: "# Houses Sold",
          data: LineData.map((data) => data.HousesSold),
          borderColor: "#83C5E2",
          backgroundColor: "#ff8c42"
        },
      ],
    });

    setComparisonData({
      labels: ComparisonData.map((data) => data.year),
      datasets: [
        {
          label: "# Houses Acquired",
          data: ComparisonData.map((data) => data.housesAcquired),
          backgroundColor: "#3B9E9B"
        },
        {
          label: "# Houses Sold",
          data: ComparisonData.map((data) => data.HousesSold),
          backgroundColor: "#83C5E2"
        },
      ],
    });
  }, []);

  return (
    <div className="FrontPage_Content">
      <div>
      <h1 className="FrontPageHeader">LOREM IPSUM</h1>
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
    <div className="FrontPage_Content_Grid-Container">
      <div className="grid-item">
        <div className="IndividualChart">
        <BarChart
          ChartData={barData}
          width={ChartStylingWidth}
          height={ChartStylingHeight}
          StylingOptions={BarStyling}
          />
        </div>
      </div>
      <div className="grid-item">
        <div className="IndividualChartCentered">
          <div></div>
          <div className="IWishIWasCentered">
          <PieChart
          ChartData={pieData}
          width={PieStylingWidth}
          height={PieStylingHeight}
          StylingOptions={PieStyling}
          />
          </div>
          <div></div>
        </div>
      </div>
      <div className="grid-item">
      <div className="IndividualChart">
        <LineChart
          ChartData={lineData}
          width={ChartStylingWidth}
          height={ChartStylingHeight}
          StylingOptions={ChartStyling}
          />
        </div>
        </div>
      <div className="grid-item">
      <div className="IndividualChart">
        <ComparisonChart
          ChartData={comparisonData}
          width={ChartStylingWidth}
          height={ChartStylingHeight}
          StylingOptions={ChartStyling}/>
        </div>
      </div>
    </div>
    </div>
  );
}