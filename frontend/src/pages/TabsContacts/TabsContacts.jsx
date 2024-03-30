import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import { useState } from 'react'

import Contacts from '../Contacts/Contacts'
import EmailEditor from '../../components/EmailEditor/EmailEditor.jsx'

export default function TabsContact() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [tabs] = useState(['Customers list', 'Template editor', 'Marketing campaigns'])
  return (
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

      <Pane padding={16} background="tint1" flex="1">
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
            key={tab}
            role="tabpanel"
          >
            {tab == 'Customers list' && <Contacts/>}
            {tab == 'Template editor' && <EmailEditor/>}
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}