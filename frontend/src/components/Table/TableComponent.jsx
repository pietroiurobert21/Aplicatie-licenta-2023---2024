import { Table } from 'evergreen-ui'
import { useEffect, useState } from 'react';
import DialogComponent from "../Dialog/DialogComponent.jsx"

export default function TableComponent(props) {
    
    const data = props.data
    const [ isShown, setIsShown ] = useState(false)
    const [ shownProfile, setShownProfile ] = useState({})

    useEffect(()=>{
        console.log(data)
    },[])
    
    return (
        <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0", marginTop: "16px"}}>
                <Table.Head>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Professional Title</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Company</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Phone Number</Table.TextHeaderCell>
                </Table.Head>


                <Table.VirtualBody height={440}>
                    {
                        data.map((profile)=>(
                            <Table.Row key={profile.id} isSelectable onSelect={() => { setIsShown(true); setShownProfile(profile) }}>
                                <Table.TextCell>{profile.id}</Table.TextCell>
                                <Table.TextCell>{profile.firstName}</Table.TextCell>
                                <Table.TextCell>{profile.lastName}</Table.TextCell>
                                <Table.TextCell>{profile.professionalTitle}</Table.TextCell>
                                <Table.TextCell>{profile.companyName}</Table.TextCell>
                                <Table.TextCell>{profile.emailAddress}</Table.TextCell>
                                <Table.TextCell>{profile.phoneNumber}</Table.TextCell>
                            </Table.Row>
                        ))
                    }
                </Table.VirtualBody>
            </Table>

            <DialogComponent data={shownProfile} isShown={isShown} setIsShown={setIsShown}/>
        </>
    )
}