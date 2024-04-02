import { useEffect, useState } from "react";

export default function MarketingCampaigns() {
    
    const [ campaigns, setCampaings ] = useState([])
    
    const accessToken = localStorage.getItem("accessToken")
    const organizationId = localStorage.getItem("organizationId")


    const retrieveCampaigns = async () => {
        await fetch(`http://localhost:3000/campaigns/${organizationId}`, {
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
                campaigns.length > 0 ? (
                    <ul>
                        {
                            campaigns.map(campaign => (
                                <li key={campaign.id}> {campaign.subject} </li>
                            ))
                        }       
                    </ul>
                ) : 
                <p> no campaign found </p>
            }
        </>
    )
}