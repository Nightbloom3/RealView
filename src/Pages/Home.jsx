import BarChart from "../Charts/BarChart";
import { useState, useEffect } from "react";
import { TestData } from "../Charts/Data/TestData";

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
  }, []);

  return (
    <div>
      <BarChart ChartData={testData} />
    </div>
  );
}
