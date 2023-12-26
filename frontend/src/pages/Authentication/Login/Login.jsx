import style from './Login.module.css';
import { TextInput, Button } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import LoginCard from '../../../components/LoginCard/LoginCard';
import Registercard from '../../../components/RegisterCard/RegisterCard';

export default function Login() {
    const [showLogin, setShowLogin] = useState(true);

    localStorage.removeItem("token")

    return (
        <>
            <div className={style.login}>
                <img src={Background}/>
                <div className={style.login_container}>
                    { showLogin && <LoginCard onClick={()=>{setShowLogin(false)}}/> }
                    { !showLogin && <Registercard onClick={()=>{setShowLogin(true)}}/> }
                </div>
            </div>
        </>
    )
}