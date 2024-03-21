import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

export default function BasicBars(props) {

  const status = ['accepted', 'rejected', 'proposed']
  
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Typography> Deals for {props.year} </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
        series={props.data.map((item, index) => ({ ...item, label: status[index] + " deals" }))}
        colors={["blue", "red", "gray"]}
        width={600}
        height={200}
      />
    </div>
  );
}
