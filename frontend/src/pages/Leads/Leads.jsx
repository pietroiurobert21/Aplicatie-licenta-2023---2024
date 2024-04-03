import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/TableComponent.jsx"
import { Button, NewPersonIcon, toaster } from "evergreen-ui";
import DialogComponent from "../../components/Dialog/DialogComponent.jsx";
import CheckToken from '../../middlewares/CheckToken.jsx'

export default function Leads() {
    CheckToken()    
    const [ leads, setLeads ] = useState([])

    const organizationId = localStorage.getItem('organizationId')
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
        organizationId: organizationId
    });

    const addNewLead = async () => {
        let missingFields = false;
        for(let key in newLead)
            if (newLead[key] == '') {
                missingFields = true;
            }

        if (missingFields==false) {
            await fetch("http://localhost:3000/contacts", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newLead)
            })
            setUpdated(Math.floor(Math.random() * 9000))
        } else {
            toaster.danger('missing fields!');
        }
    }

    const retrieveLeads = async () => {
        const res = await fetch(`http://localhost:3000/leads/${organizationId}`, {
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


    useEffect(()=>{
        organizationId && retrieveLeads()
    }, [updated])

    return (
        <>
            {
                leads == -1 ? <p style={{width:"100vw", textAlign:'center'}}> No leads found </p> :
                <>
                    {
                        leads ? 
                        (
                            <>
                                <TableComponent data={leads} showSatisfaction={false} setUpdated={setUpdated}/> 
                            </>
                        )
                        : 
                        <p> loading </p>
                    }
            </>
            }
            <DialogComponent title={"Add new lead"}  data={shownLead} isShown={isShown} setIsShown={setIsShown} setNewContact={setNewLead} newContact={newLead} handleConfirm={addNewLead}/> 
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> New lead </Button>
        </>
    )
}