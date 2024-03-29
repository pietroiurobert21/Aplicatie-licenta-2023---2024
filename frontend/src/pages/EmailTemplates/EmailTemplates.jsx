import { useEffect, useState } from "react";

export default function EmailTemplates(props) {
    
    const [ templates, setTemplates ] = useState([])

    const organizationId = localStorage.getItem('organizationId')
    const accessToken = localStorage.getItem('accessToken')

    const retrieveTemplates = async () => {
        await fetch(`http://localhost:3000/templates/${organizationId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{
            setTemplates(data.templates)
            console.log(data)
        })
    }
    
    useEffect(() => {
        retrieveTemplates()
    }, [])

    return (
        <>
            { 
                templates.length > 0 ? (
                    <ul style={{listStyle:'none'}}>
                        {templates.map((value, index) => 
                            {
                                return <li key={index}> {value.name} </li>; // added return statement and key prop
                            }
                        )}
                    </ul>
                ) : <p> loading </p>
            }
        </>
    );
    
}