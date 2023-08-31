import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ ChartData, width, height, StylingOptions }) {
  const chartContainerStyle = {
    width: width || "100%", // Default to 100% if no width is provided
    height: height || "auto", // Default to auto if no height is provided
  };

  return (
    <div style={chartContainerStyle}>
      <Bar data={ChartData} options={StylingOptions}/>
    </div>
  );
}

export default BarChart;
