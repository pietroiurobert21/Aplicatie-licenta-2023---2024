import style from './Login.module.css';
import { TextInput, Button } from 'evergreen-ui';
import Background from '../../../assets/background_image.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    return (
        <>
            <div className={style.login}>
                <img src={Background}/>
                <div className={style.login_container}>

                    <div className={style.card}>
                        <h1>Login</h1>
                        <TextInput name="text-input-email" placeholder="Email" />
                        <TextInput name="text-input-password" type="password" placeholder="Password" />
                        <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                            onClick={()=>{navigate('/dashboard')}}> Login</Button>
                        <Button appearance="minimal" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                            onClick={()=>{navigate('/register')}}> Register </Button>
                        
                    </div>
                </div>
            </div>
        </>
    )
}