import { useEffect, useState } from 'react';
import style from './Tasks.module.css'
import { Table, TextInput, Checkbox } from 'evergreen-ui'


export default function Tasks() {

    const [tasks, setTasks] = useState([])
    const accessToken = localStorage.getItem("accessToken")

    const retrieveTasks = async () => {
        await fetch(`http://localhost:3000/tasks`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=> setTasks(data.tasks));
    }

    useEffect(() => {
        retrieveTasks()
    }, [])
    
    return (
        <>
        <div className={style.tasksContainer}>
            <div className={style.tasks}>
                <h5> Tasks </h5>

                {
                    tasks.length > 0 ?  (

                            <Table>
                                <Table.Head width={800} backgroundColor="#dafce9">
                                    <Table.SearchHeaderCell />
                                    <Table.TextHeaderCell>  Description   </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>  Assigned to   </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>  IsDone        </Table.TextHeaderCell>
                                    <Table.TextHeaderCell>  Assigned by   </Table.TextHeaderCell>
                                </Table.Head>    
                                <Table.VirtualBody height={390}>
                                    {
                                        (tasks.map((task, index)=> (
                                            <>
                                                <Table.Row key={task.id} isSelectable>
                                                    <Table.TextCell>{task.id}</Table.TextCell>
                                                    <Table.TextCell>{task.description}</Table.TextCell>
                                                    <Table.TextCell isNumber>{task.assignedToEmployeeId}</Table.TextCell>
                                                    <Table.TextCell> {task.isDone.toString()} </Table.TextCell>
                                                    <Table.TextCell isNumber>{task.assignedByEmployeeId}</Table.TextCell>
                                                </Table.Row>
                                            </>
                                        )))
                                    }
                                </Table.VirtualBody>
                                <Table.VirtualBody height={50}>
                                    <Table.Row key={"newTask"} backgroundColor="#dafce9">
                                        <Table.TextCell> <TextInput name="text-input-name" placeholder="New todo task..." width={"100%"} style={{border: 0}}/> </Table.TextCell> 
                                    </Table.Row>
                                </Table.VirtualBody>
                            </Table>
                    ) : <p> loading </p>
                }
            </div>
        </div>
        </>
    )
}
