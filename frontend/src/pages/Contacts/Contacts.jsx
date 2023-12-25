import { Table } from 'evergreen-ui'
import { Combobox } from 'evergreen-ui'
import { TrashIcon } from 'evergreen-ui'
import { Button } from 'evergreen-ui'


export default function Contacts() {
    const profiles = [
        {
            id: 1,
            name: "John",
            lastName: "Michael",
            professionalTitle: "marketing specialist",
            company: "Google",
            email: "jmichael@yahoo.com",
            phoneNumber: "1234567890",
            status: "lead"
        },
        {
            id: 2,
            name: "Sean",
            lastName: "Doe",
            professionalTitle: "sales manager",
            company: "Google",
            email: "doe2sean@gmail.com",
            phoneNumber: "1234567890",
            status: "lead"
        },
        {
            id: 3,
            name: "Emily",
            lastName: "Johnson",
            professionalTitle: "software engineer",
            company: "Microsoft",
            email: "emily.j@example.com",
            phoneNumber: "9876543210",
            status: "prospect"
        },
        {
            id: 4,
            name: "Alex",
            lastName: "Smith",
            professionalTitle: "finance analyst",
            company: "Amazon",
            email: "alex.smith@example.com",
            phoneNumber: "5551234567",
            status: "lead"
        },
        {
            id: 5,
            name: "Sophia",
            lastName: "Brown",
            professionalTitle: "product manager",
            company: "Apple",
            email: "sophia.b@example.com",
            phoneNumber: "7890123456",
            status: "prospect"
        },
        {
            id: 6,
            name: "Michael",
            lastName: "Wilson",
            professionalTitle: "HR coordinator",
            company: "Facebook",
            email: "michael.w@example.com",
            phoneNumber: "1112223333",
            status: "lead"
        },
        {
            id: 7,
            name: "Ella",
            lastName: "Davis",
            professionalTitle: "graphic designer",
            company: "Adobe",
            email: "ella.d@example.com",
            phoneNumber: "4445556666",
            status: "prospect"
        }
    ]

    return (
        <>           
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell style={{width:"1rem"}}/>
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Professional Title</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Company</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Phone Number</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Status</Table.TextHeaderCell>
                    <Table.TextHeaderCell> </Table.TextHeaderCell>
                </Table.Head>

                <Table.VirtualBody height={440}>
                     {profiles.map((profile) => (
                        <Table.Row key={profile.id} isSelectable onSelect={() => {}}>
                            <Table.TextCell>{profile.id}</Table.TextCell>
                            <Table.TextCell>{profile.name}</Table.TextCell>
                            <Table.TextCell>{profile.lastName}</Table.TextCell>
                            <Table.TextCell>{profile.professionalTitle}</Table.TextCell>
                            <Table.TextCell>{profile.company}</Table.TextCell>
                            <Table.TextCell>{profile.email}</Table.TextCell>
                            <Table.TextCell>{profile.phoneNumber}</Table.TextCell>

                            <Table.TextCell>     
                                <Combobox
                                    initialSelectedItem={{ label: 'customer' }}
                                    items={[{ label: 'prospect' }, { label: 'lead' }, { label: 'contacted' }, { label: 'customer'}]}
                                    itemToString={item => (item ? item.label : '')}
                                    onChange={selected => console.log(selected)}
                                    style={{width:"7rem"}}
                                />
                            </Table.TextCell>

                            {/* <Table.TextCell>{profile.status}</Table.TextCell> */}

                            <Table.TextCell> <TrashIcon onClick={(event)=>{alert('delete');event.stopPropagation()}}/> </Table.TextCell>
                        </Table.Row>
                    ))} 
                </Table.VirtualBody>
            </Table>
            
            <Button appearance="default" intent="none" style={{left:"2%"}}>Add Contact</Button>
        </>
    )
}