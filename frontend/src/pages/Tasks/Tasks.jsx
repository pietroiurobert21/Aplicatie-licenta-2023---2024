import { useEffect, useState } from 'react';
import style from './Tasks.module.css'
import { Table, TextInput, Checkbox, Button, SelectMenu, TextInputField  } from 'evergreen-ui'


export default function Tasks() {

    const [tasks, setTasks] = useState([])
    const accessToken = localStorage.getItem("accessToken")

    const [employees, setEmployees] = useState([])
    const userId = localStorage.getItem('userId')
    const [employeeId, setEmployeeId] = useState()

    const [newTask, setNewTask] = useState({
        "description": "",
        "assignedToEmployeeId": "",
        "isDone": false,
        "assignedByEmployeeId": userId
    })

    const getEmployeeByUserId = async (userId) => {
        await fetch(`http://localhost:3000/employees/getEmployee/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }})
            .then(data=>data.json())
            .then(data=> {
                setNewTask({ ...newTask, "assignedByEmployeeId": data.userOrganization.id })
                setEmployeeId(data.userOrganization.id)
            })
    }

    const retrieveTaskAssignedBy = async () => {
        await fetch(`http://localhost:3000/tasks/assignedBy/${employeeId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=> setTasks(data.tasks));
    }

    const retrieveTaskAssignedTo = async () => {
        await fetch(`http://localhost:3000/tasks/assignedTo/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=> setTasks(data.tasks));
    }

    const retrieveEmployees = async () => {
        await fetch(`http://localhost:3000/employees/getColleagues/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(data=>data.json())
        .then(data=>setEmployees(data.colleagues))
    }

    const addNewTask = async () => {
        if (newTask.description == "" || newTask.assignedByEmployeeId==0)
            alert("missing fields")
        else {
            await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newTask)
            })
            setEffect(Math.floor(Math.random() * 1000))
        }

        console.log(newTask)
    }

    const [role, setRole] = useState('')
    const getEmployeeRole = async () => {
        await fetch(`http://localhost:3000/employees/getEmployee/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>setRole(data.userOrganization.role))
    }

    const [effect, setEffect] = useState('')
    useEffect(() => {
        retrieveEmployees()
        getEmployeeRole()
        getEmployeeByUserId(userId)
    }, [effect])

    useEffect(()=>{
        role == "administrator" ? retrieveTaskAssignedBy() : retrieveTaskAssignedTo()
    }, [employeeId, effect])

    
    const [selected, setSelected] = useState()

    return (
        <>
            <div className={style.tasksContainer}>
                <div className={style.tasks}>
                    { role==="administrator" ? <h5> Tasks </h5> : <h5> My Tasks </h5>}
                            {tasks.length > 0 && employees.length ? (
                                <Table style={{ width: "90vw" }}>
                                    <Table.Head>
                                        <Table.SearchHeaderCell />
                                        <Table.TextHeaderCell> Description </Table.TextHeaderCell>
                                        { role==="administrator" && <Table.TextHeaderCell> Assigned to </Table.TextHeaderCell> }
                                        <Table.TextHeaderCell> IsDone </Table.TextHeaderCell>
                                        <Table.TextHeaderCell> Assigned by </Table.TextHeaderCell>
                                    </Table.Head>
                                    <Table.VirtualBody height={390}>
                                        {tasks.map((task, index) => (
                                            
                                                <Table.Row isSelectable>
                                                    <Table.TextCell>{task.id}</Table.TextCell>
                                                    <Table.TextCell>{task.description}</Table.TextCell>
                                                    { role==="administrator" && <Table.TextCell isNumber>{task.assignedTo.firstName} {task.assignedTo.lastName}</Table.TextCell>}
                                                    <Table.TextCell> {task.isDone.toString()} </Table.TextCell>
                                                    <Table.TextCell isNumber>{task.assignedBy.firstName} {task.assignedBy.lastName}</Table.TextCell>
                                                </Table.Row>
                                            
                                        ))}
                                    </Table.VirtualBody>
                                </Table>
                            ) : (
                                <p> { role==="administrator" ? <p style={{height: '390px'}}> No tasks have been assigned yet </p> : <p style={{height: '390px'}}> You have no tasks </p>} </p>
                            )}

                            {
                            role==="administrator" && <div style={{display:'flex',justifyContent:'start',width:'100%',alignItems:'center', paddingLeft:'10%'}}>
                                    <TextInput name="text-input-name" placeholder="Description..." style={{ width: "40vw" }} onChange={(e) => { setNewTask({ ...newTask, "description": e.target.value }) }} />
                                    <SelectMenu
                                        title="Select name"
                                        options={employees.filter(employee => employee.User.id !== userId).map(employee => ({ label: employee.User.firstName + " " + employee.User.lastName, value: employee.User.firstName + " " + employee.User.lastName, key: employee.id }))}
                                        selected={selected}
                                        onSelect={(item) => { setSelected(item.value); setNewTask({ ...newTask, "assignedToEmployeeId": +item.key }) }}
                                        label={""}>
                                        <Button>{selected || 'Select name...'}</Button>
                                    </SelectMenu>
                                    <Button onClick={addNewTask}> add task </Button>
                                </div>
                            }
                </div>
            </div>
        </>
    );
    
}
