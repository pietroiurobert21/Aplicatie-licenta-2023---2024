import { useEffect, useState } from "react";
import style from "./Profile.module.css"
import { useNavigate } from 'react-router-dom';

import { Avatar, StatusIndicator, Badge, LogOutIcon, toaster, Button, Dialog, TextInputField, TextInput } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'

import bcrypt from 'bcryptjs';

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
        await fetch('http://localhost:3000/users', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({id: newUserData.id, username: newUserData.username, firstName: newUserData.firstName, lastName: newUserData.lastName})
        }).then(()=>setUpdated(Math.floor(Math.random() * 9000)));
    }

    const [ isShown, setIsShown ] = useState(false)
    const [ isShownPassword, setIsShownPassword ] = useState(false)
    const [ validOldPassword, setValidOldPassword ] = useState(false)

    const changePassword = async () => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        setNewPassword(hash);
        
        const res = await fetch('http://localhost:3000/users/password', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({id:userData.id, password: hash})
        })
        const code = res.status
        if (code == 200) {
            alert("password changed");
            localStorage.removeItem('accessToken')
            navigate('/')
        } else {
            alert("error changing password")
        }
    }

    const [ oldPassword, setOldPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ repeatNewPassword, setRepeatNewPassword ] = useState('')
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
                                <Button style={{marginTop: "5%", width: "100%"}} onClick={()=>{setIsShownPassword(true)}}> Update Password </Button>
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
                                id={style.profileDialog}
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

                            <Dialog
                                title="Change password"
                                isShown={isShownPassword}
                                onCloseComplete={() => {setIsShownPassword(false); setValidOldPassword(false)}}
                                preventBodyScrolling
                                onConfirm={() => {
                                    if (newPassword != repeatNewPassword) alert("passwords do not match!");
                                    else if (oldPassword.trim()=='') alert("old password missing")
                                    else if (newPassword.trim()=='') alert("new password missing")
                                    else {
                                        changePassword(); 
                                        setIsShownPassword(false); setValidOldPassword(false)}
                                    }
                                }
                                onCancel={()=>{setIsShownPassword(false); setValidOldPassword(false)}}
                                shouldCloseOnOverlayClick={false}
                            >
                                <TextInputField 
                                    label="Old Password"
                                    onChange={(e)=>{setOldPassword(e.target.value);setValidOldPassword(e.target.value == userData.password || bcrypt.compareSync(e.target.value, userData.password))}}/>
                                <TextInputField
                                    disabled={validOldPassword ? false : true}
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                    label="New password"/>
                                <TextInputField
                                    disabled={validOldPassword ? false : true}
                                    onChange={(e)=>setRepeatNewPassword(e.target.value)}
                                    label="Repeat new password"/>
                            </Dialog>
                        </>
                    )
                }
            </div>
        </>
    )
}