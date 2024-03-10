import { useEffect, useState } from 'react';
import style from './Organization.module.css'
import { Avatar, Button, Dialog, TextInput, toaster } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'

export default function Organization() {
    CheckToken()
    const [team, setTeam] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [isShown, setIsShown] =   useState(false)

    const [organization, setOrganization] = useState({})

    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')

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
        } else if (res.status == 401) {
            localStorage.removeItem("accessToken")
        }
    }

    useEffect(()=>{
        getOrganization()
    }, [])

    return (
        <div className={style.organizationContainer}>
            <div className={style.header}>
                <p><b> {organization.name} </b></p>
            </div>
            <ul style={{listStyle: 'none', paddingLeft: "5%"}}>
                <li className={style.itemName}> Organization name </li>
                <li> {organization.name}  </li>
                <li className={style.itemName}> Points </li>
                <li> {organization.points}  </li>
                <li className={style.itemName}> Revenue </li>
                <li> $$$  </li>
                <li className={style.itemName}> Invitation code </li>
                <li> {organization.code}  </li>
                <li className={style.itemName}> Active on platform since </li>
                <li> dd/mm/yyyy  </li>
            </ul>
        </div>
    )
}