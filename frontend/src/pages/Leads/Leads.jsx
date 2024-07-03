import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/TableComponent.jsx"
import { Button, NewPersonIcon, toaster } from "evergreen-ui";
import DialogComponent from "../../components/Dialog/DialogComponent.jsx";
import CheckToken from '../../middlewares/CheckToken.jsx'
import style from './Leads.module.css';

export default function Leads() {
    CheckToken()    
    const [ leads, setLeads ] = useState([])

    const accessToken = localStorage.getItem('accessToken')

    const [ isShown, setIsShown ] =   useState(false)

    const [ shownLead, setShownLead ] = useState({})
    const [ updated, setUpdated ] = useState()

    const [newLead, setNewLead] = useState({
        firstName: '',
        lastName: '',
        professionalTitle: '',
        emailAddress: '',
        homeAddress: '',
        phoneNumber: '',
        companyName: '',
        pipelineStatus: 'lead',
        organizationId: ''
    });

    const addNewLead = async () => {
        let missingFields = false;
        for(let key in newLead)
            if (newLead[key] == '') {
                missingFields = true;
            }
        console.log(newLead)
        if (missingFields==false) {
            const response = await fetch("http://localhost:3000/contacts", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newLead)
            })
            if (response.ok) {
                toaster.success("contact modified successfully!")
            } else {
                const responseJson = await response.json();
                toaster.danger(responseJson.error)
            }
            setUpdated(Math.floor(Math.random() * 9000))
        } else {
            toaster.danger('missing fields!');
        }
    }

    const retrieveLeads = async () => {
        const res = await fetch(`http://localhost:3000/leads`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        
        if (res.status==404)
            setLeads(-1)
        else {
            const data = await res.json()
            setLeads(data.leads)
        }
    }

    const getOrganization = async () => {
        await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{
            setNewLead(prev=>({...prev, ['organizationId']: data.organization.organizationId}))
        })
    }
    


    useEffect(()=>{
        getOrganization()
        retrieveLeads()
    }, [updated])

    useEffect(()=>{

    }, [leads])

    return (
        <div className={style.contactsPage}>
            <div className={style.headerContacts}>
                {leads && <p style={{fontWeight: 500, paddingLeft: "2%"}}> Total: {leads!=-1 ? leads.length : 0} records </p> }
                {/* <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> New lead </Button> */}
                <div className={style.buttons}>
                    <button onClick={() => setIsShown(true)}>  New contact  <NewPersonIcon/> </button>
                </div>
            </div>
            {
                leads == -1 ? <p style={{width:"100vw", textAlign:'center'}}> No leads found </p> :
                <>
                    {
                        leads ? 
                        (
                            <>
                                <TableComponent data={leads} showSatisfaction={false} setUpdated={setUpdated} setProfiles={setLeads}/> 
                            </>
                        )
                        : 
                        <p> loading </p>
                    }
            </>
            }
            <DialogComponent title={"Add new lead"}  data={newLead} isShown={isShown} setIsShown={setIsShown} setNewContact={setNewLead} newContact={newLead} handleConfirm={addNewLead}/> 
        </div>
    )
}