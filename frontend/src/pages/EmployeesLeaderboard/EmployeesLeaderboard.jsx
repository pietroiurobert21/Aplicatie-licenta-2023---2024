import { useEffect, useState } from "react";
import LeaderboardComponent from "../../components/LeaderboardComponent/LeaderboardComponent";

export default function EmployeesLeaderboard() {
    const accessToken = localStorage.getItem("accessToken");
    const [ leaderboard, setLeaderboard ] = useState()

    const getLeaderboard = async () => {
        await fetch(`http://localhost:3000/employees/leaderboard`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => data.json())
        .then(data => {
            setLeaderboard(data.employees);
        })
    }

    useEffect(() => {
        getLeaderboard()
    }, [])

    return (
        <>
            {
                leaderboard ? <LeaderboardComponent items={leaderboard}/> : <p> Loading... </p>
            }
        </>
    )
}

