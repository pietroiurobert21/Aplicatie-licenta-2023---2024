import style from './Login.module.css';
import { TextInput, Button } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import LoginCard from '../../../components/LoginCard/LoginCard';
import Registercard from '../../../components/RegisterCard/RegisterCard';
import RegisterToCompany from '../../../components/RegisterToCompany/RegisterToCompany';

export default function Login() {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false);

    localStorage.removeItem("token")

    return (
        <>
            <div className={style.login}>
                <img src={Background}/>
                <div className={style.login_container}>
                    { showLogin && <LoginCard onClick={()=>{setShowLogin(false); setShowRegister(true)}}/> }
                    { showRegister && <Registercard onClickBack={()=>{setShowLogin(true); setShowRegister(false)}} onClickNext={()=>{setShowCompanyRegistration(true); setShowRegister(false)}}/> }
                    { showCompanyRegistration && <RegisterToCompany onClickBack={()=>{setShowRegister(true); setShowCompanyRegistration(false)}}/>}
                </div>
            </div>
        </>
    )
}