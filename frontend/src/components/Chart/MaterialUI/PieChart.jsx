import * as React from 'react';
import { PieChart as Chart} from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';


export default function PieChart(props) {
  const data1 = props.data
  
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
