import style1 from '../Login/Login.module.css';
import style2 from './RegisterToCompany.module.css';
import Background from '../../../assets/background_image.png';
import { useNavigate } from 'react-router-dom'
import { TextInput, Button } from 'evergreen-ui'

export default function RegisterToCompany() {
    const navigate = useNavigate()
    localStorage.removeItem("token")

    return (
        <>
            <div className={style1.login}>
                <img src={Background}/>
                <div className={style1.login_container}>
                    
                    <div className={style2.card1}>
                        <h3> Join a company </h3>
                        <TextInput name="text-input-code" placeholder="Company Code" />
                        <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}> Join Company </Button>            
                    </div>

                    <div className={style2.card2}>
                        <h5> or create one </h5>
                        <TextInput name="text-input-company" placeholder="Company Name" />
                        <TextInput name="text-input-employees" type="number" placeholder="Number of employees"/>
                        <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}> Create Company </Button>
                        <Button appearance="default" intent="danger" style={{width: "17.5rem", fontSize:"1rem"}}
                            onClick={()=>{navigate('/')}}> LogOut </Button>
                    </div>

                </div>
            </div>
        </>
    )
}