import style from './Button.module.css'

export default function Button(props) {
    return (
        <button onClick={props.onClick} id={style.button}> {props.text} </button>
    )
}