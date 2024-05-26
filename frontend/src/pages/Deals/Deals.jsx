import { Table, Button , AddToArtifactIcon, Dialog, TextInputField, SelectMenu, Badge, Combobox, IconButton, TrashIcon, toaster } from "evergreen-ui"
import style from './Deals.module.css';
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

    const getDeals = async () => {
        const res = await fetch(`http://localhost:3000/organizations/deals`, {
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
        }
    }

    const [sortOrder, setSortOrder] = useState('asc');
    const sortingTable = async (attribute) => {
        const sortedDeals = [...deals];
        sortedDeals.sort((a, b) => {
            const attributeArray = attribute.split('.');
            let aValue = a;
            let bValue = b;
            for (let key of attributeArray) {
                aValue = aValue ? aValue[key] : null;
                bValue = bValue ? bValue[key] : null;
            }
            // Handle null values
            if (aValue === null && bValue === null) return 0;
            if (aValue === null) return sortOrder === 'asc' ? 1 : -1;
            if (bValue === null) return sortOrder === 'asc' ? -1 : 1;
    
            // For string comparison, use localeCompare
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            // For numeric comparison
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
        setDeals(sortedDeals);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
    
    
    

    useEffect(()=>{
            
    }, [deals])

    const [ contacts, setContacts ] = useState([])
    const [ loadingContacts, setLoadingContacts ] = useState(true)

    const retrieveContacts = async () => {
        const res = await fetch(`http://localhost:3000/contacts`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        if (res.status == 200) {
            const data = await res.json()
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
        "contactId": 1
    })

    const [loadingEmployee, setLoadingEmployee] = useState(true)

    const getEmployee = async () => {
        await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
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
        getEmployee()
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

    const deleteDeal = async (id) => {
        try {
            await fetch(`http://localhost:3000/deals/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            setUpdated(shownDeal.id + " " + newStatus);
            setIsShown_1(false)
            toaster.success("deal deleted successfully")
        } catch(error) {
            toaster.warning("error deleting deal")
        }
    }


    const [ selected, setSelected ] = useState()
    const [ shownDeal, setShownDeal ] = useState({})
    const [ newStatus, setNewStatus ] = useState('')
    return (
        <>  
            {
                loading ? <p>loading</p> : (
            <>
            <Table id={style.dealsTable}>
                <Table.Head style={{userSelect: 'none'}}>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell isSelectable onClick={()=>{sortingTable('value')}}> value </Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>{sortingTable('Contact.firstName')}}> contact </Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>{sortingTable('date')}}> date </Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>{sortingTable('Employee.User.firstName')}}> employee </Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>{sortingTable('description')}}> description </Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>{sortingTable('status')}}> status </Table.TextHeaderCell>
                    <Table.TextHeaderCell>  </Table.TextHeaderCell>
                </Table.Head>

                <Table.VirtualBody height={440}>

                    {deals.map((deal, index) => ( 
                        <Table.Row key={deal.id} isSelectable onSelect={() => { setIsShown_1(true); setShownDeal(deal); setNewStatus(deal.status) }}>
                            <Table.TextCell> {index+1} </Table.TextCell>
                            <Table.TextCell> {deal.value} </Table.TextCell>
                            { 
                                deal.Contact ? <Table.TextCell> {deal.Contact.firstName} {deal.Contact.lastName} </Table.TextCell>
                                :  <Table.TextCell> (contact removed) </Table.TextCell> 
                            }
                            <Table.TextCell> {deal.date} </Table.TextCell>
                            { 
                                deal.Employee ? <Table.TextCell> {deal.Employee.User.firstName} {deal.Employee.User.lastName} </Table.TextCell> 
                                :  <Table.TextCell> (employee removed) </Table.TextCell> 
                            }
                            <Table.TextCell> {deal.description} </Table.TextCell>
                             
                            <Table.TextCell>
                                <Badge color={deal.status === 'accepted' ? 'green' : deal.status === 'rejected' ? 'red' : 'inherit'}> {deal.status} </Badge>
                            </Table.TextCell>
                            <Table.TextCell> <IconButton icon={TrashIcon} intent="danger" marginLeft={100} onClick={(event)=>{event.stopPropagation(); deleteDeal(deal.id)}} style={{color:"Red"}}/> </Table.TextCell>
                        </Table.Row>
                    ))}

                </Table.VirtualBody>
            </Table>

            <div className={style.dealContainers}>
                {deals.map(deal=>(
                    <div className={style.dealContainer} onClick={() => { setIsShown_1(true); setShownDeal(deal); setNewStatus(deal.status) }}>
                        <p> Value: {deal.value} </p>
                        {deal.Contact ? <p>Contact: {deal.Contact.firstName} {deal.Contact.lastName}</p> : <p>Contact: (contact removed)</p>}
                        <p> Date: {deal.date} </p>
                        {deal.Employee ? <p>Employee: {deal.Employee.User.firstName} {deal.Employee.User.lastName}</p> : <p>Employee: (employee removed)</p>}
                        <p>Description:</p>
                        <p> {deal.description} </p>
                        <p> Status: <Badge color={deal.status === 'accepted' ? 'green' : deal.status === 'rejected' ? 'red' : 'inherit'}> {deal.status} </Badge> </p>
                    </div>
                ))}
            </div>

            <Dialog
                isShown={isShown}
                title="Dialog title"
                onConfirm={() => {setIsShown(false); saveNewDeal()}}
                onCancel={()=>{setIsShown(false)}}
                onCloseComplete={() => setIsShown(false)}
                shouldCloseOnOverlayClick={false}
                confirmLabel="Custom Label">
                <SelectMenu
                    title="Select name"
                    options={contacts.map(contact => ({ label:  contact.emailAddress, value: contact.emailAddress, key: contact.id }))}
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
                    title={shownDeal.Employee ? shownDeal.Employee.User.firstName + " " + shownDeal.Employee.User.lastName + "'s deal since " + new Date(shownDeal.date).toLocaleDateString("en-US") : "(employee removed)"}
                    onConfirm={() => {setIsShown_1(false); updateDealStatus(newStatus); }}
                    onCancel={() => setIsShown_1(false)}
                    onCloseComplete={() => setIsShown_1(false)}
                    shouldCloseOnOverlayClick={false}
                    confirmLabel="Update deal">
                    <TextInputField
                        label="Contact"
                        placeholder="Contact"
                        name="contact"
                        disabled
                        value={shownDeal.Contact ? shownDeal.Contact.firstName + " " + shownDeal.Contact.lastName : "(contact removed)"}/>
                    <TextInputField
                        label="Email"
                        placeholder="Email"
                        name="email"
                        disabled
                        value={shownDeal.Contact ? shownDeal.Contact.emailAddress : "(contact removed)"}/>
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
                    <Button appearance='primary' intent='danger' style={{width: "100%", marginTop: "20vh"}} onClick={()=>deleteDeal(shownDeal.id)}> Delete deal </Button>
                </Dialog>
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <AddToArtifactIcon/> New Deal </Button>
                </>
            )}
        </>
    )
}