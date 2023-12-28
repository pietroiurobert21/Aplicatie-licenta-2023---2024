import React, { useState } from "react"
import style from "./Dashboard.module.css"

import Graph from "../../components/Graph/Graph"
import CheckToken from '../../middlewares/CheckToken.jsx'


export default function Home() {
    CheckToken()

    const [data, setData] = useState([1000,2000,3000,800,1000,2500,400,600,7000,1080, 3000,4000])

    const type = 'bar'
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December']
    const label = 'Sales 2023'

    const collectData = (str) => {
        const arr = str.split(',').map((item) => parseInt(item))
        setData(arr)
    }

    console.log("https://quickchart.io/documentation/chart-types/")

    return (
        <>
            <div className={style.page_container}>
            {/* <input type="text" onChange={(e)=>{collectData(e.target.value)}}/> */}
            
            <div className={style.graph_container}>
                <Graph type={'bar'} labels={labels} label={label} data={data} id={"a"} />
                <Graph type={'pie'} labels={labels} label={label} data={data} id={"b"} />
                <Graph type={'line'} labels={labels} label={label} data={data} id={"c"} />
                <Graph type={'radar'} labels={labels} label={label} data={data} id={"d"} />
            </div>
            </div>
        </>
    )
}