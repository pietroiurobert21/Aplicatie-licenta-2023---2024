import style from './Login.module.css';
import { TextInput, Button } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import LoginCard from '../../../components/LoginCard/LoginCard';

export default function Login() {
    localStorage.removeItem("accessToken")

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