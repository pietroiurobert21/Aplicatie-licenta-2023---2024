export default async function getRevenue() {
    const accessToken = localStorage.getItem("accessToken")
    let revenue = 0;
    const res = await fetch(`http://localhost:3000/organizations/deals`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if (res.status == 200) {
        const organization = await res.json()
        const deals = organization.organizationDeals
        deals.map((deal, index)=>{
            if (deal.status === 'accepted') {
                revenue += deal.value;
            }
        })
    }
    return revenue;
}