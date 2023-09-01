import { useMemo } from "react";
import { useTable } from "react-table"
import { MarketReportData } from "./Data/MarketReportData";
import { COLUMNS } from "./Data/Columns";

export default function MarketReportContent() {

    const tableColumns = useMemo(() => COLUMNS, []);
    const tableData = useMemo(() => MarketReportData, []);

    const tableInstance = useTable({ columns: tableColumns, data: tableData });

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

    return (
        <div className="MarketReport_Content_Grid-container">
            <div className="FormDiv">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
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
                                            {cell.render("Cell")} {/* Note the capitalized C, its quite important otherwise you'll enjoy plenty of rendering issues*/}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            <div className="ChartDiv">

            </div>
        </div>
    )
}