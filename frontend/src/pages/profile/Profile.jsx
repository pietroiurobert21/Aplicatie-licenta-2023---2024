import { useEffect, useState } from "react";
import style from "./Profile.module.css"
import { Avatar, StatusIndicator, Badge } from 'evergreen-ui'

export default function Profile(){
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [userRole, setUserRole] = useState('')

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")
    const [color, setColor] = useState('yellow')

    const getUserById = async () => {
        const res = await fetch(`http://localhost:3000/users/getUser/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setUserData(data)
            setIsLoading(false)
            console.log(userData)
        }
    }

    const getEmployeeRole = async () => {
        const res = await fetch(`http://localhost:3000/employees/getEmployee/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setUserRole(data.userOrganization.role)
            if (data.userOrganization.role != 'administrator') {
                setColor('blue')
            }
        }
    }

    useEffect(()=>{
        getUserById()
        getEmployeeRole()
    }, [])

    return (
        <>
            <div className={style.profileContainer}>
                {
                    isLoading ? <p>loading</p> : (
                        <div className={style.firstRowContainer}>
                            <div className={style.contactIconContainer}>
                                <Avatar name={`${userData.user.firstName} ${userData.user.lastName}`} size={180}/>
                                <p> {userData.user.firstName} {userData.user.lastName} </p>
                                <p> 
                                    <StatusIndicator color="success" marginRight={16} fontSize={16}> Online </StatusIndicator>
                                    <Badge color={color} fontSize={13} margin={0} marginLeft={16}> {userRole} </Badge>
                                </p>
                            </div>

                            <div className={style.contactInfoContainer}>
                                <b> Contact Information </b>
                                <ul>
                                    <li className={style.itemName}>Username</li>
                                    <li>{userData.user.username}</li>
                                    <li className={style.itemName}>Email</li>
                                    <li>{userData.user.email}</li>
                                    <li className={style.itemName}>First name</li>
                                    <li>{userData.user.firstName}</li>
                                    <li className={style.itemName}>Last name</li>
                                    <li>{userData.user.lastName}</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}