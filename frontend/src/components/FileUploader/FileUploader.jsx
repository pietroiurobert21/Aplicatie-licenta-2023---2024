import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import * as XLSX from 'xlsx';

const fileTypes = ["CSV", "XLSX"];

export default function DragDrop() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
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
                console.log(json); // For debugging purposes
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