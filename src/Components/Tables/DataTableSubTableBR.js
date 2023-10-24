import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSortBy, useTable } from "react-table"

function SubTable({ subTableData, subTableColumns, subTableCategory, sorting, handleSorting}) {
    const columns = useMemo(() => subTableColumns, [subTableColumns])
    const data = useMemo(() => subTableData, [subTableData])
    const columnRefs = useRef([]);

    const [sortedData, setSortedData] = useState(subTableData);

    const {attribute, order} = sorting

    useEffect(() => {
        //setSortedData(sortData(subTableData, attribute, order))
        columnRefs.current = columns.map(() => React.createRef());
      },[columns] /*[subTableData, attribute, order]*/)

    /*const sortData = (data, attribute, order) => {
        if (attribute && order) {
          return data.sort((a, b) => {
            if (order === "asc") {
              return a[attribute] - b[attribute];
            } else {
              return b[attribute] - a[attribute];
            }
          });
        }
        return data;
      }*/

    const getColumnId = () => {
        return sorting.attribute;
    };

    const triggerHeaderClick = () => {
        const columnIndex = columns.findIndex((col) => col.id === getColumnId());
        if (columnIndex >= 0 && columnRefs.current[columnIndex].current) {
          columnRefs.current[columnIndex].current.click();
        }
      };

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
                    <tr {...headerGroup.getHeaderGroupProps()} className="hidden-headers">
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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

export default React.forwardRef(SubTable);