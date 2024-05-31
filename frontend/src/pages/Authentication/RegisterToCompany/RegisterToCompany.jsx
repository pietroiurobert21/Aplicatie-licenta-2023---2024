import style from '../Login/Login.module.css';
import RegisterToCompanyCard from '../../../components/RegisterToCompanyCard/RegisterToCompanyCard';
import Content from "../../../assets/content.png"

export default function RegisterToCompany() {
    return (
        <>
            <div className={style.login}>
                <div className={style.login_container}>
                    <RegisterToCompanyCard/>
                </div>
                <img src={Content} id={style.img}/>
            </div>
        </>
    )
}