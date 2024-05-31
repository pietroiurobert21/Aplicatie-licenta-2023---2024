import style from '../LoginCard/LoginCard.module.css';
import { TextInput, Button, toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import reactLogo from '../../assets/react.svg';


export default function RegisterCard() {
    localStorage.removeItem("token")

    const navigate = useNavigate();

    const registerUser = async() => {
        const data = await fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "firstName": document.getElementsByName("text-input-firstname")[0].value,
                "lastName": document.getElementsByName("text-input-lastname")[0].value,
                "username": document.getElementsByName("text-input-username")[0].value,
                "password": document.getElementsByName("text-input-password")[0].value,
                "email": document.getElementsByName("text-input-email")[0].value
            })});
        const response = await data.json();

        if (data.status === 201) {
            toaster.success("Account created successfully!")
            navigate('/login')
        } else {
            toaster.danger(response.error)
        } 
    }
    
    
    return (
        <>
            <div className={style.card}>
                <div className={style.loginHeader}>
                    <p id={style.pheader} style={{fontWeight: "400", fontSize: '1.5rem', color: ''}}>Register</p>
                </div>
                <TextInput name="text-input-firstname" placeholder="First Name"/>
                <TextInput name="text-input-lastname" placeholder="Last Name"/>
                <TextInput name="text-input-username" placeholder="Username" />
                <TextInput name="text-input-email" placeholder="Email" />
                <TextInput name="text-input-password" type="password" placeholder="Password"/>

                <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={registerUser}> Next </Button>
                <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={()=>{navigate('/')}}> Back </Button>

                <p style={{textAlign: 'center'}} onClick={()=>{navigate('/login')}}> Already have an account? </p>

                <div style={{position: 'relative', height: '40%'}}>
                    <p style={{textAlign: 'center', position: 'absolute', bottom: 0, width: '100%'}}>2024 @All rights reserved</p>
                </div>
            </div>
        </>
    )
}