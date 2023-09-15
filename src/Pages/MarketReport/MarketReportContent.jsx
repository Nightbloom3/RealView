import { useEffect, useMemo, useRef, useState } from "react";
import { MarketReportData } from "./Data/MarketReportData";
import { MarketReportData2 } from "./Data/MarketReportData2";
import { columns } from "./Data/Columns";
import ScatterChart from "../../Components/Charts/ScatterChart";
import DataTable from "../../Components/Tables/DataTable";
import "chart.js/auto";

export default function MarketReportContent() {
  const ChartStylingWidth = 800; // Set your desired width
  const ChartStylingHeight = 400; // Set your desired height
  //Its important to note that the aspect ratio for the charts must always be 1:2,
  //any overflowing height will simply be added under the chart as a sort of padding 

  //ScatterChartStyling contains the styling options for the scatter plot chart seen below,
  //in the scales section we setup the title texts for the x-axis and the y-axis,
  //in the plugins section we disable the chart title and the interactive Legends,
  //as the chart becomes to cluttered when there are more than 10 realtors in a region 
  const scatterChartStyling = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Average Time Listed (Days)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Price per M²",
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  };

  const [checkboxItems, setCheckboxItems] = useState(["3450", "3520"])
  const [checkedItems, setCheckedItems] = useState(checkboxItems.map(() => false));
  const [currentDataset, setCurrentDataset] = useState([])
  const datasetsRef = useRef({
    dataset1: MarketReportData,
    dataset2: MarketReportData2,
  })


  const handleCheckboxClick = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    let newCurrentDataset = [];
    for (let i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i]) {
        const datasetKey = `dataset${i + 1}`;
        newCurrentDataset = newCurrentDataset.concat(datasetsRef.current[datasetKey]);
      }
    }
    setCurrentDataset((prevCurrentDataset) => {
      if (JSON.stringify(prevCurrentDataset) !== JSON.stringify(newCurrentDataset)) {
        return newCurrentDataset;
      }
      return prevCurrentDataset;
    });
  }, [checkedItems]);

 
  // a small function that picks a random hex color for the purpose of coloring the plots in the scatter plot
  const randomColor = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  };

  //small method for finding the length amount of colors neded to give the dataset
  //If given simply 1 color, lets say "red", then all the points would be red, if it were given
  //"red, blue" then it would alternate between red and blue for each point,
  //so to make sure each point has its own colour we need to assign all of them a color
  const numberOfDataPoints = currentDataset.length;

  //Setting up data for chart, will need to make use of the set method and a useEffect once there is access to the DB
  const scatterChartData = ({
    labels: currentDataset.map((data) => data.realtor),
    datasets: [
      {
        label: "Average Time Listed / Average Price per M²",
        data: currentDataset.map((data) => ({
          x: data.avgTimeListedInDays,
          y: data.avgPricePerM2,
        })),
        backgroundColor: randomColor(numberOfDataPoints),
        pointRadius: 4,
      },
    ],
  });

  //useState for tracking whether or not the div holding the table is hidden or not
  const [isDivHidden, setIsDivHidden] = useState(false);

  //Memoizing of the table data and columns
  const tableData = useMemo(() => currentDataset, [currentDataset]);
  const tableColumns = useMemo(() => columns, []);

  return (
    <div className="MarketReport_Content_Grid-container">

      <div className="ChoiceDiv">
        <fieldset>
          <legend>Choose a area</legend>

          {checkboxItems.map((item, index) => (
            <div key={index}>
              <input
              type="checkbox"
              id={`option${index + 1}`}
              checked={checkedItems[index]}
              onChange={() => handleCheckboxClick(index)}
              />
              <label htmlFor={`option${index + 1}`}>{item}</label>
            </div>
          ))}

        </fieldset>
      </div>

      <div className="ChartDiv">
        <ScatterChart
          ChartData={scatterChartData}
          width={ChartStylingWidth}
          height={ChartStylingHeight}
          StylingOptions={scatterChartStyling}
        />
      </div>

    {currentDataset.length > 0 && (
      <div className="FormDiv">
        <>
          <div>
            <button onClick={() => setIsDivHidden(!isDivHidden)}>
              Show/Hide Table
            </button>
          </div>
          {isDivHidden ? null : (
            <div>
              <DataTable
              tableData={tableData}
              tableColumns={tableColumns}
              />
            </div>
          )}
        </>
      </div>
      )}
    </div>
  );
}
