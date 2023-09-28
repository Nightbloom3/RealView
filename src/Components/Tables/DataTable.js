import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

function DataTable({ tableData, tableColumns }) {
    const columns = useMemo(() => tableColumns, [tableColumns]);
    const data = useMemo(() => tableData, [tableData]);

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
            columns,
            data,
        },
        useSortBy
    );

    // Short method for making sure that the footer in the table gets the right alternating color
    const isEvenRows = rows.length % 2 === 0;

    return (
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
            <div>
                <table {...getTableProps()} className="MarketReportTable">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps({ title: undefined })
                                        )}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' ↓'
                                                    : ' ↑'
                                                : ''}
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
                                                {cell.column.id === 'realtor' ? (
                                                    <div title={cell.row.original.infoBlurb}>
                                                        {cell.render('Cell')}
                                                    </div>
                                                ) : (
                                                    cell.render('Cell')
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
                            backgroundColor: isEvenRows ? '#d9e2ea' : '#ecf0f5',
                        }}
                    >
                        {footerGroups.map((footerGroup) => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map((column) => (
                                    <td {...column.getFooterProps()}>
                                        {column.render('Footer')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default DataTable;