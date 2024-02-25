import { useEffect, useState } from 'react';
import style from './Team.module.css'
import { Avatar } from 'evergreen-ui'

export default function Team() {
    const [team, setTeam] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [organization, setOrganization] = useState({})

    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')

    const getTeam = async () => {
        const res = await fetch(`http://localhost:3000/employees/getColleagues/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setTeam(data.colleagues)
            console.log(data)
            setIsLoading(false)
        }
    }

    const getOrganization = async () => {
        const res = await fetch(`http://localhost:3000/organizations/getByUserId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setOrganization(data.organization)
            console.log(data)
        }
    }

    useEffect(()=>{
        getTeam()
        getOrganization()
    }, [])

    return (
        <div className={style.teamContainer}>
            <p><b> Team members - {organization.name} </b></p>

        {isLoading ? (
            <p>Loading...</p>
        ) : team.length > 0 ? (
            <ul>
                {team.map((colleague, index) => (
                    <li key={index}>
                        <Avatar name={`${colleague.User.firstName} ${colleague.User.lastName}`} size={40} marginRight={10}/>
                        
                        {colleague.User.firstName} {colleague.User.lastName} - {colleague.role}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No colleagues found.</p>
        )}
    </div>
    )
}