import { Table } from 'evergreen-ui'

export default function Contacts() {
    const profiles = [
        {
            id: 1,
            name: "John",
            lastName: "Michael",
            proffesionalTitle: "marketing specialist",
            company: "Google",
            email: "jmichael@yahoo.com",
            phoneNumber: "1234567890",
            status: "lead"
        },
        {
            id: 2,
            name: "Sean",
            lastName: "Doe",
            proffesionalTitle: "sales manager",
            company: "Google",
            email: "doe2sean@gmail.com",
            phoneNumber: "1234567890",
            status: "lead"
        }
    ]

    return (
        <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell />
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Professional Title</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Company</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email Address</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Phone Number</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Status</Table.TextHeaderCell>
                </Table.Head>

                <Table.VirtualBody height={240}>
                     {profiles.map((profile) => (
                        <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
                            <Table.TextCell>{profile.id}</Table.TextCell>
                            <Table.TextCell>{profile.name}</Table.TextCell>
                            <Table.TextCell>{profile.lastName}</Table.TextCell>
                            <Table.TextCell>{profile.proffesionalTitle}</Table.TextCell>
                            <Table.TextCell>{profile.company}</Table.TextCell>
                            <Table.TextCell>{profile.email}</Table.TextCell>
                            <Table.TextCell>{profile.phoneNumber}</Table.TextCell>
                            <Table.TextCell>{profile.status}</Table.TextCell>
                        </Table.Row>
                    ))} 
                </Table.VirtualBody>
            </Table>
        </>
    )
}