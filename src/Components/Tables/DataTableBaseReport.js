import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

function DataTableBaseReport({tableData, tableColumns, tableCategory}) {
    const columns = useMemo(() => tableColumns, [tableColumns]);
    const data = useMemo(() => tableData, [tableData])

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
        columns,
        data,
        },
        useSortBy
    )

    // Short method for making sure that the footer in the table gets the right alternating color
    const isEvenRows = rows.length % 2 === 0;

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th>
                            {tableCategory}
                        </th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot style={{
                    backgroundColor: isEvenRows ? "#d9e2ea" : "#ecf0f5",
                }}>
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
    )
}

export default DataTableBaseReport;