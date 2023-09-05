import { useMemo } from "react";
import { useTable, useSortBy } from "react-table"
import { MarketReportData } from "./Data/MarketReportData";
import { columns } from "./Data/Columns";
import { CheckBox } from "./Data/CheckBox";

export default function MarketReportContent() {

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

    return (
        <div className="MarketReport_Content_Grid-container">
            <div className="ChartDiv">

            </div>

            <div className="FormDiv">
                <>
                <div className="CheckBoxDiv">
                    <div>
                        <label>
                            <CheckBox {...getToggleHideAllColumnsProps()} name="Show/Hide Table" />
                            Show/Hide Table
                        </label>
                    </div>
                    {
                        allColumns.map(column => (
                            <div key={column.id}>
                                <label>
                                    <input type="checkbox" {...column.getToggleHiddenProps()}/>
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
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                                                {cell.render("Cell")} {/* Note the capitalized C, its quite important otherwise you'll enjoy plenty of rendering issues*/}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
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
                </>
            </div>
        </div>
    )
}