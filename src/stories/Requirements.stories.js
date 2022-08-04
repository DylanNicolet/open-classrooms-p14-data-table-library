import React from "react";
import { storiesOf } from "@storybook/react";
import "../styles.css";

import { DataTable } from "../components/DataTable";

const stories = storiesOf("App Test", module)

stories.add("App", () => {

    const entriesPerPage = [
        5,10,25,50,100
    ]

    const tableHeaders = [
        {
            header: "First Name",
            dataKey: "firstName"
        },
        {
            header: "Last Name",
            dataKey: "lastName"
        },
        {
            header: "Department",
            dataKey: "department"
        },
        {
            header: "Date",
            dataKey: "date",
            isDate: true
        },
        {
            header: "Age",
            dataKey: "age"
        }
    ]

    const data = [
        {
            firstName: "Amanda",
            lastName: "Mango",
            department: "Denmark",
            date: "7/02/2021",
            age: 37,
        },
        {
            firstName: "Bryan",
            lastName: "Nyygern",
            department: "England",
            date: "6/03/2022",
            age: 45
        },
        {
            firstName: "Charlie",
            lastName: "Oboubou",
            department: "Finland",
            date: "7/04/2022",
            age: 46
        },
        {
            firstName: "David",
            lastName: "Pastor",
            department: "Germany",
            date: "7/05/2022",
            age: 52
        },
        {
            firstName: "Eric",
            lastName: "Qualy",
            department: "Holland",
            date: "8/06/2019",
            age: 63
        },
        {
            firstName: "Fanny",
            lastName: "Rampam",
            department: "Iceland",
            date: "7/07/2019",
            age: 70
        },
    ]

    return(
        <DataTable tableHeaders={tableHeaders} data={data} entriesPerPage={entriesPerPage}/>
    )
})