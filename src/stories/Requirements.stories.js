import React from "react";
import { storiesOf } from "@storybook/react";
import "../styles.css";

import { DataTable } from "../components/DataTable";

const stories = storiesOf("App Test", module)

stories.add("App", () => {

    const tableHeaders = ["First Name", "Last Name", "Department"]

    const data = [
        {
            firstName: "Dylan",
            lastName: "Nicolet",
            department: "Logistics"
        },
        {
            firstName: "Melissa",
            lastName: "Corba",
            department: "Sales"
        }
    ]

    return(
        <DataTable tableHeaders={tableHeaders} data={data}/>
    )
})