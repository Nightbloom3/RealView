import React from "react";
import { Scatter } from "react-chartjs-2";

function ScatterChart({ ChartData, width, height }) {
  const chartContainerStyle = {
    width: width || "100%", // Default to 100% if no width is provided
    height: height || "auto", // Default to auto if no height is provided
  };

  return (
    <div style={chartContainerStyle}>
      <Scatter data={ChartData} />
    </div>
  );
}

export default ScatterChart;