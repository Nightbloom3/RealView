import { useEffect, useMemo, useRef, useState } from "react";
import { MarketReportData } from "./Data/MarketReportData";
import { MarketReportData2 } from "./Data/MarketReportData2";
import { generateColumns } from "./Data/Columns";
import ScatterChart from "../../Components/Charts/ScatterChart";
import DataTable from "../../Components/Tables/DataTable";
import "chart.js/auto";
import _ from "lodash";

//Short function to generate a random colour for every plot in the scatterplot
function generateRandomColor(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(color);
  }
  return colors;
};

//Short function to calculate the whole number of houses that have had their price reduced,
//based on an existing number of houses and a percentage of those houses having had their price reduced
function percentageCalc (percentage, whole) {
  return ((percentage / 100) * whole);
}

//function to merge multiple datasets on the realtor,
//this is so that we do not have multiple instances of
//same realtor when looking at multiple datasets at once
function mergeRowsByRealtor(dataset) {
  //Initialization of array to keep the merged dataset
  const mergedData = [];
  //Initialization of empty object to use as a dictionary,
  //so that we can compare each realtor passed through for whether or not it already exists
  const realtorDictionary = {};

  //The function should be receiving a concatted list of datasets
  dataset.forEach((row) => {
    const realtor = row.realtor;

    //if the realtor already exist combine the values from the existing entry
    //and the realtor that it is just now passing over
    if (realtorDictionary[realtor]) {
      const mergedRow = realtorDictionary[realtor];

      //logic block for calculating the new percentage of houses that have their price reduced,
      //has to take place before the new sum of houses are calculated otherwise it will mess with the formular
      const currentRow = Math.round(percentageCalc(mergedRow.priceReducedHousePercentage, mergedRow.housesForSale))
      const mergingRow = Math.round(percentageCalc(row.priceReducedHousePercentage, row.housesForSale))
      const mergingHousesForSale = (mergedRow.housesForSale + row.housesForSale)
      const mergedPercentage = parseFloat((((currentRow + mergingRow) / mergingHousesForSale) * 100).toFixed(2))

      //The first few values of the new combined entry are simply either added together
      //or a new average is taken based on the 2 given values
      mergedRow.housesForSale += row.housesForSale;
      mergedRow.avgPricePerM2 = (mergedRow.avgPricePerM2 + row.avgPricePerM2) / 2;
      mergedRow.avgSizeInM2 = (mergedRow.avgSizeInM2 + row.avgSizeInM2) / 2;
      mergedRow.avgTimeListedInDays = (mergedRow.avgTimeListedInDays + row.avgTimeListedInDays) / 2;
      //The priceReducedHousePercentage is set to the result of the above logic, just to make it look a bit more clean
      mergedRow.priceReducedHousePercentage = mergedPercentage

      //Now for the avgPercentagePriceReduction, we come a situation where one of two things has to happen,
      //If one of the two values from either the existing entry or the realtor its pasing over amounts to zero,
      //then the existing non-zero value shall simply be added to the zero value, the reason for that is of course
      //that the value here represents the average price reduction on houses that have had their price reduced,
      //and as such, the addition of more data to the list should not change this value unless it is a non-zero value.
      //as for the other scenario, it is a simple case of taking the average of the two non-zero values
      if (mergedRow.avgPercentagePriceReduction === 0 || row.avgPercentagePriceReduction === 0) {
        mergedRow.avgPercentagePriceReduction += row.avgPercentagePriceReduction;
      } 
      else if (mergedRow.avgPercentagePriceReduction > 0 && row.avgPercentagePriceReduction > 0) {
        mergedRow.avgPercentagePriceReduction = (mergedRow.avgPercentagePriceReduction + row.avgPercentagePriceReduction) / 2;
      }

      //The infoBlurb is set to the newest infoBlurb,
      //this shouldn't really change anything as the values should be the same either way
      mergedRow.infoBlurb = row.infoBlurb;

      //of course if the realtor is not found in the dictionary, then it is added to it as a new entry
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
        backgroundColor: generateRandomColor(dataset.length),
        pointRadius: 4,
      },
    ],
  };
}

//Main function itself
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

  //Set function should be used in the future to hold whatever postal numbers are chosen by the user
  const [checkboxItems, setCheckboxItems] = useState("3450", "3520")
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
