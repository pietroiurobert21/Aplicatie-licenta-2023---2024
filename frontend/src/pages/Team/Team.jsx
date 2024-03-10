import { useEffect, useState } from 'react';
import style from './Team.module.css'
import { Avatar, Button, Dialog, TextInput, toaster } from 'evergreen-ui'
import { RemoveIcon } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'

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

    const sendInvitationEmail = async () => {
        
    }

    useEffect(()=>{
        getTeam()
        getOrganization()
    }, [])

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
                            <Button appearance="primary" onClick={()=>{sendInvitationEmail();toaster.success('email sent successfully', { duration: 1.5 })}}> send </Button>
                            <Button appearance="default" onClick={()=>{navigator.clipboard.writeText(organization.code); toaster.success('Code copied to clipboard', { duration: 1.5 });}}> copy code to clipboard </Button>
                        </div>
                </Dialog>

                <Button onClick={() => setIsShown(true)}> invite </Button>
            </div>

        {isLoading ? (
            <p>Loading...</p>
        ) : team.length > 0 ? (
            <ul>
                {team.map((colleague, index) => (
                    <li key={index} style={{display: 'flex', justifyContent: 'space-between', height: '8vh'}}>
                        <p> 
                            <Avatar name={`${colleague.User.firstName} ${colleague.User.lastName}`} size={40} marginRight={10}/>
                            {colleague.User.firstName} {colleague.User.lastName} - {colleague.role}
                        </p>
                        { colleague.role!='administrator' && <p style={{color: 'red', paddingRight: '2vw'}} onClick={()=>{alert('remove member?')}}> <RemoveIcon/> </p> }
                    </li>
                ))}
            </ul>
        ) : (
            <p>No colleagues found.</p>
        )}
    </div>
    )
}