import style from '../Login/Login.module.css';
import RegisterCard from '../../../components/RegisterCard/RegisterCard';
import Content from "../../../assets/content.png"

export default function Register() {
    return (
        <>
            <div className={style.login}>
                <div className={style.login_container}>
                    <RegisterCard/>
                </div>
                <img src={Content} id={style.img}/>
            </div>
        </>
    )
}