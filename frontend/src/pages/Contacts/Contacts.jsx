import { toaster, Button, NewPersonIcon, Dialog, SelectMenu, TextInputField, Switch, RocketSlantIcon } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken.jsx'
import { useEffect, useState } from 'react';

import TableComponent from "../../components/Table/TableComponent.jsx"
import DialogComponent from '../../components/Dialog/DialogComponent.jsx';
import EmailTemplates from "../EmailTemplates/EmailTemplates.jsx"
import sendEmail from "../../components/ElasticEmail/ElasticEmail.js"

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

    const [ showMarketingDialog, setShowMarketingDialog ] = useState(false)
    const [ selected, setSelected ] = useState('')
    const [ checkedAllContacts, setCheckedAllContacts] = useState(false)
    const [ content, setContent ] = useState('')
    const [ subject, setSubject ] = useState('')

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

    const startMarketingCampaign = async () => {
        const emailAddress = selected
        if (emailAddress=='') {
            toaster.warning("at least one contact has to be selected!")
        } else if (content=='') {
            toaster.warning("a template has to be selected! you can make your own in the template editor tab.")
        } else if (subject=='') {
            toaster.warning("an email subject is required!")
        } else {
            try {
                await sendEmail(emailAddress, subject, content)
                toaster.success("email sent successfully!")   
            } catch (error) {
                toaster.warning("email could not be sent!")   
            }               
        }
    }


    useEffect(() => {
        organizationId && retrieveContacts()
    }, [updated])


    const [shownSelected, setShownSelected] = useState()
    return (
        <>  
        {
            contacts == -1 ? <p style={{width:"100vw", textAlign:'center'}}> No contacts found </p> :
                <>
                {
                    contacts ? (
                        <>
                            <TableComponent data={contacts} showSatisfaction={true}/>
                            <Button appearance="default" intent='none' style={{left:"2%"}} onClick={() => setShowMarketingDialog(true)}> <RocketSlantIcon/> New marketing campaign </Button>

                            <Dialog
                                isShown={showMarketingDialog}
                                title="Set up a marketing campagin"
                                onConfirm={() => {setShowMarketingDialog(false); startMarketingCampaign()}}
                                onCancel={()=> setShowMarketingDialog(false)}
                                onCloseComplete={()=>setShowMarketingDialog(false)}
                            >
                                <p style={{color:'#BBB7B6'}}> Step 1: select recipients </p>
                                <p style={{display:'flex', width:'100%', gap:'4%', color: !checkedAllContacts && '#BBB7B6'}}> All contacts <Switch checked={checkedAllContacts} onChange={(e) => {setCheckedAllContacts(e.target.checked); setSelected(contacts)}} /></p>
                                    {
                                        !checkedAllContacts && (
                                            <SelectMenu
                                            title="Select name"
                                            options={contacts.map(contact => ({ label: contact.firstName, value: contact.firstName, emailAddress: contact.emailAddress,  key: contact.id }))}
                                            selected={shownSelected}
                                        
                                            onSelect={(item) => {setShownSelected(item.value); setSelected([{"emailAddress": item.emailAddress, "firstName": item.value }] )}}>
                                                
                                            <TextInputField 
                                                label="Desired contact"
                                                isSelectable={false}
                                                value={shownSelected || 'Select name...'}/>
                                        </SelectMenu>
                                        )
                                    }

                            <p style={{paddingTop: '7vh', color:'#BBB7B6'}}> Step 2: select the email template to be used </p>
                                    <p style={{display:'flex', width:'100%', gap:'4%', alignItems: 'center'}}> Desired email template <EmailTemplates setContent={setContent}/> </p>
                            
                            <p style={{paddingTop: '7vh', color:'#BBB7B6'}}> Step 3: select the email subject </p>
                                            <TextInputField 
                                                placeholder='email subject'
                                                onChange={(e)=>(setSubject(e.target.value))}
                                            />

                            <p style={{paddingTop: '7vh', color:'#BBB7B6'}}> Step 4: start the campaign by pressing the "Confirm" button </p>
                            </Dialog>
                        </>
                    ) : <p> loading </p>
                }
                </>
        }
        <DialogComponent data={shownContact} isShown={isShown} setIsShown={setIsShown} setNewContact={setNewContact} newContact={newContact} handleConfirm={addNewContact}/> 
        <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> New contact </Button>
        </> 
    )
}