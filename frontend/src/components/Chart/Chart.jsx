import PieChart from "./MaterialUI/PieChart.jsx";
import BasicLineChart from "./MaterialUI/LinesChart.jsx";
import BarChart from './MaterialUI/BarChart.jsx'
import style from "./Chart.module.css";
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

export default function Chart(props) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    // for PieChart
    const [ pieValues, setPieValues ] = useState([])

    // for LineChart
    const [ xAxis, setxAxis] = useState([])
    const [ yAxis, setyAxis] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

    // for BarChart
    const [ barValues, setBarValues ] = useState([])
    const [ acceptedDeals, setAcceptedDeals ] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
    const [ rejectedDeals, setRejectedDeals ] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
    const [ proposedDeals, setProposedDeals ] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

    const accessToken = localStorage.getItem('accessToken')

    const [ closedDealsYear, setClosedDealsYear ] = useState(0)
    const [ closedDealsMonth, setClosedDealsMonth ] = useState(0)

    const retrieveStructuredData = async () => {
      setPieValues([])
      setBarValues([])
      setxAxis([])
      setyAxis([0,0,0,0,0,0,0,0,0,0,0,0])
      setClosedDealsYear(0)
      setClosedDealsMonth(0)

      setAcceptedDeals([0,0,0,0,0,0,0,0,0,0,0,0])
      setRejectedDeals([0,0,0,0,0,0,0,0,0,0,0,0])
      setProposedDeals([0,0,0,0,0,0,0,0,0,0,0,0])

      const localMonth = new Date().getMonth();

      const res = await fetch(`http://localhost:3000/organizations/structuredDeals`, {
        method: 'GET',
        headers: { 
          'Content-type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(data=>data.json())


      res.acceptedDeals
        .filter(value => value.YEAR === props.year)
        .map((value, index) => {
          const newDataObject = {id: index, value: +value.COUNT_VALUE, label: labels[+value.MONTH - 1]}
          setPieValues(prevData => [...prevData, newDataObject]);

          setxAxis(prevData => [...prevData, +value.MONTH]);

          setyAxis(prevData => {
              const newData = [...prevData];
              newData[+value.MONTH-1] = +value.SUM_VALUE;
              return newData; 
          });

          setClosedDealsYear(prev => prev+ (+value.COUNT_VALUE))

          if (value.MONTH == localMonth+1)
            setClosedDealsMonth(prev => prev+ (+value.COUNT_VALUE))

          // for barchart
          // const prevData = acceptedDeals
          // prevData[+value.MONTH-1] = +value.COUNT_VALUE;
          // setAcceptedDeals(prevData)
            setAcceptedDeals(prevData => {
              const newData = [...prevData];
              newData[+value.MONTH - 1] = +value.COUNT_VALUE;
              return newData;
          });
      })

      res.rejectedDeals
        .filter(value => value.YEAR === props.year)
        .map((value, index) => {
          setClosedDealsYear(prev => prev+ (+value.COUNT_VALUE))

          if (value.MONTH == localMonth+1)
            setClosedDealsMonth(prev => prev+ (+value.COUNT_VALUE))
        
            // for barchart
        // const prevData = rejectedDeals
        // prevData[+value.MONTH-1] = +value.COUNT_VALUE;
        // setRejectedDeals(prevData)      
          setRejectedDeals(prevData => {
            const newData = [...prevData];
            newData[+value.MONTH - 1] = +value.COUNT_VALUE;
            return newData;
        });
      
      })

      res.proposedDeals
        .filter(value => value.YEAR === props.year)
        .map((value, index)=>{
            // for barchart
        // const prevData = proposedDeals
        // prevData[+value.MONTH-1] = +value.COUNT_VALUE;
        // setProposedDeals(prevData)    
          setProposedDeals(prevData => {
            const newData = [...prevData];
            newData[+value.MONTH - 1] = +value.COUNT_VALUE;
            return newData;
        });
      
      })
        
          }

    useEffect(() => {
      setBarValues([{ data: acceptedDeals}, {data: rejectedDeals}, {data: proposedDeals}])
    }, [acceptedDeals, rejectedDeals, proposedDeals])
  
    useEffect(()=>{
      retrieveStructuredData()
      console.log(barValues)
    }, [props.year])

    return (
        <div className={style.chartContainer}>
            <div className={style.stats}>              
              <div className={style.item3}>
                <Typography> Deals closed this year </Typography>
                <Typography> {closedDealsYear} </Typography>
              </div>
              <div className={style.item3}>
                <Typography> Deals closed this month </Typography>
                <Typography> {closedDealsMonth} </Typography>
              </div>
            </div>

            <div className={style.gridContainer}>
                <div className={style.item1}>
                    <BasicLineChart data={[xAxis, yAxis]} year={props.year}/>
                </div>
                <div className={style.item2}  >
                    <PieChart data={pieValues} year={props.year}/>
                </div>
                <div className={style.item2}>
                    <BarChart data={barValues} year={props.year}/>
                </div>
            </div>
        </div>
    )
}