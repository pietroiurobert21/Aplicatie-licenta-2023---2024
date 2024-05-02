import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import { useState } from 'react'
import Profile from '../profile/Profile'
import EmployeesLeaderboard from '../EmployeesLeaderboard/EmployeesLeaderboard'

export default function TabsProfile() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [tabs] = useState(['My Profile', 'Leaderboard'])
    return (
        <>
            <Pane >
            <Tablist display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={400}>
                {tabs.map((tab, index) => (
                <Tab
                    aria-controls={`panel-${tab}`}
                    isSelected={index === selectedIndex}
                    key={tab}
                    onSelect={() => setSelectedIndex(index)}
                >
                    {tab}
                </Tab>
                ))}
            </Tablist>

            <Pane flex="1" height="100vh">
                {tabs.map((tab, index) => (
                <Pane
                    aria-labelledby={tab}
                    aria-hidden={index !== selectedIndex}
                    display={index === selectedIndex ? 'block' : 'none'}
                    key={tab}
                    role="tabpanel"
                >
                    {tab == 'My Profile' && <Profile/>}
                    {tab == 'Leaderboard' && <EmployeesLeaderboard/>}
                </Pane>
                ))}
            </Pane>
            </Pane>
        </>
    )
}