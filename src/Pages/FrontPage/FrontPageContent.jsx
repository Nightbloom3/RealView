import BarChart from "../../Charts/BarChart";
import PieChart from "../../Charts/PieChart";
import { useState, useEffect } from "react";
import { TestData } from "../../Charts/Data/TestData";
import { PieData } from "../../Charts/Data/PieData";
import { Chart as ChartJS } from "chart.js/auto";
// ^^^^^^ Må ikke slettes - ellers virker siden ikke ^^^^^^^--- import { Chart as ChartJS } from "chart.js/auto";

export default function FrontPageContent() {
  const [testData, setTestData] = useState({
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

  const [pieData1, setPieData1] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const [pieData3, setPieData3] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    setTestData({
      labels: TestData.map((data) => data.year),
      datasets: [
        {
          label: "# Houses Sold",
          data: TestData.map((data) => data.HousesSold),
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

    setPieData1({
      labels: PieData.map((data) => data.realtor),
      datasets: [
        {
          label: "% Market Share",
          data: PieData.map((data) => data.MarketShare),
        },
      ],
    });

    setPieData3({
      labels: PieData.map((data) => data.realtor),
      datasets: [
        {
          label: "% Market Share",
          data: PieData.map((data) => data.MarketShare),
        },
      ],
    });
  }, []);

  const pieChartWidth = 300;
  const pieChartHeight = 200;

  return (
    <div class="grid-container">
      <div class="grid-item">
        <PieChart ChartData={pieData} width={pieChartWidth} height={pieChartHeight} />
      </div>
      <div class="grid-item">
        <PieChart ChartData={pieData1} width={pieChartWidth} height={pieChartHeight} />
      </div>
      <div class="grid-item">
        <PieChart ChartData={pieData3} width={pieChartWidth} height={pieChartHeight} />
      </div>
      <div class="grid-item">
        <BarChart ChartData={testData} width={pieChartWidth} height={pieChartHeight} />
      </div>
    </div>
  );
}