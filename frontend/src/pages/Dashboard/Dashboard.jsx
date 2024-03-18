import React, { useEffect, useState } from "react"
import style from "./Dashboard.module.css"

import GoogleGraph from "../../components/GoogleGraph/GoogleGraph.jsx"

import Graph from "../../components/Graph/Graph"
import CheckToken from '../../middlewares/CheckToken.jsx'
import { Button, SelectMenu } from "evergreen-ui";
import Chart from "../../components/Chart/Chart.jsx"


export default function Home() {
    CheckToken()
    const [ selected, setSelected] = useState(null)

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

    useEffect(() => {
      console.log(selected)
    }, [selected])

    return (
      <div className={style.page_container}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"start"}}>
            {
                years.length > 0 && <SelectMenu
                                    title="Select year"
                                    options={years.map((label) => ({ label, value: label }))}
                                    selected={selected}
                                    onSelect={(item) => setSelected(item.value)}>
                                        <Button style={{float:"left"}}>{"Selected year: " + selected || 'Select year...'}</Button>
                                </SelectMenu>
            }
            {
              selected && <Chart year={selected}/>
            }
        </div>
      </div>
    );
}