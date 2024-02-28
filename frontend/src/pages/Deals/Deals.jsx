import { Table, Button , AddToArtifactIcon, Dialog, TextInputField, Combobox, SelectMenu } from "evergreen-ui"
import { useEffect, useState } from "react";
import CheckToken from '../../middlewares/CheckToken'

export default function Deals() {
    CheckToken()
    const [ deals, setDeals ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const [ contact, setContact ] = useState({})

    const [ isShown, setIsShown] = useState(false)

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

    const saveNewDeal = async () => {
        await fetch(`http://localhost:3000/deals`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(newDeal)
        })
    }

    const [newDeal, setNewDeal] = useState({
        "value": "",
        "status": "ongoing",
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

    useEffect(() => {
        getDeals()
        retrieveContacts()
        getEmployeeByUserId()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == "contactId")
            setNewDeal({ ...newDeal, [name]: +value });
        else 
            setNewDeal({ ...newDeal, [name]: value });
    };

    const [selected, setSelected] = useState(null)
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
                        <Table.Row key={deal.id} isSelectable onSelect={() => {}}>
                            <Table.TextCell> {deal.id} </Table.TextCell>
                            <Table.TextCell> {deal.value} </Table.TextCell>
                            <Table.TextCell> {deal.Contact.firstName} {deal.Contact.lastName} </Table.TextCell>
                            <Table.TextCell> {deal.date} </Table.TextCell>
                            <Table.TextCell> {deal.Employee.User.firstName} {deal.Employee.User.lastName} </Table.TextCell>
                            <Table.TextCell> {deal.description} </Table.TextCell>
                            <Table.TextCell> {deal.status} </Table.TextCell>
                        </Table.Row>
                    ))}

                </Table.VirtualBody>
            </Table>

            <Dialog
                isShown={isShown}
                title="Dialog title"
                onCloseComplete={() => {setIsShown(false); saveNewDeal()    }}
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
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <AddToArtifactIcon/> New Deal </Button>
                </>
            )}
        </>
    )
}