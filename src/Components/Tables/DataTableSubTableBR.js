import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table"

function SubTable({ subTableData, subTableColumns, subTableCategory, subTableHeaderRef }) {
    const columns = useMemo(() => subTableColumns, [subTableColumns])
    const data = useMemo(() => subTableData, [subTableData])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable (
        {
            columns,
            data,
        },
        useSortBy
    )

    // Short method for making sure that the footer in the table gets the right alternating color
    const isEvenRows = rows.length % 2 === 0;

    return (
        <table {...getTableProps()} className="Subtable">
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="sub-table-header-hidden">
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="sub-table-header"
                            ref={(el) => (subTableHeaderRef[index] = el)} // Assign the ref based on index
                            >   
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
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