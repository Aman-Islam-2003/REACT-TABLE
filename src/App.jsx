import React from 'react'
import { data } from './assets/constants'
import { useTable, useSortBy, usePagination } from 'react-table'

const columns = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Salary",
    accessor: "salary"
  },
]
const App = () => {

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage, canPreviousPage, canNextPage, state: {pageIndex}, pageCount, gotoPage } = useTable({
    columns,
    data,
    initialState: {pageSize:5}
  },
  useSortBy,
  usePagination,
)

  const props = getTableProps();
  console.log(headerGroups)
  return (
    <div>
      <table {...props}>
        <thead>
         {
           headerGroups.map((hg)=>(
            <tr {...hg.getHeaderGroupProps()}>
                 {
                  hg.headers.map((header)=>(
                    <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                      {
                        header.render("Header")
                      }
                      {
                        header.isSorted && <span>{header.isSortedDesc? "🔽 ":"🔼"}</span>
                      }
                    </th>
                  ))
                 }
            </tr>
           ))
         }



        </thead>
        <tbody {...getTableBodyProps()}>

     {
      page.map((row)=>{
        prepareRow(row);

        return <tr {...row.getRowProps()}>
           {
            row.cells.map((cell)=>(
              <td {...cell.getCellProps()}>
                {
                  cell.render("Cell")
                }
              </td>
            ))
           }
        </tr>
      })
     }

        </tbody>

      </table>

      <div>
        <button onClick={()=>gotoPage(0)}>FirstPage</button>
      <button  disabled={!canPreviousPage} onClick={previousPage}>Previouspage</button>
      <span>{pageIndex+1} of {pageCount}</span>
        <button  disabled={!canNextPage} onClick={nextPage}>Nextpage</button> 
        <button onClick={()=>gotoPage(pageCount-1)}>LastPage</button> 
      </div>

    </div>
  )
}

export default App
