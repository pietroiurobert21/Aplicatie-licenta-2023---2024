import style from './Login.module.css';
import { TextInput, Button } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import CRMImage from '../../../assets/crmimage.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Content from "../../../assets/content.png"

import LoginCard from '../../../components/LoginCard/LoginCard';

export default function Login() {
    const navigate = useNavigate()
    const [belongs, setBelongs] = useState(false)

    const checkUserBelongsToOrganization = async () => {
        const data = await fetch('http://localhost:3000/users/belongsToOrganization', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({email})
        })
        const response = await data.json();
        if (response.success) {
            setBelongs(true)
        } else {
            setBelongs(false)
        }
    }

    useEffect(() => {
        checkUserBelongsToOrganization()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token && belongs) {
            navigate('/profile')
        } else if (token && !belongs) {
            navigate('/registerToCompany')
        }
    }, [belongs])

    return (
        <>
            <div className={style.login}>
                <div className={style.login_container}>
                    <LoginCard/>
                </div>
                <img src={Content} id={style.img}/>
            </div>
        </>
    )
}