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
    const [showing, setShowing] = React.useState([1,entries])

    //Generate number of page buttons according to "numberOfPages"
    const buttons = [...Array(numberOfPages)].map((page, index) => (
        <button key={index} onClick={e=>handlePage(e)} className="number-of-pages__button">{index + 1}</button>
    ))

    //Updates the number of entries per table page
    React.useEffect(() => {
        let newTableData = data.slice(0, entries)
        setTableData(newTableData)
        setNumberOfPages(Math.ceil(data.length/entries))
        let limit = entries
        if(limit > data.length){
            limit = data.length
        }
        setShowing([1,limit])
    }, [entries])


    function handlePage(e){
        let currentPage = parseInt(e.target.innerHTML)
        let firstSlice = ((currentPage*entries)-entries)
        let secondSlice = (firstSlice+entries)
        let newTableData = data.slice(firstSlice, secondSlice)
        setTableData(newTableData)
        let lowerLimit = firstSlice
        if(lowerLimit === 0){
            lowerLimit = 1
        }
        let limit = secondSlice
        if(limit > data.length){
            limit = data.length
        }
        setShowing([lowerLimit, limit])
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
        <section className="component-container">
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
            <section className="table-footer">
                <p>Showing {showing[0]} to {showing[1]} of {data.length} entries</p>
                <section>
                    {buttons}
                </section>
            </section>
            
        </section>
    )
}