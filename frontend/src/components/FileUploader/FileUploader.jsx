import React, {useEffect, useState} from 'react';
import { FileUploader } from 'react-drag-drop-files';
import * as XLSX from 'xlsx';
import { toaster } from 'evergreen-ui';

const fileTypes = ["CSV", "XLSX"];

export default function DragDrop() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const accessToken = localStorage.getItem("accessToken")

    const [ contactsAdded, setConctactsAdded ] = useState(0)
    
    const [organizationId, setOrganizationId] = useState(-1)
    

    const addNewContact = async (contact) => {
        const response = await fetch("http://localhost:3000/contacts", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(contact)
        })
        if (response.ok) {
            setConctactsAdded(prev=>prev+1);
        }
    }

    const saveExternalData = async () => {
        // setConctactsAdded(0);
        // jsonData.foreach((contact) => {
        //     contact.organizationId = organizationId
        //     addNewContact(contact)
        // })
        // if (contactsAdded > 0) {
        //     toaster.success(contactsAdded + " contacts added!")
        //     setUpdated(Math.floor(Math.random() * 9000))
        // }
    }

    const getOrganization = async () => {
        await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(data=>data.json())
        .then(data=>{
            setOrganizationId(data.organization.organizationId);
        })
    }

    useEffect(() => {
        getOrganization()
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming the data is in the first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                
                setJsonData(json);
                saveExternalData();
            };

            reader.readAsArrayBuffer(file);
        }
    }, [file]);

    const handleChange = (file) => {
        setFile(file);
    };


    return (
        <>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            {jsonData && (
                <div>
                    <h2>JSON Data</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </>
    );
}