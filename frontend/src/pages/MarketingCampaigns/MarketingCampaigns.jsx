import { useEffect, useState } from "react";
import { Table } from 'evergreen-ui'
import style from './MarketingCampaigns.module.css';

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
        .then(data => { setCampaings(data.campaigns) })
    }

    useEffect(() => {
        retrieveCampaigns()
    }, [])

    return (
        <> 
            {
                campaigns ? (
                    <>
                        <Table id={style.marketingTable}>
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


                    <div className={style.marketingContainers}>
                        {campaigns.map(campaign => (
                            <div className={style.marketingContainer}>
                                <p> Subject: {campaign.subject} </p>
                                <p> Date: {campaign.date} </p>
                                <p> Emails sent: {campaign.emailsSent} </p>
                            </div>
                        ))}
                    </div>
                    </>
                ) : 
                <p> no campaign found </p>
            }
        </>
    )
}