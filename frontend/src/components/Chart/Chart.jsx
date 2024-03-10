import PieChart from "./MaterialUI/PieChart.jsx";
import style from "./Chart.module.css";

export default function Chart() {
    return (
        <div className={style.gridContainer}>
            <div className={style.item1}>
                
            </div>
            <div className={style.item2}>
                
            </div>
            <div className={style.item2}>
                <PieChart/>
            </div>
        </div>
    )
}