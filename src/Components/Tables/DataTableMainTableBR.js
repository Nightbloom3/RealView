import React, {useMemo, useState, useCallback} from "react";
import { useTable } from "react-table";

function MainTable({tableHeaders, subTables, mainTableHeaderRef}) {
  const columns = useMemo(() => {
    return tableHeaders.map((header) => ({
      Header: header.label,
      id: header.id,
    }));
  }, [tableHeaders]);

  const {
    getTableProps,
    headerGroups
  } = useTable({
    columns,
    data: []
  });

  const [sorting, setSorting] = useState({
    attribute: null,
    order: null,
  })

  const handleSorting = useCallback((column) => {
    if (sorting.attribute === column.id) {
      if (sorting.order === "asc") {
        setSorting({
          attribute: column.id,
          order: "desc",
        });
      } else if (sorting.order === "desc") {
        setSorting({
          attribute: column.id,
          order: null,
        });
      } else {
        setSorting({
          attribute: column.id,
          order: "asc",
        });
      }
    } else {
      setSorting({ attribute: column.id, order: "asc" });
    }

    if (mainTableHeaderRef.current) {
      mainTableHeaderRef.current.click();
    }
  }, [sorting, mainTableHeaderRef]);


  const getSortIcon = (column) => {
    if (sorting.attribute === column.id) {
      if (sorting.order === 'asc') {
        return '↑';
      } else if (sorting.order === 'desc') {
        return '↓';
      } else {
        return '';
      }
    }
    return '';
  };

  return (
    <table {...getTableProps()} className="BaseReportTable">
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} className="main-table-header">
                          <div 
                          onClick={() => handleSorting(column)}
                          ref={mainTableHeaderRef} 
                          >
                            {column.render("Header")}
                            {getSortIcon(column)}
                          </div>
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