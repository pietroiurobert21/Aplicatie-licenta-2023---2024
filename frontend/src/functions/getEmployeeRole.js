export default async function getEmployeeRole() {
    const accessToken = localStorage.getItem("accessToken")
    const res = await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    const responseCode = res.status
    if (responseCode === 200) {
        const data = await res.json()
        return data.userOrganization.role
    }
}