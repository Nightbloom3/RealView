import React, { useMemo } from "react";
import { useTable } from "react-table"

function SubTable({ subTableData, subTableColumns, subTableCategory }) {
    const columns = useMemo(() => subTableColumns, [subTableColumns])
    const data = useMemo(() => subTableData, [subTableData])

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        rows,
        prepareRow,
    } = useTable (
        {
            columns,
            data,
        }
    )

    // Short method for making sure that the footer in the table gets the right alternating color
    const isEvenRows = rows.length % 2 === 0;

    return (
        <table {...getTableProps()} className="Subtable">
            <thead>
                <tr>
                    {subTableCategory && (
                        <th colSpan={columns.length} className="SubtableHeader">
                           {subTableCategory} 
                        </th>
                    )}
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
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
                backgroundColor: isEvenRows ? "#ecf0f5" : "#d9e2ea",
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
    )
}

export default SubTable;