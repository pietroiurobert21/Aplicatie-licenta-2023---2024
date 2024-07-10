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


    const [sortOrder, setSortOrder] = useState('asc');
    const sortingTable = async (attribute) => {
        const sortedProfiles = campaigns;
        sortedProfiles.sort((a, b) => {
            const attributeArray = attribute.split('.');
            let aValue = a;
            let bValue = b;
            for (let key of attributeArray) {
                aValue = aValue[key];
                bValue = bValue[key];
            }
            // For string comparison, use localeCompare
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            // For numeric comparison
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
        setCampaings(sortedProfiles);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
                            <Table.Head >
                                <Table.HeaderCell style={{display:'flex', justifyContent:'center'}}><b>Campaigns History</b></Table.HeaderCell>
                            </Table.Head>
                            <Table.Head style={{userSelect: 'none'}}>
                                {/* isSelectable onClick={()=>sortingTable("id")} */}
                                <Table.TextHeaderCell> ID </Table.TextHeaderCell> 
                                <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("date")}>Date</Table.TextHeaderCell>
                                <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("emailsSent")}>Emails sent</Table.TextHeaderCell>
                                <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("subject")}>Subject</Table.TextHeaderCell>
                            </Table.Head>
                            <Table.VirtualBody height={540}>
                                {campaigns.map((campaign, index) => (
                                    <Table.Row key={campaign.id}>
                                        <Table.TextCell>{index+1}</Table.TextCell>
                                        <Table.TextCell>
                                            {new Date(campaign.date).toLocaleDateString("en-US", {
                                            weekday: 'long', // "Monday"
                                            year: 'numeric', // "2023"
                                            month: 'long',   // "June"
                                            day: 'numeric'   // "21"
                                            })}
                                        </Table.TextCell>
                                        <Table.TextCell isNumber>{campaign.emailsSent}</Table.TextCell>
                                        <Table.TextCell>{campaign.subject}</Table.TextCell>
                                </Table.Row>
                                ))}
                            </Table.VirtualBody>
                        </Table>


                    <div className={style.marketingContainers}>
                        {campaigns.map(campaign => (
                            <div key={campaign.id} className={style.marketingContainer}>
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