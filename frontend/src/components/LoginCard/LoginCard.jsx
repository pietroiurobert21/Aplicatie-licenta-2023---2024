import style from './LoginCard.module.css';
import { TextInput, Button } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginCard(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = async () => {
        console.log(email, " ", password)

        const data = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        const response = await data.json();
        if (response.success) {
            localStorage.setItem("token", response.token)
            navigate('/contacts')
        } else {
            alert("Invalid credentials")
        }
    }

    return (
        <>
            <div className={style.card}>
            <h1>Login</h1>
            <TextInput name="text-input-email" placeholder="Email" 
                onChange={(e)=>setEmail(e.target.value)}/>

            <TextInput name="text-input-password" type="password" placeholder="Password" 
                 onChange={(e)=>setPassword(e.target.value)}/>

            <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                 onClick={loginFunction}> Login </Button>
            <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                onClick={props.onClick}> Register </Button>
            </div>
        </>
    )
}