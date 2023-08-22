import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import { useState, useEffect } from "react";
import { TestData } from "../Charts/Data/TestData";
import { PieData } from "../Charts/Data/PieData";

export function Home() {
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
  }, []);

  const pieChartWidth = 300; // Set your desired width
  const pieChartHeight = 200; // Set your desired height


  return (
    <div>
      <BarChart ChartData={testData} width={pieChartWidth} height={pieChartHeight} />
      <PieChart ChartData={pieData} width={pieChartWidth} height={pieChartHeight} />
    </div>
  );
}
