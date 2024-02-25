import { Table, toaster, Combobox, TrashIcon, Button, Dialog, TextInputField } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken.jsx'
import { useEffect, useState } from 'react';

export default function Contacts() {
    CheckToken()

    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    const [isShown, setIsShown] =   useState(false)

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
            } else {
                alert("error adding the contact")
            }
        } else {
            toaster.danger('missing fields!');
        }
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
                    { contacts.length==0 ? (<p> No contacts </p>) : 

                    (contacts.map((profile) => (
                        <Table.Row key={profile.id} isSelectable onSelect={() => {}}>
                            <Table.TextCell>{profile.id}</Table.TextCell>
                            <Table.TextCell>{profile.firstName}</Table.TextCell>
                            <Table.TextCell>{profile.lastName}</Table.TextCell>
                            <Table.TextCell>{profile.professionalTitle}</Table.TextCell>
                            <Table.TextCell>{profile.companyName}</Table.TextCell>
                            <Table.TextCell>{profile.emailAddress}</Table.TextCell>
                            <Table.TextCell>{profile.phoneNumber}</Table.TextCell>

                            <Table.TextCell>     
                                <Combobox
                                    initialSelectedItem={{ label: 'customer' }}
                                    items={[{ label: 'prospect' }, { label: 'lead' }, { label: 'contacted' }, { label: 'customer'}]}
                                    itemToString={item => (item ? item.label : '')}
                                    onChange={selected => console.log(selected)}
                                    style={{width:"7rem"}}
                                />
                            </Table.TextCell>

                            {/* <Table.TextCell>{profile.status}</Table.TextCell> */}

                            <Table.TextCell> <TrashIcon onClick={(event)=>{alert('delete');event.stopPropagation()}}/> </Table.TextCell>
                        </Table.Row>
                    )))
                    }
                </Table.VirtualBody>
            </Table>
            
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
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}>Add Contact</Button>
        </>
    )
}