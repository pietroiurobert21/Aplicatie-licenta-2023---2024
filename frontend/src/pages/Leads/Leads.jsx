import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/TableComponent.jsx"
import { Button, NewPersonIcon, toaster, Popover, FilterIcon, TextInputField, DocumentIcon, Pane, Dialog } from "evergreen-ui";
import DialogComponent from "../../components/Dialog/DialogComponent.jsx";
import CheckToken from '../../middlewares/CheckToken.jsx'
import style from './Leads.module.css';
import FileUploader from '../../components/FileUploader/FileUploader.jsx'

export default function Leads() {
    CheckToken()    

    const [ filters, setFilters ] = useState({
        firstName: '',
        lastName: '',
        professionalTitle: '',
        companyName: ''
    })

    const [ leads, setLeads ] = useState([])

    const accessToken = localStorage.getItem('accessToken')

    const [ isShown, setIsShown ] =   useState(false)
    const [ uploadIsShown, setUploadIsShown ] = useState(false);

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
    const [organizationId, setOrganizationId] = useState(-1)

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
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`http://localhost:3000/leads/?${query}`, {
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
            setOrganizationId(data.organization.id);
            setNewLead(prev=>({...prev, ['organizationId']: data.organization.organizationId}))
        })
    }
    
    const [ toasterMessage, setToasterMessage ] = useState({
        added: 0,
        errors: 0,
        missing: 0
    }) 
    const addNewLeadNoToaster = async (contact) => {
        let missingFields = false;
        for(let key in contact)
            if (contact[key] == '') {
                missingFields = true;
            }
        console.log(contact)
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
                setToasterMessage(prev => ({...prev, added: prev.added + 1}))
            } else {
                const responseJson = await response.json();
                setToasterMessage(prev => ({...prev, errors: prev.errors + 1}))
            }
        } else {
            setToasterMessage(prev => ({...prev, missing: prev.missing + 1}))
        }
        setUpdated(Math.floor(Math.random() * 9000))
    }


    const [updatedMultiple, setUpdatedMultiple] = useState(0)

    const saveMultipleContacts = async () => {
        setToasterMessage({
            added: 0,
            errors: 0,
            missing: 0
        })
        for (const contact of jsonArray) {
            if (Object.keys(contact).length == 7 && contact.firstName && contact.lastName && contact.professionalTitle && contact.emailAddress && contact.homeAddress && contact.phoneNumber && contact.companyName) {
                contact.organizationId = organizationId
                contact.pipelineStatus = 'lead'
                
                await addNewLeadNoToaster(contact);
            } else {
                toaster.danger("Incorrect collumns found")
            }
        }   

        setUpdatedMultiple(prev => prev + 1);
    }



    useEffect(()=>{
        getOrganization()
        retrieveLeads()
    }, [updated, filters])

    useEffect(()=>{

    }, [leads])

    useEffect(()=>{
        console.log(toasterMessage)

        if (toasterMessage.added > 1) {
            toaster.notify(toasterMessage.added + " customers added")
        } else if (toasterMessage.added == 1) {
            toaster.notify(toasterMessage.added + " customer added")
        }

        if (toasterMessage.errors > 1) {
            toaster.notify(toasterMessage.errors + " contacts already exist or do not meet the format!")
        } else if (toasterMessage.errors == 1) {
            toaster.notify(toasterMessage.errors + " contact already exists or does not meet the format!")
        }

        if (toasterMessage.missing > 1) {
            toaster.notify(toasterMessage.missing + " records have missing fields!")
        } else if (toasterMessage.missing == 1) {
            toaster.notify(toasterMessage.missing + " record has missing fields!")
        }

        setToasterMessage({
            added: 0,
            errors: 0,
            missing: 0
        })
    }, [updatedMultiple])

    const [ jsonArray, setJSONArray ] = useState([])
    return (
        <div className={style.contactsPage}>
            <div className={style.headerContacts}>
                {leads && <p style={{fontWeight: 500, paddingLeft: "2%"}}> Total: {leads!=-1 ? leads.length : 0} records </p> }
                {/* <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> New lead </Button> */}
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
                                <TextInputField
                                    description="Professional title"
                                    placeholder="Professional title"
                                    name="professionalTitle"
                                    defaultValue={filters.professionalTitle}
                                    onChange={(e)=>{setFilters((prev)=>({...prev, ['professionalTitle']: e.target.value}))}}
                                />
                                <TextInputField
                                    description="Company name"
                                    placeholder="Company name"
                                    name="companyName"
                                    defaultValue={filters.companyName}
                                    onChange={(e)=>{setFilters((prev)=>({...prev, ['companyName']: e.target.value}))}}
                                />
                                <Button style={{overflow:'visible'}} appearance ="minimal" onClick={()=>{setFilters({}); close()}}> Reset filters </Button>
                                <Button style={{overflow:'visible'}} appearance ="minimal" onClick={()=>{close()}}> Close </Button>
                            </div>
                        )} shouldCloseOnExternalClick={false}>
                            <button> <FilterIcon/> Filters </button> 
                        </Popover>
                    <button onClick={() => setIsShown(true)}>  <NewPersonIcon/> New contact  </button>
                    <button onClick={()=>setUploadIsShown(true)}> <DocumentIcon/> Import data </button>
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

        <Dialog
            isShown={uploadIsShown}
            title="Import data from external files"
            onCloseComplete={() => setUploadIsShown(false)}
            footer={
                <Pane display="flex" justifyContent="flex-end" padding={8}>
                    <Button style={{overflow:'visible'}} marginRight={8} onClick={()=>setUploadIsShown(false)}>
                        Cancel
                    </Button>
                    <Button style={{overflow:'visible'}} appearance="primary" onClick={() => {console.log(jsonArray); saveMultipleContacts()}}>
                        Confirm
                    </Button>
                </Pane>
            }
        >
            <FileUploader setJSONArray={setJSONArray}/>
        </Dialog>





            <DialogComponent title={"Add new lead"}  data={newLead} isShown={isShown} setIsShown={setIsShown} setNewContact={setNewLead} newContact={newLead} handleConfirm={addNewLead}/> 
        </div>
    )
}