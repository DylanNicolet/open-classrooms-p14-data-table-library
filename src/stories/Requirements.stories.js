import React from "react";
import { storiesOf } from "@storybook/react";
import "../styles.css";

import { DataTable } from "../components/DataTable";

const stories = storiesOf("App Test", module)

stories.add("App", () => {

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
    ]

    const data = [
        {
            firstName: "Amanda",
            lastName: "Mama",
            department: "Denmark"
        },
        {
            firstName: "Bryan",
            lastName: "Nyygern",
            department: "England"
        },
        {
            firstName: "Charlie",
            lastName: "Oboubou",
            department: "Finland"
        }
    ]

    return(
        <DataTable tableHeaders={tableHeaders} data={data}/>
    )
})