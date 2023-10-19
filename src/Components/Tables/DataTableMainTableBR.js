import React from "react";
import { useTable } from "react-table";

function MainTable({headers, subTables}) {
  const columns = useMemo(() => {
    // Define your main table columns using the headers
    return headers.map((header) => ({
      Header: header,
    }));
  }, [headers]);

  const {
    getTableProps,
    headerGroups
  } = useTable({
    columns,
    data: []
  });

  return (
    <table {...getTableProps()} className="MainTable">
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
                    <td>
                        {subTable}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default MainTable;