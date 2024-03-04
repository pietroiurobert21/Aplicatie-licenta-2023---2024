import { useEffect, useState } from 'react';
import style from './Tasks.module.css'
import { Table, TextInput, Checkbox } from 'evergreen-ui'


export default function Tasks() {

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    const accessToken = localStorage.getItem("accessToken")

    const retrieveTasks = async () => {
        await fetch(`http://localhost:3000/tasks`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=> {
            setTasks(data.tasks)
            setLoading(false)
            console.log(tasks)
        });
    }

    useEffect(() => {
        retrieveTasks()
    }, [])

    
    // TODO MOVE BOTH TABLES IN DIFFERENT .JSX FILES AS INDIVIDUAL COMPONENTS

    
    const [checked, setChecked] = useState(false)
    return (
        <>
        <div className={style.tasksContainer}>
            <div className={style.todo}>
                <h5> Todo-list </h5>
                    <Table width={400}>
                        <Table.Head backgroundColor="#fcfbda">
                            <Table.TextHeaderCell maxWidth={80}>  </Table.TextHeaderCell>
                            <Table.TextHeaderCell> Description </Table.TextHeaderCell>
                        </Table.Head>    
                        <Table.VirtualBody height={390}>
                            <Table.Row key={1} isSelectable>
                                <Table.TextCell maxWidth={80}> 
                                    <Checkbox checked={checked} display='flex' justifyContent='center' alignItems='center' onChange={e => setChecked(e.target.checked)}/> 
                                </Table.TextCell>
                                <Table.TextCell> some description  awdddddadaaaaaaaaaaaaaaa</Table.TextCell>
                            </Table.Row>
                        </Table.VirtualBody>
                        <Table.VirtualBody height={50}>
                            <Table.Row key={"newTask"} backgroundColor="#fcfbda">
                                <Table.TextCell> <TextInput name="text-input-name" placeholder="New todo task..." width={"100%"} style={{border: 0}}/> </Table.TextCell> 
                            </Table.Row>
                        </Table.VirtualBody>
                    </Table>
            </div>
            <div className={style.tasks}>
                <h5> Tasks </h5>

                {
                    loading ? <p> loading </p> : (

                            <Table>
                                <Table.Head width={800} backgroundColor="#dafce9">
                                    <Table.SearchHeaderCell />
                                    <Table.TextHeaderCell>Description</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Assigned to:</Table.TextHeaderCell>
                                </Table.Head>    
                                <Table.VirtualBody height={390}>
                                    {
                                        (tasks.map((task)=> (
                                            <>
                                                <Table.Row key={task.id} isSelectable>
                                                    <Table.TextCell>{task.id}</Table.TextCell>
                                                    <Table.TextCell>{task.description}</Table.TextCell>
                                                    <Table.TextCell isNumber>{task.employeeId}</Table.TextCell>
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
                    )
                }
            </div>
        </div>
        </>
    )
}
