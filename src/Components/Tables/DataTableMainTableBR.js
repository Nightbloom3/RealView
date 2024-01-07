import React, { useMemo } from "react";
import { useTable } from "react-table";

function MainTable({tableHeaders, subTables, subTableHeaderRefs}) {

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

  /*const [sorting, setSorting] = useState({
    attribute: null,
    order: null,
  })*/

  /*const handleSorting = (column, index) => {
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
  
    // Check if the ref at the specified index exists and click it
    if (subTableHeaderRefs[index] && subTableHeaderRefs[index].current) {
      subTableHeaderRefs[index].current.click();
    }
  };*/


  /*const getSortIcon = (column) => {
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
  };*/

  return (
    <table {...getTableProps()} className="BaseReportTable">
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                        <th {...column.getHeaderProps()} key={index} className="main-table-header">
                          <div>
                            {column.render("Header")}
                            {/*getSortIcon(column)*/}
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
                      <br/>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default MainTable;