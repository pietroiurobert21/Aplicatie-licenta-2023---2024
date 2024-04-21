import * as React from 'react';
import { PieChart as Chart} from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import style from './PieChart.module.css';


export default function PieChart(props) {
  const data1 = props.data
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%"}}>
      {
        data1.length ? (
          <>
          <Typography> Closed won deals in {props.year} </Typography>
          <div className={style.pieChart}>
            <Chart 
              series={[
                {
                  data: data1,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
              width={500}
            />
            </div>
          </>
        ) : <p> not enough data found </p>
      }
    </div>
  );
}
