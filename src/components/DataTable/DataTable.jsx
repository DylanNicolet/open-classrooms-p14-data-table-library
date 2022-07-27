import React from "react"

export function DataTable(props){

    let data = props.data

    const [ascending, setAscending] = React.useState(true)
    const [filterValue, setFilterValue] = React.useState()

    React.useEffect(() => {
        if(!ascending){
            data.sort((a,b) => (a.filterValue < b.filterValue) ? 1 : ((b.filterValue < a.filterValue) ? -1 : 0))
        }/*else{
            data.sort((a,b) => (a.filterValue > b.filterValue) ? 1 : ((b.filterValue > a.filterValue) ? -1 : 0))
        }*/
    }, [ascending])
    

    //map over each employee and map over each value to create employee data rows
    const table = data.map((employee, index) => (
        <tr key={index} className="table__data-row">
            {Object.values(employee).map((value, index) => {
                return(
                    <td key={index} className="table__data-value">{value}</td>
                )
            })}
        </tr>
    ))

    //map over header array to generate table headers
    const tableHeaders = props.tableHeaders.map((object, index) => (
        <th key={index} className="table__header">{object.header}<button className="table__header-filter" onClick={() => {setAscending(prev => !prev); setFilterValue(object.dataKey)}}>X</button></th>
        
    ))

    return(
        <table className="table">
            <h1>{filterValue}</h1>
            <h1>{ascending? "true" : "false"}</h1>
            <tr className="table__header-row">
               {tableHeaders}
            </tr>
            {table}
        </table>
    )
}