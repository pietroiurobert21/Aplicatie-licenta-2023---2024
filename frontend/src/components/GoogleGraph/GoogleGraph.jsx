import { useEffect } from "react";
import { Chart } from "react-google-charts";

export default function GoogleGraph(props) {
    const values = props.data;
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(()=>{
        console.log(values)
        values.map((element, index) => {
            console.log([labels[index], element])
        })
    }, [])

    const chartData = [['Month', 'Euro']];
    values.map((element, index) => {
        chartData.push([labels[index], element]);
    });

    var options = {'title':'sales value',
    'width':400,
    'height':300,
    legend: { position: "bottom" }}

    // https://www.react-google-charts.com/examples/line-chart

    return (
        <>
            <div className="">
                <Chart
                    chartType="BarChart"
                    data={chartData}
                    options={options}
                    />
                <Chart
                    chartType="PieChart"
                    data={chartData}
                    options={options}/>
                <Chart
                    chartType="LineChart"
                    data={chartData}
                    options={options}/>
            </div>
        </>
    )
}
