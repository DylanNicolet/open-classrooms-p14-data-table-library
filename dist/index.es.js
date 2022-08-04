import React from 'react';

/*props
    data: Array of objects(employees info)
    tableHeaders: Array of objects(header + dataKey)
    entriesPerPage: Array of Numbers(how many entries to display per table page)
*/

function DataTable(props) {
  //States
  let data = props.data;
  const [reOrderedData, setReOrderedData] = React.useState(data);
  const [tableData, setTableData] = React.useState(reOrderedData);
  const [entries, setEntries] = React.useState(props.entriesPerPage[0]);
  const [numberOfPages, setNumberOfPages] = React.useState(Math.ceil(reOrderedData.length / entries));
  const [showing, setShowing] = React.useState([1, entries]);
  const [ascending, setAscending] = React.useState([false, ""]);
  const [searchInput, setSearchInput] = React.useState(""); //map over each object in the data array and generate the table according to props.tableHeaders

  const table = tableData.map((employee, index) => /*#__PURE__*/React.createElement("tr", {
    key: index,
    className: "table__data-row"
  }, props.tableHeaders.map((header, index) => {
    return /*#__PURE__*/React.createElement("td", {
      key: index,
      className: "table__data-value"
    }, employee[header.dataKey]);
  }))); //Saved chuck just in case

  /*map over each employee and map over each value to create employee data rows
  const table = tableData.map((employee, index) => (
      <tr key={index} className="table__data-row">
          {Object.values(employee).map((value, index) => {
              return(
                  <td key={index} className="table__data-value">{value}</td>
              )
          })}
      </tr>
  ))*/
  //Filter the table according to search input

  React.useEffect(() => {
    const lowerCaseSearchInput = searchInput.toLowerCase().trim();

    if (!lowerCaseSearchInput) {
      setReOrderedData(data);
    } else {
      let filteredData = data.filter(employee => {
        return Object.keys(employee).some(key => {
          return employee[key].toString().toLowerCase().includes(lowerCaseSearchInput);
        });
      });
      setReOrderedData(filteredData);
    }
  }, [searchInput]); //Generate number of page buttons according to "numberOfPages"

  const buttons = [...Array(numberOfPages)].map((page, index) => /*#__PURE__*/React.createElement("button", {
    key: index,
    onClick: e => handlePage(e),
    className: "number-of-pages__button"
  }, index + 1)); //Updates the number of entries per table page

  React.useEffect(() => {
    let newTableData = reOrderedData.slice(0, entries);
    setTableData(newTableData);
    setNumberOfPages(Math.ceil(reOrderedData.length / entries));
    let limit = entries;

    if (limit > reOrderedData.length) {
      limit = reOrderedData.length;
    }

    setShowing([1, limit]);
  }, [entries, reOrderedData]); //re-render table according to selected page

  function handlePage(e) {
    let currentPage = parseInt(e.target.innerHTML);
    let firstSlice = currentPage * entries - entries;
    let secondSlice = firstSlice + entries;
    let newTableData = reOrderedData.slice(firstSlice, secondSlice);
    setTableData(newTableData);
    let lowerLimit = firstSlice;

    if (lowerLimit === 0) {
      lowerLimit = 1;
    }

    let limit = secondSlice;

    if (limit > reOrderedData.length) {
      limit = reOrderedData.length;
    }

    setShowing([lowerLimit, limit]);
  } //Custom sorting function for handleReOrder below


  function ascendingSort(dataKey, isDate) {
    let sortOrder = 1; //For negative numbers

    if (dataKey[0] === "-") {
      sortOrder = -1;
      dataKey = dataKey.substr(1);
    }

    return function (a, b) {
      let result = 0;

      if (isDate) {
        result = new Date(a[dataKey]) < new Date(b[dataKey]) ? -1 : new Date(a[dataKey]) > new Date(b[dataKey]) ? 1 : 0;
      } else {
        result = a[dataKey] < b[dataKey] ? -1 : a[dataKey] > b[dataKey] ? 1 : 0;
      }

      return result * sortOrder;
    };
  }

  function descendingSort(dataKey, isDate) {
    let sortOrder = 1; //For negative numbers

    if (dataKey[0] === "-") {
      sortOrder = -1;
      dataKey = dataKey.substr(1);
    }

    return function (a, b) {
      let result = 0;

      if (isDate) {
        result = new Date(a[dataKey]) > new Date(b[dataKey]) ? -1 : new Date(a[dataKey]) < new Date(b[dataKey]) ? 1 : 0;
      } else {
        result = a[dataKey] > b[dataKey] ? -1 : a[dataKey] < b[dataKey] ? 1 : 0;
      }

      return result * sortOrder;
    };
  } //Re Order the data according to which reorder button was pressed


  function handleReOrder(dataKey, isDate) {
    if (ascending[0] && ascending[1] === dataKey) {
      let sortData = [...reOrderedData];
      let newData = sortData.sort(descendingSort(dataKey, isDate));
      setReOrderedData(newData);
      setAscending([false, dataKey]);
    } else {
      let sortData = [...reOrderedData];
      let newData = sortData.sort(ascendingSort(dataKey, isDate));
      setReOrderedData(newData);
      setAscending([true, dataKey]);
    }
  } //map over header array to generate table headers


  const tableHeaders = props.tableHeaders.map((object, index) => /*#__PURE__*/React.createElement("th", {
    key: index,
    className: "table__header"
  }, object.header, /*#__PURE__*/React.createElement("button", {
    className: "table__header-filter",
    onClick: () => handleReOrder(object.dataKey, object.isDate)
  }, "\u296E"))); //map over props.entriesPerPage to generate dropdown options

  const options = props.entriesPerPage.map((entries, index) => /*#__PURE__*/React.createElement("option", {
    key: index,
    value: entries
  }, entries));
  return /*#__PURE__*/React.createElement("section", {
    className: "component-container"
  }, /*#__PURE__*/React.createElement("section", {
    className: "dropdown-with-search"
  }, /*#__PURE__*/React.createElement("section", {
    className: "dropdown__container"
  }, /*#__PURE__*/React.createElement("p", null, "Show"), /*#__PURE__*/React.createElement("select", {
    name: "entries",
    id: "entries-select",
    onChange: e => setEntries(e.target.value)
  }, options), /*#__PURE__*/React.createElement("p", null, "entries")), /*#__PURE__*/React.createElement("section", {
    className: "search__container"
  }, /*#__PURE__*/React.createElement("p", null, "Search:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: searchInput,
    onChange: e => setSearchInput(e.target.value)
  }))), /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "table__header-row"
  }, tableHeaders)), /*#__PURE__*/React.createElement("tbody", null, table)), /*#__PURE__*/React.createElement("section", {
    className: "table-footer"
  }, tableData.length === 0 ? /*#__PURE__*/React.createElement("p", null, "No data to display") : /*#__PURE__*/React.createElement("p", null, "Showing ", showing[0], " to ", showing[1], " of ", reOrderedData.length, " entries"), /*#__PURE__*/React.createElement("section", null, buttons)));
}

export { DataTable };
