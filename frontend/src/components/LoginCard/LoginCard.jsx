import style from './LoginCard.module.css';
import { TextInput, Button, toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import reactLogo from '../../assets/react.svg';


export default function LoginCard(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = async () => {
        const data = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        const response = await data.json();
        if (response.success) {
            toaster.success("Logged in successfully!", {id:"login"})
            setTimeout(async()=>{
                localStorage.setItem("accessToken", response.token)
                await checkUserBelongsToOrganization();
            },1000)
        } else {
            toaster.danger("Invalid credentials", {
                description: "Incorrect email or password"
            }, {id:"error_login"})
        }
    }

    const getOrganization = async (userId) => {
        const res = await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            // localStorage.setItem("organizationId", data.organization.id)
        }
    }

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
            getOrganization(localStorage.getItem("userId"))
            navigate('/profile')
        } else {
            toaster.notify("You must join or create an organization to continue", { duration: 5 })
            navigate('/registerToCompany')
        }
    }

    return (
        <>
            <div className={style.card}>
                <div className={style.loginHeader}>
                    <p id={style.pheader} style={{fontWeight: "400", fontSize: '1.5rem', color: ''}}>Welcome back</p>
                </div>
                <TextInput name="text-input-email" placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)}/>

                <TextInput name="text-input-password" type="password" placeholder="Password" 
                    onChange={(e)=>setPassword(e.target.value)}/>

                <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={loginFunction}> Sign in </Button>

                {/* <p> I forgot my password </p> */}

                <p style={{textAlign: 'center'}} onClick={()=>{navigate('/register')}}> Get started for free </p>
           
                <div style={{position: 'relative', height: '55%'}}>
                    <p style={{textAlign: 'center', position: 'absolute', bottom: 0, width: '100%'}}>2024 @All rights reserved</p>
                </div>
            </div>
        </>
    )
}