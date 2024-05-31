import style from '../LoginCard/LoginCard.module.css';
import { TextInput, Button, toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../../middlewares/CheckToken';
import { useState } from 'react'



export default function RegisterToCompanyCard() {
    const navigate = useNavigate()
    // localStorage.removeItem("token")
    CheckToken()

    const [companyName, setCompanyName] = useState("")
    const [companyId, setCompanyId] = useState("")
    const [companyCode, setCompanyCode] = useState("")

    const createCompanyFunc = async () => {
        const data = await fetch("http://localhost:3000/organizations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') || ''
            },
            body: JSON.stringify({ name: companyName })
        })
        const response = await data.json()
        if (data.status == 201) {
            toaster.success("Company created successfully")
            setCompanyId(response.organization.id)
            await createUserCompanyFunc(response.organization.id, "administrator")
        } else {
            toaster.danger("Error creating company", { description: response.error })
        }
    }

    const createUserCompanyFunc = async (companyId, role) => {
        const data = await fetch("http://localhost:3000/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') || ''
            },
            body: JSON.stringify({ role: role, organizationId: companyId})
        })
        const response = await data.json()
        if (data.status == 201) {
            localStorage.removeItem('accessToken')
            navigate("/")
        } else
            toaster.danger("Error creating company", { description: response.error })
    }

    const getOrganizationByCode = async (code) => {
        const data = await fetch(`http://localhost:3000/organizations/code/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') || ''
            }
        })
        const response = await data.json()
        if (data.status === 200) {
            createUserCompanyFunc(response.org.id, "subordinate")
        } else {
            toaster.danger("organization code is not valid!")
        }
    }

    return (
        <>
            <div className={style.card}>
                <div className={style.loginHeader}>
                    <p id={style.pheader} style={{fontWeight: "400", fontSize: '1.5rem', color: ''}}>Register to company</p>
                </div>
                
                <p id={style.pheader}> Join an organization </p>
                <TextInput name="text-input-code" placeholder="Company Code" onChange={(e)=>{setCompanyCode(e.target.value)}}/>
                <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}} onClick={()=>{getOrganizationByCode(companyCode)}}> Join Company </Button>            

                <p id={style.pheader}> Create an organization </p>
                <TextInput name="text-input-company" placeholder="Company Name" onChange={(e)=>{setCompanyName(e.target.value)}} />
                <TextInput name="text-input-employees" type="number" placeholder="Number of employees"/>
                <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}} onClick={createCompanyFunc}> Create Company </Button>
                <Button appearance="default" intent="danger" style={{width: "17.5rem", fontSize:"1rem"}}
                    onClick={()=>{navigate('/'); localStorage.removeItem('accessToken')}}> LogOut </Button>

                <div style={{position: 'relative', height: '55%'}}>
                    <p style={{textAlign: 'center', position: 'absolute', bottom: 0, width: '100%'}}>2024 @All rights reserved</p>
                </div>
            </div>
        </>
    )
}