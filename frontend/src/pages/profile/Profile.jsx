import { useEffect, useState } from "react";
import style from "./Profile.module.css"
import { useNavigate } from 'react-router-dom';

import { Avatar, StatusIndicator, Badge, LogOutIcon, toaster, Button, Dialog, TextInputField } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'


export default function Profile(){
    const navigate = useNavigate();
    CheckToken()

    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState()
    const [newUserData, setNewUserData] = useState()
    const [userRole, setUserRole] = useState('')
    const [ points, setPoints ] = useState()

    const [ updated, setUpdated ] = useState(0)

    const accessToken = localStorage.getItem("accessToken")
    const [color, setColor] = useState('yellow')

    const getUser = async () => {
        const res = await fetch(`http://localhost:3000/users/getUserJwt`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        
        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setUserData(data.user)
            setNewUserData(data.user)
            setIsLoading(false)
        }
    }

    const getEmployeeRole = async () => {
        const res = await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
        navigate("/")
        toaster.notify("Logged out Successfully", {id:"logout"});
    }

    useEffect(()=>{
        getUser()
        getEmployeeRole()
    }, [updated])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };


    const updateProfile = async () => {
        setUpdated(Math.floor(Math.random() * 9000))

        await fetch('http://localhost:3000/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({id: newUserData.id, username: newUserData.username, firstName: newUserData.firstName, lastName: newUserData.lastName})
        });
    }

    const [ isShown, setIsShown ] = useState(false)
    return (
        <>
            <div className={style.profileContainer}>
                {
                    isLoading ? <p>loading</p> : (
                        <>
                        <div className={style.firstRowContainer}>
                            <div className={style.contactIconContainer}>
                                <Avatar name={`${userData.firstName} ${userData.lastName}`} size={180}/>
                                <p> {userData.firstName} {userData.lastName} </p>
                                <p> 
                                    <StatusIndicator color="success" marginRight={16} fontSize={16}> Online </StatusIndicator>
                                    <Badge color={color} fontSize={13} margin={0} marginLeft={16}> {userRole} </Badge>
                                </p>
                                <Button style={{marginTop: "5%", width: "100%"}} onClick={()=>{setIsShown(true)}}> Edit profile </Button>
                                <p id={style.logout} onClick={()=>{ emptyLocalstorage()}}> <LogOutIcon/> LogOut </p>
                            </div>
                            <div className={style.contactInfoContainer}>
                                <b> Contact Information </b>
                                <ul>
                                    <li className={style.itemName}>Username</li>
                                    <li>{userData.username}</li>
                                    <li className={style.itemName}>Email</li>
                                    <li>{userData.email}</li>
                                    <li className={style.itemName}>First name</li>
                                    <li>{userData.firstName}</li>
                                    <li className={style.itemName}>Last name</li>
                                    <li>{userData.lastName}</li>
                                        <li className={style.itemName}>Points</li>
                                        <li> {points} </li>
                                </ul>
                            </div>
                        </div>
                            <Dialog
                                isShown={isShown}
                                title="Edit Profile"
                                onCloseComplete={() => setIsShown(false)}
                                preventBodyScrolling
                                onConfirm={() => {updateProfile();setIsShown(false);}}
                                onCancel={()=>{setIsShown(false)}}
                                shouldCloseOnOverlayClick={false}
                            >
                                <TextInputField
                                    label="Username"
                                    placeholder="Username"
                                    name="username"
                                    defaultValue={userData.username}
                                    onChange={handleInputChange}/>
                                <TextInputField
                                    label="First Name"
                                    placeholder="First Name"
                                    name="firstName"
                                    defaultValue={userData.firstName}
                                    onChange={handleInputChange}/>
                                <TextInputField
                                    label="Last Name"
                                    placeholder="Last Name"
                                    name="lastName"
                                    defaultValue={userData.lastName}
                                    onChange={handleInputChange}/>
                            </Dialog>
                        </>
                    )
                }
            </div>
        </>
    )
}