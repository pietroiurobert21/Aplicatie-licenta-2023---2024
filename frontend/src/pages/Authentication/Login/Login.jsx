import style from './Login.module.css';
import { TextInput, Button } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import CRMImage from '../../../assets/crmimage.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LoginCard from '../../../components/LoginCard/LoginCard';

export default function Login() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            navigate('/profile')
        }
    }, [])

    return (
        <>
            <div className={style.login}>
                <img src={Background}/>
                <div className={style.login_container}>
                    <LoginCard/>
                </div>
            </div>
        </>
    )
}