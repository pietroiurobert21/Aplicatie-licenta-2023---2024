import { Table } from 'evergreen-ui'

export default function Contacts() {
    return (
        <>
            <Table style={{width:"100vw", padding:"2%", paddingTop: "0"}}>
                <Table.Head>
                    <Table.SearchHeaderCell />
                    <Table.TextHeaderCell>Last Activity</Table.TextHeaderCell>
                    <Table.TextHeaderCell>ltv</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.VirtualBody height={240}>
    {/* {profiles.map((profile) => (
      <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
        <Table.TextCell>{profile.name}</Table.TextCell>
        <Table.TextCell>{profile.lastActivity}</Table.TextCell>
        <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
      </Table.Row>
    ))} */}

                        <Table.Row key={"1"} isSelectable onSelect={() => alert("profile.name")}>
                            <Table.TextCell>John</Table.TextCell>
                            <Table.TextCell>Michael</Table.TextCell>
                            <Table.TextCell isNumber>profile.ltv</Table.TextCell>
                        </Table.Row>
                    </Table.VirtualBody>
            </Table>
        </>
    )
}