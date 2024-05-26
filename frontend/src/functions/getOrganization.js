export default async function getOrganization() {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const responseCode = res.status
    if (responseCode === 200) {
        const data = await res.json()
        return data.organization
    } else if (res.status == 401) {
        localStorage.removeItem("accessToken")
        return -1;
    }
}