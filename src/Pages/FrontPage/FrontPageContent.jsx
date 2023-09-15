import BarChart from "../../Components/Charts/BarChart";
import PieChart from "../../Components/Charts/PieChart";
import LineChart from "../../Components/Charts/LineChart";
import ComparisonChart from "../../Components/Charts/ComparisonChart";
import { useState, useEffect } from "react";
import { BarData } from "../../Data/BarData";
import { PieData } from "../../Data/PieData";
import { LineData } from "../../Data/LineData";
import { ComparisonData } from "../../Data/ComparisonData";
import "chart.js/auto";

export default function FrontPageContent() {
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
        },
      ],
    });

    setPieData({
      labels: PieData.map((data) => data.realtor),
      datasets: [
        {
          label: "% Market Share",
          data: PieData.map((data) => data.MarketShare),
        },
      ],
    });

    setLineData({
      labels: LineData.map((data) => data.year),
      datasets: [
        {
          label: "# Houses Sold",
          data: LineData.map((data) => data.HousesSold),
        },
      ],
    });

    setComparisonData({
      labels: ComparisonData.map((data) => data.year),
      datasets: [
        {
          label: "# Houses Acquired",
          data: ComparisonData.map((data) => data.housesAcquired),
        },
        {
          label: "# Houses Sold",
          data: ComparisonData.map((data) => data.HousesSold),
        },
      ],
    });
  }, []);

  const pieChartWidth = 500;
  const pieChartHeight = 300;

  const ComparisonStyling = {
    MaintainAspectRatio: true,
    indexAxis: "y",
    scales: {
      xAxes: {
        max: 500,
      },
    },
  };

  return (
    <div className="FrontPage_Content_Grid-Container">
      <div className="grid-item">
        <BarChart
          ChartData={barData}
          width={pieChartWidth}
          height={pieChartHeight}/>
      </div>
      <div className="grid-item">
        <PieChart
          ChartData={pieData}
          width={pieChartWidth}
          height={pieChartHeight}/>
      </div>
      <div className="grid-item">
        <LineChart
          ChartData={lineData}
          width={pieChartWidth}
          height={pieChartHeight}/>
      </div>
      <div className="grid-item">
        <ComparisonChart
          ChartData={comparisonData}
          width={pieChartWidth}
          height={pieChartHeight}
          StylingOptions={ComparisonStyling}/>
      </div>
    </div>
  );
}