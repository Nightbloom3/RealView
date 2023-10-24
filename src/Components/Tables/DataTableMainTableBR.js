import React, {useMemo, useState, useCallback, useRef} from "react";
import { useTable } from "react-table";

function MainTable({tableHeaders, subTables}) {
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

  const subTableRefs = useRef([]);

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

    // Trigger click on the corresponding subtable header
    subTableRefs.current.forEach((subTableRef) => {
      if (subTableRef.current && subTableRef.current.getColumnId() === column.id) {
        subTableRef.current.triggerHeaderClick();
      }
    });
  }, [sorting]);


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
                        <th {...column.getHeaderProps()}>
                          <div onClick={() => handleSorting(column)}>
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
                        {React.cloneElement(subTable, {
                          sorting,
                          handleSorting,
                          ref: (el) => (subTableRefs.current[index] = el),
                        })}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default MainTable;