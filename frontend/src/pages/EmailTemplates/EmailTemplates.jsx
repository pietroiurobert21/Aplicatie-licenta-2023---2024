import { useEffect, useState } from "react";
import { Combobox } from 'evergreen-ui'

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
        <div style={{width:'fix-content'}}>
            { 
                templates.length > 0 ? (
                    <Combobox
                    items={templates.map((template, index) => ({ label: template.name, id: template.id }))}
                    itemToString={item => (item ? item.label : '')}
                    onChange={selected => {console.log(selected), props.setShowTemplateId(selected.id)}}    
                    placeholder="Template"
                    autocompleteProps={{
                        title: 'Template'
                    }}
                />
                ) : <p> loading </p>
            }
        </div>
    );
    
}