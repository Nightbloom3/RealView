import { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { MarketReportData } from "./Data/MarketReportData";
import { columns } from "./Data/Columns";
import ScatterChart from "../../Charts/ScatterChart";
import { Chart as ChartJS } from "chart.js/auto";

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
  const numberOfDataPoints = MarketReportData.length;

  //Setting up data for chart, will need to make use of the set method and a useEffect once there is access to the DB
  const [scatterChartData, setScatterChartData] = useState({
    labels: MarketReportData.map((data) => data.realtor),
    datasets: [
      {
        label: "Average Time Listed / Average Price per M²",
        data: MarketReportData.map((data) => ({
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
  const tableData = useMemo(() => MarketReportData, []);
  const tableColumns = useMemo(() => columns, []);

  //React Table setup with deconstruction and the approriate method needed for this setup
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
    },
    useSortBy
  );

  //Short method for making sure that the footer in the table gets the right alternating colour
  const isEvenRows = rows.length % 2 === 0;

  return (
    <div className="MarketReport_Content_Grid-container">
      <div className="ChartDiv">
        <ScatterChart
          ChartData={scatterChartData}
          width={ChartStylingWidth}
          height={ChartStylingHeight}
          StylingOptions={scatterChartStyling}
        />
      </div>

      <div className="FormDiv">
        <>
          <div>
            <button onClick={() => setIsDivHidden(!isDivHidden)}>
              Show/Hide Table
            </button>
          </div>
          {isDivHidden ? null : (
            <div>
              <div className="CheckBoxDiv">
                {allColumns.map((column) => (
                  <div key={column.id}>
                    <label>
                      <input
                        type="checkbox"
                        {...column.getToggleHiddenProps()}
                      />
                      {column.Header}
                    </label>
                  </div>
                ))}
              </div>
              <table className="MarketReportTable" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps({ title: undefined })
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ↓"
                                : " ↑"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.column.id === "realtor" ? (
                                <div title={cell.row.original.infoBlurb}>
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render(
                                  "Cell"
                                ) /* Note the capitalized C, its quite important otherwise you'll enjoy plenty of rendering issues*/
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot
                  style={{
                    backgroundColor: isEvenRows ? "#483d8b" : "#2f4f4f",
                  }}
                >
                  {footerGroups.map((footerGroup) => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                      {footerGroup.headers.map((column) => (
                        <td {...column.getFooterProps()}>
                          {column.render("Footer")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
