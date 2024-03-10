import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart as Chart} from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';

const data = [
  { id: 0, value: 102, label: 'Jan' },
  { id: 1, value: 10, label: 'Feb' },
  { id: 2, value: 20, label: 'March' },
];

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function PieChart() {
  const [ data1, setData1 ] = useState([])
  const accessToken = localStorage.getItem('accessToken')
  const retrieveStructuredData = async () => {
    const res = await fetch(`http://localhost:3000/organizations/structuredDeals/1`, {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(data=>data.json())
    res.organizationDeals.map((value, index) => {
      const newDataObject = {id: index, value: +value.COUNT_VALUE, label: labels[+value.MONTH - 1]}
      setData1(prevData => [...prevData, newDataObject]);
    })
  }

  useEffect(()=>{
    retrieveStructuredData()
  }, [])
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {
        data1.length ? (
          <>
          <Typography paddingRight={10}> Number of sales in 2024 </Typography>
          <Chart
            series={[
              {
                data: data1,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={200}
          />
          </>
        ) : <p> loading </p>
      }
    </div>
  );
}
