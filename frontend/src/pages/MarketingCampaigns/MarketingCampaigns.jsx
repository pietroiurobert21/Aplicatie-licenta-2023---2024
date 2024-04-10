import { useEffect, useState } from "react";
import { Table } from 'evergreen-ui'


export default function MarketingCampaigns() {
    
    const [ campaigns, setCampaings ] = useState([])
    
    const accessToken = localStorage.getItem("accessToken")

    const retrieveCampaigns = async () => {
        await fetch(`http://localhost:3000/campaigns`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => data.json())
        .then(data => { setCampaings(data.campaigns); console.log(data.campaigns) })
    }

    useEffect(() => {
        retrieveCampaigns()
    }, [])

    return (
        <> 
            {
                campaigns ? (
                    <Table>
                        <Table.Head>
                            <Table.HeaderCell style={{display:'flex', justifyContent:'center'}}><b>Campaigns History</b></Table.HeaderCell>
                        </Table.Head>
                        <Table.Head>
                            <Table.SearchHeaderCell />
                            <Table.TextHeaderCell>Date</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Emails sent</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Subject</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.VirtualBody height={440}>
                            {campaigns.map(campaign => (
                                <Table.Row key={campaign.id}>
                                    <Table.TextCell>{campaign.id}</Table.TextCell>
                                    <Table.TextCell>{campaign.date}</Table.TextCell>
                                    <Table.TextCell isNumber>{campaign.emailsSent}</Table.TextCell>
                                    <Table.TextCell>{campaign.subject}</Table.TextCell>
                              </Table.Row>
                            ))}
                        </Table.VirtualBody>
                    </Table>



                    // <ul>
                    //     {
                    //         campaigns.map(campaign => (
                    //             <li key={campaign.id}> {campaign.subject} </li>
                    //         ))
                    //     }       
                    // </ul>
                ) : 
                <p> no campaign found </p>
            }
        </>
    )
}