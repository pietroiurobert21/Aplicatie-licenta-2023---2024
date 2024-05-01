import { useEffect, useState } from "react";
import LeaderboardItem from "../../components/LeaderboardComponent/LeaderboardComponent";

export default function OrganizationLeaderboard() {
    const accessToken = localStorage.getItem('accessToken');
    const [ leaderboard, setLeaderboard ] = useState([]) 

    const getLeaderboard = async () => {
        await fetch('http://localhost:3000/organizations/leaderboard', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => data.json())
        .then(data => setLeaderboard(data.leaderboard))
    }

    useEffect(() => {
        getLeaderboard()
    }, [])

    return (
        <>
            {
                leaderboard.length>0 ? <LeaderboardItem items={leaderboard}/> : <p> Loading... </p>
            }
        </>
    )
}