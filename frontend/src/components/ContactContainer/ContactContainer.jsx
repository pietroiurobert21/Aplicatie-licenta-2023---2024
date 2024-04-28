import style from "./ContactContainer.module.css";

export default function ContactContainer(props) {
    return (
        <div className={style.contactContainer} onClick={props.onClick}>
            {/* {props.index+1} */}
            <p>{props.data.firstName} {props.data.lastName}</p>
            <p>{props.data.professionalTitle}</p>
            <p>{props.data.companyName}</p>
            <p>{props.data.phoneNumber} - {props.data.emailAddress}</p>
        </div>
    )
}