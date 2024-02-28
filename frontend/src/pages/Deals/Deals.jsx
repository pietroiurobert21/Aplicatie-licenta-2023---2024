import { Table, Button , AddToArtifactIcon, Dialog } from "evergreen-ui"
import { useEffect, useState } from "react";

export default function Deals() {
    const [ deals, setDeals ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const [ contact, setContact ] = useState({})

    const [ isShown, setIsShown] = useState(false)

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

    // TODOD: rest API for join: deals + contact + employee

    // const getContactById = async () => {
    //     const res = await fetch(`http://localhost:3000/contacts/id/1`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //     if (res.status == 200) {
    //         const data = await res.json()
    //         setContact(data.contact)
    //     }

    // }

    useEffect(() => {
        getDeals()
        // getContactById()
    }, [])

    return (
        <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell> value </Table.TextHeaderCell>
                    <Table.TextHeaderCell> contact </Table.TextHeaderCell>
                    <Table.TextHeaderCell> date </Table.TextHeaderCell>
                    <Table.TextHeaderCell> employeeId </Table.TextHeaderCell>
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
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Custom Label"
            >
                Dialog content
            </Dialog>
            <Button appearance="default" intent="none" style={{left:"2%"}} onClick={() => setIsShown(true)}> <AddToArtifactIcon/> New Deal </Button>
        </>
    )
}