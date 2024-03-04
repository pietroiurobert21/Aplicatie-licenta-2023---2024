import React, { useEffect, useState } from "react"
import style from "./Dashboard.module.css"

import GoogleGraph from "../../components/GoogleGraph/GoogleGraph.jsx"

import Graph from "../../components/Graph/Graph"
import CheckToken from '../../middlewares/CheckToken.jsx'
import { Button } from "evergreen-ui";


export default function Home() {
    CheckToken()
    const [yearlySum, setYearlySum] = useState({});
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const accessToken = localStorage.getItem("accessToken");
    const organizationId = localStorage.getItem("organizationId");
    const [ loading, setLoading ] = useState(true);

    const getDeals = async () => {
        const res = await fetch(`http://localhost:3000/organizations/deals/${organizationId}`, { // TODO add querry parameter to choose what data to retrieve (accepted deals, failed, accepted+proposed)
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (res.status === 200) {
            const deals = await res.json();

            const updatedYearlySum = {};
            deals.organizationDeals.forEach(deal => {
                const year = new Date(deal.date).getFullYear();
                const month = new Date(deal.date).getMonth();
                if (!updatedYearlySum[year]) {
                    updatedYearlySum[year] = new Array(12).fill(0);
                }
                updatedYearlySum[year][month] += deal.value;
            });
            setYearlySum(updatedYearlySum);

            setLoading(false);
            console.log(yearlySum);
        }
    }

    useEffect(()=>{
        getDeals()
    }, [])

    return (
        <div className={style.page_container}>
            {loading ? <p>loading</p> : (
                <div className={style.graph_container}>
                    {Object.entries(yearlySum).sort(([year1], [year2]) => year2 - year1).map(([year, monthlySums]) => (
                        <div>
                        <h3>{year}</h3>
                        <div className={style.yearGraph}>
                            <GoogleGraph data={monthlySums} year={year} />
                        </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

// const Graphs = ({ yearlySum, year }) => {
//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     return (
//         <>
//             <Graph type={'bar'} labels={labels} label="sales" data={yearlySum} id={`graph-${year}-a`} />
//             <Graph type={'pie'} labels={labels} label="sales" data={yearlySum} id={`graph-${year}-b`} />
//             <Graph type={'line'} labels={labels} label="sales" data={yearlySum} id={`graph-${year}-c`} />
//             <Graph type={'radar'} labels={labels} label="sales" data={yearlySum} id={`graph-${year}-d`} />
//         </>
//     );
// }