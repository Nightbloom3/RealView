import { useEffect, useMemo, useRef, useState } from "react";
import { MarketReportData } from "./Data/MarketReportData";
import { MarketReportData2 } from "./Data/MarketReportData2";
import { generateColumns } from "./Data/Columns";
import ScatterChart from "../../Components/Charts/ScatterChart";
import DataTable from "../../Components/Tables/DataTable";
import "chart.js/auto";
import _ from "lodash";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

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

  function percentageCalc (percentage, whole) {
    return ((percentage / 100) * whole);
  }

  const mergeRowsByRealtor = (dataset) => {
    const mergedData = [];
    const realtorDictionary = {};
  
    dataset.forEach((row) => {
      const realtor = row.realtor;
  
      if (realtorDictionary[realtor]) {
        const mergedRow = realtorDictionary[realtor];

        //logic block for calculating the new percentage of houses that have their price reduced,
        //has to take place before the new sum of houses are calculated otherwise it will mess with the formular
        const currentRow = Math.round(percentageCalc(mergedRow.priceReducedHousePercentage, mergedRow.housesForSale))
        const mergingRow = Math.round(percentageCalc(row.priceReducedHousePercentage, row.housesForSale))
        const mergingHousesForSale = (mergedRow.housesForSale + row.housesForSale)
        const mergedPercentage = parseFloat((((currentRow + mergingRow) / mergingHousesForSale) * 100).toFixed(2))

        mergedRow.housesForSale += row.housesForSale;
        mergedRow.avgPricePerM2 = (mergedRow.avgPricePerM2 + row.avgPricePerM2) / 2;
        mergedRow.avgSizeInM2 = (mergedRow.avgSizeInM2 + row.avgSizeInM2) / 2;
        mergedRow.avgTimeListedInDays = (mergedRow.avgTimeListedInDays + row.avgTimeListedInDays) / 2;

        mergedRow.priceReducedHousePercentage = mergedPercentage



        if (mergedRow.avgPercentagePriceReduction === 0 || row.avgPercentagePriceReduction === 0) {
          mergedRow.avgPercentagePriceReduction += row.avgPercentagePriceReduction;
        } else if (mergedRow.avgPercentagePriceReduction > 0 && row.avgPercentagePriceReduction > 0) {
          mergedRow.avgPercentagePriceReduction = (mergedRow.avgPercentagePriceReduction + row.avgPercentagePriceReduction) / 2;
        }
  
        mergedRow.infoBlurb = row.infoBlurb;
  
      } else {
        const newRow = { ...row };
        realtorDictionary[realtor] = newRow;
      }
    });
  
    // Push merged rows into the mergedData array
    for (const realtor in realtorDictionary) {
      mergedData.push(realtorDictionary[realtor]);
    }
  
    return mergedData;
  };

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
