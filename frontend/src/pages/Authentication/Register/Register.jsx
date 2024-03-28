import style1 from '../Login/Login.module.css';
import style2 from './Register.module.css';
import { TextInput, Button, toaster } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import CRMImage from '../../../assets/crmimage.png';
import { useNavigate } from 'react-router-dom';

export default function Register() {
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
            <div className={style1.login}>
                <img src={CRMImage}/>
                <div className={style1.login_container}>
                <div className={style2.card}>
                    <h1>Register</h1>
                    <TextInput name="text-input-firstname" placeholder="First Name"/>
                    <TextInput name="text-input-lastname" placeholder="Last Name"/>
                    <TextInput name="text-input-username" placeholder="Username" />
                    <TextInput name="text-input-email" placeholder="Email" />
                    <TextInput name="text-input-password" type="password" placeholder="Password"/>

                    <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                        onClick={registerUser}> Next </Button>
                    <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                        onClick={()=>{navigate('/')}}> Back </Button>
                </div>
                </div>
            </div>
        </>
    )
}