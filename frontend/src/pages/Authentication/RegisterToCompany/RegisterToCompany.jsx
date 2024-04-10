import style1 from '../Login/Login.module.css';
import style2 from './RegisterToCompany.module.css';
import Background from '../../../assets/background_image.png';
import CRMImage from '../../../assets/crmimage.png';
import { useNavigate } from 'react-router-dom'
import { TextInput, Button, toaster } from 'evergreen-ui'
import { useState } from 'react'

import CheckToken from '../../../middlewares/CheckToken';

export default function RegisterToCompany() {
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
            localStorage.setItem("organizationId", companyId)
            navigate("/")
        } else
            toaster.danger("Error creating company", { description: response.error })
    }

    const getOrganizationByCode = async (code) => {
        const data = await fetch(`http://localhost:3000/organizations/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') || ''
            }
        })
        const response = await data.json()
        if (data.status === 200) {
            console.log(response.existingOrganization[0].id)
            createUserCompanyFunc(response.existingOrganization[0].id, "subordinate")
        }
    }

    return (
        <>
            <div className={style1.login}>
                <img src={CRMImage}/>
                <div className={style1.login_container}>
                    
                    <div className={style2.card1}>
                        <h3> Join a company </h3>
                        <TextInput name="text-input-code" placeholder="Company Code" onChange={(e)=>{setCompanyCode(e.target.value)}}/>
                        <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}} onClick={()=>{getOrganizationByCode(companyCode)}}> Join Company </Button>            
                    </div>

                    <div className={style2.card2}>
                        <h5> or create one </h5>
                        <TextInput name="text-input-company" placeholder="Company Name" onChange={(e)=>{setCompanyName(e.target.value)}} />
                        <TextInput name="text-input-employees" type="number" placeholder="Number of employees"/>
                        <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}} onClick={createCompanyFunc}> Create Company </Button>
                        <Button appearance="default" intent="danger" style={{width: "17.5rem", fontSize:"1rem"}}
                            onClick={()=>{navigate('/'); localStorage.removeItem('accessToken')}}> LogOut </Button>
                    </div>

                </div>
            </div>
        </>
    )
}