import { useEffect, useState } from "react";
import style from "./Profile.module.css"
import { Avatar } from 'evergreen-ui'

export default function Profile(){
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({})

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")

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

    useEffect(()=>{
        getUserById()
    }, [])

    return (
        <>
            <div className={style.profileContainer}>
                {
                    isLoading ? <p>loading</p> : (
                        <>                            
                            <Avatar name={`${userData.user.firstName} ${userData.user.lastName}`} size={40} marginRight={16} />
                            <ul>
                                <li>{userData.user.email}</li>
                                <li>{userData.user.firstName}</li>
                                <li>{userData.user.lastName}</li>
                                <li>{userData.user.username}</li>
                            </ul>
                        </>
                    )
                }
            </div>
        </>
    )
}