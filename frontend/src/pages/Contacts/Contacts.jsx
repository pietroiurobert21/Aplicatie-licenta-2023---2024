import { toaster, Button, NewPersonIcon, DocumentIcon, Dialog, SelectMenu, TextInputField, Switch, RocketSlantIcon } from 'evergreen-ui'
import { Popover, FilterIcon, TextInput } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken.jsx'
import { useEffect, useState } from 'react';
import style from './Contacts.module.css'

import TableComponent from "../../components/Table/TableComponent.jsx"
import DialogComponent from '../../components/Dialog/DialogComponent.jsx';
import EmailTemplates from "../EmailTemplates/EmailTemplates.jsx"
import sendEmail from "../../components/ElasticEmail/ElasticEmail.js"

import FileUploader from '../../components/FileUploader/FileUploader.jsx'

export default function Contacts() {
    CheckToken()

    const [ filters, setFilters ] = useState({
        firstName: '',
        lastName: ''
    })

    const [ contacts, setContacts ] = useState([])
    const [ isShown, setIsShown ] =   useState(false)
    const [ shownContact, setShownContact ] = useState({})
    const [ uploadIsShown, setUploadIsShown ] = useState(false);
    const [organizationId, setOrganizationId] = useState(-1)

    const [ updated, setUpdated ] = useState()

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
        organizationId: ''
    });

    const [ showMarketingDialog, setShowMarketingDialog ] = useState(false)
    const [ selected, setSelected ] = useState('')
    const [ checkedAllContacts, setCheckedAllContacts] = useState(false)
    const [ content, setContent ] = useState('')
    const [ subject, setSubject ] = useState('')

    const retrieveContacts = async () => {
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`http://localhost:3000/contacts/customers/?${query}`, {
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

    const getOrganization = async () => {
        await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{
            setOrganizationId(data.organization.id);
            setNewContact(prev=>({...prev, ['organizationId']: data.organization.id}));
        })
    }

    const addNewContact = async (contact) => {
        console.log(contact)
        let missingFields = false;
        for(let key in newContact)
            if (contact[key] == '') {
                missingFields = true;
            }

        if (missingFields==false) {
            const response = await fetch("http://localhost:3000/contacts", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(contact)
            })
            if (response.ok) {
                toaster.success("contact added!", {id:'1'})
            } else {
                const responseJson = await response.json()
                toaster.danger(responseJson.error, {id:'1'})
            }
            setUpdated(Math.floor(Math.random() * 9000))
        } else {
            toaster.danger('missing fields!', {id:'1'});
        }
    }

    const startMarketingCampaign = async () => {
        const emailAddress = selected.map(item => item.emailAddress);
        const names = selected.map(item => item.firstName)

        console.log(emailAddress)
        if (emailAddress.length==0) {
            toaster.warning("at least one contact has to be selected!")
        } else if (content.trim()=='') {
            toaster.warning("a template has to be selected! you can make your own in the template editor tab.")
        } else if (subject.trim()=='') {
            toaster.warning("an email subject is required!")
        } else {
            try {
                // await sendEmail(emailAddress, subject, content)
                console.log(emailAddress)

                await fetch("http://localhost:3000/emails/sendEmail", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({to: emailAddress, subject: subject, text: content, html: content, names: names})
                })
                setSelected([])
                toaster.success("email sent successfully!")   
                getOrganization()
                saveCampaignToDataBase()
            } catch (error) {
                toaster.warning("email could not be sent!")   
            }               
        }
    }

    const saveCampaignToDataBase = async () => {
        await fetch(`http://localhost:3000/campaigns`, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({date: new Date(), emailsSent: selected.length, subject: subject})
        })
        setUpdated(Math.floor(Math.random() * 9000))
    }

    const saveMultipleContacts = async () => {
        for (const contact of jsonArray) {
            contact.organizationId = organizationId
            if (contact.pipelineStatus && (contact.pipelineStatus=='lead' || contact.pipelineStatus=='customer')) {
                await addNewContact(contact);
            }
        }
        setUpdated(prev => prev + 1);
    }


    useEffect(() => {
        getOrganization()
        retrieveContacts()
    }, [updated, filters])

    useEffect(()=>{

    }, [contacts])
    

    const [ shownSelected, setShownSelected ] = useState()
    const [ jsonArray, setJSONArray ] = useState([])

    return (
        <div className={style.contactsPage}>  
            <div className={style.headerContacts}>
                { contacts && contacts.length && <p> Total: {contacts.length} records </p> }
                <div className={style.buttons}>
                        <Popover content={({close}) => (
                            <div className={style.filterDiv}>
                                <TextInputField
                                    description="First name"
                                    placeholder="First name"
                                    name="firstName"
                                    defaultValue={filters.firstName}
                                    onChange={(e)=>{setFilters((prev)=>({...prev, ['firstName']: e.target.value}))}}
                                />
                                <TextInputField
                                    description="Last name"
                                    placeholder="Last name"
                                    name="lastName"
                                    defaultValue={filters.lastName}
                                    onChange={(e)=>{setFilters((prev)=>({...prev, ['lastName']: e.target.value}))}}
                                />
                                <Button appearance ="minimal" onClick={()=>{setFilters({}); close()}}> Reset filters </Button>
                            </div>
                        )}>
                            <button> Filters <FilterIcon/> </button> 
                        </Popover>
                    <button onClick={() => setIsShown(true)}>  New contact  <NewPersonIcon/> </button>
                    <button onClick={()=>setUploadIsShown(true)}>  Import data <DocumentIcon/></button>
                    { contacts!=-1 && <button onClick={() => setShowMarketingDialog(true)}>New marketing campaign <RocketSlantIcon/> </button> }
                </div>
            </div>
        {
            contacts == -1 ? <p style={{width:"100%", textAlign:'center'}}> No contacts found </p> :
                <>
                {
                    contacts ? (
                        <>
                            <TableComponent data={contacts} setUpdated={setUpdated} setProfiles={setContacts} type="customers"/>
                            <Dialog
                                isShown={showMarketingDialog}
                                title="Set up a marketing campagin"
                                onConfirm={() => {setShowMarketingDialog(false); setCheckedAllContacts(false); startMarketingCampaign();}}
                                onCancel={()=> {setShowMarketingDialog(false); setCheckedAllContacts(false); setSelected([])}}
                                onCloseComplete={()=>{setShowMarketingDialog(false); setCheckedAllContacts(false); setShownSelected(null); setSelected([])}}
                                shouldCloseOnOverlayClick={false}
                            >
                                <p style={{color:'#BBB7B6'}}> Step 1: select recipients </p>
                                <p style={{display:'flex', width:'100%', gap:'4%', color: !checkedAllContacts && '#BBB7B6'}}> All contacts <Switch checked={checkedAllContacts} onChange={(e) => {setCheckedAllContacts(e.target.checked); if (e.target.checked) setSelected(contacts); else setSelected([])}} /></p>
                                    {
                                        !checkedAllContacts && (
                                            <SelectMenu
                                            title="Select name"
                                            options={contacts.map(contact => ({ label: contact.emailAddress, value: contact.firstName, emailAddress: contact.emailAddress,  key: contact.id }))}
                                            selected={shownSelected}
                                        
                                            onSelect={(item) => {setShownSelected(item.value); setSelected([{emailAddress: item.emailAddress, firstName: item.value}] )}}>
                                                
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

        <Dialog
            isShown={uploadIsShown}
            title="Import data from external files"
            onCloseComplete={() => setUploadIsShown(false)}
            onCancel={() => setUploadIsShown(false)}
            onConfirm={()=>{console.log(jsonArray); saveMultipleContacts()}}
        >
            <FileUploader setJSONArray={setJSONArray}/>
        </Dialog>


        <DialogComponent title={"Add new customer"} data={newContact} isShown={isShown} setIsShown={setIsShown} setNewContact={setNewContact} newContact={newContact} handleConfirm={addNewContact}/> 
        </div> 
    )
}