import React, { useEffect, useState } from "react"
import style from "./Dashboard.module.css"
import CheckToken from '../../middlewares/CheckToken.jsx'
import { Button, SelectMenu } from "evergreen-ui";
import Chart from "../../components/Chart/Chart.jsx"


export default function Dashboard() {
    CheckToken()
    const accessToken = localStorage.getItem('accessToken')

    const [ selected, setSelected] = useState(null)
    const [ years, setYears ] = useState([])

    const getYears = async () => {
      const res = await fetch(`http://localhost:3000/organizations/dealsyears`, {
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
    }, [])

    useEffect(() => {
    }, [selected])

    return (
      <div className={style.page_container}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            {
                years.length > 0 ? <SelectMenu
                                    title="Select year"
                                    options={years.map((label) => ({ label, value: label }))}
                                    selected={selected}
                                    onSelect={(item) => setSelected(item.value)}>
                                        <p id={style.yearSelector}>{"Selected year: " + selected || 'Select year...'}</p>
                                </SelectMenu> : <p> no data found </p>
            }
            {
              selected && <Chart year={selected}/>
            }
        </div>
      </div>
    );
}