import { useEffect, useState } from 'react';
import style from './Team.module.css'
import { Avatar, Button, Dialog, TextInput, toaster, Tooltip, InfoSignIcon } from 'evergreen-ui'
import { RemoveIcon } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'
import sendEmail from "../../components/ElasticEmail/ElasticEmail.js"

export default function Team() {
    CheckToken()
    const [team, setTeam] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [isShown, setIsShown] =   useState(false)
    const [email, setEmail] = useState('')

    const [organization, setOrganization] = useState({})

    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')

    const getTeam = async () => {
        const res = await fetch(`http://localhost:3000/employees/getColleagues/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setTeam(data.colleagues)
            console.log(data)
            setIsLoading(false)
        } else if (res.status == 401) {
            localStorage.removeItem("accessToken")
        }
    }

    const getOrganization = async () => {
        const res = await fetch(`http://localhost:3000/organizations/getByUserId/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setOrganization(data.organization)
            console.log(data)
        } else if (res.status == 401) {
            localStorage.removeItem("accessToken")
        }
    }

    const handleEmailSender = async (emailAddress, content) => {
        try {
            await sendEmail(emailAddress, "Invitation code to CRMLite", content)
            toaster.success("email sent successfully!")   
        } catch (error) {
            toaster.warning("email could not be sent!")   
        }
    }


    const [ employeeFired, setEmployeeFired ] = useState('')
    const fireEmployee = async (id) => {
        await fetch(`http://localhost:3000/employees/deleteEmployee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        setEmployeeFired('true' + id)
    }

    const [ userRole, setUserRole ] = useState()
    const getEmployeeRole = async () => {
        const res = await fetch(`http://localhost:3000/employees/getEmployee/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setUserRole(data.userOrganization.role)
        }
    }

    useEffect(()=>{
        getTeam()
        getOrganization()
        getEmployeeRole()
    }, [employeeFired])

    return (
        <div className={style.teamContainer}>
            <div className={style.header}>
                <p><b> Team members - {organization.name} </b></p>

                <Dialog
                    isShown={isShown}
                    title="Send invitation code"
                    onCloseComplete={() => setIsShown(false)}
                    hasFooter={false}>
                        <div className={style.invitationContainer}> 
                            <TextInput name="text-input-name" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                            <Button appearance="primary" onClick={()=>{
                                handleEmailSender([{"emailAddress": email, "firstName": email }], `<p>You have been invited to join the organization  <b>${organization.name}</b>  within the  <b>CRMLite</b>  website. Below is the invitation code: </p><p>${organization.code}</p>`);
                                setIsShown(false)
                            }}> send </Button>
                            <Button appearance="default" onClick={()=>{navigator.clipboard.writeText(organization.code); toaster.success('Code copied to clipboard', { duration: 1.5 });}}> copy code to clipboard </Button>
                        </div>
                </Dialog>

                <Button onClick={() => setIsShown(true)}> invite </Button>
            </div>

            <div className={style.teamBody}>

                {isLoading ? (
                    <p>Loading...</p>
                ) : team.length > 0 ? (
                    <ul>
                        {team.map((colleague, index) => (
                            <li key={index} style={{display: 'flex', justifyContent: 'space-between', height: '8vh'}}>
                                <p> 
                                    <Tooltip content={`email: ${colleague.User.email}`} showDelay={1000}>
                                        <div style={{display:'flex', alignItems:'center', width:'20vw', height: '8vh'}}> <Avatar name={`${colleague.User.firstName} ${colleague.User.lastName}`} size={40} marginRight={10}/> {colleague.User.firstName} {colleague.User.lastName} </div>
                                    </Tooltip>
                                    <div style={{display:'flex', alignItems:'center', width:'15vw'}}>{colleague.role}</div>
                                    <Tooltip content="Points are calculated as the number of accepted deals initiated by the user." showDelay={1000}>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'start', gap: '3%', height: '8vh', width:'fit-content'}}>
                                            <InfoSignIcon/>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'end', width:'3vw'}}>{colleague.points}</div>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'start'}}> points </div>
                                        </div>
                                    </Tooltip>
                                </p>
                                { 
                                userRole=='administrator' &&  colleague.role!='administrator' && <p style={{color: 'red', paddingRight: '2vw'}} onClick={()=>{alert('remove member?'); fireEmployee(colleague.id)}}> <RemoveIcon/> </p> 
                                }
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No colleagues found.</p>
                )}
            </div>
    </div>
    )
}