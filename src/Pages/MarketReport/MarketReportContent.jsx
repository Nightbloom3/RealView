import { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table"
import { MarketReportData } from "./Data/MarketReportData";
import { columns } from "./Data/Columns";
import ScatterChart from "../../Charts/ScatterChart";
import { Chart as ChartJS } from "chart.js/auto";


export default function MarketReportContent() {

    const ChartStylingWidth = 800; // Set your desired width
    const ChartStylingHeight = 400; // Set your desired height

    const randomColor = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
            colors.push(color)
        }
        return colors;
      };

    const numberOfDataPoints = MarketReportData.length;

    const [scatterChartData, setScatterChartData] = useState({
        labels: MarketReportData.map((data) => data.realtor),
        datasets: [
            {
                label: "Average Time Listed / Average Price per M²",
                data: MarketReportData.map((data) => ({
                    x: data.avgTimeListedInDays,
                    y: data.avgPricePerM2,
                  })
                  ),
                  backgroundColor: randomColor(numberOfDataPoints)
                }
              ]
            });

    const [isDivHidden, setIsDivHidden] = useState(false);

    const tableData = useMemo(() => MarketReportData, []);
    const tableColumns = useMemo(() => columns, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable({
        columns: tableColumns,
        data: tableData
    },
        useSortBy)

    const isEvenRows = rows.length % 2 === 0;

    return (
        <div className="MarketReport_Content_Grid-container">
            <div className="ChartDiv">
                <ScatterChart
                ChartData={scatterChartData}
                width={ChartStylingWidth}
                height={ChartStylingHeight}
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
                                {
                                    allColumns.map(column => (
                                        <div key={column.id}>
                                            <label>
                                                <input type="checkbox" {...column.getToggleHiddenProps()} />
                                                {column.Header}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <table {...getTableProps()}>
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps({ title: undefined}))}>
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            {cell.column.id === "realtor" ? (
                                                                <div title={cell.row.original.infoBlurb}>{cell.render("Cell")}</div>
                                                            ) : (
                                                                cell.render("Cell") /* Note the capitalized C, its quite important otherwise you'll enjoy plenty of rendering issues*/
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot style={{backgroundColor: isEvenRows ? "#483d8b" : "#2f4f4f"}}>
                                    {footerGroups.map(footerGroup => (
                                        <tr {...footerGroup.getFooterGroupProps()}>
                                            {footerGroup.headers.map(column => (
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
    )
}