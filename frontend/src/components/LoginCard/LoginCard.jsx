import style from './LoginCard.module.css';
import { TextInput, Button, toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
            toaster.success("Logged in successfully!", {duration: 2})
            localStorage.setItem("accessToken", response.token)
            localStorage.setItem("userId", response.user.id)
            await checkUserBelongsToOrganization();
        } else {
            toaster.danger("Invalid credentials", {
                description: "Incorrect email or password"
            })
        }
    }

    const getOrganization = async (userId) => {
        const res = await fetch(`http://localhost:3000/organizations/getByUserId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            localStorage.setItem("organizationId", data.organization.id)
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
                <h1>Login</h1>
                <TextInput name="text-input-email" placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)}/>

                <TextInput name="text-input-password" type="password" placeholder="Password" 
                    onChange={(e)=>setPassword(e.target.value)}/>

                <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={loginFunction}> Login </Button>

                <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={()=>{navigate('/register')}}> Register </Button>
            </div>
        </>
    )
}