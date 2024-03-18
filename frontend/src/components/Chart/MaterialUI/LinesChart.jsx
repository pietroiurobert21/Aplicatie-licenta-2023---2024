import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from './LinesChart.module.css'

export default function BasicLineChart(props) {
  const xAxis = props.data[0]
  const yAxis = props.data[1]

  return (
    <>
      {
        xAxis.length ? 
          (     
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
              <Typography paddingRight={10}> Revenue in {props.year} </Typography>

              <div className={style.lineChart}>
                <LineChart
                xAxis={[{ data: [1,2,3,4,5,6,7,8,9,10,11,12] }]}
                series={[
                  {
                    data: yAxis,
                  },
                ]}
                width={600}
                height={300}
                />
                
              </div>
          </div>
        ) 
        : <p>loading</p>
      }
    </>
  );
}
