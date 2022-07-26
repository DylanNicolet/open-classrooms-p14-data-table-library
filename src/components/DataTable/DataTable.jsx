export function DataTable(props){

    //map over each employee and map over each value to create employee data rows
    const table = props.data.map((employee, index) => (
        <tr key={index} className="table__data-row">
            {Object.values(employee).map((value, index) => {
                return(
                    <td key={index} className="table__data-value">{value}</td>
                )
            })}
        </tr>
    ))

    //map over header array to generate table headers
    const tableHeaders = props.tableHeaders.map(header => (
        <th key={header} className="table__header">{header}</th>
    ))

    return(
        <table className="table">
            <tr className="table__header-row">
               {tableHeaders}
            </tr>
            {table}
        </table>
    )
}