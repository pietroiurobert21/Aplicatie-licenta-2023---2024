import { Table, toaster, Combobox, TrashIcon, Button, Dialog, TextInputField, NewPersonIcon, Badge } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken.jsx'
import { useEffect, useState } from 'react';

export default function Contacts() {
    CheckToken()

    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    const [isShown, setIsShown] =   useState(false)
    const [isShown_1, setIsShown_1] = useState(false)
    const [ shownContact, setShownContact ] = useState({})

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
        pipelineStatus: '',
        organizationId: organizationId
    });

    const retrieveContacts = async () => {
        const res = await fetch(`http://localhost:3000/contacts/${organizationId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (res.status == 200) {
            const data = await res.json()
            console.log(data)
            setContacts(data.contacts)
        } else if (res.status == 401) {
            localStorage.removeItem("accessToken")
        }
        setLoading(false)
    }

    const addNewContact = async () => {
        let missingFields = false;
        for(let key in newContact)
            if (newContact[key] == '') {
                missingFields = true;
            }

        if (missingFields==false) {
            const res = await fetch("http://localhost:3000/contacts", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newContact)
            })

            if (res.status == 201) {
                alert("new contact added")
            } else if (res.status == 401) {
                localStorage.removeItem("accessToken")
            } else {
                alert("error adding the contact")
            }
        } else {
            toaster.danger('missing fields!');
        }
    }

    const updateContact = async () => {

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    useEffect(() => {
        retrieveContacts()
    }, [])

    return (
        <>           
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Professional Title</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Company</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Phone Number</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Status</Table.TextHeaderCell>
                    <Table.TextHeaderCell> </Table.TextHeaderCell>
                </Table.Head>


                <Table.VirtualBody height={440}>
                    { loading ? (<p> Loading </p>) : 

                    (contacts.map((profile) => (
                        <Table.Row key={profile.id} isSelectable onSelect={() => { setIsShown_1(true); setShownContact(profile) }}>
                            <Table.TextCell>{profile.id}</Table.TextCell>
                            <Table.TextCell>{profile.firstName}</Table.TextCell>
                            <Table.TextCell>{profile.lastName}</Table.TextCell>
                            <Table.TextCell>{profile.professionalTitle}</Table.TextCell>
                            <Table.TextCell>{profile.companyName}</Table.TextCell>
                            <Table.TextCell>{profile.emailAddress}</Table.TextCell>
                            <Table.TextCell>{profile.phoneNumber}</Table.TextCell>

                            <Table.TextCell onClick={(event)=>{event.stopPropagation()}}>     
                                <Combobox
                                    placeholder='Status'
                                    items={['prospect', 'lead', 'contacted', 'customer']}
                                    // itemToString={item => (item ? item.label : '')}
                                    onChange={selected => console.log(selected)}
                                    style={{width:"7rem"}}
                                    autocompleteProps={{
                                        // Used for the title in the autocomplete.
                                        title: 'Pipeline Status'
                                      }}
                                />
                            </Table.TextCell>

                            {/* <Table.TextCell>{profile.status}</Table.TextCell> */}

                            <Table.TextCell> 
                                <TrashIcon onClick={(event)=>{alert('delete');event.stopPropagation()}}/> 
                                </Table.TextCell>
                        </Table.Row>
                    )))
                    }
                </Table.VirtualBody>
            </Table>
            
                    {/* TODO: make a new component for Dialog to get rid of repetitive lines of code */}

            <Dialog
                    isShown={isShown}
                    title="Add new contact"
                    onCloseComplete={() => setIsShown(false)}
                    hasFooter={false}>
                        <TextInputField
                            label="First name"
                            placeholder="First name"
                            name="firstName"
                            value={newContact.firstName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Last name"
                            placeholder="Last name"
                            name="lastName"
                            value={newContact.lastName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Professional Title"
                            placeholder="Professional title"
                            name="professionalTitle"
                            value={newContact.professionalTitle}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Email Address"
                            placeholder="Email address"
                            name="emailAddress"
                            value={newContact.emailAddress}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Home Address"
                            placeholder="Home address"
                            name="homeAddress"
                            value={newContact.homeAddress}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Phone Number"
                            placeholder="Phone number"
                            name="phoneNumber"
                            value={newContact.phoneNumber}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Company Name"
                            placeholder="Company name"
                            name="companyName"
                            value={newContact.companyName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Pipeline Status"
                            placeholder="Pipeline status"
                            name="pipelineStatus"
                            value={newContact.pipelineStatus}
                            onChange={handleInputChange}
                        />

                        <Button appearance="primary" style={{float: "right"}} onClick={addNewContact}> confirm </Button>
            </Dialog>

            <Dialog
                    isShown={isShown_1}
                    title="View contact"
                    onCloseComplete={() => setIsShown_1(false)}
                    hasFooter={true}>
                        <TextInputField
                            label="First name"
                            placeholder="First name"
                            name="firstName_edit"
                            value={shownContact.firstName}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Last name"
                            placeholder="Last name"
                            name="lastName_edit"
                            value={shownContact.lastName}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Professional Title"
                            placeholder="Professional title"
                            name="professionalTitle_edit"
                            value={shownContact.professionalTitle}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Email Address"
                            placeholder="Email address"
                            name="emailAddress_edit"
                            value={shownContact.emailAddress}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Home Address"
                            placeholder="Home address"
                            name="homeAddress_edit"
                            value={shownContact.homeAddress}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Phone Number"
                            placeholder="Phone number"
                            name="phoneNumber_edit"
                            value={shownContact.phoneNumber}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Company Name"
                            placeholder="Company name"
                            name="companyName_edit"
                            value={shownContact.companyName}
                            onChange={updateContact}
                        />
                        <TextInputField
                            label="Pipeline Status"
                            placeholder="Pipeline status"
                            name="pipelineStatus_edit"
                            value={shownContact.pipelineStatus}
                            onChange={updateContact}
                        />
                        <Button appearance='primary' intent="success" style={{width:"100%"}}> Propose Deal </Button>
                        <Button appearance='default' intent="danger" style={{width:"100%", marginTop:"1vh"}}> Delete contact </Button>
            </Dialog>
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> New contact </Button>
            <Button appearance="default" intent="success" style={{left:"2%"}} onClick={() => setIsShown(true)}> <NewPersonIcon/> Import from csv </Button>
        </>
    )
}