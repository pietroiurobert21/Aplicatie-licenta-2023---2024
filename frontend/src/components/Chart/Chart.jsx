import PieChart from "./MaterialUI/PieChart.jsx";
import BasicLineChart from "./MaterialUI/LinesChart.jsx";
import BarChart from './MaterialUI/BarChart.jsx'
import style from "./Chart.module.css";
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

export default function Chart(props) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [ data1, setData1 ] = useState([])
    const [ xAxis, setxAxis] = useState([])
    const [ yAxis, setyAxis] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
    const accessToken = localStorage.getItem('accessToken')
    const organizationId = localStorage.getItem('organizationId')

    const retrieveStructuredData = async () => {
      setData1([])
      const res = await fetch(`http://localhost:3000/organizations/structuredDeals/${organizationId}`, {
        method: 'GET',
        headers: { 
          'Content-type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(data=>data.json())
      res.organizationDeals
        .filter(value => value.YEAR === props.year)
        .map((value, index) => {
        const newDataObject = {id: index, value: +value.COUNT_VALUE, label: labels[+value.MONTH - 1]}
        console.log(value)
        setData1(prevData => [...prevData, newDataObject]);

        setxAxis(prevData => [...prevData, +value.MONTH]);

        setyAxis(prevData => {
            const newData = [...prevData];
            newData[+value.MONTH-1] = +value.COUNT_VALUE;
            return newData; 
        });
      })
    }
  
    useEffect(()=>{
      console.log("YEARRRRRRRRRRR" + props.year)
      retrieveStructuredData()
    }, [props.year])

    return (
        <div style={{display: 'flex', justifyContent: "space-around", alignItems: 'center', width: "100vw"}}>
            <div style={{display: 'flex', flexDirection: 'column', height:'92vh', justifyContent: 'space-between', alignItems: 'center'}}>
              <div className={style.item3}>
                <Typography> Closed this year </Typography>
                <Typography> 18k </Typography>
              </div>
              <div className={style.item3}>
                <Typography> Closed this month </Typography>
                <Typography> 7.8k </Typography>
              </div>
              <div className={style.item3}>
                <Typography> Completed activities </Typography>
                <Typography> 215 </Typography>
              </div>
            </div>

            <div className={style.gridContainer}>
                <div className={style.item1}>
                    <BasicLineChart data={[xAxis, yAxis]} year={props.year}/>
                </div>
                <div className={style.item2}>
                    <PieChart data={data1} year={props.year}/>
                </div>
                <div className={style.item2}>
                    <BarChart year={props.year}/>
                </div>
            </div>
        </div>

    )
}