import { useEffect, useMemo, useRef, useState } from "react";
import { MarketReportData } from "./Data/MarketReportData";
import { MarketReportData2 } from "./Data/MarketReportData2";
import { MarketReportData3 } from "./Data/MarketReportData3";
import { generateColumns } from "./Data/Columns";
import ScatterChart from "../../Components/Charts/ScatterChart";
import DataTable from "../../Components/Tables/DataTable";
import { GenerateRandomColor } from "../../Components/HelperFunctions/GenerateRandomColor";
import ChartStyling from "../../Components/Charts/ChartStyling";
import mergeRowsByRealtor from "./Data/DatasetMerger"
import "chart.js/auto";
import _ from "lodash";

//function to handle the inputs for the chart
function transformDataForScatterChart(dataset) {
  return {
    labels: dataset.map((data) => data.realtor),
    datasets: [
      {
        label: "Average Time Listed / Average Price per M²",
        data: dataset.map((data) => ({
          x: data.avgTimeListedInDays,
          y: data.avgPricePerM2,
        })),
        backgroundColor: GenerateRandomColor(dataset.length),
        pointRadius: 4,
      },
    ],
  };
}

//Main function itself
export default function MarketReportContent() {
  const ChartStylingWidth = 1000; // Set your desired width
  const ChartStylingHeight = 500; // Set your desired height
  //Its important to note that the aspect ratio for the charts must always be 1:2,
  //any overflowing height will simply be added under the chart as a sort of padding 

  //ScatterChartStyling contains the styling options for the scatter plot chart seen below,
  //in the scales section we setup the title texts for the x-axis and the y-axis,
  //in the plugins section we disable the chart title and the interactive Legends,
  //as the chart becomes to cluttered when there are more than 10 realtors in a region 
  const scatterChartStyling = _.cloneDeep(ChartStyling)
  scatterChartStyling.scales.x.title.text = "Average Time Listed (Days)"
  scatterChartStyling.scales.y.title.text = "Average Price per M²"
  scatterChartStyling.plugins.title.display = false;
  scatterChartStyling.plugins.legend.display = false;
  scatterChartStyling.layout.padding.top = 20;

  //Set function should be used in the future to hold whatever postal numbers are chosen by the user
  const [checkboxItems, setCheckboxItems] = useState(["3450", "3520", "3400"])
  //useState to keep track of what checkboxes are checked
  const [checkedItems, setCheckedItems] = useState(checkboxItems.map(() => false));

  //onClick function for handling the changes in the checkbox
  const handleCheckboxClick = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  //useState to keep track of what datasets are currently in use based on which checkboxes are checked,
  //should also be refactored in the future when access to the db is given.
  const [currentDataset, setCurrentDataset] = useState([])
  const datasetsRef = useRef({
    dataset1: MarketReportData,
    dataset2: MarketReportData2,
    dataset3: MarketReportData3
  })

  //useEffect to concat chosen datasets together before they are then merged later
  useEffect(() => {
    let newCurrentDataset = [];
    //Loops over whatever is in the checkedItems useState,
    //and for each that is set to true,
    //they shall be concatted together
    for (let i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i]) {
        const datasetKey = `dataset${i + 1}`;
        newCurrentDataset = newCurrentDataset.concat(datasetsRef.current[datasetKey]);
      }
    }
    //Sets our currentDataset useState to the new concatted dataset
    setCurrentDataset((prevCurrentDataset) => {
      if (JSON.stringify(prevCurrentDataset) !== JSON.stringify(newCurrentDataset)) {
        return newCurrentDataset;
      }
      return prevCurrentDataset;
    });
  }, [checkedItems]);

  //useState for tracking whether or not the div holding the table is hidden or not
  const [isDivHidden, setIsDivHidden] = useState(false);

  //Our mergeRowsByRealtor is used to then merge the newly concatted dataset so that we don't have any duplicates
  const mergedDataSet = mergeRowsByRealtor(currentDataset)

  // Calculate the totalHousesForSale outside of the columns definition
  const totalHousesForSale = useMemo(() => {
    return _.sum(_.map(mergedDataSet, (d) => d.housesForSale));
  }, [mergedDataSet]);

  //Memoizing of the table data and columns
  const tableData = useMemo(() => mergedDataSet, [mergedDataSet]);
  const tableColumns = useMemo(() => generateColumns({ mergedDataSet: mergedDataSet, totalHousesForSale }), [mergedDataSet, totalHousesForSale]);

  return (
    <div className="MarketReport_Content_Grid-container">

      <div className="ChoiceDiv">
        <fieldset>
          <legend>Select Postal Number(s)</legend>

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
          ChartData={transformDataForScatterChart(mergedDataSet)}
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
