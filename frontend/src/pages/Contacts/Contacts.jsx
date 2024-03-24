import { toaster, Button, NewPersonIcon } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken.jsx'
import { useEffect, useState } from 'react';

import TableComponent from "../../components/Table/TableComponent.jsx"
import DialogComponent from '../../components/Dialog/DialogComponent.jsx';

export default function Contacts() {
    CheckToken()

    const [ contacts, setContacts ] = useState([])

    const [ isShown, setIsShown ] =   useState(false)
    const [ shownContact, setShownContact ] = useState({})

    const [ updated, setUpdated ] = useState('')

    const organizationId = localStorage.getItem('organizationId')
    const accessToken = localStorage.getItem('accessToken')

    const [newContact, setNewContact] = useState({
        firstName: '',
        lastName: '',
        professionalTitle: '',
        emailAddress: '',
        homeAddress: '',
        phoneNumber: '',
        companyName: '',
        pipelineStatus: 'customer',
        organizationId: organizationId
    });

    const retrieveContacts = async () => {
        const res = await fetch(`http://localhost:3000/contacts/customers/${organizationId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (res.status==404)
            setContacts(-1)
        else {
            const data = await res.json()
            setContacts(data.contacts)
        }
    }

    const addNewContact = async () => {
        let missingFields = false;
        for(let key in newContact)
            if (newContact[key] == '') {
                missingFields = true;
            }

        if (missingFields==false) {
            await fetch("http://localhost:3000/contacts", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newContact)
            })
            setUpdated(newContact.id + ' ' + newContact.firstName + ' ' + newContact.lastName)
        } else {
            toaster.danger('missing fields!');
        }
    }


    useEffect(() => {
        organizationId && retrieveContacts()
    }, [updated])

    return (
        <>  
        {
            contacts == -1 ? <p style={{width:"100vw", textAlign:'center'}}> No contacts found </p> :
                <>
                {
                    contacts ? (
                        <>
                            <TableComponent data={contacts}/>
                        </>
                    ) : <p> loading </p>
                }
                </>
        }
        <DialogComponent data={shownContact} isShown={isShown} setIsShown={setIsShown} setNewContact={setNewContact} newContact={newContact} handleConfirm={addNewContact}/> 
        <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> New contact </Button>
        <Button appearance="default" intent="success" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> Import from csv </Button>
        </>
    )
}