const ChartStyling = {
    responsive: true,
    mainMaintainAspectRatio: true,
    indexAxis: "x",
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "",
          color: "#F8F8F8",
        },
        ticks: {
          color: "#F8F8F8",
        },
        grid: {
          color: "#F8F8F8",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "",
          color: "#F8F8F8",
        },
        ticks: {
          color: "#F8F8F8",
        },
        grid: {
          color: "#F8F8F8",
        },
      },
    },
    layout: {
        padding: {
            left: 0,
            right: 10,
            top: 0,
            bottom: 10,
        }
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: true,
        labels: {
            boxWidth: 30,
            boxHeight: 10,
            color: "#F8F8F8"
        }
      },
    },
  };

  export default ChartStyling;