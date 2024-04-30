import { useEffect, useState } from 'react';
import style from './Tasks.module.css'
import { Table, TextInput, Badge, Button, SelectMenu, IconButton, TrashIcon, Dialog, TextInputField, Switch  } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken.jsx'


export default function Tasks() {
    CheckToken()
    const [tasks, setTasks] = useState([])
    const accessToken = localStorage.getItem("accessToken")

    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState()
    const [userId, setUserId] = useState(0)

    const [effect, setEffect] = useState(-1)

    const [newTask, setNewTask] = useState({
        "description": "",
        "assignedToEmployeeId": "",
        "isDone": false,
        "assignedByEmployeeId": userId
    })

    const getUser = async () => {
        await fetch(`http://localhost:3000/users/getUserJwt`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{
            setNewTask(prev=>({...prev, ['assignedByEmployeeId']:data.user.id}))
            setUserId(data.user.id)            
        })
    }   

    const getEmployeeByUserId = async (userId) => {
        await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
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
        employeeId && await fetch(`http://localhost:3000/tasks/assignedBy`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=> {setTasks(data.tasks);console.log(data.tasks);});
    }

    const retrieveTaskAssignedTo = async () => {
        employeeId && await fetch(`http://localhost:3000/tasks/assignedTo`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=> setTasks(data.tasks));
    }

    const retrieveEmployees = async () => {
        await fetch(`http://localhost:3000/employees/getColleagues`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
        await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>setRole(data.userOrganization.role))
    }

    const toggleTaskStatus = async (taskId) => {
        await fetch(`http://localhost:3000/tasks/toggleTaskStatus/${taskId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        setEffect(Math.floor(Math.random() * 1000))
    }

    const deleteTask = async (taskId) => {
        await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        setEffect(Math.floor(Math.random() * 1000))
    }


    useEffect(() => {
        getUser()
        retrieveEmployees()
        getEmployeeRole()
        getEmployeeByUserId(userId)
    }, [effect])


    useEffect(()=>{
        role === "administrator" ? retrieveTaskAssignedBy() : retrieveTaskAssignedTo()
    }, [employeeId, effect])

    
    const [ selected, setSelected ] = useState()
    const [ selected2, setSelected2 ] = useState()

    const [ selectedTask, setSelectedTask ] = useState()
    const [ isShown, setIsShown ] = useState(false);

    const updateTask = async (task) => {
        console.log(task)
        await fetch('http://localhost:3000/tasks/updateTask', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ id: task.id, description: task.description, assignedToEmployeeId: task.assignedToEmployeeId, isDone: task.isDone })
        })
        setEffect(Math.floor(Math.random() * 1000))
    }

    const [sortOrder, setSortOrder] = useState('asc')
    const sortingTable = async (attribute) => {
        const sortedTasks = [...tasks];
        sortedTasks.sort((a, b) => {
            const attributeArray = attribute.split('.');
            let aValue = a;
            let bValue = b;
            for (let key of attributeArray) {
                aValue = aValue[key];
                bValue = bValue[key];
            }
            // For string comparison, use localeCompare
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            // For numeric comparison
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
        setTasks(sortedTasks)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    return (
        <>
            <div className={style.tasksMainContainer}>
                <div className={style.tasks}>
                    { role==="administrator" ? <h5> Tasks </h5> : <h5> My Tasks </h5>}
                            {tasks.length > 0 && employees.length ? (
                                <>

                                <Table id={style.tasksTable}>
                                    <Table.Head>
                                        <Table.SearchHeaderCell />
                                        <Table.TextHeaderCell isSelectable  onClick={()=>sortingTable("description")}> Description </Table.TextHeaderCell>
                                        { role==="administrator" && <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("assignedToEmployeeId")}> Assigned to </Table.TextHeaderCell> }
                                        <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("isDone")}> IsDone </Table.TextHeaderCell>
                                        <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("assignedByEmployeeId")}> Assigned by </Table.TextHeaderCell>
                                        <Table.TextHeaderCell>  </Table.TextHeaderCell>
                                    </Table.Head>
                                    <Table.VirtualBody height={390}>
                                        {tasks.map((task, index) => (
                                            
                                                <Table.Row isSelectable onSelect={()=>{ setSelectedTask({"id": task.id, "description": task.description, "assignedToEmployeeId": task.assignedToEmployeeId, "assignedByEmployeeId": task.assignedByEmployeeId, "isDone": task.isDone}); setIsShown(true); setSelected2(task.assignedTo.firstName + " " + task.assignedTo.lastName) } }>  
                                                    <Table.TextCell>{index+1}</Table.TextCell>
                                                    <Table.TextCell>{task.description}</Table.TextCell>
                                                    { role==="administrator" && <Table.TextCell isNumber>{task.assignedTo.firstName} {task.assignedTo.lastName}</Table.TextCell>}
                                                    <Table.TextCell>  
                                                        <Switch checked={task.isDone} onClick={(e) => {e.stopPropagation(); toggleTaskStatus(task.id)}} />
                                                    </Table.TextCell>
                                                    <Table.TextCell isNumber>{task.assignedBy.firstName} {task.assignedBy.lastName}</Table.TextCell>
                                                    <Table.TextCell> <IconButton icon={TrashIcon} intent="danger" marginLeft={100} onClick={(e) => {e.stopPropagation(); deleteTask(task.id)}}/> </Table.TextCell>
                                                </Table.Row>
                                        ))}
                                    </Table.VirtualBody>
                                </Table>

                                <div className={style.tasksContainers}>
                                    {tasks.map(task=>(
                                        <div className={style.tasksContainer} onClick={() => { setSelectedTask({"id": task.id, "description": task.description, "assignedToEmployeeId": task.assignedToEmployeeId, "assignedByEmployeeId": task.assignedByEmployeeId, "isDone": task.isDone}); setIsShown(true); setSelected2(task.assignedTo.firstName + " " + task.assignedTo.lastName)  }}>
                                            <p> Description: {task.description} </p>
                                            <p style={{display:'flex', width:'30vw', justifyContent: 'space-between'}}> Is done: <Switch checked={task.isDone} onClick={(e) => {e.stopPropagation(); toggleTaskStatus(task.id)}} /> </p>
                                            {
                                                role==="administrator" && <p> Assigned to: {task.assignedTo.firstName} {task.assignedTo.lastName} </p>
                                            }
                                            <p> Assigned by: {task.assignedBy.firstName} {task.assignedBy.lastName} </p>
                                        </div>
                                    ))}
                                </div>

                                </>
                            ) : (<>
                                { role==="administrator" ? <p style={{height: '390px'}}> No tasks have been assigned yet </p> : <p style={{height: '390px'}}> You have no tasks </p>}
                                </>
                            )}

                            {
                            role==="administrator" && <div className={style.tasksControls}>
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

            {
                isShown && (
                    <Dialog 
                        isShown={isShown}
                        title="Update task"
                        onCloseComplete={() => setIsShown(false)}
                        onCancel={()=>{setIsShown(false)}}
                        onClose={()=>{setIsShown(false)}}
                        onConfirm={()=>{updateTask(selectedTask); setIsShown(false)}}
                        preventBodyScrolling
                        shouldCloseOnOverlayClick={false}
                        confirmLabel="Custom Label"
                        hasFooter={false}>
                        <TextInputField
                            label="Description"
                            placeholder="Description"
                            name="Description"
                            value={selectedTask.description}
                            onChange={(e)=>setSelectedTask({ ...selectedTask, "description": e.target.value })}
                        />
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', flexDirection:'column'}}>
                            <p style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}> Is done:                             
                                <Switch checked={selectedTask.isDone} style={{width:'8vw'}} onChange={(e)=>{setSelectedTask({ ...selectedTask, "isDone": e.target.checked })}} /> 
                            </p>

                            <p style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}> Assigned to: 
                                <SelectMenu
                                            title="Select name"
                                            options={employees.filter(employee => employee.User.id !== userId).map(employee => ({ label: employee.User.id + " " + employee.User.firstName + " " + employee.User.lastName, value: employee.User.firstName + " " + employee.User.lastName, key: employee.id }))}
                                            selected={selected2}
                                            onSelect={(item) => { setSelected2(item.value); setSelectedTask({ ...selectedTask, "assignedToEmployeeId": +item.key }) }}
                                            label={""}>
                                    <Button>{selected2}</Button>    
                                </SelectMenu>
                            </p>
                        </div>
                    </Dialog>
                )
            }
        </>
    );
}
