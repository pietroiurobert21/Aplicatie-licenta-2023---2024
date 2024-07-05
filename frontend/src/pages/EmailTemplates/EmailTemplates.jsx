import { useEffect, useState } from "react";
import { Combobox } from 'evergreen-ui'

export default function EmailTemplates(props) {
    
    const [ templates, setTemplates ] = useState([])
    const [ selectedTemplate, setSelectedTemplate ] = useState(null);

    const accessToken = localStorage.getItem('accessToken')

    const retrieveTemplates = async () => {
        await fetch(`http://localhost:3000/templates`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{
            setTemplates(data.templates)
        })
    }

    useEffect(() => {
        setSelectedTemplate(null)
        retrieveTemplates()
    }, [props.effect])

    return (
        <div style={{width:'fix-content'}}>
            { 
                templates.length > 0 ? (
                    <Combobox
                    items={templates.map((template, index) => ({ label: template.name, id: template.id, content: template.html }))}
                    itemToString={item => (item ? item.label : '')}
                    onChange={selected => {
                        setSelectedTemplate(selected)
                        props.setShowTemplateId && props.setShowTemplateId(selected.id)
                        props.setContent && props.setContent(selected.content)
                    }}    
                    placeholder="Template"
                    autocompleteProps={{
                        title: 'Template'
                    }}
                    selectedItem={selectedTemplate}
                />
                ) : <p> no templates found </p>
            }
        </div>
    );
    
}