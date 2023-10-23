import React, {useMemo} from "react";
import { useTable } from "react-table";

function MainTable({tableHeaders, subTables}) {
  const columns = useMemo(() => {
    return tableHeaders.map((header) => ({
      Header: header,
    }));
  }, [tableHeaders]);

  const {
    getTableProps,
    headerGroups
  } = useTable({
    columns,
    data: []
  });

  return (
    <table {...getTableProps()} className="BaseReportTable">
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
        <tbody>
            {subTables.map((subTable, index) => (
                <tr key={index}>
                    <td colSpan={tableHeaders.length}>
                        {subTable}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default MainTable;