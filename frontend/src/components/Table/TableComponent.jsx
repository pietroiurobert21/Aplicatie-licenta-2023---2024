import { Table, IconButton, TrashIcon, toaster } from 'evergreen-ui'
import { useEffect, useState } from 'react';
import DialogComponent from "../Dialog/DialogComponent.jsx"

export default function TableComponent(props) {
    
    const [ isShown, setIsShown ] = useState(false)
    const [ shownProfile, setShownProfile ] = useState({})

    const accessToken = localStorage.getItem("accessToken")

    const deleteContact = async (id) => {
        try {
            await fetch(`http://localhost:3000/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            toaster.success("contact deleted successfully")
            props.setUpdated(Math.floor(Math.random() * 9000))
        } catch(error) {
            console.log(error)
            toaster.warning("error deleting contact")
        }
    }

    const [sortOrder, setSortOrder] = useState('asc');
    const sortingTable = async (attribute) => {
        const sortedProfiles = [...props.data];
        sortedProfiles.sort((a, b) => {
            const attributeArray = attribute.split('.');
            let aValue = a;
            let bValue = b;
            for (let key of attributeArray) {
                aValue = aValue[key];
                bValue = bValue[key];
            }
            // For string comparison, use localeCompare
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            // For numeric comparison
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
        props.setProfiles(sortedProfiles);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
    
    return (
        <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0", marginTop: "16px"}}>
                <Table.Head style={{userSelect: 'none'}}>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("firstName")}>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("lastName")}>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("professionalTitle")}>Professional Title</Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("companyName")}>Company</Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("emailAddress")}>Email Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell isSelectable onClick={()=>sortingTable("phoneNumber")}>Phone Number</Table.TextHeaderCell>
                    <Table.TextHeaderCell> </Table.TextHeaderCell>
                </Table.Head>


                <Table.VirtualBody height={440}>
                    {
                        props.data.map((profile, index)=>(
                            <Table.Row key={profile.id} isSelectable onSelect={() => { setIsShown(true); setShownProfile(profile) }}>
                                <Table.TextCell>{index+1}</Table.TextCell>
                                <Table.TextCell>{profile.firstName}</Table.TextCell>
                                <Table.TextCell>{profile.lastName}</Table.TextCell>
                                <Table.TextCell>{profile.professionalTitle}</Table.TextCell>
                                <Table.TextCell>{profile.companyName}</Table.TextCell>
                                <Table.TextCell>{profile.emailAddress}</Table.TextCell>
                                <Table.TextCell>{profile.phoneNumber}</Table.TextCell>
                                <Table.TextCell> <IconButton icon={TrashIcon} intent="danger" marginLeft={50} onClick={(event)=>{event.stopPropagation(); deleteContact(profile.id)}}/> </Table.TextCell>
                            </Table.Row>
                        ))
                    }
                </Table.VirtualBody>
            </Table>

            <DialogComponent title={"View profile"} data={shownProfile} isShown={isShown} setIsShown={setIsShown}/>
        </>
    )
}