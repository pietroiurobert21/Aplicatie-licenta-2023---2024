import { useEffect, useState } from "react";
import style from "./Profile.module.css"
import { useNavigate } from 'react-router-dom';

import { Avatar, StatusIndicator, Badge, LogOutIcon, toaster } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'


export default function Profile(){
    const navigate = useNavigate();
    CheckToken()

    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [userRole, setUserRole] = useState('')
    const [ points, setPoints ] = useState()

    const token = localStorage.getItem("accessToken")
    const [color, setColor] = useState('yellow')

    const getUser = async () => {
        const res = await fetch(`http://localhost:3000/users/getUserJwt`, {
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
            console.log(data)
            console.log(userData)
        }
    }

    const getEmployeeRole = async () => {
        const res = await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
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
            setPoints(data.userOrganization.points)
        }
    }

    const emptyLocalstorage = () => {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("userId")
            localStorage.removeItem("organizationId")
            navigate("/")
        toaster.notify("Logged out Successfully", {id:"logout"});
    }

    useEffect(()=>{
        getUser()
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
                                <p id={style.logout} onClick={()=>{ emptyLocalstorage()}}> <LogOutIcon/> LogOut </p>
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
                                        <li className={style.itemName}>Points</li>
                                        <li> {points} </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}