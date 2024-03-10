import React, { useEffect, useState } from "react"
import style from "./Dashboard.module.css"

import GoogleGraph from "../../components/GoogleGraph/GoogleGraph.jsx"

import Graph from "../../components/Graph/Graph"
import CheckToken from '../../middlewares/CheckToken.jsx'
import { Button, SelectMenu } from "evergreen-ui";
import Chart from "../../components/Chart/Chart.jsx"


export default function Home() {
    CheckToken()
    const [selected, setSelected] = useState(null)

    const [ years, setYears ] = useState([])
    const organizationId = localStorage.getItem('organizationId')
    const accessToken = localStorage.getItem('accessToken')
    const getYears = async () => {
      const res = await fetch(`http://localhost:3000/organizations/dealsyears/${organizationId}`, {
        method: 'GET',
        headers: { 
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(data=>data.json());
      setYears(res.years)
      setSelected(res.years[0])
    }

    useEffect(() => {
        getYears()
        console.log(years)
    }, [])

    return (
        <>
            {
                years.length>0 && <SelectMenu
                                    title="Select year"
                                    options={years.map((label) => ({ label, value: label }))}
                                    selected={selected}
                                    onSelect={(item) => setSelected(item.value)}>
                                        <Button>{selected || 'Select year...'}</Button>
                                </SelectMenu>
            }
            <div className={style.page_container}>
                <Chart/>
            </div>
        </>
    );
}