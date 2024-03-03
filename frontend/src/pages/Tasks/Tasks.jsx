import style from './Tasks.module.css'

export default function Tasks() {
    return (
        <>
        <div className={style.tasksContainer}>
            <div className={style.todo}>
                <h5> Todo-list </h5>
            </div>
            <div className={style.tasks}>
                <h5> Tasks </h5>
            </div>
        </div>
        </>
    )
}