import { Table } from "evergreen-ui"
import { useEffect, useState } from "react";

export default function Deals() {
    // const [ deals, setDeals ] = useState([])
    // const [ loading, setLoading ] = useState(true)

    // const accessToken = localStorage.getItem("accessToken")
    // const organizationId = localStorage.getItem("organizationId")

    // const getDeals = async () => {
    //     const res = await fetch(`http://localhost:3000/organizations/deals/${organizationId}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //     if (res.status == 200) {
    //         const deals = await res.json()
    //         console.log(deals)
    //     }
    // }

    // useEffect(() => {
    //     getDeals()
    // }, [])

    return (
        <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell> Contact </Table.TextHeaderCell>
                    <Table.TextHeaderCell> Value </Table.TextHeaderCell>
                    <Table.TextHeaderCell> Description </Table.TextHeaderCell>
                    <Table.TextHeaderCell> Date </Table.TextHeaderCell>
                    <Table.TextHeaderCell> Employee </Table.TextHeaderCell>
                    <Table.TextHeaderCell> Status </Table.TextHeaderCell>
                </Table.Head>

                <Table.VirtualBody height={440}>
                    <Table.Row isSelectable onSelect={() => {}}>
                            <Table.TextCell> 1 </Table.TextCell>
                            <Table.TextCell> 1 </Table.TextCell>
                            <Table.TextCell> 1 </Table.TextCell>
                            <Table.TextCell> 1 </Table.TextCell>
                            <Table.TextCell> 1 </Table.TextCell>
                            <Table.TextCell> 1 </Table.TextCell>
                            <Table.TextCell> 1 </Table.TextCell>
                    </Table.Row>
                </Table.VirtualBody>
            </Table>
        </>
    )
}