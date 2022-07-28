import React from "react"
import Dropdown from "react-dropdown"
/*props
    data: Array of objects(employees info)
    tableHeaders: Array of objects(header + dataKey)
    entriesPerPage: Array of Numbers(how many entries to display per table page)
*/

export function DataTable(props){
    let data = props.data

    const [tableData, setTableData] = React.useState(data)
    const [entries, setEntries] = React.useState(props.entriesPerPage[0])

    const [numberOfPages, setNumberOfPages] = React.useState(Math.ceil(data.length/entries))

    //Next step: generate buttons according to "numberOfPages" <--------------

    //Updates the number of entries per table page
    React.useEffect(() => {
        let newTableData = data.slice(0, entries)
        setTableData(newTableData)
        setNumberOfPages(Math.ceil(data.length/entries))
    }, [entries])


    function handlePage(e){
        let currentPage = parseInt(e.target.innerHTML)
        let firstSlice = ((currentPage*entries)-entries)
        let secondSlice = (firstSlice+entries)
        let newTableData = data.slice(firstSlice, secondSlice)
        setTableData(newTableData)
    }
    

    /*React.useEffect(() => {
        if(!ascending){
            data.sort((a,b) => (a.filterValue  < b.lastName) ? 1 : ((b.lastName < a.lastName) ? -1 : 0))
        }else{
            data.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))
        }
    }, [ascending])*/
    

    //map over each employee and map over each value to create employee data rows
    const table = tableData.map((employee, index) => (
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
        <th key={index} className="table__header">{object.header}<button className="table__header-filter">X</button></th>
        
    ))

    return(
        <section>
            <section className="dropdown__container">
                <p>Show</p>
                <Dropdown options={props.entriesPerPage} placeholder={props.entriesPerPage[0]} onChange={e => setEntries(e.value)}/>
                <p>entries</p>
            </section>
            
            <table className="table">
                <tr className="table__header-row">
                    {tableHeaders}
                </tr>
                {table}
            </table>
            <button onClick={e=>handlePage(e)}>1</button>
            <button onClick={e=>handlePage(e)}>2</button>
            <button onClick={e=>handlePage(e)}>3</button>
        </section>
    )
}