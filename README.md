# open-classrooms-p14-data-table-library

## 1. About
- This is a React component to display data in the form of a table.
- [Link to published NPM library](https://www.npmjs.com/package/open-classrooms-p14-data-table-library)

## 2. Functionalities
- Selectable number of entries shown per page.
- Search functionality to display only data matching your search.
- Sort every column in ascending or descending order (works with dates and numbers too)
- Multiple page table
- Fully customisable CSS file included

## 3. Install
``` npm install open-classrooms-p14-data-table-library ```

## 4. Use case
Further explanation in section 5.
``` 
import { DataTable } from "open-classrooms-p14-data-table-library";
import "open-classrooms-p14-data-table-library/dist/index.css";

export default function EmployeeList(){

    const data = [
        {
            name: "John Doe",
            dateStarted: "04/17/2015",
            age: 28
        },
        {
            name: "Tony Stark",
            dateStarted: "06/24/2018",
            age: 37
        }
    ]

    const tableHeaders = [
        {
            header: "Name",
            dataKey: "name"
        }
        {
            header: "Date Started",
            dataKey: "dateStarted",
            isDate: true
        }
        {
            header: "Age",
            dataKey: "age"
        }
    ]

    const entriesPerPage = [5,10,25,50,100]

    return(
        <DataTable data={data} tableHeaders={tableHeaders} entriesPerPage={entriesPerPage} />
    )
}
```

## 5. Properties
``NOTE:`` All 3 properties are compulsory for the table to work properly

### 5.1 {data}
- An `Array` of `Objects` where each object represents a row on the table.
- The objects doesn't need to be organised and trimmed down since the table will be generated using the [tableHeaders] array instead.
- That said keep in mind that less unused data sent to the table means faster table rendering.

### 5.2 {tableHeaders}
- An `Array` of `Objects` where each object represents the header for each collumn.
- This array must be in the `order` in which you desire the collumns to be generated.
- Make sure that the values of `dataKey` is identical to the keys of {data}.
- For `dates` to be sorted correctly: Add `isDate: true` .
- Dates should be sent in standard American format `mm/dd/yyyy`, also obtained with `exampleDate.toLocaleDateString()` .

### 5.3 {entriesPerPage}
- An `Array` of `Numbers` where each number represents how many rows of data to display per table page.
- This array will customize the "show entries" dropdown.

## 6. Customization
- To customize the appearance simply copy the css code from `open-classrooms-p14-data-table-library/dist/index.css` inside the `node_modules` folder and paste it into your own css file.
- You are now free to change the appearance at will.
- Don't forget to `not` import the integrated css if you wish to use custom css