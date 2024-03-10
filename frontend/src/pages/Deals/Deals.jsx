import { Table, Button , AddToArtifactIcon, Dialog, TextInputField, SelectMenu, Badge, Combobox } from "evergreen-ui"

import { useEffect, useState } from "react";
import CheckToken from '../../middlewares/CheckToken'

export default function Deals() {
    CheckToken()
    const [ deals, setDeals ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ isShown, setIsShown] = useState(false)
    const [ isShown_1, setIsShown_1] = useState(false)

    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("accessToken")
    const organizationId = localStorage.getItem("organizationId")

    const getDeals = async () => {
        const res = await fetch(`http://localhost:3000/organizations/deals/${organizationId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (res.status == 200) {
            const deals = await res.json()
            setDeals(deals.organizationDeals)
            setLoading(false)
            console.log(deals)
        }
    }

    const [ contacts, setContacts ] = useState([])
    const [ loadingContacts, setLoadingContacts ] = useState(true)

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
        setLoadingContacts(false)
    }

    const [newDeal, setNewDeal] = useState({
        "value": "",
        "status": "proposed",
        "date": new Date().toLocaleString(),
        "description": "",
        "employeeId": "",
        "organizationId": +organizationId,
        "contactId": 1
    })

    const [loadingEmployee, setLoadingEmployee] = useState(true)

    const getEmployeeByUserId = async () => {
        await fetch(`http://localhost:3000/employees/getEmployee/${userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{ 
            setLoadingEmployee(false)
            setNewDeal({...newDeal, ["employeeId"]: data.userOrganization.id})
        })
    }

    const [ updated, setUpdated ] = useState('')
    useEffect(() => {
        getDeals()
        retrieveContacts()
        getEmployeeByUserId()
    }, [updated])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == "contactId")
            setNewDeal({ ...newDeal, [name]: +value });
        else 
            setNewDeal({ ...newDeal, [name]: value });
    };

    const saveNewDeal = async () => {
        await fetch(`http://localhost:3000/deals`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(newDeal)
        })
        setUpdated(shownDeal.id + " " + shownDeal.status);
    }

    const updateDealStatus = async () => {
        await fetch(`http://localhost:3000/deals/${shownDeal.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({status: newStatus})
        });
        setUpdated(shownDeal.id + " " + newStatus);
    }


    const [ selected, setSelected ] = useState({})
    const [ shownDeal, setShownDeal ] = useState({})
    const [ newStatus, setNewStatus ] = useState('')
    return (
        <>  
            {
                loading ? <p>loading</p> : (
            <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell> value </Table.TextHeaderCell>
                    <Table.TextHeaderCell> contact </Table.TextHeaderCell>
                    <Table.TextHeaderCell> date </Table.TextHeaderCell>
                    <Table.TextHeaderCell> employee </Table.TextHeaderCell>
                    <Table.TextHeaderCell> description </Table.TextHeaderCell>
                    <Table.TextHeaderCell> status </Table.TextHeaderCell>
                </Table.Head>

                <Table.VirtualBody height={440}>

                    {deals.map((deal) => ( 
                        <Table.Row key={deal.id} isSelectable onSelect={() => { setIsShown_1(true); setShownDeal(deal); setNewStatus(deal.status) }}>
                            <Table.TextCell> {deal.id} </Table.TextCell>
                            <Table.TextCell> {deal.value} </Table.TextCell>
                            <Table.TextCell> {deal.Contact.firstName} {deal.Contact.lastName} </Table.TextCell>
                            <Table.TextCell> {deal.date} </Table.TextCell>
                            <Table.TextCell> {deal.Employee.User.firstName} {deal.Employee.User.lastName} </Table.TextCell>
                            <Table.TextCell> {deal.description} </Table.TextCell>
                             
                            <Table.TextCell onClick={(event)=>{event.stopPropagation()}} style={{color:"Red"}}>
                                <Badge color={deal.status === 'accepted' ? 'green' : deal.status === 'rejected' ? 'red' : 'inherit'}> {deal.status} </Badge>
                            </Table.TextCell>
                        </Table.Row>
                    ))}

                </Table.VirtualBody>
            </Table>

            <Dialog
                isShown={isShown}
                title="Dialog title"
                onConfirm={() => {setIsShown(false); saveNewDeal()}}
                onCancel={()=>{setIsShown(false)}}
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Custom Label">
                <SelectMenu
                    title="Select name"
                    options={contacts.map(contact => ({ label: contact.firstName, value: contact.firstName, key: contact.id }))}
                    selected={selected}
                    onSelect={(item) => {setSelected(item.value);  setNewDeal({ ...newDeal, ["contactId"]: +item.key }); }}>
                        
                    <TextInputField 
                        label="Contact"
                        value={selected || 'Select name...'}/>
                </SelectMenu>
                <TextInputField
                    label="Value"
                    placeholder="Value"
                    name="value"
                    type="number"
                    onChange={handleInputChange}/>
                <TextInputField
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={handleInputChange}/>
            </Dialog>




                <Dialog
                    isShown={isShown_1}
                    title={shownDeal.Employee ? shownDeal.Employee.User.firstName + " " + shownDeal.Employee.User.lastName + "'s deal since " + new Date(shownDeal.date).toLocaleDateString("en-US") : "Loading"}
                    onConfirm={() => {setIsShown_1(false); updateDealStatus(newStatus); }}
                    onCancel={() => setIsShown_1(false)}
                    onCloseComplete={() => setIsShown_1(false)}
                    confirmLabel="Update deal">
                    <TextInputField
                        label="Contact"
                        placeholder="Contact"
                        name="contact"
                        disabled
                        value={shownDeal.Contact ? shownDeal.Contact.firstName + " " + shownDeal.Contact.lastName : "Loading"}/>
                    <TextInputField
                        label="Value"
                        placeholder="Value"
                        name="value"
                        type="number"
                        disabled
                        value={shownDeal.value}/>
                    <TextInputField
                        label="Description"
                        placeholder="Description"
                        name="description"
                        disabled
                        value={shownDeal.description}/>
                    <Combobox
                        style={{width: "100%"}}
                        initialSelectedItem={shownDeal.status}
                        items={['proposed', 'accepted', 'rejected']}
                        onChange={selected => {console.log(selected); setNewStatus(selected)}}
                        placeholder="Status"
                        autocompleteProps={{
                            // Used for the title in the autocomplete.
                            title: 'Status'
                        }}/>
                    <Button appearance='primary' intent='danger' style={{width: "100%", marginTop: "20vh"}}> Delete deal </Button>
                </Dialog>
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <AddToArtifactIcon/> New Deal </Button>
                </>
            )}
        </>
    )
}