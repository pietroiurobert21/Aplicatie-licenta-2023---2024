import { useEffect, useState } from 'react';
import style from './Organization.module.css'
import { Avatar, Button, Dialog, TextInput, toaster } from 'evergreen-ui'
import CheckToken from '../../middlewares/CheckToken'
import img from '../../assets/Organization.png'

export default function Organization() {
    CheckToken()

    const [organization, setOrganization] = useState({})

    const accessToken = localStorage.getItem('accessToken')

    const getOrganization = async () => {
        const res = await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setOrganization(data.organization)
        } else if (res.status == 401) {
            localStorage.removeItem("accessToken")
        }
    }

    const organizationId = localStorage.getItem('organizationId')
    const [ updated, setUpdated ] = useState()
    const [ totalRevenue, setTotalRevenue ] = useState(-1)
    
    const getDeals = async () => {
        const res = await fetch(`http://localhost:3000/organizations/deals`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (res.status == 200) {
            setTotalRevenue(0)
            const organization = await res.json()
            const deals = organization.organizationDeals
            deals.map((deal, index)=>{
                if (deal.status === 'accepted') {
                    setTotalRevenue(prev => prev + deal.value)
                }
            })
        }
    }

    const changeCode = async () => {
        try {
            await fetch(`http://localhost:3000/organizations/code`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            toaster.success("invitation code has been changed successfully", {id: "invitation_code_changed"})
            setTimeout(()=>{
                setUpdated(Math.floor(Math.random()*9000))
            }, 1000)
        } catch(error) {
            toaster.warning("could not change the invitation code")
        }
    }

    useEffect(()=>{
        getOrganization()
        getDeals()
    }, [updated])

    return (
        <div className={style.organizationContainer}>
            <img src={img} id={style.imgOrganization}/>
            <div className={style.header}>
                <p><b> {organization.name} </b></p>
            </div>
            <ul style={{listStyle: 'none', paddingLeft: "5%"}}>
                <li className={style.itemName}> Organization name </li>
                <li> {organization.name}  </li>
                <li className={style.itemName}> Points </li>
                <li> {organization.points}  </li>
                <li className={style.itemName}> Total revenue </li>
                <li> 
                    {
                        totalRevenue>-1 ? <> {totalRevenue} EUR</> : <>loading</>
                    }    
                </li>
                <li className={style.itemName}> Invitation code </li>
                <li> {organization.code} </li>
                <li><Button onClick={()=>{changeCode()}}> change </Button> </li>
            </ul>
        </div>
    )
}