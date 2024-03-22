import { useEffect, useState } from "react";
import TableComponent from "../../components/Table/TableComponent.jsx"

export default function Leads() {

    //const contacts = [{"id": "1", "firstName": "Robert", "lastName": "Pietroiu", "professionalTitle": "web developer", "companyName": "LENOVO", "emailAddress": "pietroiurobert65@gmail.com", "phoneNumber": "0765126291"}]

    const [ leads, setLeads ] = useState([])

    const organizationId = localStorage.getItem('organizationId')
    const accessToken = localStorage.getItem('accessToken')

    const retrieveLeads = async () => {
        await fetch(`http://localhost:3000/leads/${organizationId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data => data.json())
        .then(data=>setLeads(data.leads))
    }

    useEffect(()=>{
        retrieveLeads()
    }, [])

    return (
        <>
            {
                leads.length > 0 ? <TableComponent data={leads} /> : <p> loading </p>
            }
        </>
    )
}